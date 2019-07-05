import React, { Component } from "react";

import "./Styles/People.css";

export default class People extends Component {
  state = {
    people: [
      "Jim Alexander",
      "Susan Carr",
      "Jo Walker",
      "Ross Alexander",
      "Paul Dizzuzu"
    ]
  };
  userColor = input => {
    if (input === "Jim Alexander") {
      return "#16a085";
    } else if (input === "Susan Carr") {
      return "#9b59b6";
    } else if (input === "Jo Walker") {
      return "#f1c40f";
    } else if (input === "Ross Alexander") {
      return "#e74c3c";
    } else if (input === "Paul Dizzuzu") {
      return "#3498db";
    }
  };
  render() {
    return (
      <div id="peopleContainer">
        <div id="peopleTitle">Members</div>
        {this.state.people.map((user, i) => (
          <div
            key={i}
            className="user"
            style={{
              borderColor: `${this.userColor(user)}`,
              background: `${this.userColor(user)}1A`
            }}>
            {user}
          </div>
        ))}
      </div>
    );
  }
}
