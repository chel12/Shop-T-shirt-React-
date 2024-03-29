import React, { useContext } from 'react';
import Card from '../components/Card/Card';
import { AppContext } from '../App';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../store/favoriteSlice/selectFavorite';

const Favorites = () => {
	const favorites = useSelector(selectFavorites);
	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1 className=""> Избранное </h1>
			</div>

			<div className="d-flex flex-wrap">
				{favorites.map(({ ...card }) => (
					<Card
						key={card.id}
						favorited={true}
						// addFavorite={(obj) => {
						// 	onFavorite(obj);
						// }}
						{...card}
					/>
				))}
			</div>
		</div>
	);
};

export default Favorites;
