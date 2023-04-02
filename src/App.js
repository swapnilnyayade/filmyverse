import Cards from "./components/Cards";
import Header from "./components/Header";
import AddMovie from "./components/AddMovie";
import { Route, Routes } from "react-router-dom";
import Detail from "./components/Detail";
import { createContext, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateComp from "./components/PrivateComp";
import UpdateMovie from "./components/UpdateMovie";
import UserReview from "./components/UserReview";
import Profile from "./components/Profile";

const Appstate = createContext();

function App() {
  // const [login, setLogin] = useState(false)
  // const [userName, setUserName] = useState("")

  return (
    // <Appstate.Provider value={{login, userName, setLogin, setUserName}}>
    <div className="App relative">
      <Header/>
      <Routes>
        <Route path="/" element={<Cards/>} />

        
        <Route element={<PrivateComp/>}>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/addmovie" element={<AddMovie/>} />
        <Route path="/updatemovie/:id" element={<UpdateMovie/>} />
        <Route path="/userReview/:cmtid" element={<UserReview/>} />
        </Route>
       

        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
      </Routes>
    </div>
    // </Appstate.Provider>
  );
}

export default App;
export {Appstate}