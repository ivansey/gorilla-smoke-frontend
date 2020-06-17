import React from "react";
import {Link} from "react-router-dom";
import cookies from "react-cookies";
import axios from "axios";

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			StatusLogin: false,
			UserData: {},
			Response: "LOADING",
		}

		this.CheckLoginStatus = this.CheckLoginStatus.bind(this);

		this.CheckLoginStatus();
	}

	CheckLoginStatus = () => {
		axios.post("/frontendapi/users/auth/get", {
			Token: cookies.load("Token"),
		}).then(async (data) => {
			if (data.data.Response === "OK") {
				this.setState({
					StatusLogin: true,
					UserData: data.data.Data,
					Response: "OK",
				}, () => {window.M.toast({html: `Вы вошли как ${data.data.Data.Email}`})});
			} else {
				this.setState({
					LoginStatus: false,
					UserData: {},
					Response: "OK",
				});
			}
		})
	};

	render() {
		return <div className="navbar-fixed">
			<nav>
				<div className="nav-wrapper grey darken-4">
					<Link to="/" className="brand-logo">Gorilla Smoke</Link>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						{
							this.state.Response === "LOADING"
								? <li><a href="#">Loading...</a></li>
								: null
						}
						{
							this.state.Response === "OK" && this.state.StatusLogin === true
								? <li><Link to="/admin">Админ-панель</Link></li>
								: null
						}
					</ul>
				</div>
			</nav>
		</div>
	}
}

export default Header;