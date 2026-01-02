const BASE_URL = "https://project-tracker-dhse.onrender.com";
export const TrackerAPI = {
    //get user
    getUser: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/api/user/${id}`, 
                {
                    method: "GET",
                }
            );
            console.log(response)
            const data = await response.json();
            return data.user || null;
        } catch (error) {
            console.error("Error fetching user:", error);
            return null;
        }
    },

    //create user
    createUser: async (form) => {
        try {
            const {email, name, password, role} = form
            const response = await fetch(`${BASE_URL}/api/user/new`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify({email, name, password, role})
                }
            );
            const data = await response.json();
            return data.user || null;
        } catch (error) {
            console.error("Error creating user:", error);
            return null;
        }
    },

    //get projects
    getProject: async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/project`, 
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            return data.projects || [];
        } catch (error) {
            console.error("Error searching meals by name:", error);
            return [];
        }
    },

    //create project
    createProject: async (form) => {
        try {
            const {status, title, summary, createdBy} = form
            const response = await fetch(`${BASE_URL}/api/project/new`, 
                 {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify({status, title, summary, createdBy})
                }
            );
            const data = await response.json();
            return data.message;
        } catch (error) {
            console.error("Error creating new project:", error);
            return null;
        }
    },
    //edit project
    editProject: async (form) => {
        try {
            const {status, title, summary, updatedBy, id} = form
            const response = await fetch(`${BASE_URL}/api/project/new`, 
                 {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify({status, title, summary, updatedBy, id})
                }
            );
            const data = await response.json();
            return data.project || null;
        } catch (error) {
            console.error("Error editing the project: ", error);
            return null;
        }
    },

    //delete project
    deleteProject: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/api/delete/${id}`, 
                {
                    method: "DELETE",
                }
            );
            // const data = await response.json();
            return response.status || [];
        } catch (error) {
            console.error("Error deleting project:", error);
            return [];
        }
    },

    //get logs
    getLogs: async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/logs`, 
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            return data.result || [];
        } catch (error) {
            console.error("Error fetching logs:", error);
            return [];
        }
    },

    //create log
    createLog: async (params) => {
        const {projectId, action, userId}  = params
        try {
            const response = await fetch(`${BASE_URL}/api/logs/new`, 
                 {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify({projectId, action, userId})
                }
            );
            const data = await response.json();
            return data.id || null;
        } catch (error) {
            console.error("Error creating activity log:", error);
            return null;
        }
    },

    
}