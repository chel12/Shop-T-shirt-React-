import React, { useState } from 'react';
import styles from './Card.module.scss';

const Card = ({ title, price, img, onClickAdd }) => {
	const [isAdded, setIsAdded] = useState(false);

	const onClickPlus = () => {
		setIsAdded(!isAdded);
		console.log(isAdded);
	};

	return (
		<div className={styles.card}>
			<div className={styles.favorite}>
				<img
					width={22}
					height={22}
					src="/img/svg/heart-unlike.svg"
					alt="Heart unliked"
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
