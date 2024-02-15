import React, { useContext, useState } from 'react';
import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import { AppContext } from '../../App';

const Card = ({
	title,
	price,
	img,
	addFavorite,
	addCartItem,
	favorited = false,
	id,
	loading = false,
}) => {
	const { isItemAdded } = useContext(AppContext);
	const [isFavorite, setIsFavorite] = useState(favorited);

	const obj = { title, price, img, id };

	const onClickPlus = () => {
		addCartItem(obj); //показать обьект, и эта инфа  уйдёт в вверх
	};

	const onClickFavorite = () => {
		addFavorite(obj);
		setIsFavorite(!isFavorite);
		
	};

	return (
		<div className={styles.card}>
			{loading ? (
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
							src={
								isItemAdded(id)
									? '/img/svg/btn-checked.svg'
									: '/img/svg/btn-plus.svg'
							}
							alt="Plus"
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default Card;
