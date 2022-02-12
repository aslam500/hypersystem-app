import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
export default function Logout(){
    

    const handleLogout=()=>{
        const api ='http://127.0.0.1:8000'
        let config_url={
            url:`${api}/chat/signout/`,
            method:'post',
            headers:{
                "X-CSRFToken":Cookies.get('csrftoken'),
                "Accept":"application/json",
                "Content-Type":"application/json",
    
            }
            
        }
        console.log('clicked')
        axios(config_url)
        .then(res=>res.data)
        window.location.replace('/')
    }
    return(
        <div>
            <h1 style={{color:'blue',cursor:'pointer'}} onClick={handleLogout}>Logout</h1>
        </div>
    )
}