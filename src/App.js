import { Button, FormControl, Input, InputLabel,IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./App.css";
import Message from "./Message";
import db from './firebase'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send';

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUserName] = useState("");
  let [escaped,setEscaped] = useState(0);

  const sendMessage = (e) => {
    e.preventDefault();

    if(input.trim().length === 0){
       Swal.fire({
         title:'Can\'t send an empty message!',
         icon:'warning'
       })
       return ;
    }

    db.collection('messages').add({
      username:username,
      message:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput("");
  };

  useEffect(()=>{
     db.collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>{
            
          setMessages(snapshot.docs.map(doc=>(
              {
                id:doc.id,
                data:doc.data()
              }
          )
     
        )
      ) 
     
  })
  
},[])

  useEffect(() => {
    getUserName();
  }, []);
  
  
  
  async function getUserName() {

    setEscaped(escaped++);

    let messageInput = 'Enter Your Username';

    if(escaped===0 || escaped===1){
       messageInput= 'Enter Your Username'
    }
    else if(escaped===2){
       messageInput= 'Sorry but you have to enter your username!'
    }
    else if(escaped>2 && escaped<=10) {
         messageInput = 'NO ESCAPE FROM THIS HELL UNLESS YOU ENTER YOUR USERNAME!'
    }
    else{
       messageInput = 'JUST GIVE UP ALREADY AND STOP WASTING YOUR TIME AND ENTER A USERNAME!'
    }
    
    const { value: userNameEntered } = await Swal.fire({
      title: messageInput,
      input: "text",
      inputValue: '',
      showCancelButton: false,
      inputValidator: (value) => {
        if (!value) {
          return "You did not enter a UserName!";
        }
      },
    });
    if (userNameEntered) {

       setUserName(userNameEntered);
       
       }
       
     
    
    if (!userNameEntered) {
      getUserName();
    }
  }

  return (
    <div className="App">
     <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt=""/>

      <h1>Messenger clone app</h1>
      <h2>Hello {username}</h2>

      <form onSubmit={sendMessage} className="app__form">
        <FormControl className="app__formControl">
          <InputLabel>Enter a message . . .</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Enter a message...'
          className="app__formInput" />
         <IconButton  
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
          className="app__iconButton"
          >
            <SendIcon />
         </IconButton>
        </FormControl>
        





        
      </form>
     <FlipMove>

      {messages.map(({data:message,id},index) => (
        <Message key={id} message={message} username={username} id={id} />
      ))}

     </FlipMove>
      
    </div>
  );

 }
export default App;
