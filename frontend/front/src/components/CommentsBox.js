import "./Commentcss/Comments.css";
import { useKomentarContext } from "../Context";
import {useOpenReply} from './Message';
import axios from "axios";
import { useContext } from "react";
import { Store1 } from "../Store";
import { useNavigate, useParams } from "react-router-dom";
const { useRef, useState } = require("react");

function CommentsBox(props)
{
    const {setMessageUpdate,setMessageReset}=useKomentarContext();
    const changeOpenReply=useOpenReply();
    const message=useRef(null);
    const navigate=useNavigate();
    const [showCommentLine,setCommentLine]=useState(false);
    const[showButton,setShowButtons]=useState(false);
    const[enableBtn,setEnableBtn]=useState(false);

    const{state}=useContext(Store1);
    const {userInfo}=state
    
const params=useParams();
    const { id } = params;
   

    const commentFocus=()=>{
        setCommentLine(true);
        setShowButtons(true);

    }
    const commentFocusOut=()=>
    {
        setCommentLine(false);
      
    }

    const commentStroke=event=>
    {
        let trenutna=event.target.value;
        if(trenutna)
        {
            console.log("eo me");
            setEnableBtn(false);
        }
        else{
            setEnableBtn(true);
        }
    }
const sendComment=async (event)=>{
    if(userInfo){
    event.preventDefault();
    const {data}=await axios.post(`http://localhost:3000/api/v1/comments/reply/${props.useKey}`,
    {
      comment:message.current.value
    },
     {
         headers: { Authorization: `Bearer ${userInfo.token}`}
     }
    );//props.useKey,message.current.value//user creates a new comment from sub box
    console.log(data);
   setMessageReset((prevState)=>!prevState);
   // setMessageUpdate([1,props.useKey]);
    message.current.value='';
    setEnableBtn(false);
    }
    else navigate('http://localhost:3000/login');
}


    return userInfo &&(
        <form>
            <section className="commentBox">
                <input
                autoFocus={props.autoFocus}
                type="text"
                placeholder="Odgovorite..."
                ref={message}
                onFocus={commentFocus}
                onBlur={commentFocusOut}
                onkeyUp={commentStroke}

              / > 
                {showCommentLine && <div className="commentLine"></div>}
            </section>
            {showButton && (
                <>
                <button className="commentButton sendButton" disabled={enableBtn} onClick={sendComment}>COMMENT</button>
                <button className="commentButton " style={{color:"gray",backgroundColor:"transparent"}}
                onClick={()=>{
                   setShowButtons(false);
                    message.current.value = '';
                
                  
                    }}>
                        CANCEL
                        </button>
                
                </>
            )}
        </form>
    );

}
export default CommentsBox;