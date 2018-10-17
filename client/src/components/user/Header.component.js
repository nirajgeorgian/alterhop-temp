import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Alignment, Button } from '@blueprintjs/core'

export default class Header extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>Dashboard</Navbar.Heading>
            <Navbar.Divider />
            {
              //Add your navbar links
            }
            <NavLink to="user/edit-profile" activeClassName="is-active">
              <Button className="bp3-minimal" icon="edit" text="Edit Profile" />
            </NavLink>

          </Navbar.Group>
        </Navbar>
      </div>
    )
  }
}
