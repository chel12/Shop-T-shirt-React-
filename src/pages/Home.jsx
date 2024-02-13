import React from 'react';
import Card from '../components/Card/Card';

const Home = ({
	searchValue,
	onChangeSearchInput,
	data,
	onFavorite,
	onAddToCart,
}) => {
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

			<div className="d-flex flex-wrap">
				{data
					.filter(
						(
							item //поиск по всем товарам
						) =>
							item.title
								.toLowerCase() //перевод в один регистр
								.includes(searchValue.toLowerCase()) //ищет вхождения
					)
					.map((card) => (
						<Card
							title={card.title}
							price={card.price}
							img={card.img}
							addFavorite={(obj) => onFavorite(obj)}
							addCartItem={(obj) => onAddToCart(obj)}
							key={card.title}
						/>
					))}
			</div>
		</div>
	);
};

export default Home;
