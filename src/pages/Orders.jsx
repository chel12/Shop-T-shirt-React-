import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card/Card';
import axios from 'axios';

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [isLoad, setIsLoad] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(
					'https://f4b4503d373ac905.mokky.dev/orders'
				);
				setOrders(
					data.reduce((prev, obj) => [...prev, ...obj.items], [])
				);
				setIsLoad(false);
			} catch (error) {
				console.log(error.message);
			}
		})();
	}, []);
	const loadArr = Array(8).fill(1); //заглушка для лоадераф
	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1 className=""> Мои заказы </h1>
			</div>

			<div className="d-flex flex-wrap">
				{(isLoad ? loadArr : orders).map((card) => (
					<Card
						key={card.id}
						loading={isLoad}
						{...card}
					/>
				))}
			</div>
		</div>
	);
};

export default Orders;
