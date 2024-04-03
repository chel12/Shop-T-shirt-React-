import axios from 'axios';
import React, { useContext, useState } from 'react';

import { AppContext } from '../../App';
import EmptyDrawer from '../EmptyDrawer/EmptyDrawer';
import styles from './Drawer.module.scss';
import {
	getTotalPrice,
	onRemoveItem,
	setCartItems,
} from '../../store/cartSlice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cartSlice/selectCart';

const Drawer = ({ opened }) => {
	const cartItems = useSelector(selectCartItems);
	const totalPrice = useSelector(getTotalPrice);

	const [isOrderComplete, setIsOrderComplete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [orderId, setOrderId] = useState(null);

	const dispatch = useDispatch();

	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post(
				'https://f4b4503d373ac905.mokky.dev/orders',
				{ items: cartItems }
			);
			await axios.patch('https://f4b4503d373ac905.mokky.dev/cart', []);
			setOrderId(data.id);
			setIsOrderComplete(true);
			dispatch(setCartItems([]));
		} catch (error) {
			console.log(error.message);
		}
		setIsLoading(false);
	};

	const { setCartOpened } = useContext(AppContext);
	return (
		<div
			// onClick={() => {
			// 	setCartOpened(false);
			// }} //если нужен клик по оверлей для закрытия
			className={`${styles.overlay} ${
				opened ? styles.overlayVisible : ''
			}`}>
			<div className={styles.drawer}>
				<h2 className="d-flex justify-between mb-30 ">
					Корзина
					<img
						onClick={() => setCartOpened(false)}
						className={` ${styles.removeBtn} cu-p`}
						src="/img/svg/btn-remove.svg"
						alt="Remove"
					/>
				</h2>

				{cartItems.length > 0 ? (
					<div className="d-flex flex-column flex">
						<div className={styles.items}>
							{cartItems.map((item, index) => (
								<div
									className={`${styles.cartItem} d-flex align-center mb-20`}
									key={index}>
									<div
										style={{
											backgroundImage: `url(${item.img})`,
										}}
										className={styles.cartItemImg}></div>

									<div className="mr-20 flex ">
										<p className="mb-5">{item.title}</p>
										<b>{item.price}</b>
									</div>
									<img
										onClick={() => {
											dispatch(onRemoveItem(item));
										}}
										className={styles.removeBtn}
										src="/img/svg/btn-remove.svg"
										alt="Remove"
									/>
								</div>
							))}
						</div>
						<div className={styles.cartTotalBlock}>
							<ul>
								<li>
									<span>Итого: </span>
									<div></div>
									<b>{totalPrice} руб.</b>
								</li>
								<li>
									<span>Кешбек 5%</span>
									<div></div>
									<b>{totalPrice * 0.05} баллов</b>
								</li>
							</ul>
							<button
								className={styles.blueButton}
								disabled={isLoading}
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
								? `Ваш заказ ${orderId} успешно оформлен`
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
