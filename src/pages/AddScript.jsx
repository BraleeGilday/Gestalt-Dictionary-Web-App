import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addScript } from '../../APIs/scripts';
import { startRecording, stopRecording } from '../../APIs/audio';

// import RecordButton from '../components/RecordButton';

import PopupIcon from '../components/PopupIcon';
import AreYouSure from '../components/AreYouSure';

function AddScript() {
    const [phrase, setPhrase] = useState('');
    const [mode, setMode] = useState('Verbal');
    const [intent, setIntent] = useState('Unknown');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [audioFile, setAudioFile] = useState(null);
    const [recording, setRecording] = useState(false);

    const navigate = useNavigate();

    const cancelChanges = () => {
        setShowConfirmation(true); // Show the confirmation alert
    };

    const handleCancelConfirm = () => {
        setShowConfirmation(false);   // Close popup window
        navigate('/dictionary');
        
    };

    const handleCancelDecline = () => {
        setShowConfirmation(false); // Close popup window
    };

    const handleStartRecording = async () => {
        const response = await startRecording();
        if (response.message === "Recording started") {
            setRecording(true)
        } else {
            alert("Error: " + response.error)
        }
    }

    const handleStopRecording = async () => {
        const response = await stopRecording();
        if (response.file_url) {
            setRecording(false)
            setAudioFile(response.file_url)

        } else {
            alert("Error: " + response.error)
        }
    }

    const handleAddScript = async () => {    
        console.log("Submitting Script with Audio:", { phrase, mode, intent, audio_url: audioFile });

        try {
            await addScript(phrase, mode, intent, audioFile)
            navigate("/dictionary")

        } catch(error) {
            alert("Oh no! We failed to add your script. Please try again.")
            console.log(error)
        }
    }

    return (
        <div className="add-container">
            <h1>Add New Script</h1>
            
            <p className="required">Indicates a required field.</p>

            <form onSubmit={(e) => e.preventDefault()}>
                <fieldset>
                    <legend className="required">Script</legend>
                    <textarea 
                        name="phrase"
                        value={phrase} 
                        onChange={e => setPhrase(e.target.value)} 
                        className='scriptTextInput'
                        placeholder='Type the phrase here'
                    />
                </fieldset>

                <fieldset>
                <legend>Record Audio</legend>
                {recording ? (
                    <button onClick={handleStopRecording}>Stop Recording</button>
                ) : (
                    <button onClick={handleStartRecording}>Start Recording</button>
                )}
                
                {audioFile && (
                    <div>
                        <p>Recording saved!</p>
                        <audio controls>
                            <source src={audioFile} type="audio/wav" />
                            Your browser does not support the audio tag.
                        </audio>                        </div>
                )}
                </fieldset>

                <fieldset>
                    <legend className="required">Select the mode of communication</legend>
                    <div className="modeRadioButtons">
                        <div className="radioButton">
                            <input 
                                type="radio" 
                                id="modeChoice1" 
                                name="mode" 
                                value="Verbal" 
                                onChange={(e) => setMode(e.target.value)}
                                checked={mode === "Verbal"}
                            />
                            <label htmlFor="modeChoice1">Verbal</label>
                        </div>

                        <div className="radioButton">
                            <input 
                                type="radio" 
                                id="modeChoice2" 
                                name="mode" 
                                value="AAC Device"
                                onChange={(e) => setMode(e.target.value)}
                                checked={mode === "AAC Device"}
                            />
                            <label htmlFor="modeChoice2">AAC Device</label>
                        </div>

                        <div className="radioButton">
                            <input 
                                type="radio" 
                                id="modeChoice3" 
                                name="mode" 
                                value="Sign Language" 
                                onChange={(e) => setMode(e.target.value)}
                                checked={mode === "Sign Language"}
                            />
                            <label htmlFor="modeChoice3">Sign Language</label>
                        </div>

                        <div className="radioButton">
                            <input 
                                type="radio" 
                                id="modeChoice4" 
                                name="mode" 
                                value="Other" 
                                onChange={(e) => setMode(e.target.value)}
                                checked={mode === "Other"}
                            />
                            <label htmlFor="modeChoice4">Other</label>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="legend-container">
                        <legend className="notRequired">Select the communication intent behind the script</legend>
                        <PopupIcon />
                    </div>
                    <div className="dropdown">
                        <select 
                            name="intent" 
                            id="intent-select"
                            value={intent}
                            onChange={e => setIntent(e.target.value)}
                        >
                            <option value="Unknown">--Select Only If Known--</option>
                            <option value="Commenting">Commenting</option>
                            <option value="Help">Help</option>
                            <option value="Transition">Transition</option>
                            <option value="Protest">Protest</option>
                            <option value="Shared Joy">Shared Joy</option>
                            <option value="Joint Activity">Joint Activity</option>
                            <option value="Sensory Motor Experience">Sensory Motor Experience</option>
                            <option value="New Situation">New Situation</option>
                        </select>
                    </div>
                </fieldset>

                <div className="addPageButtons">
                    <button className="addPageButton" onClick={handleAddScript}>
                    SAVE
                    </button>

                    <button className="addPageButton" onClick={cancelChanges}>
                    CANCEL
                    </button>
                </div>
            </form>

            {showConfirmation && (
                <AreYouSure 
                    onCancel={handleCancelDecline}  // Hide the confirmation dialog
                    onConfirm={handleCancelConfirm}  // Confirm cancellation
                />
            )}

        </div>

    )
}

export default AddScript;