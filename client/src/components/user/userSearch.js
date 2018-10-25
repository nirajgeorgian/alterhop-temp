import React, { Component } from 'react'
import { InputGroup } from '@blueprintjs/core'
import '@blueprintjs/core/lib/css/blueprint.css';


const List = (props) => {
    return (
        <React.Fragment>
            <ul className = "list__items">
                {props.list.map((val,key) => (
                    <li key={key}>{val.person.name}</li>
                ))}
            </ul>
        </React.Fragment>
    )
}

class User extends Component {
	constructor(props) {
		super(props);

		this.state = {
			series : []
		}
	}
  
	   
	handleChange(e) {
	  let searchVal = e.target.value;
	  fetch(`http://api.tvmaze.com/search/people?q=${searchVal}`)
	  .then(response => response.json())
	  .then( json => this.setState( {
		  series : [...json]
	  }) )
  }
	render() {
		console.log(this.props)
		return (
			<div>
				
				 <InputGroup 
					placeholder="Search your query"
                    fill={false}
                    leftIcon='search-text'
					onChange={this.handleChange.bind(this)}
            >
            </InputGroup> 
				<List list={this.state.series}/>
			</div>
		)
	}
}

export default User
