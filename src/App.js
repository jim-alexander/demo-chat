import React, { Component } from "react";
import socketIOClient from "socket.io-client";

import Conversations from "./components/Conversations";
import ChatAction from "./components/ChatAction";
import Messages from "./components/Messages";
import People from "./components/People";
import Files from "./components/Files";

import uid from "uid";
import moment from "moment";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "192.168.16.28:2222",
      counter: 0,
      uid: null,
      messages: []
    };
    this.socket = socketIOClient(this.state.endpoint);
  }
  componentDidMount = () => {
    let myId = uid(10);
    this.socket.emit("user_connect", 1);
    this.setState({ uid: myId });
    this.socket.on("change color", col => {
      document.body.style.backgroundColor = col;
    });
    this.socket.on("new_msg", msg => {
      let messages = this.state.messages;
      messages.push(msg);
      this.setState({ messages });
    });
    this.socket.on("conversations", items => {
      console.log(items);
    });
  };
  componentWillUnmount() {
    this.socket.emit("user_disconnect", this.state.uid);
  }
  sendMessage = msg => {
    this.socket.emit("new_msg", msg);
  };
  render() {
    return (
      <div className="App">
        <Conversations />
        <div className="mainContainer">
          <People />
          <div>
            <Messages messages={this.state.messages} me={this.state.uid} />
            <ChatAction sendMessage={this.sendMessage} />
            <div id="uid">{this.state.uid}</div>
          </div>
          <Files />
        </div>
      </div>
    );
  }
}

export default App;
