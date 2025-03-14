const AUTH_URL = "http://127.0.0.1:5000/api"; // Flask backend URL

export const loginUser = async (username, password) => {
    console.log("Talking to authentication microservice: Sending login request.");
    try {
        const response = await fetch(`${AUTH_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({ username, password })
        });

        let data;
        try {
            data = await response.json();
        } catch {
            return { error: "Invalid server response" };
        }

        if (!response.ok) {
            return { error: data?.error || "Login failed" };
        }

        console.log("Login successful! Storing token and user ID.");
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user_id", data.user_id);

        return data;
    } catch (error) {
        return { error: "Network error" };
    }
};

export const registerUser = async (username, password) => {
    console.log("Talking to authentication microservice: Sending registration request.");
    try {
        const response = await fetch(`${AUTH_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({ username, password })
        });

        let data;
        try {
            data = await response.json();
        } catch {
            return { error: "Invalid server response" };
        }

        if (!response.ok) {
            return { error: data?.error || "Registration failed" };
        }

        console.log("Registration successful!", data);
        return data;
    } catch (error) {
        return { error: "Network error" };
    }
};

export const logoutUser = async () => {
    console.log("Talking to authentication microservice: Sending logout request.");
    const token = localStorage.getItem("token");

    if (!token) {
        return { error: "No token found" };
    }

    try {
        const response = await fetch(`${AUTH_URL}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            credentials: "include",
        });

        let data;
        try {
            data = await response.json();
        } catch {
            return { error: "Invalid server response" };
        }

        if (!response.ok) {
            return { error: data.error || "Logout failed" };
        }

        console.log("Logout successful:", data.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");

        return data;
    } catch (error) {
        return { error: "Network error" };
    }
};

export const verifyUser = async () => {
    console.log("Talking to authentication microservice: Verifying user session.");
    const token = localStorage.getItem("token");

    if (!token) {
        console.log("No token found in localStorage");
        return null;
    }

    try {
        const response = await fetch(`${AUTH_URL}/user`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            credentials: "include",
        });

        if (!response.ok) {
            console.log("Invalid token");
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            return null;
        }

        return await response.json();
    } catch (error) {
        console.log("Network error while verifying user:", error);
        return null;
    }
};
