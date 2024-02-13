import React from 'react';
import EmptyDrawer from '../EmptyDrawer/EmptyDrawer';

const Drawer = ({ onCloseDrawer, cartItems, onRemoveItem }) => {
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
				{cartItems.length > 0 ? (
					<div>
						<div className="items">
							{cartItems.map((item) => (
								<div
									className="cartItem d-flex align-center mb-20"
									key={item.title}>
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
										onClick={() => {
											onRemoveItem(item.id);
										}}
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
				) : (
					<EmptyDrawer
						onClose={onCloseDrawer}
						title={'Корзина пуста'}
						description={'Нет добавленных товаров'}
						img={'/img/svg/sad.svg'}
					/>
				)}
			</div>
		</div>
	);
};

export default Drawer;
