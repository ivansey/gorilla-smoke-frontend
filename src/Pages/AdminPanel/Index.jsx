import React from 'react';
import axios from "axios";
import cookies from "react-cookies";
import {Link} from "react-router-dom";

class AdminIndex extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			LoginStatus: false,
			UserData: {},
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
					LoginStatus: true,
					UserData: data.data.Data,
				});
			} else {
				document.location.href = "/admin/login";
			}
		})
	};

	render() {
		return <div className="">
			<h4>Админ-панель</h4>
			<div className="row">
				<div className="col s12 m6 l4">
					<div className="card green darken-3">
						<div className="card-content white-text">
							<span className="card-title">Вкусы</span>
							<p>Вкусов: 0</p>
						</div>
						<div className="card-action white-text">
							<Link to="/admin/items/add">Добавить</Link>
							<Link to="/admin/items/list">Открыть</Link>
						</div>
					</div>
				</div>
				<div className="col s12 m6 l4">
					<div className="card green darken-3">
						<div className="card-content white-text">
							<span className="card-title">Заказы</span>
							<p>Заказов: 0</p>
						</div>
						<div className="card-action white-text">
							<Link to="/admin/orders">Открыть</Link>
						</div>
					</div>
				</div>
				<div className="col s12 m6 l4">
					<div className="card green darken-3">
						<div className="card-content white-text">
							<span className="card-title">Скидки и промокоды</span>
							<p>Скидок: 0 (Промокодов: 0)</p>
						</div>
						<div className="card-action white-text">
							<Link to="/admin/discount/add">Добавить</Link>
							<Link to="/admin/discount">Открыть</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col s12 m12 l6">
					<div className="card">
						<div className="card-content">
							<span className="card-title">{this.state.UserData.Email}</span>
							<p>Администратор сайта</p>
						</div>
						<div className="card-action">
							<Link to="/admin/user/settings">Настройки</Link>
							<Link to="/admin/logout">Выход</Link>
						</div>
					</div>
				</div>
				<div className="col s12 m12 l6">
					<div className="card">
						<div className="card-content">
							<span className="card-title">Статистика</span>
							<p>Прибыль за последние 30 дней: 0 RUB</p>
						</div>
						<div className="card-action">
							<Link to="/admin/user/settings">Продажи</Link>
							<Link to="/admin/logout">Просмотры</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
}

export default AdminIndex;