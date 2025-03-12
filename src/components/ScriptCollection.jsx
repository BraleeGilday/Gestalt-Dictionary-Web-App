import ScriptItem from "./ScriptItem";

function ScriptCollection({scripts}) {
    return (
        <>
            {scripts.map((script, index) => <ScriptItem script={script} key={index}/>)}
        </>
    )
}

export default ScriptCollection;