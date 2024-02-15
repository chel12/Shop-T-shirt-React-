import React from 'react';
import Card from '../components/Card/Card';

const Orders = () => {
	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1 className=""> Мои заказы </h1>
			</div>

			<div className="d-flex flex-wrap">
				{[].map((card) => (
					<Card {...card} />
				))}
			</div>
		</div>
	);
};

export default Orders;
