import { useState } from 'react'
import popUp from '../assets/popUp.png'
import { Tooltip } from 'react-tooltip'
import IntentPopup from './IntentPopup'

function PopupIcon() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const openPopup = () => {
        setIsPopupVisible(true);
    };

    return (
        <div>
            <img 
                className="popupIcon" 
                src={popUp} 
                data-tooltip-id="popup" 
                alt="question mark with mouse pointer" 
                onClick={openPopup}
            />

            <Tooltip id="popup" className="tooltipText">
            More Info
            </Tooltip>

            {
            /* This is conditional rendering. 
            The IntentPopup component will only be rendered 
            when isPopupVisible is true. */
            }
            {isPopupVisible && <IntentPopup closePopup={() => setIsPopupVisible(false)} />}
        </div>
    )
}

export default PopupIcon;



