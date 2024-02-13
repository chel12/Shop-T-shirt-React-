import React from 'react';
import Card from '../components/Card/Card';

const Favorites = ({ favorites, onFavorite, onAddToCart }) => {
	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1 className=""> Избранное </h1>
				<div className="search-block d-flex align-center"></div>
			</div>

			<div className="d-flex flex-wrap">
				{favorites.map((card) => (
					<Card
						title={card.title}
						price={card.price}
						img={card.img}
						addFavorite={(obj) => onFavorite(obj)}
						addCartItem={(obj) => onAddToCart(obj)}
						key={card.title}
					/>
				))}
			</div>
		</div>
	);
};

export default Favorites;
