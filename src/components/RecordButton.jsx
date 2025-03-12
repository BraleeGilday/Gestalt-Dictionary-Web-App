import { useState } from "react";
import { startRecording, stopRecording } from "../../APIs/audio";
import { CiMicrophoneOn } from "react-icons/ci";

const RecordButton = () => {
    const [recording, setRecording] = useState(false);
    const [audioFile, setAudioFile] = useState(null);

    const handleStart = async () => {
        const response = await startRecording();
        if (response.message === "Recording started") {
            setRecording(true)
        } else {
            alert("Error: " + response.error)
        }
    }

    const handleStop = async () => {
        const response = await stopRecording();
        if (response.message === "Recording stopped") {
            setRecording(false)
        
            setAudioFile(response.file_url)

        } else {
            alert("Error: " + response.error)
        }
    }


    return (
        <div>
            {recording ? (
                <button onClick={handleStop}>Stop Recording</button>
            ) : (
                <button onClick={handleStart}>Start Recording</button>
            )}

            {audioFile && (
                <div>
                    <p>Recording saved!</p>
                    <audio controls>
                        <source src={audioFile} type="audio/wav" />
                        Your browser does not support the audio tag.
                    </audio>
                    <a href={audioFile} download="recording.wav">
                        Download
                    </a>
                </div>
            )}

        </div>

    )
}

export default RecordButton