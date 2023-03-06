import { Button, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Post from './Post'
import PostUploader from './PostUploader'

class Blog extends React.Component {
  constructor(props) {
    super(props)

    const post = this.props.posts
    console.log(post)
  }
  render() {
    return (
      <>
        <Box
          sx={{
            diplay: 'flex',
            flexDirection: 'column',
            width: '35%',
            justifyColumn: 'center',
          }}
        >
          {this.props.user && (
            <PostUploader
              handleChange={this.props.handleChange}
              handleFileInput={this.props.handleFileInput}
              handleFileUpload={this.props.handleFileUpload}
            />
          )}
          <Stack direction='column' spacing={4} marginTop={5}>
            {this.props.posts.map((post, index) => {
              return <Post key={index} post={post} />
            })}
          </Stack>
        </Box>
      </>
    )
  }
}

export default Blog
