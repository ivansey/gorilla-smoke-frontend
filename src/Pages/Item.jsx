import React from 'react';
import axios from "axios";
import cookies from "react-cookies";
import {Link} from "react-router-dom";

class Item extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			LoginStatus: false,
			UserData: {},
			Item: {},
			Response: "LOADING",
		}

		this.CheckLoginStatus = this.CheckLoginStatus.bind(this);
		this.Get = this.Get.bind();

		this.CheckLoginStatus();
		this.Get();
	}

	Get = () => {
		axios.post("/frontendapi/items/", {SendData: {_id: this.props.match.params.id}}).then(async (data) => {
			this.setState({Item: data.data.Data, Response: data.data.Response})
			console.log(data.data.Data)
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
								<pre>{this.state.Item.Description}</pre>
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

export default Item;