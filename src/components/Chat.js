
import React from 'react';
import { Route, Link, BrowserRouter } from "react-router-dom";
import io from 'socket.io-client';
import {App} from './index.js';
import ChatBox from './Chat_Box';
import {Bottom} from './Bottom';
import '../index.scss';


//connecting to the server
const socket = io("https://spotim-demo-chat-server.herokuapp.com");
socket.on("connect", function() {
  console.log("connected to chat server!");
});
socket.on("disconnect", function() {
  console.log("disconnected from chat server!");
});


class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message_list: [],
      message: '',
      history: [],
      user: this.props.username,
      num_of_msg: 0,
    };

    this.updateMsg = this.updateMsg.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.clearChat = this.clearChat.bind(this);
    this.restoreHistory = this.restoreHistory.bind(this);
  }

  // listens to the socket for messages
  componentDidMount() {
    socket.on("spotim/chat", (message) => this.setState(
      {
        message_list: this.state.message_list.concat([message]),
        message: this.state.message,
        history: this.state.history,
        user: this.state.user,
      }
    ));
  }

  // sends a message to the server
  sendMessage() {
    if(this.state.message.valueOf() !== ''){
      let message = this.state.message;
      this.setState({
        message_list: this.state.message_list,
        message: '',
        history: this.state.history,
        user: this.state.user,
        num_of_msg: this.state.num_of_msg + 1,
      });
      socket.emit("spotim/chat", {avatar:"",
                                  username: this.state.user,
                                  text: message,
                                  key: this.state.num_of_msg});
    }
  }

  // this function is called when the user press enter so send his message
  onEnter(event) {
    if(event.keyCode === 13){
      this.sendMessage();
    }
  }

  // updates the message in state as the user writes a message
  updateMsg(event) {
    this.setState({
      message_list: this.state.message_list,
      message: event.target.value,
    });
  }

  // clears all the messages from screen and updates history
  clearChat() {
    const msg_list = this.state.message_list;
    this.setState({
      message_list: [],
      message: '',
      history: this.state.history.concat(msg_list),
    });
  }

  // restores message history and displays the messages on screen
  restoreHistory() {
    this.setState({
      message_list: this.state.history.concat(this.state.message_list),
      message: this.state.message,
      history: [],
    });
  }

  render() {

    return (
      <BrowserRouter>
        <div>
          <div className='chat'>
            <ul className='line top'>
            {/* buttons to clear and restore the history */}
              <ul className='history'>
                <li onClick={this.clearChat}>clear chat</li>
                <li onClick={this.restoreHistory}>restore history</li>
              </ul>
              <h1 className='chat-title'>Or's Chat</h1>
              <ul className='history'>
              {/* the avatar of the user and a sign out button */}
                <img className='avatar' src={'https://robohash.org/'+this.state.user} alt='' />
                <li><Link className='signout' exact='true' to='/'>sign out</Link></li>
              </ul>
            </ul>
            {/* the box of messages send and recieved */}
            <ChatBox
                messages={this.state.message_list}
                user={this.state.user}
            />
            {/* the bottom area where the user writes and sends his messages */}
            <Bottom
                onClick={this.sendMessage}
                onEnter={this.onEnter}
                updateMsg={this.updateMsg}
                msg= {this.state.message}
                user={this.state.user}
            />
          </div>
          <Route exact path='/' component={App} />
        </div>
      </BrowserRouter>
    )
  }
}


export default Chat;