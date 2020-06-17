import React from 'react';
import axios from "axios";
import cookies from "react-cookies";
import {withRouter} from "react-router-dom";

class AdminItemsEdit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			LoginStatus: false,
			UserData: {},
			Data: {},
			SendData: {
				_name: "",
				_description: "",
				_colorHEX: "",
			},
			Response: "LOADING",
		}

		this.CheckLoginStatus = this.CheckLoginStatus.bind(this);
		this.Edit = this.Edit.bind(this);
		this.Get = this.Get.bind(this);

		this.HandleName = this.HandleName.bind(this);
		this.HandleDescription = this.HandleDescription.bind(this);
		this.HandleColor = this.HandleColor.bind(this);

		this.CheckLoginStatus();
		this.Get();
	}

	Get = () => {
		axios.post("/frontendapi/items", {
			SendData: {_id: this.props.match.params.id},
			Token: cookies.load("Token"),
		}).then((data) => {
			if (data.data.Response === "OK") {
				this.setState({
					Data: data.data.Data,
					Response: "OK",
					SendData: Object.assign(this.state.SendData, {_id: data.data.Data._id}),
				})
			} else {
				this.setState({
					Response: data.data.Response,
				})
			}
		});
	}

	Edit = () => {
		axios.post("/frontendapi/items/edit", {
			Token: cookies.load("Token"),
			SendData: this.state.SendData,
		}).then(async (data) => {
			if (data.data.Response === "OK") {
				await window.M.toast({html: `Вкус "${this.state.SendData._name}" изменён`})
				await this.props.history.push("/admin/items/list");
			}
		})
	};

	CheckLoginStatus = () => {
		axios.post("/frontendapi/users/auth/get", {
			Token: cookies.load("Token"),
		}).then(async (data) => {
			if (data.data.Response === "OK") {
				this.setState({
					LoginStatus: true,
					UserData: data.data.Data,
				});
			} else {
				document.location.href = "/admin/login";
			}
		})
	};

	HandleName = (e) => {
		this.setState(Object.assign(this.state, Object.assign(this.state.SendData, {_name: e.target.value})))
	}

	HandleDescription = (e) => {
		this.setState(Object.assign(this.state, Object.assign(this.state.SendData, {_description: e.target.value})))
	}

	HandleColor = (e) => {
		this.setState(Object.assign(this.state, Object.assign(this.state.SendData, {_colorHEX: e.target.value})))
	}

	render() {
		return <div className="container">
			{
				this.state.Response === "LOADING"
					? <p>Loading...</p>
					: null
			}
			{
				this.state.Response === "OK"
					? <div className="container">
						<h4>{this.state.Data.Name}</h4>
						<div className="input-field">
							<label htmlFor="nameItem">Название</label>
							<input type="text" id="nameItem" onChange={this.HandleName} defaultValue={this.state.Data.Name}/>
						</div>
						<div className="input-field">
							<label htmlFor="description">Описание</label>
							<textarea className="materialize-textarea" id="description" onChange={this.HandleDescription} defaultValue={this.state.Data.Description}/>
						</div>
						{/*<div className="">*/}
						{/*	<p>Фото</p>*/}
						{/*	<input type="file" id="photo" onChange=""/>*/}
						{/*</div>*/}
						{/*<div className="">*/}
						{/*	<p>Иконка</p>*/}
						{/*	<input type="file" id="photo" onChange=""/>*/}
						{/*</div>*/}
						<br/>
						<div className="input-field">
							<select onChange={this.HandleColor} defaultValue={this.state.Data.ColorHEX}>
								<option value="def" disabled>Выбирете цвет</option>
								<optgroup label="Красные цвета">
									<option value="red">Красный</option>
								</optgroup>
								<optgroup label="Зелёные цвета">
									<option value="green">Зелёный</option>
								</optgroup>
								<optgroup label="Синие цвета">
									<option value="blue">Синий</option>
								</optgroup>
							</select>
							<label>Цвет</label>
						</div>
						<div>
							<button className="green darken-3 waves-effect waves-light btn" onClick={() => this.Edit()}>Создать</button>
						</div>
					</div>
					: null
			}
		</div>
	}

	componentDidUpdate() {
		let elems = document.querySelectorAll('select');
		window.M.FormSelect.init(elems, {});
	}
}

export default withRouter(AdminItemsEdit);