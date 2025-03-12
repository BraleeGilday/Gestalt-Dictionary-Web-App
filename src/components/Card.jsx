import { useState } from "react";

import arrowIcon from '../assets/arrow.png'
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmDelete from "./ConfirmDelete";

import downloadPdfIcon from "../assets/download-pdf.png"


function Card({script, onDelete, onEdit}) {
    const [flipped, setFlipped] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const downloadScriptPDF = async (script) => {
        const pdfServiceUrl = "http://127.0.0.1:5005/generate-pdf-from-html"

        const htmlContent = 
        `<h1>My Script</h1>
        <h3>Phrase: ${script.phrase}</h3>
        <p><strong>Mode:</strong> ${script.mode}</p>
        <p><strong>Communication Intent:</strong> ${script.intent}</p>`;
   
        try {
            const response = await fetch(pdfServiceUrl, {
                method: "POST",
                headers: {"Content-Type": "text/html"},
                body: htmlContent
            })

            if (!response.ok) throw new Error("Failed to generate PDF");
            
            const blob = await response.blob()  // Returns a newly created Blob object which contains a concatenation of all of the data in the array passed into the constructor. (https://developer.mozilla.org/en-US/docs/Web/API/Blob)
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${script.phrase.replace(/\s+/g, "_")}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch(error) {
            console.error("Error generating PDF:", error)
            alert("Error generating PDF")
        }
    }

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

                    <div>
                        <img 
                            className="icon downloadIcon" 
                            src={downloadPdfIcon} 
                            alt="Download PDF icon" 
                            onClick={() => downloadScriptPDF(script)}>
                        </img>
                    </div>

                </div>  
            )}

        </div>
    )
}

export default Card;