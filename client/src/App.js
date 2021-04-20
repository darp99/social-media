import React, { useEffect, createContext ,useReducer, useContext} from 'react';
import NavBar from './components/Navbar';

import "./App.css";
import { BrowserRouter, Route,Switch,useHistory } from 'react-router-dom';


import Home from "./components/screens/Home"
import Signin from "./components/screens/Login"
import Profile from "./components/screens/Profile"
import Singup from "./components/screens/Singup"
import CreatPost from "./components/screens/Creatpost"
import {initialState, reducer} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'

 export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state,dispatch} =useContext(UserContext)
  useEffect(()=>{
  const user = JSON.parse(localStorage.getItem("user"))
  if(user){
dispatch({type:"USER",payload:user}) 
 }else{
    history.push('/signin')

  }
  },[])
  return (
    <Switch>
      < Route exact path="/" >
        <Home />
      </Route >
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/singup">
        <Singup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/creat">
        <CreatPost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
    </Switch>

  )
}

function App() {

const [state,dispatch]= useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
<Routing />
    </BrowserRouter>
</UserContext.Provider>
  );
}

export default App;
