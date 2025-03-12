import { Link } from 'react-router-dom'

function AddButton() {
    return (
        <Link to="/add" className="button addButton">Add New Script</Link>
    )
}

export default AddButton;