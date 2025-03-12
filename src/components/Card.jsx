import { useState } from "react";

import arrowIcon from '../assets/arrow.png'
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmDelete from "./ConfirmDelete";


function Card({script, onDelete, onEdit}) {
    const [flipped, setFlipped] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

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

                    <div className="edit-delete-icons"> 
                        <FaEdit 
                            className="icon"
                            size = {20}
                            onClick={() => onEdit(script)}
                        />

                        <MdDeleteOutline 
                            className="icon"
                            size = {22}
                            onClick={handleShow}    // Open modal
                        />

                        <ConfirmDelete 
                            handleClose = {handleClose}
                            onDelete = {onDelete}
                            showModal = {showModal}
                            script = {script}
                        />
                    </div> 

                </div>         
            ) : (
                <div className="card-back">
                    <h3>{script.phrase}</h3>
                    <p><strong>Mode:</strong> {script.mode}</p>
                    <p><strong>Intent:</strong> {script.intent}</p>
                </div>  
            )}

        </div>
    )
}

export default Card;