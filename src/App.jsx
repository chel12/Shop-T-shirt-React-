import { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';
import Wrapper from './components/Wrapper/Wrapper';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

export const AppContext = createContext({});

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

	//загрузка контроль
	const [isLoading, setIsLoading] = useState(true);

	//для цены
	const totalPrice = cartItems.reduce((acc, item) => item.price + acc, 0);

	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value);
	};

	//добавление карточки в корзину
	const onAddToCart = (obj) => {
		try {
			if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
				axios.delete(
					`https://f4b4503d373ac905.mokky.dev/cart/${obj.id}`
				);
				setCartItems((prev) =>
					prev.filter((item) => Number(item.id) !== Number(obj.id))
				);
			} else {
				axios.post('https://f4b4503d373ac905.mokky.dev/cart', obj);
				setCartItems((prev) => [...prev, obj]);
			}

			// это как setCartItems([...cartItems, obj]);
		} catch (error) {
			console.log(error.message);
		}
	};
	//добавление карточки в Избранное
	const onFavorite = async (obj) => {
		try {
			if (favorites.find((item) => Number(item.id) === Number(obj.id))) {
				axios.delete(
					`https://f4b4503d373ac905.mokky.dev/favorite/${obj.id}`
				);
				setFavorites((prev) =>
					prev.filter((item) => Number(item.id) !== Number(obj.id))
				);
				// setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
			} else {
				const { data } = await axios.post(
					'https://f4b4503d373ac905.mokky.dev/favorite',
					obj
				);

				setFavorites((prev) => [...prev, data]);
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	const onRemoveItem = (id) => {
		axios.delete(`https://f4b4503d373ac905.mokky.dev/cart/${id}`);
		setCartItems((prev) =>
			prev.filter((item) => Number(item.id) !== Number(id))
		);
	};

	useEffect(() => {
		async function fetchData() {
			const getDataDrawer = await axios.get(
				'https://f4b4503d373ac905.mokky.dev/cart'
			);
			const getDataFavorite = await axios.get(
				'https://f4b4503d373ac905.mokky.dev/favorite'
			);
			const getData = await axios.get(
				'https://f4b4503d373ac905.mokky.dev/items'
			);
			setIsLoading(false);
			setCartItems(getDataDrawer.data);
			setFavorites(getDataFavorite.data);
			setData(getData.data);
		}
		fetchData();
	}, []);

	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.id) === Number(id));
	};

	return (
		<AppContext.Provider
			value={{
				data,
				cartItems,
				favorites,
				isItemAdded,
				onFavorite,
				setCartOpened,
				setCartItems,
				totalPrice,
				onAddToCart,
			}}>
			<Wrapper>
				<Drawer
					cartItems={cartItems}
					onRemoveItem={onRemoveItem}
					opened={cartOpened}
				
				/>

				<Header onOpenDrawer={() => setCartOpened(true)}></Header>
				<Routes>
					<Route
						path="/"
						element={
							<Home
								isLoading={isLoading}
								searchValue={searchValue}
								onChangeSearchInput={onChangeSearchInput}
								data={data}
								onAddToCart={onAddToCart}
							/>
						}
						exact
					/>
					<Route
						path="/favorite"
						element={<Favorites onAddToCart={onAddToCart} />}
						exact
					/>
					<Route
						path="/orders"
						element={<Orders onAddToCart={onAddToCart} />}
						exact
					/>
				</Routes>
			</Wrapper>
		</AppContext.Provider>
	);
}

export default App;
