import React, { Component } from 'react'
import Header from './Header.component'


class User extends Component {
	render() {
		console.log(this.props)
		return (
			<div>
				 <Header />
				 <br />
				 Currenty The Dashboard is under Construction
			</div>
		)
	}
}

export default User
