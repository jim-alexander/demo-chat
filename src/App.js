import React, { Component } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client'

import ChatAction from './components/ChatAction'
import Messages from './components/Messages'

import uid from 'uid'
import moment from 'moment'

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
    this.setState({uid: uid(10)})
    this.socket.on('change color', (col) => {
      document.body.style.backgroundColor = col
    })
    this.socket.on('new_msg', msg => {
      let messages = this.state.messages
      messages.push(msg)
      this.setState({messages}); 
    })
  }
  sendMessage = (msg) => {
    this.socket.emit('new_msg', {
      from: this.state.uid, 
      content: msg,
      time: moment()
    })
  }
  render() {
    

    return (
      <div className="App">
        <div className="mainContainer">
          <Messages messages={this.state.messages} me={this.state.uid}/>
          <ChatAction sendMessage={this.sendMessage} />
          <div id='uid'>{this.state.uid}</div>

        </div>
      </div>
    );
  }
}

export default App;
