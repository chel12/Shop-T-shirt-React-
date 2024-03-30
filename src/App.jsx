import { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';
import Wrapper from './components/Wrapper/Wrapper';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from './store/itemsSlice/itemsSlice';
import { fetchCart } from './store/cartSlice/cartSlice';
import { fetchFavorite } from './store/favoriteSlice/favoriteSlice';
import { selectAllItems } from './store/itemsSlice/selectItems';
import { selectFavorites } from './store/favoriteSlice/selectFavorite';

export const AppContext = createContext({});

function App() {
	//для корзины
	const [cartOpened, setCartOpened] = useState(false);

	const [searchValue, setSearchValue] = useState('');


	const dispatch = useDispatch();
	
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

	

	return (
		<AppContext.Provider
			value={{
				setCartOpened,
			}}>
			<Wrapper>
				<Drawer  opened={cartOpened} />

				<Header onOpenDrawer={() => setCartOpened(true)}></Header>
				<Routes>
					<Route
						path="/"
						element={
							<Home
								
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
