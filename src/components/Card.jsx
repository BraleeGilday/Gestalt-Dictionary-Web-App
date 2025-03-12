import { useState } from "react";
import arrowIcon from '../assets/arrow.png'


function Card({script}) {
    const [flipped, setFlipped] = useState(true);

    return (
        <div className="card">
            <img className="arrowIcon" src={arrowIcon} alt="Arrow" onClick={() => setFlipped(!flipped)}></img>

            {flipped ? (
                <div className="card-front">
                    <h2 className="card-phrase">{script.phrase}</h2>
                    
                    {script.audio_url && (
                        <audio controls>
                            <source src={script.audio_url} type="audio/wav" />
                            Your browser does not support the audio tag.
                        </audio>
                    )}
                </div>         
            ) : (
                <div className="card-back">
                    <h3>{script.phrase}</h3>
                    <p><strong>Mode:</strong> {script.mode}</p>
                    <p><strong>Intent:</strong> {script.intent}</p>
                </div>  
            )}

            {/* <a href="/" onClick={e => e.PreventDefault}>Delete</a> */}
        </div>
    )
}

export default Card;