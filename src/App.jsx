
import './App.css'
import { useEffect, useState } from "react";
import { verifyUser } from '../APIs/auth'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

import GestaltDictionary from './pages/GestaltDictionary'
import LearnMore from './pages/LearnMore'
import Help from './pages/Help'
import AddScript from './pages/AddScript'
import Login from './pages/Login'
import EditScript from './pages/EditScript';

function App() {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user_id");
    return savedUser ? { user_id: savedUser } : null;
});

  const [loading, setLoading] = useState(true);

  const [scriptToEdit, setScriptToEdit] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const userData = await verifyUser();

      if (userData) {
        setUser(userData);
      } else {
        setUser(null)
      }
      
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="app">
      <Router>
        <main>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dictionary" /> : <Login/>}></Route>
          <Route path="/dictionary" element={ <GestaltDictionary setScriptToEdit={setScriptToEdit}/> }></Route>
          <Route path="/help" element={<Help/>}></Route>
          <Route path="/learn" element={<LearnMore/>}></Route>
          <Route path="/add" element={<AddScript/>}></Route>
          <Route path="/edit" element={<EditScript scriptToEdit={scriptToEdit}/>}></Route>
        </Routes>
        </main>

        <footer>
        </footer>
      </Router>
    </div>
  )
}

export default App
