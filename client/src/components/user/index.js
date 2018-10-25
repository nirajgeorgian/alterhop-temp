import React, { Component } from 'react'
import Header from './Header.component'
import { NavLink } from 'react-router-dom'
import '@blueprintjs/core/lib/css/blueprint.css';



class User extends Component {

	render() {
		console.log(this.props)
		return (
			<div>
				 <Header />
				 <br />
				 Currenty The Dashboard is under Construction
				 <br/>
				 Search for a specific user  <NavLink to='/user/search'> Search </NavLink>
				 <br></br>
			</div>
		)
	}
}

export default User
