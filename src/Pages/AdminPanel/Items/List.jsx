import React from 'react';
import axios from "axios";
import cookies from "react-cookies";
import {Link} from "react-router-dom";

class AdminItemsList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			LoginStatus: false,
			UserData: {},
			Data: [{}],
			Response: "LOADING",
		}

		this.CheckLoginStatus = this.CheckLoginStatus.bind(this);
		this.GetList = this.GetList.bind(this);
		this.Delete = this.Delete.bind(this);

		this.CheckLoginStatus();
		this.GetList();
	}

	GetList = () => {
		axios.post("/frontendapi/items/get", {
			Token: cookies.load("Token"),
		}).then(async (data) => {
			if (data.data.Response === "OK") {
				this.setState({
					Data: data.data.Data,
					Response: data.data.Response,
				}, () => {
					if (data.data.Data.length === 0) {
						window.M.toast({html: "Cписок пуст"});
					}
				});
			}
		})
	};

	Delete = (_id) => {
		axios.post("/frontendapi/items/delete", {
			Token: cookies.load("Token"),
			SendData: {_id: _id},
		}).then(async (data) => {
			window.M.toast({html: "Вкус удален"});
			this.GetList();
		})
	}

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

	render() {
		return <div className="container">
			<h4>Список вкусов</h4>
			<div className="row">
				<Link to="/admin/items/add" className="green darken-3 waves-effect waves-light btn">Добавить</Link>
			</div>
			{
				this.state.Response === "LOADING"
					? <p>Loading...</p>
					: null
			}
			{
				this.state.Response !== "LOADING"
					? <ul className="collection">
						{
							this.state.Data.map((e) => {
								return <li className="collection-item avatar">
									<img src="" alt=""/>
									<span className="title">{e.Name}</span>
									<p>{e.Description}</p>
									<div className="secondary-content">
										<Link className="waves-effect waves-teal btn-flat" to={`/admin/items/edit/${e._id}`}>Редактировать</Link>
										<a className="waves-effect waves-teal btn-flat" onClick={() => this.Delete(e._id)}>Удалить</a>
									</div>
								</li>
							})
						}
					</ul>
					: null
			}
		</div>
	}
}

export default AdminItemsList;