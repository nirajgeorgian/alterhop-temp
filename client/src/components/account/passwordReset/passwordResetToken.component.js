import React, { Component } from 'react'
import {
	FormGroup, InputGroup, Spinner, Icon, Tooltip, Button, Intent
} from '@blueprintjs/core'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {confirmTokenStartAction} from '../../../actionCreator/user.action.creator'

class ForgetPasswordToken extends Component {
	state = {
		password: '',
		againPassword: '',
		helpers : {
			showPassword: false,
			loading: false,
			disabled: false
		}
	}

	componentWillMount() {
		const {token} = this.props.match.params
		this.props.confirmTokenStartAction({ token: token})
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

	onFormSubmit = event => {
		event.preventDefault()
		const params = this.state
		this.props.confirmTokenStartAction(params)
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
					>Reset </Button>
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
	return bindActionCreators({ confirmTokenStartAction }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordToken));
