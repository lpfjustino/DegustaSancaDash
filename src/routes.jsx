import React from 'react';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import App from './app';
import Rank from './rank';
import App2 from './app-2';
import About from './components/About';
import Sample from './components/Sample';
import 'styles/index.scss';

export default class Routes extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={App}/>
					<Route exact path="/rank" component={Rank}/>
					<Route exact path="/two" component={App2}/>
					<Route path="/about" component={About}/>
					<Route path="/sample" component={Sample}/>
				</div>
			</Router>
		)
	}
}
