import React from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import cookies from "react-cookies";

import "materialize-css/dist/js/materialize.min"

class AdminLogin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			SendData: {
				_email: "",
				_pass: "",
			},
			Response: "",
			Error: "",
			Token: "",
		}

		this.HandleEmail = this.HandleEmail.bind(this);
		this.HandlePass = this.HandlePass.bind(this);

		this.SendData = this.SendData.bind(this);
	}

	HandleEmail = (e) => {
		this.setState(Object.assign(this.state.SendData, {_email: e.target.value}))
	}

	HandlePass = (e) => {
		this.setState(Object.assign(this.state.SendData, {_pass: e.target.value}))
	}

	SendData = () => {
		axios.post("/frontendapi/users/auth/login", {SendData: this.state.SendData}).then((data) => {
			let _d = data.data;
			if (_d.Response === "OK") {
				cookies.save("Token", _d.Data.Token, {path: "/"});
				this.props.history.push("/?reload=true")
			} else {
				this.setState({Error: _d.Error, Response: _d.Response});
				if (_d.Error === "INVALID_EMAIL_OR_PASSWORD") {
					window.M.toast({html: 'Не верный логин/пароль'});
				} else {
					window.M.toast({html: 'Неизвестная ошибка'});
				}
			}
		})
	}

	render() {
		return <div className="container">
			<div className="container">
				<h4 className="title">Вход в аккаунт</h4>
				<div className="input-field">
					<label htmlFor="email">Email</label>
					<input type="email" id="email" onChange={this.HandleEmail}/>
				</div>
				<div className="input-field">
					<label htmlFor="pass">Пароль</label>
					<input type="password" id="pass" onChange={this.HandlePass}/>
				</div>
				<div>
					<button className="green darken-3 waves-effect waves-light btn" onClick={this.SendData}>Вход</button>
				</div>
			</div>
		</div>
	}
}

export default withRouter(AdminLogin);