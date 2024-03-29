import React, { useContext } from 'react';
import { AppContext } from '../App';
import Card from '../components/Card/Card';
import { useSelector } from 'react-redux';
import { selectAllItems } from '../store/itemsSlice/selectItems';

const Home = ({ searchValue, onChangeSearchInput, onAddToCart, isLoading }) => {
	const { onFavorite } = useContext(AppContext);
	
	const data = useSelector(selectAllItems);
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
				
				key={card.id}
				{...card}
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
