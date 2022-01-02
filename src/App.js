import { useContext } from "react";
import {
  BrowserRouter as Router,

  Route,
  Routes
} from "react-router-dom";

import './components/topbar/TopBar'
import TopBar from './components/topbar/TopBar';
import { Context } from "./context/Context";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Settings from './pages/settings/Settings';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Update from './pages/update/Update'

function App() {

 const {user}= useContext(Context);
 //const user=true;
  return (
    <Router>
      <TopBar />

      <Routes>
        <Route exact path="/" element={<Home />} />
    
        {user ?   <Route exact path="/login"    element={<Home />} /> : <Route exact path="/login"    element={<Login/>}    />}

        {user ?   <Route exact path="/register" element={<Home />} /> : <Route exact path="/register" element={<Register/>} />}

        {user ?   <Route exact path="/write" element={<Write />} /> : <Route exact path="/write" element={<Register/>} />}  

        {user ?   <Route exact path="/update/:id" element={<Update />} /> : <Route exact path="/write" element={<Register/>} />} 

        {user ?   <Route exact path="/settings" element={<Settings />} /> :  <Route exact path="/settings" element={<Register />} /> }
      
        <Route exact path="/post/:postId" element={<Single />} />

      </Routes>


    </Router>


  );
}

export default App;
