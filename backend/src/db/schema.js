const user = {
    id: string,
    email: string,
    name: string,
    password: string,
    role: string,
    createdAt: datetime
}
const project = {
  id: string,
  title: string,
  summary: string,
  status: pending | ongoing | completed,
  createdAt: datetime,
  updatedAt: datetime,
  createdBy: admin_id,
  updatedBy: user_id,
}
const activityLog = {
  id: string,
  projectId: string,
  projectTitle: string,
  action: created | updated ,
  userId: string,
  userName: string,
  timestamp: datetime
}
