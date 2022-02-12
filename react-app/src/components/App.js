import React,{components} from "react"
import { render } from "react-dom";
import Login from "./login";
import Message from "./Message";
import { BrowserRouter as Router, Route, Switch,useParams,Routes } from "react-router-dom";

export default function App(){


    return(
        
        <div className="main">
            <Router>
                <Routes>
                    <Route path=''  element={<Login/>}/>
                    <Route path="/chat" element={<Message/>}/>
                </Routes>
                
                
            </Router>        
                

            
            

        </div>

    
    

    )
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
