import React from 'react'
import { TextField, Button, IconButton, Grid, Paper } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { grey } from '@mui/material/colors'
import { Box } from '@mui/system'

class ChatInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
    }
  }

  clear = () => {
    this.setState({
      input: '',
    })
  }
  handleChange = (e) => {
    this.setState({
      input: e.target.value,
    })
  }

  render() {
    return (
      <>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
              marginTop: 2,
            }}
          >
            <TextField
              fullWidth
              label='Enter message'
              id='Enter message'
              value={this.state.input}
              onChange={this.handleChange}
            />
          </Box>
          <Button
            onClick={() => {
              this.props.handleSubmit(this.state.input)
              this.clear()
            }}
          >
            <SendIcon />
          </Button>
        </Box>
      </>
    )
  }
}

export default ChatInput
