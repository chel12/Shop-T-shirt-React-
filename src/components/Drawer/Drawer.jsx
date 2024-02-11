import React from 'react';

const Drawer = () => {
	return (
		<div style={{ display: 'none' }} className="overlay">
			<div className="drawer">
				<h2 className="d-flex justify-between mb-30 ">
					Корзина
					<img
						className="removeBtn cu-p"
						src="/img/svg/btn-remove.svg"
						alt="Remove"
					/>
				</h2>
				<div className="items">
					<div className="cartItem d-flex akign-center mb-20">
						<div
							style={{
								backgroundImage: 'url(img/t-shirt/2.jpg)',
							}}
							className="cartItemImg"></div>

						<div className="mr-20 flex">
							<p className="mb-5">Имя товара 2</p>
							<b>1 000 руб.</b>
						</div>
						<img
							className="removeBtn"
							src="/img/svg/btn-remove.svg"
							alt="Remove"
						/>
					</div>
					<div className="cartItem d-flex akign-center mb-20">
						<div
							style={{
								backgroundImage: 'url(img/t-shirt/1.jpg)',
							}}
							className="cartItemImg"></div>

						<div className="mr-20 flex">
							<p className="mb-5">Имя товара 1</p>
							<b>2 000 руб.</b>
						</div>
						<img
							className="removeBtn"
							src="/img/svg/btn-remove.svg"
							alt="Remove"
						/>
					</div>
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
