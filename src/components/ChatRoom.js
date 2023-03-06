import React from 'react'
import { Box, TextField } from '@mui/material'
import ChatInput from './ChatInput'
import TextBubble from './TextBubble'
import '../App.css'

class ChatRoom extends React.Component {
  constructor(props) {
    super(props)
    // Create a reference to the end of messages
    this.endMessageRef = React.createRef()
  }
  scorllToTheEnd = () => {
    this.endMessageRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  componentDidMount() {
    this.scorllToTheEnd()
  }

  componentDidUpdate() {
    this.scorllToTheEnd()
  }

  render() {
    return (
      <>
        <Box>
          {/* Messages */}
          <Box sx={{ height: '500px', overflowY: 'scroll' }} className='scroll'>
            {this.props.messageList.map((message) => {
              return <TextBubble message={message} />
            })}
            <div ref={this.endMessageRef}></div>
          </Box>

          {/* Input */}
          {this.props.user && <ChatInput handleSubmit={this.props.writeData} />}
        </Box>
      </>
    )
  }
}

export default ChatRoom
