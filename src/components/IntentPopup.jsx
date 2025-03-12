import { IoIosCloseCircle } from "react-icons/io";

function IntentPopup({ closePopup }) {
    return (
        <div className="intent-popup-container">
            <IoIosCloseCircle 
                className="close-popup-button"
                onClick={closePopup}
                size={30}
            />

            <div className="popupHeader">
                <h2>Communication Intents</h2>
            </div>

            <div className="popup-content">
                <p><b>Your child’s script is rarely literal, but it is still a key way they communicate.</b></p>
                <p> As observers, it’s important not to jump to conclusions about a child’s gestalt. 
                    Only select a Communication Intent from the dropdown if the meaning is clear, 
                    which is often not the case in the first few uses. Intent becomes more apparent 
                    after repeated observation and understanding the emotional states or contexts in 
                    which your child uses the script.
                </p>

                <p>
                    Once the intent is clear, it can be helpful to track, as this information supports 
                    the goal of building a variety of gestalts for different contexts.
                </p>
                <p>
                    If you’re unsure, simply save the form without selecting an intent. You can always come back later to edit this entry.
                </p>

                <p>
                    To learn more about the eight categories of Communication Intent and see examples, 
                    save this form and visit the Learn More page.
                </p>
            </div>
        </div>

    )
}

export default IntentPopup;