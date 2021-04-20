import React,{useContext} from 'react';
import { Link ,useHistory} from 'react-router-dom';
import {UserContext} from '../App'

const NavBar = () =>{

const {state,dispatch} = useContext(UserContext)
const history = useHistory()
const renderList = ()=>{
  if(state){
  return[
    <li><Link to="/profile">PROFILE</Link></li>,
    <li><Link to="/creat">CreatPost</Link></li>,
    <li>
  <button className="btn #c62828 red darken-3"

onClick={() => {
  localStorage.clear()
  dispatch({type:"CLEAR"})
  history.push('/signin')
}}
>
Logout
</button>


    </li>


  ]
  }else{
return[
<li><Link to="/signin">LOGIN</Link></li>,
      <li><Link to="/singup">SINGUP</Link></li>
]
  }
}

  return(       
        <nav>
  <div className="nav-wrapper white">
    <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
    <ul id="nav-mobile" className="right">
      {renderList()}

    </ul>
  </div>
</nav>
    )
}

export default NavBar