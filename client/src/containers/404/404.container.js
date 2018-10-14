import React from 'react'
import { Link } from 'react-router-dom';
const PageNotFound = props => (
	<div style={{ position: "absolute", top: "20%",left: "25%", padding: "30px" }}>

		<img style={{ width: "100%", height: "auto" }} src="https://i2.wp.com/www.silocreativo.com/en/wp-content/uploads/2017/11/diseno-web-404-CSS.gif?resize=600%2C323&quality=100&strip=all&ssl=1" alt="404" />
		<div style={{ padding: "10px", textAlign: "center" }}>
			<h2>Oops! Page not found. 404 Error.</h2>
			Return to <Link to="/account/login"  > Home </Link>
		</div>
	</div>
)

export default PageNotFound
