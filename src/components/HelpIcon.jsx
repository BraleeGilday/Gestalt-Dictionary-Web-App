import { IoIosHelpCircle } from "react-icons/io";
import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

function HelpIcon() {
    return (
        <>
            <Link to="/help" data-tooltip-id="help" data-tooltip-place="bottom">
                <IoIosHelpCircle size={20}/>
            </Link>

            <Tooltip id="help" className="tooltipText">
            Help Page
            </Tooltip>
        </>
    )
}

export default HelpIcon;