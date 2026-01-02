## Project Tracker

# project_tracker

backend api url => https://project-tracker-dhse.onrender.com
frontend nextjs url => https://project-tracker-test.vercel.app/

# Project Overview

Project Tracker is a web-based application designed to help teams manage projects, track their status, and log activities performed by users. It provides a RESTful API that supports project creation, updates, status management, and activity logging.

The backend is built with **Node.js and Express**, uses **MySQL (Aiven)** as the database, and is deployed on **Render**. The system is designed with security, scalability, and clean architecture in mind.

---

# Tech Stack

### Backend

- **Node.js** (ES Modules)
- **Express.js** – API framework
- **MySQL** – relational database
- **mysql2** – MySQL client
- **bcrypt** – password hashing
- **cors** – Cross-Origin Resource Sharing
- **dotenv** – environment variables

### Infrastructure & Tools

- **Aiven** – Managed MySQL database (TLS/SSL enabled)
- **Render** – Backend deployment
- **Postman** – API testing
- **Git & GitHub** – version control

---

## 📁 Project Structure

```
repo/
 ├── backend/
 │   ├── src/
 │   │   ├── app.js
 │   │   ├── routes/
 │   │   ├── controllers/
 │   │   ├── db/
 │   │   │   └── mysql.js
 │   ├── package.json
 │   ├── .env
 │   └── .gitignore
 └── frontend/ (nextjs project structure)
```

---

## Database Schema (Summary)

### User

- id
- email
- name
- password (hashed)
- role
- created_at

### Project

- id
- title
- summary
- status (`pending | ongoing | completed`)
- created_at
- updated_at
- created_by
- updated_by

### Activity Log

- id
- project_id
- project_title
- action (`created | updated`)
- user_id
- user_name
- time_stamp

---

## 🔐 Security Practices

- Passwords are **hashed using bcrypt**
- Authentication queries fetch user by email only
- Password comparison is done in Node.js (not SQL)
- MySQL connections enforce **TLS/SSL**
- Database CA certificate is stored as an **environment variable** in production

---

## Local Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/chukwuka4u/project_tracker.git
cd project-tracker/backend
```

### 2️⃣ Install dependencies for backend and frontend

```bash
npm install
```

### 3️⃣ Create a `.env` file for the backend

```env
PORT=5000
DATABASE_URI=mysql://USER:PASSWORD@HOST:PORT/DB_NAME
MYSQL_CA_CERT=-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----
```

### 4️⃣ Start the server

```bash
npm start
```

or

```bash
node src/server.js
```

The API will be available at:

```
http://localhost:5000
```

---

### Environment Variables (Render)

- `DATABASE_URI`
- `MYSQL_CA_CERT`

---

### 4️⃣ Start the server (frontend)

```bash
npm run build
npm start
```

the frontend was deployed on Vercel
