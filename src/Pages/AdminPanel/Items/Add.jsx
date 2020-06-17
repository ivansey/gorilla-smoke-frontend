import React from 'react';
import axios from "axios";
import cookies from "react-cookies";
import {withRouter} from "react-router-dom";

class AdminItemsAdd extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			LoginStatus: false,
			UserData: {},
			SendData: {
				_name: "",
				_description: "",
				_colorHEX: "",
				_photoURL: "",
				_iconURL: "",
			},
			Response: "LOADING",
		}

		this.CheckLoginStatus = this.CheckLoginStatus.bind(this);
		this.Add = this.Add.bind(this);

		this.HandleName = this.HandleName.bind(this);
		this.HandleDescription = this.HandleDescription.bind(this);
		this.HandleColor = this.HandleColor.bind(this);
		this.HandleUploadImagePhoto = this.HandleUploadImagePhoto.bind(this);
		this.HandleUploadImageIcon = this.HandleUploadImageIcon.bind(this);

		this.CheckLoginStatus();
	}

	Add = () => {
		axios.post("/frontendapi/items/add", {
			Token: cookies.load("Token"),
			SendData: this.state.SendData,
		}).then(async (data) => {
			if (data.data.Response === "OK") {
				this.setState({
					Data: data.data.Data,
					Response: data.data.Response,
				});
				await window.M.toast({html: `Вкус "${data.data.Data.Name}" добавлен`})
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

	image = {};

	HandleUploadImagePhoto = (e) => {
		e.preventDefault();

		this.setState({ImageResponsePhoto: "LOADING"}, () => window.M.toast({html: "Загрузка..."}));

		let data = new FormData();
		data.append("file", this.image.files[0]);
		data.append("filename", "image_" + Date.now() + ".png");

		axios.post("/frontendapi/storage/image/upload", data).then((data) => {
			this.setState({SendData: Object.assign(this.state.SendData, {_photoURL: data.data.URL})});
			this.setState({ImageResponsePhoto: "OK"});
			window.M.toast({html: "Фото загружено"});
		});
	};

	HandleUploadImageIcon = (e) => {
		e.preventDefault();

		this.setState({ImageResponseIcon: "LOADING"}, () => window.M.toast({html: "Загрузка..."}));

		let data = new FormData();
		data.append("file", this.image.files[0]);
		data.append("filename", "image_" + Date.now() + ".png");

		axios.post("/frontendapi/storage/image/upload", data).then((data) => {
			this.setState({SendData: Object.assign(this.state.SendData, {_iconURL: data.data.URL})});
			this.setState({ImageResponseIcon: "OK"});
			window.M.toast({html: "Иконка загружена"});
		});
	};

	render() {
		return <div className="container">
			<div className="container">
				<h4>Добавление вкуса</h4>
				<div className="input-field">
					<label htmlFor="nameItem">Название</label>
					<input type="text" id="nameItem" onChange={this.HandleName}/>
				</div>
				<div className="input-field">
					<label htmlFor="description">Описание</label>
					<textarea className="materialize-textarea" id="description" onChange={this.HandleDescription}/>
				</div>
				<div className="">
					<p>Фото</p>
					<input type="file" id="photo" onChange={this.HandleUploadImagePhoto} ref={(ref) => {
						this.image = ref;
					}}/>
				</div>
				<div className="">
					<p>Иконка</p>
					<input type="file" id="icon" onChange={this.HandleUploadImageIcon} ref={(ref) => {
						this.image = ref;
					}}/>
				</div>
				<br/>
				<div className="input-field">
					<select onChange={this.HandleColor} defaultValue="def">
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
					{
						this.state.ImageResponsePhoto !== "LOADING" && this.state.ImageResponseIcon !== "LOADING"
							? <button className="green darken-3 waves-effect waves-light btn" onClick={() => this.Add()}>Создать</button>
							: null
					}
				</div>
			</div>
		</div>
	}

	componentDidMount() {
		let elems = document.querySelectorAll('select');
		window.M.FormSelect.init(elems, {});
	}
}

export default withRouter(AdminItemsAdd);