import React from 'react';

const Drawer = ({ onCloseDrawer, cartItems }) => {
	return (
		<div className="overlay">
			<div className="drawer">
				<h2 className="d-flex justify-between mb-30 ">
					Корзина
					<img
						onClick={onCloseDrawer}
						className="removeBtn cu-p"
						src="/img/svg/btn-remove.svg"
						alt="Remove"
					/>
				</h2>
				<div className="items">
					{cartItems.map((item) => (
						<div className="cartItem d-flex align-center mb-20">
							<div
								style={{
									backgroundImage: `url(${item.img})`,
								}}
								className="cartItemImg"></div>

							<div className="mr-20 flex ">
								<p className="mb-5">{item.title}</p>
								<b>{item.price}</b>
							</div>
							<img
								className="removeBtn"
								src="/img/svg/btn-remove.svg"
								alt="Remove"
							/>
						</div>
					))}
				</div>
				<div className="cartTotalBlock">
					<ul>
						<li>
							<span>Итого: </span>
							<div></div>
							<b>10 000 руб.</b>
						</li>
						<li>
							<span>Налог 5%</span>
							<div></div>
							<b>1 074 руб.</b>
						</li>
					</ul>
					<button className="blueButton">
						Оформить заказ
						<img
							src="/img/svg/arrow-right.svg"
							alt="Arrow"
							width={20}
							height={20}
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Drawer;
