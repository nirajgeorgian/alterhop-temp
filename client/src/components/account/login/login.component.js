import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import {
	FormGroup, InputGroup, Spinner, Icon, Tooltip, Button, Intent, Position, Toaster
} from '@blueprintjs/core'
import { userAuthStartAction } from '../../../actionCreator/user.action.creator'
import { resetUser } from '../../../actionCreator/user.action.creator'
import 'hover.css/css/hover-min.css'
import "./login.style.css";
export const AppToaster = Toaster.create({
	className: "recipe-toaster",
	position: Position.TOP,
});

class Login extends Component {
	state = {
		username: '',
		password: '',
		helpers: {
			showPassword: false,
			loading: false,
			disabled: false
		}
	}

	handleLockClick = event => {
		this.setState((prevState, prevProps) => {
			return {
				helpers: {
					showPassword: !prevState.helpers.showPassword
				}
			}
		})
	}

	showToast = message => {
		AppToaster.show({
			message,
			onDismiss: () => this.props.resetUser()
		})
	}

	onInputChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		})
	}

	onFormSubmit = event => {
		event.preventDefault()
		this.props.userAuthStartAction(this.state)
		this.setState({
			username: '',
			password: ''
		})
	}
	render() {
		const { error } = this.props.user
		const { showPassword, loading, disabled } = this.state.helpers
		const userSpinner = true ? <Spinner intent="primary" size={Icon.SIZE_STANDARD} /> : null
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
		if (error.length && !this.props.loading) {
			this.showToast(error)
		}
		return (
			<div className="main">
				<div className="alt-main">
					<div className="alt-img">
						
					</div>
				
					<div className="alt-form">
						<div className="alt-text">
						<center>
							<div className="log-in">LOG IN</div>
							</center>
						</div>
			
						<FormGroup intent="primary">
							<InputGroup
								id="username"
								className="bp3-round"
								large={true}
								placeholder="Username"
								leftIcon="paperclip"
								type="text"
								value={this.state.username}
								onChange={this.onInputChange}
							/>
							<InputGroup
								id="password"
								className="bp3-round"
								large={true}
								placeholder="Password"
								rightElement={lockButton}
								leftIcon="key"
								type={showPassword ? "text" : "password"}
								value={this.state.password}
								onChange={this.onInputChange}
							/>
							<button
								className="login-btn btn-login"
								disabled={this.props.loading ? true : false}
								onClick={this.onFormSubmit}
							>Login </button>
						</FormGroup>

						 
						<div className="foot">
						Forgot <Link to='/account/forgot_password'>Username/Password</Link>
						<hr />
						Create an account. Its Free <Link to='/account/signup'>Sign Up</Link>
						</div>
					</div>
				</div>
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
	return bindActionCreators({ userAuthStartAction, resetUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
