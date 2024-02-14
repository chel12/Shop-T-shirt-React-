import React from 'react';
import Card from '../components/Card/Card';

const Home = ({
	searchValue,
	onChangeSearchInput,
	data,
	onFavorite,
	onAddToCart,
	cartItems,
	isLoading,
}) => {
	//вынес чтобы сделать компонент загрузки
	const renderItems = () => {
		const filtredItems = data.filter((item) =>
			item.title.toLowerCase().includes(searchValue.toLowerCase())
		);
		const loadArr = Array(8).fill(1); //заглушка для лоадераф
		return (isLoading ? loadArr : filtredItems).map((card) => (
			<Card
				loading={isLoading}
				title={card.title}
				price={card.price}
				img={card.img}
				addFavorite={(obj) => onFavorite(obj)}
				addCartItem={(obj) => onAddToCart(obj)}
				key={card.title}
				added={cartItems.some(
					(obj) => Number(obj.id) == Number(card.id)
				)}
			/>
		));
	};
	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1 className="">
					{searchValue
						? `Поиск по запросу: ${searchValue}`
						: 'Все футболки'}
				</h1>
				<div className="search-block d-flex align-center">
					<img
						src="/img/svg/search.svg"
						width={12}
						height={12}
						alt="Search"
					/>
					<input
						type="text"
						placeholder="Поиск.."
						value={searchValue}
						onChange={onChangeSearchInput}
					/>
				</div>
			</div>

			<div className="d-flex flex-wrap">{renderItems()}</div>
		</div>
	);
};

export default Home;
