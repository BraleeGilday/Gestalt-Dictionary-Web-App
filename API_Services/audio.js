const AUDIO_URL = "http://127.0.0.1:5002/api"; // Flask backend URL

export const startRecording = async () => {
    const response = await fetch(
        `${AUDIO_URL}/start-recording`,
        {method: 'POST'}
    )

    const data = await response.json()
    return data
}

export const stopRecording = async() => {
    const response = await fetch(
        `${AUDIO_URL}/stop-recording`,
        {method: 'POST'}
    )

    const data = await response.json()
    return data         // Includes the file URL
}

export const getAudioFile = (fileName) => { 
    return `${AUDIO_URL}/get-audio/${fileName}`
}