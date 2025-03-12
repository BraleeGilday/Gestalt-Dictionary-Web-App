import ScriptItem from "./ScriptItem";

function ScriptCollection({scripts, onDelete, onEdit}) {
    return (
        <>
            {scripts.map((script, index) => 
            <ScriptItem 
                script={script} 
                key={index}
                onDelete={onDelete}
                onEdit={onEdit}
            />)}
        </>
    )
}

export default ScriptCollection;