import React from 'react'
import '../index.scss';

// the bottom of the screen where the user writes his messages
class Bottom extends React.Component {

    render() {
        return (
            <div className='bottom'>
                <div className='my-username'>{this.props.user}:</div>
                <Message
                    onChange={this.props.updateMsg}
                    onEnter={this.props.onEnter}
                    msg= {this.props.msg}
                />
                <SendButton
                    onClick={this.props.onClick}
                />
            </div>
        )
    }
}


// the input field
class Message extends React.Component {

    render() {
        return (
            <input 
                className='msg'
                onChange={this.props.onChange}
                onKeyDown={this.props.onEnter}
                value= {this.props.msg}
                id='msg'
            >
            </input>
        )
    }
}

// the send button
class SendButton extends React.Component {

    render() {
        return (
            <button className='send' onClick={this.props.onClick}>
                <div className='triangle-up'></div>
                <div className='triangle-down'></div>
            </button>
        )
    }
}

export {Bottom, Message, SendButton};

