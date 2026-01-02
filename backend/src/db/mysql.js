import mysql from 'mysql2/promise'
// import fs from 'fs'
// import path from 'path'
import dotenv from 'dotenv'
dotenv.config() 

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  multipleStatements: true,

  ssl: {
    rejectUnauthorized: true,
    ca: process.env.MYSQL_CA_CERT,
    // ca: fs.readFileSync(
    //   path.join(process.cwd(), 'certs', 'ca.pem')
    // ),
  },

  enableKeepAlive: true,
  keepAliveInitialDelay: 0,

  waitForConnections: true,
  connectionLimit: 5
})

pool.getConnection()
  .then(conn => {
    console.log('connected to database')
    conn.release()
  })
  .catch(err => {
    console.error('connection failed:', err.message)
  })

export default pool
