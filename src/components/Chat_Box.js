import React from 'react';
import {InputBubble, OutputBubble} from './Text_Bubble.js';
import '../index.scss';


class ChatBox extends React.Component {

  // maps the messages arrat to Bubble components
  makeBubbles(user, message) {
    if(message.username === user) {
      return <li className='bubble-wraper'>
                <OutputBubble
                  msg={message.text} />
              </li>;
    }
    else {
      return <li className='bubble-wraper'>
                <InputBubble
                  user={message.username}
                  msg={message.text} />
            </li>;
    }
  }

  render() {
    const bubbles = this.props.messages.map(
                              (message) => this.makeBubbles(this.props.user, message));

    return (
      <div className='chat-box'>  
        <ol className='chat-list'>
          {bubbles}
        </ol>
      </div>
    )
  }
}


export default ChatBox;