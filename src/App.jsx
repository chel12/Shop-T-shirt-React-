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
	const onAddToCart = async (obj) => {
		try {
			const findItem = cartItems.find(
				(item) => Number(item.parentId) === Number(obj.id)
			);

			if (findItem) {
				setCartItems((prev) =>
					prev.filter(
						(item) => Number(item.parentId) !== Number(obj.id)
					)
				);
				await axios.delete(
					`https://f4b4503d373ac905.mokky.dev/cart/${findItem.id}`
				);
			} else {
				setCartItems((prev) => [...prev, obj]);
				const { data } = await axios.post(
					'https://f4b4503d373ac905.mokky.dev/cart',
					obj
				);
				console.log(data);
				setCartItems((prev) =>
					prev.map((item) => {
						if (item.parentId == data.parentId) {
							return {
								...item,
								id: data.id,
							};
						} else {
							return item;
						}
					})
				);
			}
			// это как setCartItems([...cartItems, obj]);
		} catch (error) {
			alert('Ошибка при добавление в  корзину');
			console.log(error.message);
		}
	};
	//добавление карточки в Избранное
	const onFavorite = async (obj) => {
		console.log(obj);
		try {
			const findItem = favorites.find(
				(item) => Number(item.favoriteId) === Number(obj.id)
			);
		
			if (findItem) {
				setFavorites((prev) =>
					prev.filter(
						(item) => Number(item.favoriteId) !== Number(obj.id)
					)
				);
				await axios.delete(
					`https://f4b4503d373ac905.mokky.dev/favorite/${findItem.id}`
				);
			} else {
				setFavorites((prev) => [...prev, obj]);

				const { data } = await axios.post(
					'https://f4b4503d373ac905.mokky.dev/favorite',
					obj
				);

				setFavorites((prev) =>
					prev.map((item) => {
						if (item.favoriteId === data.favoriteId) {
							return {
								...item,
								id: data.id,
							};
						} else {
							return item;
						}
					})
				);
			}
		} catch (error) {
			alert('Ошибка при добавление в избранное');
			console.log(error.message);
		}
	};

	const onRemoveItem = async (id) => {
		try {
			await axios.delete(`https://f4b4503d373ac905.mokky.dev/cart/${id}`);
			setCartItems((prev) =>
				prev.filter((item) => Number(item.id) !== Number(id))
			);
		} catch (error) {
			alert('Ошибка при удаление товара из корзины');
			console.log(error.message);
		}
	};
	//множественный запрос
	useEffect(() => {
		async function fetchData() {
			try {
				const [getDataDrawer, getDataFavorite, getData] =
					await Promise.all([
						//когда много запросов
						axios.get('https://f4b4503d373ac905.mokky.dev/cart'),
						axios.get(
							'https://f4b4503d373ac905.mokky.dev/favorite'
						),
						axios.get('https://f4b4503d373ac905.mokky.dev/items'),
					]);

				setIsLoading(false);
				setCartItems(getDataDrawer.data);
				setFavorites(getDataFavorite.data);
				setData(getData.data);
			} catch (error) {
				alert('Ошибка при запросе данных');
				console.log(error.message);
			}
		}
		fetchData();
	}, []);

	//проверка возьми обьект из корзины глянь его парент id и сверь его с ID из карточки

	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.parentId) === Number(id));
	};
	const isItemFavorite = (id) => {
		return favorites.some((obj) => Number(obj.favoriteId) === Number(id));
	};

	return (
		<AppContext.Provider
			value={{
				data,
				cartItems,
				favorites,
				isItemAdded,
				isItemFavorite,
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
