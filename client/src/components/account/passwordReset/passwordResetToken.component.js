import React, { Component } from 'react'
import {
	FormGroup, InputGroup, Spinner, Icon, Tooltip, Button, Intent
} from '@blueprintjs/core'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {confirmTokenStartAction, resetPasswordStartAction} from '../../../actionCreator/user.action.creator'

class ForgetPasswordToken extends Component {
	state = {
		password: '',
		againPassword: '',
		username: '',
		email: '',
		token: '',
		helpers : {
			showPassword: false,
			loading: false,
			disabled: false
		}
	}

	componentWillMount() {
		const {token} = this.props.match.params
		this.setState({
			token
		})
		// debugger
	}

	handleLockClick = event => {
		this.setState((prevState, prevProps) => {
			return {
				helpers : {
					showPassword: !prevState.helpers.showPassword
				}
			}
		})
	}

	onInputChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		})
	}

	onFormSubmit = async event => {
		event.preventDefault()
		const token = this.state.token
		const username = this.state.username
		const email = this.state.email
		await this.props.confirmTokenStartAction({ token, username })
	}

	onResetPassword = async event => {
		const {status} = this.props.password
		if(status) {
			const {confirm_token, username} = this.props.password
			if(confirm_token) {
				const params = {
					password: this.state.password,
					againPassword: this.state.againPassword,
					token: confirm_token,
					username
				}
				this.props.resetPasswordStartAction(params)
			}
		}
	}

  render() {
		const { showPassword, loading, disabled } = this.state.helpers
		const lockButton = (
			<Tooltip content={`${showPassword ? "Hide" : "Show"} Password`}>
				<Button
					icon={showPassword ? "unlock" : "lock"}
					intent={Intent.WARNING}
					minimal={true}
					onClick={this.handleLockClick}
				>
				</Button>
			</Tooltip>
		)
    return (
      <div>
				<FormGroup intent="primary">
					<InputGroup
						id="username"
	          large={true}
						value={this.state.username}
	          placeholder="Enter your username..."
	          rightElement={lockButton}
						leftIcon="key"
						onChange={this.onInputChange}
		      />
					<InputGroup
						id="password"
	          large={true}
	          placeholder="Enter your password..."
	          rightElement={lockButton}
						leftIcon="key"
	          type={showPassword ? "text" : "password"}
						onChange={this.onInputChange}
		      />
					<InputGroup
						id="againPassword"
						large={true}
						placeholder="Enter your password again..."
						rightElement={lockButton}
						leftIcon="key"
						type={showPassword ? "text" : "password"}
						onChange={this.onInputChange}
					/>
					<Button
						rightIcon="arrow-right"
						intent={Intent.SUCCESS}
						large={true}
						onClick={this.onFormSubmit}
					>Validate Token </Button>
					<Button
						rightIcon="arrow-right"
						intent={Intent.SUCCESS}
						large={true}
						onClick={this.onResetPassword}
					>Reset Password</Button>
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
	return bindActionCreators({ confirmTokenStartAction, resetPasswordStartAction }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordToken));
