import React from 'react'
import '../index.scss';


class InputBubble extends React.Component {

    render(){
        return(
            <ol className='line'>
                <img className='avatar' src={'https://robohash.org/'+this.props.user} alt='' />
                <div className='bubble input'>
                    <p className='user'>{this.props.user}</p>
                    <p>{this.props.msg}</p>
                </div>
            </ol>

        )
    }
}

class OutputBubble extends React.Component {

    render(){
        return(
            <div className='bubble output'>
                <p>{this.props.msg}</p>
            </div>
        )
    }
}

export {InputBubble, OutputBubble};