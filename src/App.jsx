import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import Header from "./Components/Header";

import "./App.css";

import "jquery";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import "@mdi/font/css/materialdesignicons.min.css";

import AdminLogin from "./Pages/AdminPanel/Login";
import Index from "./Pages/Index";
import AdminIndex from "./Pages/AdminPanel/Index";
import AdminItemsList from "./Pages/AdminPanel/Items/List";
import AdminItemsAdd from "./Pages/AdminPanel/Items/Add";
import AdminItemsEdit from "./Pages/AdminPanel/Items/Edit";
import Item from "./Pages/Item";

class App extends React.Component {
	componentDidMount() {
		document.addEventListener('DOMContentLoaded', function () {
			let elems = document.querySelectorAll('select');
			window.M.FormSelect.init(elems, {});
		});
	}

	render() {
		return <div className="App">
			<BrowserRouter>
				<Header/>
				<Route path="/" exact component={Index}/>
				<Route path="/item/:id" exact component={Item}/>

				<Route path="/admin" exact component={AdminIndex}/>
				<Route path="/admin/login" exact component={AdminLogin}/>

				<Route path="/admin/items/list" exact component={AdminItemsList}/>
				<Route path="/admin/items/add" exact component={AdminItemsAdd}/>
				<Route path="/admin/items/edit/:id" exact component={AdminItemsEdit}/>
			</BrowserRouter>
		</div>
	}
}

export default App;
