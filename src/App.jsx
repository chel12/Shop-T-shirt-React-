import { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';
import Wrapper from './components/Wrapper/Wrapper';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from './store/itemsSlice/itemsSlice';
import { fetchCart, getTotalPrice } from './store/cartSlice/cartSlice';
import { fetchFavorite } from './store/favoriteSlice/favoriteSlice';
import { selectAllItems } from './store/itemsSlice/selectItems';
import { selectFavorites } from './store/favoriteSlice/selectFavorite';

export const AppContext = createContext({});

function App() {
	//для корзины
	const [cartOpened, setCartOpened] = useState(false);

	const [searchValue, setSearchValue] = useState('');

	//загрузка контроль
	const [isLoading, setIsLoading] = useState(true);

	const dispatch = useDispatch();
	const cartItems = useSelector(selectAllItems);
	const favorites = useSelector(selectFavorites);

	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value);
	};

	//множественный запрос
	useEffect(() => {
		dispatch(fetchItems());
		dispatch(fetchCart());
		dispatch(fetchFavorite());
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
				cartItems,
				isItemAdded,
				isItemFavorite,
				setCartOpened,
			}}>
			<Wrapper>
				<Drawer cartItems={cartItems} opened={cartOpened} />

				<Header onOpenDrawer={() => setCartOpened(true)}></Header>
				<Routes>
					<Route
						path="/"
						element={
							<Home
								isLoading={isLoading}
								searchValue={searchValue}
								onChangeSearchInput={onChangeSearchInput}
							/>
						}
						exact
					/>
					<Route path="/favorite" element={<Favorites />} exact />
					<Route path="/orders" element={<Orders />} exact />
				</Routes>
			</Wrapper>
		</AppContext.Provider>
	);
}

export default App;
