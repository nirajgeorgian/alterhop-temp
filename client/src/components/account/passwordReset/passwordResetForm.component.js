import React, { Component } from 'react'
import {
	FormGroup, InputGroup, Spinner, Icon, Tooltip, Button, Intent, Position, Toaster
} from '@blueprintjs/core'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {withRouter} from 'react-router-dom';
import {passwordTokenStartAction} from '../../../actionCreator/user.action.creator'
import {resetPasswordError} from '../../../actionCreator/user.action.creator'

export const AppToaster = Toaster.create({
    className: "recipe-toaster",
    position: Position.TOP,
});

class PasswordResetForm extends Component {
	state = {
		username: ''
	}

	onInputChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		})
	}

	showToast = message => {
		AppToaster.show({
			message,
			onDismiss: () => this.props.resetPasswordError()
		})
	}

	onFormSubmit = event => {
		event.preventDefault()
		const params = this.state
		this.props.passwordTokenStartAction(this.state)
	}

  render() {
		const {error} = this.props.password
		if(error.length && !this.props.loading) {
				this.showToast(error)
		}
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
	return bindActionCreators({ passwordTokenStartAction, resetPasswordError }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordResetForm));
