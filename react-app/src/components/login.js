import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom"

import Cookies from "js-cookie";
import axios from "axios";


export  default function Login(){
    const api='http://127.0.0.1:8000'
    const [login,setLogin]=useState()
    const [err,setErr]=useState(false)
    const [succ,setSucc]=useState(false)
    const navigate = useNavigate()
    console.log(login)
    const handleChange=(event)=>{
        setLogin({
            ...login,
            [event.target.name]:event.target.value
        })}
        
        const handleSubmit=async(event)=>{
            event.preventDefault()
            console.log('inside handel')
            let config_url={
                url:`${api}/login/`,
                method:'post',
                data:JSON.stringify({
                    
                    "username":login.username,
                    "password":login.password
                    
                }),
                
                headers:{
                    "X-CSRFToken":Cookies.get('csrftoken'),
                    "Accept":"application/json",
                    "Content-Type":"application/json",
    
                }
            }
            axios(config_url)
            .then((response)=>{
                if (response.data.status_code===403){
                    setErr(true)
                    setSucc(false)
                }
                else{
                    setErr(false)
                    setSucc(true)
                    navigate('/chat')
                }
            })
            
            
                    
           
            
        }
    return(
        <div className="container">
            <form method="post" onSubmit={handleSubmit}>
                {err==true && <p style={{color:'red'}}> You are not a user please add it in django admin</p>}

                <div className="form-group">
                    <label for="username">Username</label>
                    <input name="username" required onChange={handleChange} type="text" className="form-control" id="username" placeholder="Username"/>
                </div>
                            
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input name="password" required onChange={handleChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>

    );

}