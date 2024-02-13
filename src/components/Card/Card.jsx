import React, { useState } from 'react';
import styles from './Card.module.scss';

const Card = ({
	title,
	price,
	img,
	addFavorite,
	addCartItem,
	favorited = false,
	id,
}) => {
	const [isAdded, setIsAdded] = useState(false);
	const [isFavorite, setIsFavorite] = useState(favorited);

	const onClickPlus = () => {
		addCartItem({ title, price, img, id }); //показать обьект, и эта инфа  уйдёт в вверх
		setIsAdded(!isAdded);
	};
	const onClickFavorite = () => {
		addFavorite({ title, price, img, id });
		setIsFavorite(!isFavorite);
		console.log();
	};

	return (
		<div className={styles.card}>
			<div className={styles.favorite}>
				<img
					onClick={onClickFavorite}
					width={22}
					height={22}
					src={
						isFavorite
							? '/img/svg/heart-like.svg'
							: '/img/svg/heart-unlike.svg'
					}
					alt="Favorite"
				/>
			</div>
			<img width={133} height={112} src={img} alt="T-shirt 1" />
			<h5>{title}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column ">
					<span>Цена:</span>
					<b>{price}</b>
				</div>

				<img
					width={30}
					height={30}
					className={styles.plus}
					onClick={onClickPlus}
					src={`/img/svg/${
						isAdded ? `btn-checked.svg` : `btn-plus.svg`
					}`}
					alt="Plus"
				/>
			</div>
		</div>
	);
};

export default Card;
