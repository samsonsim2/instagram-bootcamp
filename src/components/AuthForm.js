import React, { Component } from 'react'
import TextField from '@mui/material/TextField'
import FormRow from './FormRow'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button, Paper } from '@mui/material'
class AuthForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <>
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card
            sx={{
              height: 'fit-content',
              p: 5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant='h4' textAlign='center' gutterBottom>
              Rocketgram
            </Typography>
            <Typography textAlign='center' variant='h6' gutterBottom>
              Login
            </Typography>

            {/* {showAlert && <AlertBar />} */}
            {/* {this.state.isMember ? null : <FormRow />} */}
            <FormRow
              inputs={{
                value: this.props.inputs.email,
                name: 'email',
                handleChange: this.props.handleChange,
              }}
            />
            <FormRow
              inputs={{
                value: this.props.inputs.password,
                name: 'password',
                handleChange: this.props.handleChange,
              }}
            />

            <Button
              variant='contained'
              // disabled={isLoading}
              sx={{ mt: 2 }}
              onClick={this.props.handleUserSignUp}
            >
              Submit
            </Button>

            <Box sx={{ mt: 1 }}>
              <Typography sx={{ display: 'inline' }}>
                {this.state.isMember
                  ? 'Not a member yet? |'
                  : 'Already a member? |'}
              </Typography>
              <Button
                onClick={() =>
                  this.setState({ isMember: !this.state.isMember })
                }
              >
                {this.state.isMember ? 'Register' : 'Login'}
              </Button>
            </Box>
          </Card>
        </Box>
      </>
    )
  }
}

export default AuthForm
