import { Button, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

class PostUploader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit = (e) => {}
  render() {
    return (
      <>
        <Stack
          direction={'column'}
          sx={{ width: '100%', alignItems: 'center' }}
        >
          <Box
            sx={{
              width: '100%',
              background: '#D3D3D3',
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant='outlined'
              component='label'
              sx={{ height: '50px' }}
              onChange={(e) => this.props.handleFileInput(e)}
            >
              Upload Image
              <input name='imageUrl' hidden type='file' />
            </Button>
          </Box>
          <TextField
            id='outlined-password-input'
            name='caption'
            label='Description'
            type='Description'
            variant='standard'
            value={this.state.caption}
            onChange={(e) => this.props.handleChange(e)}
            sx={{ width: '100%' }}
          />
          <Button
            variant={'contained'}
            sx={{ width: '200px', justifySelf: 'center', marginTop: 2 }}
            onClick={this.props.handleFileUpload}
          >
            Share
          </Button>
        </Stack>
      </>
    )
  }
}

export default PostUploader
