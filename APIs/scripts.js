const SCRIPT_API = "http://127.0.0.1:3000/api"

export const addScript = async ( phrase, mode, intent, audio_url ) => {
    const token = localStorage.getItem("token")
    const user_id = localStorage.getItem("user_id")

    if (!token || !user_id) {
        throw new Error("User not authentiated")
    }

    const response = await fetch(`${SCRIPT_API}/scripts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify( {user_id, phrase, mode, intent, audio_url } )   // converts the object to a string representation that is recognizable as JSON, which is how to send data.
        }
    );

    if (!response.ok) {
        throw new Error("Failed to add script");
    }

    return response.json();
    
}
