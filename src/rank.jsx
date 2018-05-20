import React from 'react';
import Navigation from './components/Navigation';
import axios from 'axios';
import _ from 'underscore';
import { debug } from 'util';
import { Card, CardImg, CardText, CardBody,	CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap';
import Slider from 'react-slick';
import Rating from 'react-rating';
import 'normalize.css';
import 'styles/index.scss';
import 'styles/fa/font-awesome.min.css';

const noImage = require('styles/assets/no-image-available.png');
const logoDegusta = require('styles/assets/LogoDegusta.png');
const logoCervejeiro = require('styles/assets/LogoCervejeiroSmall.png');

export const axiosInstance = axios.create({
  "baseURL": `http://165.227.93.138`,
  "timeout": 10000,
});

export default class Rank extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			"rank": [{"beer_name":"Opera Opus","country":"Brasil","color":"","type":"Weissbier","year":"2004","abv":"4%","malte":"","lupulo":"","ibu":"16 IBU","brewery":"Opera","rate_beer":null,"calories":null,"temperature":"C a C","description":"","img_path":"http://165.227.93.138/images/beers-large/opera-opus.jpg","thumb_path":null,"active":1,"id":12812,"createdAt":null,"updatedAt":null,"rating":4.857142857142857,"countRating":7},{"beer_name":"Invicta Big Boss","country":"Brasil","color":"","type":"Imperial IPA","year":"2004","abv":"8.0%","malte":"","lupulo":"","ibu":"115 IBU","brewery":"Invicta","rate_beer":null,"calories":null,"temperature":"C a C","description":"A Big Boss 75 a verso sazonal e turbinada da consagrada cerveja Invicta Bossa e a primeira da marca a ser envasada na lata.\n\nCom o dobro de lpulos no dry-hopping, ela promete ser uma exploso de aromas!\n\nDicas de harmonizao: carne de porco, carne assada, comida mexicana.","img_path":"http://165.227.93.138/images/beers-large/invicta-big-boss","thumb_path":null,"active":1,"id":12813,"createdAt":null,"updatedAt":null,"rating":3.5,"countRating":6},{"beer_name":"Hop & Pluizig","country":"Brasil","color":"","type":"IPA - American","year":"2004","abv":"6,5%","malte":"","lupulo":"","ibu":"60 IBU","brewery":"Dogma/De Molen","rate_beer":null,"calories":null,"temperature":"C a C","description":"Hazy ipa com citra, simcoe e galaxy.","img_path":"http://165.227.93.138/images/beers-large/dogma-hop-pluizig.jpg","thumb_path":null,"active":1,"id":12814,"createdAt":null,"updatedAt":null,"rating":4,"countRating":5},{"beer_name":"Greene King Wexford Irish","country":"Inglaterra","color":"","type":"Cream Ale","year":"2004","abv":"5%","malte":"","lupulo":"","ibu":"","brewery":"Greene King","rate_beer":null,"calories":null,"temperature":"C a C","description":"A cerveja Wexford Irish Cream Ale 128 fermentada atravs do legitimo e original estilo irlands de fazer cerveja: ela  naturalmente macia e cremosa. O suave sabor das frutas utilizadas em sua composio  complementado por sutis toques de lpulo.","img_path":"http://165.227.93.138/images/beers-large/greene-king-wexford.png","thumb_path":null,"active":1,"id":12815,"createdAt":null,"updatedAt":null,"rating":4.4,"countRating":5},{"beer_name":"Kirchen Pineapple Mint","country":"Brasil","color":"","type":"Berliner Weisse","year":"2004","abv":"4,8%","malte":"","lupulo":"","ibu":"3 IBU","brewery":"Cervejaria Kirchen","rate_beer":null,"calories":null,"temperature":"","description":"Uma Berliner Weisse com a acidez do abacaxi aliada a refrescancia do hortela. Um convite para aproveitar os dias quentes de vero.","img_path":"http://165.227.93.138/images/beers-large/kirchen-pineapple-mint.png","thumb_path":null,"active":1,"id":12816,"createdAt":null,"updatedAt":null,"rating":4.333333333333333,"countRating":6}],
		};

		// this.fetchEvaluations();
	}

	fetchEvaluations() {
		axiosInstance.get('http://165.227.93.138/beertrip/topfive')
			.then(res => {
                console.log(res);
                debugger;
				this.setState({"rank": res.data});
			})
			.catch(err => {
				debugger;
			});
    }
    
    renderBeer(beer, i) {
        return (
            <Row key={i} className="ranking-row">
                {
                /*
                <Col md={1}>
                    {i+1}
                </Col>
                */
                }
                <Col md={2}>
                    <img src={beer.img_path} onError={this.addDefaultSrc} className="beer-img"/>
                </Col>
                <Col md={4}>
                    {beer.beer_name}
                </Col>
                <Col md={4}>
                    {beer.type}
                </Col>
                <Col md={1}>
                    {parseFloat(beer.rating).toPrecision(2)}
                </Col>
            </Row>
        )
    }

    addDefaultSrc(ev){
        ev.target.src = noImage;
    }

	render() {
		return (
			<div className='App'>
				<Row className="header-row">
					<Col>
						<a href='/rank'>
                            <img src={logoDegusta} className="header-logo" />
                        </a>
					</Col>
					<Col className="header-title-container">
						<span className="header-title">Avaliação das cervejas Degusta Sanca</span>
					</Col>
					<Col>
						<a href='/'>
                            <img src={logoCervejeiro} className="header-logo" />
                        </a>
					</Col>
				</Row>
				<div className="beer-ranking">
                    {this.state.rank.map((beer, i) => this.renderBeer(beer, i))}
				</div>
			</div>
		)
	}
}
