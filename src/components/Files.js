import React, { Component } from "react";

import { IoMdToday } from "react-icons/io";

import "./Styles/Files.css";

export default class Files extends Component {
  state = {
    files: ["resume.pdf", "OHS.doc", "Meeting Minutes.PDF"]
  };
  fileType = input => {
    let name = input.toUpperCase();
    if (name.includes("PDF")) {
      return "#e74c3c";
    } else if (name.includes("DOC")) {
      return "#3498db";
    }
  };
  render() {
    return (
      <div id="filesContainer">
        <div id="filesTitle">Recent Files</div>

        {this.state.files.map((file, i) => (
          <div key={i} className="file">
            <div className="fileType">
              <IoMdToday size={50} color="#95a5a6" />
            </div>
            <div>{file}</div>
          </div>
        ))}
      </div>
    );
  }
}
