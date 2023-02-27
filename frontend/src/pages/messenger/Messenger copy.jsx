import React, { useContext, useEffect, useState, useRef } from "react";
import "./messenger.css";

import { io } from "socket.io-client";

import Conversations from "components/conversations/Conversations";
import ChatOnline from "components/chatOnline/ChatOnline";
import Topbar from "components/topbar/Topbar";
import Message from "components/message/Message";
import { AuthContext } from "context/AuthContext";
import axios from "axios";

export default function Messenger() {
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState("");
  const [newMessages, setNewMessages] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();

  //////////////////////////////////////////  socket.io ///////////////////////////////////////

  // connect to socket server
  useEffect(() => {
    socket.current = io("ws://localhost:8090");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        updatedAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    // only update messages when current chat is from sender
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // send userId to server
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("users", (users) => {
      // console.log("users from socket.io :", users);
      setOnlineUsers(
        // check current login user's followings, who is online
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user, socket]);

  /////////////////////////////////////  get conversation by userId /////////////////////////////
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/conversations/" + user._id
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  /////////////////////////////////////  get messege by convId /////////////////////////////
  useEffect(() => {
    const getMsgs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMsgs();
  }, [currentChat]);

  /////////////////////////////////////  post new message /////////////////////////////
  const postMsg = async (e) => {
    e.preventDefault();
    const msg = {
      sender: user._id,
      text: newMessages,
      conversationId: currentChat._id,
    };
    // send new msg to socket.io
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: currentChat.members.find((member) => member !== user._id),
      text: newMessages,
    });
    // save new msg to database
    try {
      const res = await axios.post("http://localhost:8080/api/messages", msg);
      // add new msg to current chat view
      setMessages([...messages, res.data]);
      // clear send box
      setNewMessages("");
    } catch (err) {
      console.log(err);
    }
  };

  /////////////////////////////////////  scroll to new msg /////////////////////////////
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /////////////////////////////////////////////////////// UI ///////////////////////////////////////
  return (
    <>
      <Topbar />
      <div className="messenger">
        {/* ////////////////////////////////////////   UI left   //////////////////////////////////*/}
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for firends"
              className="chatMenuInput"
            />
            {conversations.map((conv) => (
              <div key={conv._id} onClick={() => setCurrentChat(conv)}>
                <Conversations conv={conv} currentUser={user} />
              </div>
            ))}
          </div>
        </div>

        {/* ////////////////////////////////////////   UI Mid   //////////////////////////////////*/}
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((msg) => (
                    <div ref={scrollRef}>
                      <Message
                        msg={msg}
                        key={msg._id}
                        own={msg.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="Send a message"
                    className="chatMessageInput"
                    onChange={(e) => setNewMessages(e.target.value)}
                    value={newMessages}
                  ></textarea>
                  <botton onClick={postMsg} className="chatSubmitButton">
                    send
                  </botton>
                </div>
              </>
            ) : (
              <span className="noConversationText">Open a chat</span>
            )}
          </div>
        </div>

        {/* ////////////////////////////////////////   UI Right   //////////////////////////////////*/}
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentUserId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
