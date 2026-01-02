import express from "express"
import pool from "./db/mysql.js"
import readSqlFile from "./db/config/reader.js"
import { createProject, getProject, createUser, getUser, updateProject, deleteProject, getActivityLog, createActivityLog } from "./db/queries.js";

const app = express();
app.use(express.json())

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

app.get('/getActivityLogs', async (req, res) => {
  const project = await getActivityLog()
  res.json({project: project})
})
app.get('/createActivityLog', async (req, res) => {
  const user = await createActivityLog(3, "updated", 1)
  res.json({user: user})
})
app.get('/updateProject/:id', async (req, res) => {
  const id = req.params.id
  const user = await updateProject(id, "ongoing", 1)
  res.json({user: user})
})

app.get('/', (req, res) => {
    res.json({message: "hello world"})
})

export default app;