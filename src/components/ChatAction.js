import React, { Component } from 'react'
import { IoIosAttach } from "react-icons/io";

import bs from './bs'

export default class ChatAction extends Component {
  state = {
    message: ''
  }
  sendIt = () => {
    if(this.state.message){
      this.props.sendMessage(this.state.message); 
      this.setState({message: ''})
    }
  }
  render() {
    return (
      <div id='chatAction'>
        <input type="text" id='msgInput' 
        placeholder={ bs[Math.floor(Math.random() * 7)]}
        value={this.state.message} 
        onChange={ (val) => this.setState({message: val.target.value})}
        onKeyDown={(e) => e.key === 'Enter' ? this.sendIt() : null }
        />
        <div id='attachment' 
          onClick={() => this.sendIt()} ><IoIosAttach /></div>
        <div id='sendBtn' 
          onClick={() => this.sendIt()}>
          Send
        </div>
      </div>
    )
  }
}
