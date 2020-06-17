import React from 'react';
import axios from "axios";
import cookies from "react-cookies";
import {Link} from "react-router-dom";

class OrderNew extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			LoginStatus: false,
			UserData: {},
			Items: [{}],
			Response: "LOADING",
		}

		this.CheckLoginStatus = this.CheckLoginStatus.bind(this);
		this.GetItems = this.Get.bind();

		this.CheckLoginStatus();
		this.GetItems();
	}

	GetItems = () => {
		axios.post("/frontendapi/items/get", {}).then(async (data) => {
			this.setState(Object.assign(this.state, {Items: data.data.Data}))
			console.log(data.data);
		})
	}

	CheckLoginStatus = () => {
		axios.post("/frontendapi/users/auth/get", {
			Token: cookies.load("Token"),
		}).then(async (data) => {
			if (data.data.Response === "OK") {
				this.setState(Object.assign(this.state, {
					LoginStatus: true,
					UserData: data.data.Data,
					Response: "OK",
				}))
			}
		})
	};

	render() {
		return <div>
			<div>
				<div className="block white-text">
					<div className="container">
						<br/>
						<div className="card grey darken-4 col s12 left-align">
							<div className="card-content">
								<div className={`card ${this.state.Item.ColorHEX}`}>
									<div className="card-content">
										<img src={this.state.Item.IconURL} alt="" className="itemIcon"/>
										<p className="card-title">{this.state.Item.Name}</p>
									</div>
								</div>
								<br/>
								<p>{this.state.Item.Description}</p>
							</div>
							<div className="card-action">
								<Link to="/order/new">СДЕЛАТЬ ЗАКАЗ</Link>
							</div>
						</div>
						<br/>
					</div>
				</div>
			</div>
		</div>
	}
}

export default OrderNew;