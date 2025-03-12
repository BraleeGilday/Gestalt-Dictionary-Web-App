
function AreYouSure({ onCancel, onConfirm }) {
    return (
        <div className="confirmationWindow">
            <div className="confirmation-text">
                <p>You have unsaved changes.</p>

                <p>Are you sure you <br></br>want to cancel without saving? </p>
            </div>
            <div className="confirmationButtons">
                <button onClick={onConfirm}>Yes, cancel</button>
                <button onClick={onCancel}>No, go back</button>
            </div>
        </div>
    )
}
export default AreYouSure;



