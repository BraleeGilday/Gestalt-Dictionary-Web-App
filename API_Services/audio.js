const AUDIO_URL = "http://127.0.0.1:5002/api"; // Flask backend URL

export const startRecording = async () => {
    console.log("Talking to audio microservice: Sending request to start recording.");
    const response = await fetch(
        `${AUDIO_URL}/start-recording`,
        {method: 'POST'}
    )

    const data = await response.json()
    return data
}

export const stopRecording = async() => {
    console.log("Talking to audio microservice: Sending request to stop recording.");
    const response = await fetch(
        `${AUDIO_URL}/stop-recording`,
        {method: 'POST'}
    )

    const data = await response.json()
    return data         // Includes the file URL
}

export const getAudioFile = (fileName) => { 
    const fileUrl = `${AUDIO_URL}/get-audio/${fileName}`;
    console.log(`Talking to audio microservice: Fetching audio file at ${fileUrl}`);
    return fileUrl
}