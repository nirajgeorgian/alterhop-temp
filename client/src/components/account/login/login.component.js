import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userAuthStartAction } from '../../../actionCreator/user.action.creator'

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const dodo = await this.props.userAuthStartAction(this.state)
  }
  render() {
    return (
      <div>
        Login component here
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({userAuthStartAction}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
