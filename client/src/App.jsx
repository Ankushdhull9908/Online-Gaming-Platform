import "./App.css";
import Navbar from "./components/Navbar";
import {Routes,Route} from 'react-router-dom'
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import PlayerDashboard from './pages/dashboard/PlayerDashboard'
import LoadGame from "./pages/game/LoadGame";
import Themes from "./pages/themes/Themes";
import Shop from "./pages/shop/Shop";

function App() {

  return (

    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<PlayerDashboard/>}/>
      <Route path="/loadgame/:id" element={<LoadGame/>}/>
      <Route path="/themes" element={<Themes/>}/>
      <Route path="/shop" element={<Shop/>}/>
    
    </Routes>
    
    </>

  );

}

export default App;