import HelpIcon from "../components/HelpIcon";
import ScriptCollection from "../components/ScriptCollection";
import AddButton from "../components/AddButton";
import Navigation from "../components/Navigation";

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function GestaltDictionary({setScriptToEdit}) {
    const [scripts, setScripts] = useState([]);
    const navigate = useNavigate();

    const loadScripts = async () => {
        const token = localStorage.getItem("token")
        const user_id = localStorage.getItem("user_id")

        if (!token || !user_id) {
            console.error("User not authenticated")
            return
        }

        const response = await fetch("http://127.0.0.1:3000/api/scripts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "User-ID": user_id
            },
        })
        
        const data = await response.json();
        setScripts(data)                            /*How it knows if data changes*/
    }

    useEffect(() => { 
        loadScripts(); 
    }, []);

    const onDelete = async (_id) => {
        const response = await fetch(
            `http://127.0.0.1:3000/api/scripts/${_id}`,     // Add to .env
            {method: 'DELETE'}
        );
        if(response.status === 204) {
            setScripts(scripts.filter(e => e._id !== _id))      // How the table will stay updated without refreshing
        } else {
            alert(`Failed to delete script. Status code = ${response.status}`)
        }
    }

    const onEdit = (script) => {
        setScriptToEdit(script);
        navigate('/edit');
    }


    const downloadAllScriptsPDF = async (scripts) => {
        const pdfServiceUrl = "http://127.0.0.1:5005/generate-pdf-from-html";
    
        const htmlContent = scripts.map(script => 
            `
            <br>
            <h3>Phrase: ${script.phrase}</h3>
            <p><strong>Mode:</strong> ${script.mode}</p>
            <p><strong>Communication Intent:</strong> ${script.intent}</p>
            <br>
            `).join("");
    
        const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // Format: YYYYMMDD

        try {
            const response = await fetch(pdfServiceUrl, {
                method: "POST",
                headers: { "Content-Type": "text/html" },
                body: htmlContent
            });
    
            if (!response.ok) throw new Error("Failed to generate PDF");
    
            // CITATION: 
            // Adapted from URL: https://medium.com/@sureshraamakrishnan/handling-different-types-of-data-from-backend-in-javascript-for-file-downloads-53fecedcec3e
            // Author: Suresh Ramakrishnan
            
            const blob = await response.blob();             // converts the response (which is a binary PDF file) into a Blob (Binary Large Object)
            const link = document.createElement("a");       // Creates a new <a> element
            link.href = URL.createObjectURL(blob);          // Creates a temporary URL in the browser for the Blob (lets the browser treat the blob like a real file so we can download it)
            link.download = `${timestamp}_All_Scripts.pdf`; 
            document.body.appendChild(link);                // Adds the invisible <a> tag to the page
            link.click();                                   // Simulates a user clicking the download link, triggering the file download
            document.body.removeChild(link);                // Cleans up by removing the temporary <a> tag
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Error generating PDF");
        }
    }

    return (
        <div>
            <header>
            <Navigation/>
            </header>

            <h1 className="gestaltTitle">GESTALT DICTIONARY</h1>

            <div className="subtitle">
                <p className="gestaltSubtitle">Add your child’s script to their own dictionary.</p>
                <HelpIcon />
            </div>

            <AddButton />

            <ScriptCollection scripts={scripts} onDelete={onDelete} onEdit={onEdit}></ScriptCollection>

            <div>
                <button onClick={() => downloadAllScriptsPDF(scripts)}>
                    Export All Scripts to PDF
                </button>
            </div>
        </div>
    )
}

export default GestaltDictionary;