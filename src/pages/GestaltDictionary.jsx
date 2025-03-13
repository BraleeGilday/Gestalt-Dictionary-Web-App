import HelpIcon from "../components/HelpIcon";
import ScriptCollection from "../components/ScriptCollection";
import AddButton from "../components/AddButton";
import Navigation from "../components/Navigation";

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// What would I call/label these as?
import { loadScripts, deleteScript } from "../../API_Services/scripts";
import { downloadAllScriptsPDF } from "../../API_Services/pdf";

function GestaltDictionary({setScriptToEdit}) {
    const [scripts, setScripts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchScripts = async () => {
            const data = await loadScripts();
            setScripts(data); 
        };

        fetchScripts();
    }, []);

    const onDelete = async (_id) => {
        const success = await deleteScript(_id)
        if(success) {
            setScripts(scripts.filter(e => e._id !== _id))      // How the table will stay updated without refreshing
        } else {
            alert(`Failed to delete script.`)
        }
    }

    const onEdit = (script) => {
        setScriptToEdit(script);
        navigate('/edit');
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

            {scripts.length > 0 && (
                <div>
                    <button className="export-all-button" onClick={() => downloadAllScriptsPDF(scripts)}>
                        Export All Scripts to PDF
                    </button>
                </div>
            )}
        </div>
    )
}

export default GestaltDictionary;