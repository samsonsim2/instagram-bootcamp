import React, { Component } from 'react'
import TextField from '@mui/material/TextField'
class FormRow extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.inputs)
    const { name, value, handleChange } = this.props.inputs
    console.log(handleChange)
  }

  render() {
    return (
      <>
        <TextField
          id={this.props.inputs.name}
          type={this.props.inputs.name}
          name={this.props.inputs.name}
          label={this.props.inputs.name}
          value={this.props.inputs.value || ''}
          margin='normal'
          onChange={(e) => {
            this.props.inputs.handleChange(e)
          }}
          // sx={style ? style : { width: '100%' }}
        />
      </>
    )
  }
}

export default FormRow
