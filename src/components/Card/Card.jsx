import React from 'react';
import styles from './Card.module.scss';

const Card = ({ title, price, img }) => {
	const onClickButton = () => {
		alert(title);
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
				<button className="button" onClick={onClickButton}>
					<img
						width={11}
						height={11}
						src="/img/svg/plus.svg"
						alt="Plus"
					/>
				</button>
			</div>
		</div>
	);
};

export default Card;
