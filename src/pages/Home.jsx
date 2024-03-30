
import Card from '../components/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectAllItems,
	selectGetItemsStatus,
} from '../store/itemsSlice/selectItems';
import { onFavorite } from '../store/favoriteSlice/favoriteSlice';

const Home = ({ searchValue, onChangeSearchInput }) => {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectGetItemsStatus);
	const data = useSelector(selectAllItems);
	//вынес чтобы сделать компонент загрузки
	const renderItems = () => {
		const filtredItems = data.filter((item) =>
			item.title.toLowerCase().includes(searchValue.toLowerCase())
		);
		const loadArr = Array(8).fill(1); //заглушка для лоадераф
		return (isLoading === 'loading' ? loadArr : filtredItems).map((card) => (
			<Card
				title={card.title}
				price={card.price}
				img={card.img}
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
