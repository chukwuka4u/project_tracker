import pool from "./mysql.js"

//users

async function getUser(id) {
    const [row] = await pool.query(`
        SELECT *
        FROM user
        WHERE id = ?
        `, [id])
        return row
}

async function createUser(email, name, password, role) {
    const [row] = await pool.query(`
        INSERT INTO user (email, name, password, role)
        VALUES (?, ?, ?, ?)
        `, [email, name, password, role])
    return row
}

//project

async function getProject() {
    const [row] = await pool.query(`
        SELECT *
        FROM project
        LIMIT 5
        `)
        return row
}

async function createProject(title, summary, status, created_by) {
    const [row] = await pool.query(`
        INSERT INTO project (title, summary, status, created_by)
        VALUES (?, ?, ?, ?)
        `, [title, summary, status, created_by])
    return row
}

async function updateProject(id, title, summary, status, updatedBy) {
    const [row] = await pool.query(`
        UPDATE project
        SET 
        status = ?,
        title = ?,
        summary = ?,
        updated_at = CURRENT_TIMESTAMP,
        updated_by = ?
        WHERE id = ?
        `, [status, title, summary, updatedBy, id])
    return row
}

async function deleteProject(id) {
    const [row] = await pool.query(`
        DELETE
        FROM project
        WHERE id = ?
        `, [id])
}

//activity logs
async function getActivityLog() {
    const [row] = await pool.query(`
        SELECT *
        FROM activity_log
        LIMIT 10
        `)
        return row
}

async function createActivityLog(projectId, action, userId) {
    const project = await getProject(projectId)
    const user = await getUser(userId)
    const [row] = await pool.query(`
        INSERT INTO activity_log (project_id, project_title, action, user_id, user_name)
        VALUES (?, ?, ?, ?, ?)
        `, [projectId, project[0].title, action, userId, user[0].name])
    return row
}
export { createUser, getUser, getProject, createProject, updateProject, deleteProject, getActivityLog, createActivityLog }