import Card from './components/Card/Card';
import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';
import Wrapper from './components/Wrapper/Wrapper';
import { arr } from './BD/bd';
import { useEffect, useState } from 'react';

function App() {
	//для корзины
	const [cartOpened, setCartOpened] = useState(false);
	//стейте для  добавления в корзину
	const [cartItems, setCartItems] = useState([]);
	//стейте с кроссами приходит с сервака
	const [data, setData] = useState([]);
	//запрос на сервак за кроссами
	const getData = () => {
		fetch('https://65c9fced3b05d29307df6ad6.mockapi.io/items')
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				setData(json);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	const onAddToCart = (obj) => {
		setCartItems((prev) => [...prev, obj]);
		// это как setCartItems([...cartItems, obj]);
	};

	return (
		<Wrapper>
			{cartOpened && (
				<Drawer
					cartItems={cartItems}
					onCloseDrawer={() => {
						setCartOpened(false);
					}}></Drawer>
			)}
			<Header onOpenDrawer={() => setCartOpened(true)}></Header>
			<div className="content p-40">
				<div className="d-flex align-center justify-between mb-40">
					<h1 className="">Все футболки</h1>
					<div className="search-block d-flex align-center">
						<img
							src="/img/svg/search.svg"
							width={12}
							height={12}
							alt="Search"
						/>
						<input type="text" placeholder="Поиск.." />
					</div>
				</div>

				<div className="d-flex flex-wrap">
					{data.map((card) => (
						<Card
							title={card.title}
							price={card.price}
							img={card.img}
							addFavorite={() => {}}
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
