import HelpIcon from "../components/HelpIcon";
import ScriptCollection from "../components/ScriptCollection";
import AddButton from "../components/AddButton";
import Navigation from "../components/Navigation";

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function GestaltDictionary() {
    const [scripts, setScripts] = useState([]);

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
            `/scripts/${_id}`,
            {method: 'DELETE'}
        );
        if(response.status === 204) {
            setScripts(scripts.filter(e => e._id !== _id))      // How the table will stay updated without refreshing
        } else {
            alert(`Failed to delete script. Status code = ${response.status}`)
        }
    }

    return (
        <div>
            <header>
            <Navigation/>
            </header>

            <h1 className="gestaltTitle">GESTALT DICTIONARY</h1>
            <p className="gestaltSubtitle">Add your child’s script to their own dictionary.</p>
            <HelpIcon />
            <AddButton />

            <ScriptCollection scripts={scripts} onDelete={onDelete}></ScriptCollection>
        </div>
    )
}

export default GestaltDictionary;