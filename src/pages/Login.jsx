import { useState } from 'react';
import { registerUser, loginUser } from '../../APIs/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const HandleLogin = async (e) => {
        e.preventDefault()
        const result = await loginUser(username, password)

        if (result.access_token) {
            // Ensure localStorage is updated before navigating
            localStorage.setItem("token", result.access_token);         // ?
            localStorage.setItem("user_id", result.user_id);            // ?
            navigate("/dictionary")
        } else {
            alert("Sorry! We failed to log you in. Error: " + result.error)
        }
    }

    const HandleRegister = async (e) => {
        e.preventDefault()
        const result = await registerUser(username, password)

        if (result.access_token) {
            localStorage.setItem("token", result.access_token);
            localStorage.setItem("user_id", result.user_id);
            navigate("/dictionary"); 
        } else {
            alert("Sorry! Registration failed. Error: " + result.error);
        }
    }


return (
<div className="container">
    <h1>Welcome to Gestalt Dictionary!</h1>
    <h2>Login or Register</h2>
    <form id="auth-form" action="{{url_for('login')}}" method="post">
        <input 
            type="text" 
            // name="username" 
            placeholder="Username" 
            className="input-field"
            onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
            type="password" 
            // name="password" 
            placeholder="Password"
            className="input-field"
            onChange={(e) => setPassword(e.target.value)} 
        />

        <div className='loginButtons'>
            <button onClick={HandleLogin}>Login</button>

            <button onClick={HandleRegister}>Register</button>
        </ div>
    </form>
</div>
)

}

export default Login