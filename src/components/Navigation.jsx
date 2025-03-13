import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { logoutUser } from '../../APIs/auth';
import ConfirmLogout from '../components/ConfirmLogout';

function Navigation() {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = async () => {
        const result = await logoutUser();
        if (result.message) {
            navigate("/");
        } else {
            console.error("Logout failed:", result.error);
        }
    };

    return (
        <nav className="navBar">
            <Link to="/dictionary" className='link'>My Dictionary</Link>
            <Link to="/help" className='link'>Help</Link>
            <Link to="/learn" className='link'>Learn More</Link>
            <button className="logout-button" onClick={() => setShowLogoutModal(true)}>Logout</button>

            {/* Logout Confirmation Modal */}
            <ConfirmLogout 
                showModal={showLogoutModal}
                handleClose={() => setShowLogoutModal(false)}
                onLogout={handleLogout}
            />
        </nav>
    );
}

export default Navigation;
