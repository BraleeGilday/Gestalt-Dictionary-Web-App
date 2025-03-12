import {Link, useNavigate} from 'react-router-dom'
import { logoutUser } from '../../APIs/auth';

function Navigation() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await logoutUser();

        if (result.message) {
            alert("Logged out successfully");
            navigate("/");          // could change to /login if time
        } else("Logout failed: " + result.error)

    };
  
    return (
        <nav className="navBar">
            <Link to="/dictionary" className='link'>My Dictionary</Link>
            <Link to="/help" className='link'>Help</Link>
            <Link to="/learn" className='link'>Learn More</Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default Navigation;