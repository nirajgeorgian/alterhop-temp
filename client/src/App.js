import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkUserStatus } from './actionCreator/user.action.creator'

class App extends Component {
  state = {
    username: '',
    password: ''
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  onFormSubmit = event => {
    event.preventDefault()
    this.props.checkUserStatus(this.state)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input type="text" id="username" onChange={this.onInputChange}/>
        <input type="password" id="password" onChange={this.onInputChange}/>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({checkUserStatus}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
