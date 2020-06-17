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

	Colors = [
		["red", "Красный"],
		["green", "Зелёный"],
		["blue", "Синий"],
	]

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
				{/*<div className="">*/}
				{/*	<p>Фото</p>*/}
				{/*	<input type="file" id="photo" onChange={this.HandleUploadImagePhoto} ref={(ref) => {*/}
				{/*		this.image = ref;*/}
				{/*	}}/>*/}
				{/*</div>*/}
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
							<option value="red lighten-4">Красный светлый-4</option>
							<option value="red lighten-3">Красный светлый-3</option>
							<option value="red lighten-2">Красный светлый-2</option>
							<option value="red lighten-1">Красный светлый</option>
							<option value="red">Красный</option>
							<option value="red darken-1">Красный темный</option>
							<option value="red darken-2">Красный темный-2</option>
							<option value="red darken-3">Красный темный-3</option>
							<option value="red darken-4">Красный темный-4</option>
						</optgroup>
						<optgroup label="Зелёные цвета">
							<option value="green lighten-4">Зелёный светлый-4</option>
							<option value="green lighten-3">Зелёный светлый-3</option>
							<option value="green lighten-2">Зелёный светлый-2</option>
							<option value="green lighten-1">Зелёный светлый</option>
							<option value="green">Зелёный</option>
							<option value="green darken-1">Зелёный темный</option>
							<option value="green darken-2">Зелёный темный-2</option>
							<option value="green darken-3">Зелёный темный-3</option>
							<option value="green darken-4">Зелёный темный-4</option>
						</optgroup>
						<optgroup label="Синие цвета">
							<option value="blue lighten-4">Синий светлый-4</option>
							<option value="blue lighten-3">Синий светлый-3</option>
							<option value="blue lighten-2">Синий светлый-2</option>
							<option value="blue lighten-1">Синий светлый</option>
							<option value="blue">Синий</option>
							<option value="blue darken-1">Синий темный</option>
							<option value="blue darken-2">Синий темный-2</option>
							<option value="blue darken-3">Синий темный-3</option>
							<option value="blue darken-4">Синий темный-4</option>
						</optgroup>
						<optgroup label="Желтые цвета">
							<option value="yellow lighten-4">Желтый светлый-4</option>
							<option value="yellow lighten-3">Желтый светлый-3</option>
							<option value="yellow lighten-2">Желтый светлый-2</option>
							<option value="yellow lighten-1">Желтый светлый</option>
							<option value="yellow">Желтый</option>
							<option value="yellow darken-1">Желтый темный</option>
							<option value="yellow darken-2">Желтый темный-2</option>
							<option value="yellow darken-3">Желтый темный-3</option>
							<option value="yellow darken-4">Желтый темный-4</option>
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