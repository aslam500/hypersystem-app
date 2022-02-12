import React,{useEffect, useState} from "react"
import "../style/main.css"
import Moment from 'react-moment';
import Cookies from "js-cookie"
import axios from "axios";
import Modal from "./Modal";
export default function Message(){
  const [data,setData]=useState([])
  const [user,setUser]=useState([])
  const [id,setId]=useState(false)
  const [num,setNum]=useState()
  const [modal,setModal]=useState(false)
  const [userId,setUserId]=useState()
  console.log(user)
  const api ='http://127.0.0.1:8000'
  const [message,setMessage]=useState()
  useEffect(()=>{
    fetch(`${api}/chat/get-all/`)
    .then(res=>res.json())
    .then(value=>setUser(value))
    .catch(err=>console.log(err))
  },[])
  const handleClick=(id)=>{
    setId(true)
    setNum(id)
  }
  useEffect(()=>{
    fetch(`${api}/chat/list-messages/${num}/`)
    .then(data=>data.json())
    .then(value=>setData(value))
    .catch(err=>console.log(err))
    setId(false)

  },[id])
  const handleMessageChange=(event)=>{
    
  
    setMessage({
      ...message,
      [event.target.name]:event.target.value
    })

  }
  const handleMessageSubmit=async(event)=>{
    event.preventDefault()

    let config_url={
        url:`${api}/chat/send-message/`,
        method:'post',
        data:JSON.stringify({
            
            "message":message.message,
            "reciver":data[0].reciver
            
        }),
        
        headers:{
            "X-CSRFToken":Cookies.get('csrftoken'),
            "Accept":"application/json",
            "Content-Type":"application/json",

        }
        
    }
    if(data!==null){
      axios(config_url)
      
    }
   

  }
  const listhandle=async(user,message)=>{
    console.log(message)
    setUserId(user)
    let config_url={
        url:`${api}/chat/forward-message/`,
        method:'post',
        data:JSON.stringify({
            
            "message":message,
            "to":user
            
        }),
        
        headers:{
            "X-CSRFToken":Cookies.get('csrftoken'),
            "Accept":"application/json",
            "Content-Type":"application/json",

        }
        
    }
    axios(config_url)
    .then(setModal(false))
  }
  console.log(userId)
    return(
        <div class="container">
<h3 class=" text-center">Messaging</h3>
<div class="messaging">
      <div class="inbox_msg">
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>Recent</h4>
            </div>
            <div class="srch_bar">
              <div class="stylish-input-group">
                <input type="text" class="search-bar"  placeholder="Search"/ >
                <span class="input-group-addon">
                <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                </span> </div>
            </div>
          </div>
          <div class="inbox_chat">
            {user && user.map(value=>{
              return(
                <div class="chat_list" style={{cursor:'pointer'}} onClick={()=>handleClick(value.id)}>
              <div class="chat_people">
                <div class="chat_ib">
                  <h5>{value.employee_name}</h5>
                </div>
              </div>
            </div>
              )
            })}
            
          </div>
        </div>
        <div class="mesgs">
        <div class="msg_history">
          {data && data.map(value=>{
            return(
              
              <><div class="incoming_msg">
                <div class="received_msg">
                  <div class="received_withd_msg">
                    <p>{value.message}</p>
                    <span class="time_date"><Moment date={value.date}/></span>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" style={{cursor:'pointer'}} onDoubleClick={()=>setModal(false)}  onClick={()=>setModal(true)}  width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                      </svg>
                      {modal==true && 
                      <div>
                        <ul className="list-group" style={{backgroundColor:'gray'}} >
                          {user.map(ss=>{
                            return(
                              <li className="list-group-item"  id={ss.id} onClick={()=>listhandle(ss.id,value.message)}>{ss.employee_name}</li>
                            )
                          })}
                        </ul>
                      </div>
                    }
                    </div>
                    </div>
                </div>
              </div>
              <div class="outgoing_msg">
                
                <div class="sent_msg">
                  <p>{value.message}</p>
                  <span class="time_date"><Moment date={value.date}/></span> 
                  <div >
                    <svg xmlns="http://www.w3.org/2000/svg" style={{cursor:'pointer'}} onDoubleClick={()=>setModal(false)}  onClick={()=>setModal(true)} width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                      <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                    </svg>
                    {modal==true && 
                      <div>
                        <ul className="list-group" style={{backgroundColor:'gray'}}>
                          {user.map(ss=>{
                            return(
                              <li className="list-group-item"  id={ss.id} onClick={()=>listhandle(ss.id,value.message)}>{ss.employee_name}</li>
                            )
                          })}
                        </ul>
                      </div>
                    }
                  </div>
                  </div>
              </div></>
            
          

            )
          })}
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <form method="post" onSubmit={handleMessageSubmit}>
              <input type="text" name="message" required onChange={handleMessageChange} class="write_msg" placeholder="Type a message" />
              <button class="msg_send_btn" type="submit"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      
    </div></div>
    )
}