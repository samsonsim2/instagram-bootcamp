import Box from '@mui/material/Box'
import React from 'react'

class TextBubble extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    console.log(props)
  }

  render() {
    return (
      <>
        <Box
          sx={{
            boxShadow: 1,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#101010' : '#fff',
            color: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
            p: 1,
            m: 1,
            borderRadius: 2,
            padding: 2,

            fontSize: '1rem',
            fontWeight: '500',
          }}
        >
          <Box> {this.props.message.val.message}</Box>

          <Box
            textAlign={'right'}
            sx={{ fontSize: '0.75rem', fontWeight: '350' }}
          >
            {this.props.message.val.timestamp}
          </Box>
        </Box>
      </>
    )
  }
}

export default TextBubble
