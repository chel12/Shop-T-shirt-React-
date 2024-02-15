import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card/Card';
import axios from 'axios';
import { AppContext } from '../App';

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [isLoad, setIsLoad] = useState(true);

	const { onFavorite, onAddToCart } = useContext(AppContext);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(
					'https://f4b4503d373ac905.mokky.dev/orders'
				);
				//1 вариант как достать массивы и склеить их через flat
				//data.map((obj)=>obj.items.flat())
				//2 вариант как достать массивы и склеить их через flat
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
						addFavorite={(obj) => onFavorite(obj)}
						addCartItem={(obj) => onAddToCart(obj)}
						{...card}
					/>
				))}
			</div>
		</div>
	);
};

export default Orders;
