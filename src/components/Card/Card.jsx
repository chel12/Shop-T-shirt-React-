import React, { useState } from 'react';
import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import { useDispatch, useSelector } from 'react-redux';
import { onAddToCart } from '../../store/cartSlice/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import { onFavorite } from '../../store/favoriteSlice/favoriteSlice';
import {
	selectAllItems,
	selectGetItemsStatus,
} from '../../store/itemsSlice/selectItems';
import { selectFavorites } from '../../store/favoriteSlice/selectFavorite';

const Card = ({ title, price, img, id, favorited = false }) => {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectGetItemsStatus);
	const favorites = useSelector(selectFavorites);
	const cartItems = useSelector(selectAllItems);

	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.parentId) === Number(id));
	};
	const isItemFavorite = (id) => {
		return favorites.some((obj) => Number(obj.favoriteId) === Number(id));
	};

	const [isFavorite, setIsFavorite] = useState(favorited);
	//описание того что передаём, parent и favorite нужны для того чтобы
	//не потерять обьект и определить его
	const obj = {
		title,
		price,
		img,
		id,
		parentId: id,
		favoriteId: id,
	};

	const onClickPlus = () => {
		dispatch(onAddToCart(obj)); //показать обьект, и эта инфа  уйдёт в вверх
	};

	const onClickFavorite = () => {
		dispatch(onFavorite(obj));
	};

	return (
		<div className={styles.card}>
			{isLoading === 'loading' ? (
				<ContentLoader
					speed={2}
					width={150}
					height={170}
					viewBox="0 0 150 170"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb">
					<rect x="158" y="132" rx="0" ry="0" width="3" height="3" />
					<rect
						x="492"
						y="231"
						rx="0"
						ry="0"
						width="106"
						height="9"
					/>
					<rect x="329" y="86" rx="0" ry="0" width="0" height="1" />
					<rect x="0" y="0" rx="5" ry="5" width="150" height="90" />
					<rect x="0" y="97" rx="5" ry="5" width="150" height="15" />
					<rect x="0" y="116" rx="5" ry="5" width="92" height="15" />
					<rect x="1" y="139" rx="5" ry="5" width="44" height="15" />
					<rect
						x="104"
						y="139"
						rx="5"
						ry="5"
						width="44"
						height="15"
					/>
				</ContentLoader>
			) : (
				<>
					<div className={styles.favorite}>
						{onFavorite && (
							<img
								onClick={onClickFavorite}
								width={22}
								height={22}
								src={
									isItemFavorite(id) || isFavorite
										? '/img/svg/heart-like.svg'
										: '/img/svg/heart-unlike.svg'
								}
								alt="Favorite"
							/>
						)}
					</div>
					<img width={133} height={112} src={img} alt="T-shirt 1" />
					<h5>{title}</h5>
					<div className="d-flex justify-between align-center">
						<div className="d-flex flex-column ">
							<span>Цена:</span>
							<b>{price}</b>
						</div>

						{onAddToCart && (
							<img
								width={30}
								height={30}
								className={styles.plus}
								onClick={onClickPlus}
								src={
									isItemAdded(id)
										? '/img/svg/btn-checked.svg'
										: '/img/svg/btn-plus.svg'
								}
								alt="Plus"
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Card;
