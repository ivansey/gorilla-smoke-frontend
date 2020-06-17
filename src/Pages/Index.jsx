import React from 'react';
import axios from "axios";
import cookies from "react-cookies";
import {Link} from "react-router-dom";
import Smiles from "../smiles/Index";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Index extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			LoginStatus: false,
			UserData: {},
			Items: [{}],
		}

		if (this.props.location.search === "?reload=true") {
			document.location.href = "/";
		}

		this.CheckLoginStatus = this.CheckLoginStatus.bind(this);
		this.GetItems = this.GetItems.bind();

		this.CheckLoginStatus();
		this.GetItems();
	}

	SliderConfig = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1
	}

	SliderConfigM = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
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

	bg0 = {
		"background": "url('/bg0.jpg')",
		"background-repeat": "no-repeat",
		"background-position-y": "top",
		"background-size": "contain",
	}

	render() {
		return <div>
			<div style={this.bg0}>
				<div className="block white-text center-align">
					<div className="container">
						<br/>
						<h3>НЕМНОГО О ТАБАКЕ</h3>
						<h3 className="title">Gorilla Smoke</h3>
						<br/>
						<div className="left-align row">
							<div className="col m6 s12">
								<div className="card small extra grey darken-4">
									<div className="card-content">
										<img className="smile" src={Smiles.Leaf} alt=""/>
										<p>В ОСНОВЕ ТАБАКА "GORILLA SMOKE" ЗАЛОЖЕНЫ СТАРЕЙШИЕ СОРТА ТАБАЧНЫХ ЛИСТЬЕВ
											СОРТОВ
											VIRGINIA И BURLEY ИЗ БРАЗИЛИИ, ИСПАНИИ, АРГЕНТИНЫ.</p></div>
								</div>
							</div>
							<div className="col m6 s12">
								<div className="card small extra grey darken-4">
									<div className="card-content"><img className="smile" src={Smiles.Delicious} alt=""/>
										<p>ЗА ЯРКОСТЬ ВКУСА, НАСЫЩЕННОСТЬ И АРОМАТИКУ ОТВЕЧАЮТ АРОМАТИЗАТОРЫ ИНДЕТИЧНЫЕ
											НАТУРАЛЬНЫМ ИЗ ЕВРОПЫ.</p></div>
								</div>
							</div>
							<div className="col m6 s12">
								<div className="card small extra grey darken-4">
									<div className="card-content"><img className="smile" src={Smiles.Arrow} alt=""/>
										<p>СЫРЬЕ ПРОХОДИТ ПРЕДВАРИТЕЛЬНЫЙ ПРОЦЕСС ФЕРМЕНТАЦИИ И ВЫДЕРЖКИ.</p></div>
								</div>
							</div>
							<div className="col m6 s12">
								<div className="card small extra grey darken-4">
									<div className="card-content"><img className="smile" src={Smiles.Fire} alt=""/>
										<p>ТАБАК ОБЛАДАЕТ ВЫСОКОЙ ЖАРОСТОЙКОСТЬЮ, ВОЖМОСНОСТЬЮ БЫСТРО ВОССТАНАВЛИВАТЬСЯ
											ПОСЛЕ
											ПЕРЕГРЕВА.</p></div>
								</div>
							</div>
							<div className="col m6 s12">
								<div className="card small extra grey darken-4">
									<div className="card-content"><img className="smile" src={Smiles.Package} alt=""/>
										<p>ТАБАК СРЕДНЕЙ КРЕПКОСТИ, ПОСТАВЛЯЕТСЯ В ВАКУУМНОМ ПАКЕТЕ И УДОБНОЙ
											ПЛАСТИКОВОЙ
											ШАЙБЕ.</p></div>
								</div>
							</div>
							<div className="col m6 s12">
								<div className="card small extra grey darken-4">
									<div className="card-content"><img className="smile" src={Smiles.Receipt} alt=""/>
										<p>ВЕСЬ ПРОЦЕСС ВАРЕНИЯ ПРОИСХОДИТ ПОД СТРОГИМ ТЕХНОЛОГИЧЕСКИМ НАДЗОРОМ И
											КОНТРОЛЕМ
											ВСЕГО
											ПРОЦЕССА ОТ ВЗВЕШИВАНИЯ ДО ТЕМПЕРАТУРЫ</p></div>
								</div>
							</div>
						</div>
						<br/>
					</div>
				</div>
				<div className="block white-text center-align">
					<div className="container">
						<br/>
						<h3>ПОЧЕМУ ВАМ ЛУЧШЕ СОТРУДНИЧАТЬ С НАМИ?</h3>
						<div className="left-align row">
							<div className="col m6 s12">
								<div className="card small extra grey darken-4">
									<div className="card-content">
										<img className="smile" src={Smiles.CreditCard} alt=""/>
										<p>ПРОСТАЯ ФОРМА ЗАКАЗА ПОМОГУТ СДЕЛАТЬ ЕГО МАКСИМАЛЬНО БЫСТРО БЕЗ ЛИШНИХ ЗАТРАТ
											ВРЕМЕНИ.</p></div>
								</div>
							</div>
							<div className="col m6 s12">
								<div className="card small extra grey darken-4">
									<div className="card-content">
										<img className="smile" src={Smiles.Package} alt=""/>
										<p>ПРОДУКЦИЯ ВЫСОКОГО КАЧЕСТВА, ЧТО ОБУСЛОВЛЕНО ИСПОЛЬЗОВАНИЕМ ПРОВЕРЕННЫХ
											ЕВРОПЕЙСКИХ
											КОМПОНЕНТОВ И СОВРЕМЕННЫХ ТЕХНОЛОГИЙ, ПРИМЕНЯЕМЫХ ПРИ ПРОИЗВОДСТВЕ
											ТАБАКА.</p></div>
								</div>
							</div>
							<div className="col m6 s12">
								<div className="card small extra grey darken-4">
									<div className="card-content">
										<img className="smile" src={Smiles.CreditCard} alt=""/>
										<p>УДОБНЫЕ ВАРИАНТЫ ОПЛАТЫ И СПРАВЕДЛИВЫЕ ЦЕНЫ, ЧТО ГАРАНТИРУЕТ ВЫСОКУЮ
											МАРЖИНАЛЬНОСТЬ
											ПРОДУКТА.</p></div>
								</div>
							</div>
							<div className="col m6 s12">
								<div className="card small extra grey darken-4">
									<div className="card-content">
										<img className="smile" src={Smiles.Package} alt=""/>
										<p>МЫ ВЫДЕЛЯЕМ ПРОДУКЦИЮ ДЛЯ ПРОВЕДЕНИЯ ДЕГУСТАЦИЙ.</p></div>
								</div>
							</div>
							<div className="col m12 s12">
								<div className="card small extra grey darken-4">
									<div className="card-content">
										<img className="smile" src={Smiles.Adult} alt=""/>
										<p>НАШИМ ПАРТНЕРОМ МОЖЕТ СТАТЬ ЛЮБОЙ ЦЕЛЕУСТРЕМЛЕННЫЙ ЧЕЛОВЕК, РАЗБИРАЮЩИЙСЯ В
											ИНДУСТРИИ И
											ГОТОВЫЙ РАЗВИВАТЬСЯ ВМЕСТЕ С НАМИ!</p></div>
								</div>
							</div>
						</div>
						<br/>
					</div>
				</div>
				<div className="block white-text center-align">
					<div className="container">
						<br/>
						<h3>ПОПРОБУЙТЕ НАШИ ВКУСЫ</h3>
						<div className="left-align">
							<Slider className="slider-l" {...this.SliderConfig}>
								{
									this.state.Items.map((e) => {
										return <div className="card-padding text-primary">
											<div className={`card ${e.ColorHEX}`}>
												<div className="card-content">
													<img src={e.IconURL} className="itemIcon" alt=""/>
													<br/>
													<p className="card-title">{e.Name}</p>
												</div>
												<Link to={`/item/${e._id}`} className="btn-flat waves-effect waves-teal text-primary">ПОДРОБНЕЕ</Link>
											</div>
										</div>
									})
								}
							</Slider>
							<Slider className="slider-m" {...this.SliderConfigM}>
								{
									this.state.Items.map((e) => {
										return <div to={`/item/${e._id}`} className="card-padding">
											<div className={`card ${e.ColorHEX}`}>
												<div className="card-content">
													<img src={e.IconURL} className="itemIcon" alt=""/>
													<br/>
													<p className="card-title">{e.Name}</p>
												</div>
												<Link to={`/item/${e._id}`} className="btn-flat waves-effect waves-teal text-primary">ПОДРОБНЕЕ</Link>
											</div>
										</div>
									})
								}
							</Slider>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
}

export default Index;
