import Card from "./Card";

function ScriptItem({script, onDelete, onEdit}) {
    return (
        <>
            <Card script={script} onDelete={onDelete} onEdit={onEdit}/>
        </>
    )
}

export default ScriptItem;