import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <>
        <Card sx={{ maxWidth: '100%' }}>
          <CardMedia
            sx={{ height: 500 }}
            image={this.props.post.val.imageUrl}
            title='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h7' component='div'>
              {this.props.post.val.caption}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small'>Share</Button>
            <Button size='small'>Learn More</Button>
          </CardActions>
        </Card>
      </>
    )
  }
}

export default Post
