import React, { Component } from "react";
import { IoIosContacts, IoMdAdd } from "react-icons/io";

import "./Styles/Conversations.css";

export default class Conversations extends Component {
  state = {
    convos: ["Accounts", "Office"],
    current: "Office"
  };
  render() {
    return (
      <div id="conversations">
        <div className="convo">
          <div className="convoIcon">
            <IoMdAdd size={60} color="#95a5a6" />
          </div>
          <div>Create New</div>
        </div>
        {this.state.convos.map((convo, i) => (
          <div
            key={i}
            className="convo"
            style={{
              borderBottom:
                this.state.current === convo ? "3px solid #16a085" : null,
              background: this.state.current === convo ? "#16a0851a" : null
            }}
            onClick={() => this.setState({ current: convo })}>
            <div className="convoIcon">
              <IoIosContacts size={60} color="#95a5a6" />
            </div>
            <div>{convo}</div>
          </div>
        ))}
      </div>
    );
  }
}
