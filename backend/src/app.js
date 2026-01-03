import express from "express"
import cors from "cors"
import pool from "./db/mysql.js"
import readSqlFile from "./db/config/reader.js"
import { authUser, createProject, getProject, createUser, getUser, updateProject, deleteProject, getActivityLog, createActivityLog } from "./db/queries.js";

const app = express();
app.use(express.json())


const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:3000',
  'https://project-tracker-test.vercel.app'
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true
}))


app.get('/health', async (req, res) => {
  try {
    const sqlstring = await readSqlFile("src/db/migrations/0002_migrate.sql")
    const [rows] = await pool.query(sqlstring)
    console.log(rows)
    res.json({ status: 'ok', db: 'connected', res: rows })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//auth user
app.post('/api/user/auth', async (req, res) => {
  const {email, password} = req.body
  const result = await authUser(email, password)
  res.json({user: result})
})

//get user
app.get('/api/user/:id', async (req, res) => {
  const id = req.params.id
  const user = await getUser(id)
  res.json({user: user[0]})
})

//create user
app.post('/api/user/new', async (req, res) => {
  const {email, name, password, role} = req.body
  const result = await createUser(email, name, password, role)
  const id = result.insertId
  const user = await getUser(id)
  res.json({user: user[0]})
})

//get all projects
app.get('/api/project', async (req, res) => {
  const projects = await getProject()
  res.json({projects: projects})
})

//create project
app.post('/api/project/new', async (req, res) => {
  const {title, summary, status, createdBy} = req.body
  const result = await createProject(title, summary, status, createdBy)
  const id = result.insertId
  res.json({message: "created new project " + id })
})

//edit project
app.post('/api/project/edit', async (req, res) => {
  const {id, title, summary, status, updatedBy} = req.body
  const result = await updateProject(id, title, summary, status, updatedBy)
  res.status(200).json({project: result})
})

//delete a project
app.delete('/api/project/delete/:id', async (req, res) => {
  const id = req.params.id
  const result = await deleteProject(id)
  res.json({result: result})
})

//get all activity logs
app.get('/api/logs', async (req, res) => {
  const result = await getActivityLog()
  res.json({result: result})
})

//create new activity log
app.post('/api/logs/new', async (req, res) => {
  const {projectId, action, userId } = req.body
  const result = await createActivityLog(projectId, action, userId)
  const id = result.insertId
  res.json({id: id})
})

export default app;