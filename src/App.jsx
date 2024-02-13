import Card from './components/Card/Card';
import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';
import Wrapper from './components/Wrapper/Wrapper';
import { arr } from './BD/bd';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
	//для корзины
	const [cartOpened, setCartOpened] = useState(false);

	//стейте для  добавления в корзину
	const [cartItems, setCartItems] = useState([]);

	//стейте для  добавления в корзину
	const [favorites, setFavorites] = useState([]);

	//стейте с кроссами приходит с сервака
	const [data, setData] = useState([]);

	//поиск
	const [searchValue, setSearchValue] = useState('');

	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value);
	};

	//добавление карточки в корзину
	const onAddToCart = (obj) => {
		axios.post('https://65c9fced3b05d29307df6ad6.mockapi.io/cart', obj);
		setCartItems((prev) => [...prev, obj]);
		// это как setCartItems([...cartItems, obj]);
	};
	//добавление карточки в Избранное
	const onFavorite = (obj) => {
		axios.post('https://65c9fced3b05d29307df6ad6.mockapi.io/favorite', obj);
		setFavorites((prev) => [...prev, obj]);
	};
	const onRemoveItem = (id) => {
		axios.delete(`https://65c9fced3b05d29307df6ad6.mockapi.io/cart/${id}`);
		setCartItems((prev) => prev.filter((item) => item.id != id));
	};
	//запрос на сервак за кроссами
	const getData = () => {
		// fetch('https://65c9fced3b05d29307df6ad6.mockapi.io/items')
		// 	.then((res) => {
		// 		return res.json();
		// 	})
		// 	.then((json) => {
		// 		setData(json);
		// 	});
		axios //сразу возвращает норм запрос
			.get('https://65c9fced3b05d29307df6ad6.mockapi.io/items')
			.then((res) => {
				setData(res.data);
			});
	};
	const getDataDrawer = () => {
		axios //сразу возвращает норм запрос
			.get('https://65c9fced3b05d29307df6ad6.mockapi.io/cart')
			.then((res) => {
				setCartItems(res.data);
			});
	};

	useEffect(() => {
		getData();
		// getDataDrawer();
	}, []);

	return (
		<Wrapper>
			{cartOpened && (
				<Drawer
					cartItems={cartItems}
					onCloseDrawer={() => {
						setCartOpened(false);
					}}
					onRemoveItem={onRemoveItem}></Drawer>
			)}
			<Header onOpenDrawer={() => setCartOpened(true)}></Header>
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
		</Wrapper>
	);
}

export default App;
