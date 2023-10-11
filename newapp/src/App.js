import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
  //const [socket, setSocket] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [messagesDB, setMessagesDB] = useState([]);


  const socket = io('http://localhost:7000/');

  //setSocket(newSocket);

  // newSocket.emit("room", ""); // Replace "your_room_name" with the desired room name

  useEffect(() => {
    socket.on("public_channel", (data) => {
      console.log(data);
      // Update the messages state when a new message is received
      setMessagesDB((prevMessages) => [...prevMessages, data]);
    });
  }, []);


  // return () => {
  //   newSocket.disconnect();
  // };

  const handleSendMessage = () => {

    // Emit the message to the server
    socket.emit("public_channel", { message: messageInput });
    // Clear the message input field
    setMessageInput('');

  };

  const displayText = () => {
    return messagesDB.map((message, index) => (
      <div key={index} className="message">
        {message.message}
      </div>
    ));
  }

  return (
    <div className="App">
      <div className="message-container">
        <h1>Chat Application</h1>
        <div className="message-box">

          {console.log(messagesDB)}
          {messagesDB.map((message, index) => (
            <div key={index} className="message">
              {message.message.message} {/* Access the nested message property */}
            </div>
          ))}



        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Type your message..."
            className="message-input"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={handleSendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;