import { Link } from 'react-router-dom'

// Import Logo image
import Logo from "./logo2.png"

// Navbar component for displaying header with logo and sign out link
const Navbar = () => {
	return (
		<header>
			<div className="container">
				<div className="header_title">
					<img src={Logo} alt="logo" style={{ width: "65px", height: "65px" }}/>
					<Link to='/'>
						<h1>GoalPulse</h1>
					</Link>
				</div>

				<Link to='/Signout'>
					<p>Sign out</p>
				</Link>
			</div>
		</header>
	)
}

export default Navbar;