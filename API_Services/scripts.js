const SCRIPT_URL = "http://127.0.0.1:3000/api/scripts"

export const addScript = async ( phrase, mode, intent, audio_url, notes ) => {
    const token = localStorage.getItem("token")
    const user_id = localStorage.getItem("user_id")

    if (!token || !user_id) {
        throw new Error("User not authentiated")
    }

    const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify( {user_id, phrase, mode, intent, audio_url, notes } )   // converts the object to a string representation that is recognizable as JSON, which is how to send data.
        }
    );

    if (!response.ok) {
        throw new Error("Failed to add script");
    }

    return response.json();
    
}


export const editScript = async ( scriptId, updatedScript ) => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

    if (!token || !user_id) {
        throw new Error("User not authenticated");
    }

    try {
        const response = await fetch(`${SCRIPT_URL}/${scriptId}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ ...updatedScript, user_id }), // Ensure user_id is sent
        });

        if (!response.ok) {
            throw new Error(`Failed to edit script: ${response.status}`);
        }

        console.log("Your script was successfully updated!");
        return true;
    } catch (error) {
        console.error("Error updating script:", error);
        return false;
    }
};

export const loadScripts = async () => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

    if (!token || !user_id) {
        console.error("User not authenticated");
        return [];
    }

    try {
        const response = await fetch(SCRIPT_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "User-ID": user_id
            },
        });

        if (!response.ok) throw new Error("Failed to load scripts");

        return await response.json();
    } catch (error) {
        console.error("Error loading scripts:", error);
        return [];
    }
};

export const deleteScript = async (_id) => {
    try {
        const response = await fetch(`${SCRIPT_URL}/${_id}`, {
            method: "DELETE",
        });

        if (response.status === 204) {
            return true;  // Success
        } else {
            console.error(`Failed to delete script. Status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error("Error deleting script:", error);
        return false;
    }
};
