import React from 'react';
import Navigation from './components/Navigation';
import axios from 'axios';
import _ from 'underscore';
import { debug } from 'util';
import { Card, CardImg, CardText, CardBody,	CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap';
import Slider from 'react-slick';
import 'normalize.css';
import 'styles/index.scss';
import 'styles/slick.css';
import 'styles/slick-theme.css';

export const axiosInstance = axios.create({
  "baseURL": `http://165.227.93.138`,
  "timeout": 10000,
});

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			"beers": [],
			"evaluations": [],
			"trending": [],
			"oneRow": false
		};

		this.generateBeerGrid = this.generateBeerGrid.bind(this);
		this.generateBeerCard = this.generateBeerCard.bind(this);

		this.fetchEvaluations();
	}

	fetchEvaluations() {
		axiosInstance.get('http://165.227.93.138/userbeer')
			.then(res => {
				this.setState({"evaluations": res.data});
				this.computeTrending();
				// setTimeout(this.fetchEvaluations.bind(this), 1000);
				setTimeout(() => window.location.reload(), 30000);
			})
			.catch(err => {
				debugger;
			});
	}

	computeTrending() {
		// TODO: Remove
		// this.state.evaluations.forEach((evaluation, i) => {
		// 	evaluation.rating = i;
		// });

		const {evaluations} = this.state;

		const grouped = _.groupBy(evaluations, ev => ev.beer.id);
		const averages = Object.keys(grouped).map(beerId => {
			const evals = grouped[beerId].map(user => user.rating);
			const sum = evals.reduce((a,b) => a + b);
			const avg = sum / evals.length;
			return {
				"beer": grouped[beerId][0].beer,
				"avgEval": avg
			}
		});
		const sorted = averages.sort((a, b) => a.avgEval <= b.avgEval)

		this.setState({"trending": sorted});
	}

	generateBeerGrid() {
		const {trending} = this.state;
		const {oneRow} = this.state;

		const settings = {
			infinite: true,
			speed: 500,
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 100
		};

		if (trending && trending.length > 0) {
			if(oneRow) {
				return <div className="cards-container">
					<Row className="card-row" noGutters>
						<Slider {...settings} className="beers-slider">
							{
								trending.map((trend, index) => 
								<div key={index}>
										{this.generateBeerCard(trend.beer, trend.avgEval, oneRow)}
									</div>
								)
							}
						</Slider>
					</Row>
				</div>
			} else {
				const boxes = [];
				for (let i = 0; i < trending.length; i += 2) {
					const beer_1 = trending[i];
					const beer_2 = trending[i+1];
					if(beer_1 && beer_2) {
						boxes.push(
							<div key={i}>
								<div>
									{this.generateBeerCard(beer_1.beer, beer_1.avgEval, oneRow)}
								</div>
								<div>
									{this.generateBeerCard(beer_2.beer, beer_2.avgEval, oneRow)}
								</div>
							</div>
						);
					} else {
						if(beer_1) {
							boxes.push(
								<div key={i}>
									{this.generateBeerCard(beer_1.beer, beer_1.avgEval, oneRow)}
								</div>
							);
						}
					}
				}

				return <div className="two-row-cards-container">
					<Row className="card-row" noGutters>
						<Slider {...settings} className="two-row-beers-slider">
							{
								boxes.map(box => box)
							}
						</Slider>
					</Row>
				</div>	
			}
		}

		return <div></div>
	}

	generateBeerCard(beer, rating, oneRow) {
		if(beer) {
			return <Card inverse className= { oneRow ? "beer-card" : "two-row-beer-card" }>
					<CardTitle>{`${beer.beer_name}`}</CardTitle>
					<Row className="content-row">
						<Col>
							<CardImg top src={beer.img_path} alt="Beer image" className="beer-img" />
						</Col>
						<Col className="text-column">
							<CardBody>
								<CardSubtitle>{beer.type}</CardSubtitle>
								<CardText>{beer.brewery}</CardText>
								<CardText>{`${rating}/5`}</CardText>
									<Row>
										{this.renderStars(rating).map((item, index) => <Col md="1" key={index}>{item}</Col>)}
									</Row>
							</CardBody>
						</Col>
					</Row>
				</Card>
		}

		return <div></div>;
	}

	renderStars(nStars) {
		const stars = [];
		for (let index = 0; index < nStars; index++) {
			stars.push(<img src={require("styles/assets/star.png")} key={index} className="rating-star"/>);
		}

		return stars;
	}

	render() {
		return (
			<div className='App'>
				<Row className="header-row">
					<Col>
						<img src={require('styles/assets/LogoDegusta.png')} className="header-logo" />
					</Col>
					<Col>
						<img src={require('styles/assets/LogoCervejeiroSmall.png')} className="header-logo" />
					</Col>
				</Row>
				{this.generateBeerGrid()}
			</div>
		)
	}
}
