
const API_URL = "http://127.0.0.1:5000/api"; // Flask backend URL

export const loginUser = async (username, password) => {
    const response = await fetch(
        `${API_URL}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",     // look up; ensure session cookies are sent
            body: JSON.stringify({ username, password })   // converts the object to a string representation that is recognizable as JSON, which is how to send data.
        }
    );
    
    const data = await response.json();
    
    if (data.access_token) {
        localStorage.setItem("token", data.access_token)
        localStorage.setItem("user_id", data.user_id)
    }

    return data
};


export const registerUser = async (username, password) => {
    const response = await fetch(
        `${API_URL}/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",     // look up; ensure session cookies are sent
            body: JSON.stringify({ username, password })   // converts the object to a string representation that is recognizable as JSON, which is how to send data.
        }
    );
    
    return response.json();     // add error handling? return data?
};


export const logoutUser = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
        return { error: "No token found" }
    }

    try {
        const response = await fetch(`${API_URL}/logout`, {  
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Logout successful:", data.message);
            localStorage.removeItem("token"); 
            localStorage.removeItem("user_id");
        } else {
            console.error("Logout failed:", data.error);
        }

        return data;

    } catch (error) {
        return { error: "Network error" };
    }
};


export const verifyUser = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
        console.log("No token found in localStorage")
        return null     // User is not logged in
    }

    try {
        const response = await fetch(`${API_URL}/user`, { 
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            credentials: "include",
        })

        if (!response.ok) {
            console.log("invalid token")
            localStorage.removeItem("token"); 
            localStorage.removeItem("user_id");
            return null
        }
        
        const userData = await response.json()
        return userData

    } catch (error) {
        console.log("Network error while verifying user:", error);
        return null;
    }
}
