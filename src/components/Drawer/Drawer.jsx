import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import EmptyDrawer from '../EmptyDrawer/EmptyDrawer';

const Drawer = ({ cartItems, onRemoveItem }) => {
	const [isOrderComplete, setIsOrderComplete] = useState(false);
	const onClickOrder = () => {
		setIsOrderComplete(true);
		setCartItems([]);
	};

	const { setCartOpened, setCartItems } = useContext(AppContext);
	return (
		<div className="overlay">
			<div className="drawer">
				<h2 className="d-flex justify-between mb-30 ">
					Корзина
					<img
						onClick={() => setCartOpened(false)}
						className="removeBtn cu-p"
						src="/img/svg/btn-remove.svg"
						alt="Remove"
					/>
				</h2>

				{cartItems.length > 0 ? (
					<div className="d-flex flex-column flex">
						<div className="items">
							{cartItems.map((item, index) => (
								<div
									className="cartItem d-flex align-center mb-20"
									key={index}>
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
							<button
								className="blueButton"
								onClick={onClickOrder}>
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
						onClose={() => {
							setCartOpened(false);
						}}
						title={
							isOrderComplete
								? 'Поздравляем с покупкой!'
								: 'Корзина пуста'
						}
						description={
							isOrderComplete
								? `Ваш заказ №1`
								: 'Нет добавленных товаров'
						}
						textBtn={'Вернуться назад'}
						img={
							isOrderComplete
								? '/img/svg/order.svg'
								: '/img/svg/sad.svg'
						}
					/>
				)}
			</div>
		</div>
	);
};

export default Drawer;
