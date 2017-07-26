import React, { Component } from 'react';
import './index.css';
import moment from 'moment';
import Parser from './parser.js';


class App extends Component {
  constructor(){
    super();
    this.state = {
      messages : [],
      // parser : new Parser(),
      _id : "User",
      waitingForAffirmative : false
    };
  }
  checkInput(e){
    if(e.key === "Enter"){
      /* Get input element and current message list */
      let input = document.getElementById("request");
      let messagesList = this.state.messages;
      let parser = new Parser();
      /* Add new message to the list and clear message input*/
      messagesList.push({
        _id: "User",
        text : input.value
      });

      /* Update state with new user message and show it on screen */
      this.setState({
        messages : messagesList
      }, ()=>{
        /* In callback, parse message and add it as message from Tadu */
        let protoTask = parser.parse(input.value);

        let taskMessage = <div>
          Does this look right? <br/> 
          Title: {protoTask.what} <br/>
          Date: {moment(protoTask.year + "-" +  protoTask.month + "-" +  protoTask.day, "YYYY-MM-DD").format("M/DD/YY") }<br/>
          Time: {moment(protoTask.hour + ":" +  protoTask.minute, "HH:mm").format("h:mm a")} </div>
        messagesList.push({
          _id: "Tadu",
          text : taskMessage
        })
        input.value = "";
        /* Update state again to show new message */
        this.setState({
          messages : messagesList
        });
      });
    }
  }

  render() {
    return(
      <div className="wrapper">
      <div id="message-wrapper"> 
      {this.state.messages.map((msg)=>{
        return (
          <div className="message" key={Math.random()}>
          <div className={msg._id === this.state._id ? "message msg-req" : "message msg-res"}>
          {msg.text}
          </div>
          </div>
          )
      })}
      </div>
      <input onKeyPress={this.checkInput.bind(this)} type="text" id="request" />
      </div>
      )
  }
}

export default App;
