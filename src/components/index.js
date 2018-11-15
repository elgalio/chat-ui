
import React from 'react';
import { Route, Link, BrowserRouter } from "react-router-dom";
import Chat from './Chat';
import '../index.scss';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {username: ''};
    this.setUsername = this.setUsername.bind(this);
    this.login = this.login.bind(this);
  }

  login() {
    if(this.state.username.valueOf() !== ''){
      return(<Link className='login-button' exact to='/chat' onClick={this.login}>login</Link>);
    }
  }

  setUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  render() {
    let button;
    if(this.state.username.valueOf() !== ''){
      button = <Link className='login-button' exact='true' to='/chat' onClick={this.login}>login</Link>
    }
    else{
      button = <span className='login-button'>login</span>
    }

    return(
      <BrowserRouter>
        <div className='app'>
          <div className='login'>
            <div className='home'>
              <h1 className='welcome'>Welcome to Or's Chat</h1>
                <p>Enter username below and press the login button.</p>
                <input className='login-user' onChange={this.setUsername}></input>
                {button}
            </div>
          </div>
          <Route exact path='/chat' render={()=><Chat username={this.state.username} />} />
        </div>
      </BrowserRouter>
    );  
  }
}


export {App};