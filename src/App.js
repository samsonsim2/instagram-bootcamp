import React from 'react'
import { onChildAdded, push, ref, set } from 'firebase/database'
import { uploadBytes, getDownloadURL, ref as sRef } from 'firebase/storage'
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { database, storage } from './firebase'
import logo from './logo.png'
import './App.css'
import { Box, TextField } from '@mui/material'
import ChatInput from './components/ChatInput'
import AppBar from '@mui/material/AppBar'
import { generateImageName, getCurrentDate, findPost } from './utils'
import { auth } from './firebase'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChatRoom from './components/ChatRoom'
import Stack from '@mui/material/Stack'
import Blog from './components/Blog'
import AuthForm from './components/AuthForm'

// Save the Firebase message folder name as a constant to avoid bugs due to misspelling
const DB_MESSAGES_KEY = 'messages'
const DB_POSTS_KEY = 'posts'

class App extends React.Component {
  constructor(props) {
    super(props)
    // Initialise empty messages array in state to keep local state in sync with Firebase
    // When Firebase changes, update local state, which will update local UI
    this.state = {
      messages: [],
      file: '',
      imageUrl: '',
      caption: '',
      posts: [],
      page: '',
      email: '',
      password: '123',
      isMember: true,
      password: '',
      user: '',
    }
  }

  componentDidMount() {
    const messagesRef = ref(database, DB_MESSAGES_KEY)
    const postRef = ref(database, DB_POSTS_KEY)
    // onChildAdded will return data for every child at the reference and every subsequent new child
    onChildAdded(messagesRef, (data) => {
      // Add the subsequent child to local component state, initialising a new array to trigger re-render
      this.setState((state) => ({
        // Store message key so we can use it as a key in our list items when rendering messages
        messages: [...state.messages, { key: data.key, val: data.val() }],
      }))
    })
    onChildAdded(postRef, (data) => {
      // Add the subsequent child to local component state, initialising a new array to trigger re-render
      this.setState((state) => ({
        // Store message key so we can use it as a key in our list items when rendering messages
        posts: [...state.posts, { key: data.key, val: data.val() }],
      }))
    })

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('userLoggedin')

        console.log(user)
        this.setState({ user: user })
      } else {
        this.setState({ user: '' })
        console.log('notLoggedin')
      }
    })
  }

  // Note use of array fields syntax to avoid having to manually bind this method to the class
  writeData = (input) => {
    console.log(input)

    const currentDate = getCurrentDate()

    const chat = {
      message: input,
      timestamp: currentDate,
    }
    const messageListRef = ref(database, DB_MESSAGES_KEY)
    const newMessageRef = push(messageListRef)
    set(newMessageRef, chat)
  }

  handleChange = (e) => {
    console.log(e.target.name)
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleFileInput = (e) => {
    console.log(e.target.files[0])
    this.setState({
      file: e.target.files[0],
    })
  }

  handleFileUpload = (caption) => {
    console.log('handleFileUpload')
    const currentDate = getCurrentDate()
    const fileName = generateImageName(this.state.file.name)

    const storageRef = sRef(storage, `images/${fileName}`)

    uploadBytes(storageRef, this.state.file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref)
      })
      .then((url) => {
        this.setState({ imageUrl: url })
        const postListRef = ref(database, DB_POSTS_KEY)
        const newPostRef = push(postListRef)
        const newPostKey = newPostRef.key

        const post = {
          imageUrl: url,
          caption: this.state.caption,
          date: currentDate,
          key: newPostKey,
        }

        set(newPostRef, post)
      })
  }
  setPage = (page) => {
    this.setState({
      page: page,
    })
  }

  handleUserSignUp = () => {
    console.log('creating user')
    createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message

        // ..
      })
  }

  render() {
    // Convert messages in state to message JSX elements to render
    let messageListItems = this.state.messages.map((message) => (
      <li key={message.key}>{message.val}</li>
    ))
    return (
      <Box sx={{ background: '#F8F8F8', height: '100vh', overflowY: 'scroll' }}>
        {/*APP BAR*/}
        <AppBar position='static' sx={{ background: '#e73c3e' }}>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Rocketgram
            </Typography>
            <Stack direction={{ xs: 'row' }}>
              <Typography>
                <Button
                  sx={{ color: 'white' }}
                  onClick={() => this.setPage('chat')}
                >
                  Chat
                </Button>
              </Typography>
              <Typography>
                <Button
                  sx={{ color: 'white' }}
                  onClick={() => this.setPage('blog')}
                >
                  Blog
                </Button>
                <Button
                  sx={{ color: 'white' }}
                  onClick={() => this.setPage('login')}
                >
                  Login
                </Button>
              </Typography>
            </Stack>

            <Button
              color='inherit'
              sx={{
                marginLeft: 5,
                background: '#F8F8F8',
                color: '#e73c3e',
                '&:hover': { backgroundColor: '#F8F8F8' },
              }}
              onClick={() => {
                signOut(auth)
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        {/*CONTENT*/}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          {/*DISPLAY AuthForm*/}
          {this.state.page === 'login' && (
            <AuthForm
              handleChange={this.handleChange}
              handleUserSignUp={this.handleUserSignUp}
              inputs={{
                email: this.state.email,
                password: this.state.password,
              }}
            />
          )}
          {/*DISPLAY CHATROOM*/}
          {this.state.page === 'chat' && (
            <ChatRoom
              writeData={this.writeData}
              messageList={this.state.messages}
              user={this.state.user}
            />
          )}

          {/*DISPLAY BLOG POST*/}

          {this.state.page === 'blog' && (
            <Blog
              user={this.state.user}
              handleChange={this.handleChange}
              handleFileInput={this.handleFileInput}
              handleFileUpload={this.handleFileUpload}
              posts={this.state.posts}
            />
          )}
        </Box>
      </Box>
    )
  }
}

export default App
