import React, { Component } from 'react'
import {
	FormGroup, InputGroup, Spinner, Icon, Tooltip, Button, Intent
} from '@blueprintjs/core'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {withRouter} from 'react-router-dom';
import {passwordTokenStartAction} from '../../../actionCreator/user.action.creator'


class PasswordResetForm extends Component {
	state = {
		username: ''
	}

	onInputChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		})
	}

	onFormSubmit = event => {
		event.preventDefault()
		const params = this.state
		this.props.passwordTokenStartAction(this.state)
	}

  render() {
    return (
      <div>
				<FormGroup intent="primary">
	        <InputGroup
						id="username"
						large={true}
						placeholder="Enter your email or username"
						leftIcon="paperclip"
						type="email"
						onChange={this.onInputChange}
					/>
					<Button
						rightIcon="arrow-right"
						intent={Intent.SUCCESS}
						large={true}
						onClick={this.onFormSubmit}
					>Send Token </Button>
			</FormGroup>
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
	return bindActionCreators({ passwordTokenStartAction }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordResetForm));
