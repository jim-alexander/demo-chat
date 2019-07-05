import React, { Component } from "react";
import moment from "moment";

import "./Styles/Messages.css";

export default class Messages extends Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    return (
      <div id="msgsContainer">
        {this.props.messages.map((msg, index) => (
          <div className="message" key={index}>
            {this.props.me === msg ? (
              <div className="me" onMouseOver={() => console.log(msg)}>
                {msg}
              </div>
            ) : (
              <div>
                <div className="you">{msg}</div>
                {/* <div className="youUid">
                  {`${msg.from} | ${moment(msg.time).fromNow()}`}
                </div> */}
              </div>
            )}
          </div>
        ))}
        <div
          style={{ float: "left", clear: "both", padding: 5 }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  }
}
