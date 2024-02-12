import Card from './components/Card/Card';
import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';
import Wrapper from './components/Wrapper/Wrapper';
import { arr } from './BD/bd';

function App() {
	return (
		<Wrapper>
			<Drawer></Drawer>

			<Header></Header>
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
					{arr.map((card) => (
						<Card
							title={card.title}
							price={card.price}
							img={card.img}
							onClickFavorite={() => {}}
							onClickAdd={() => {}}
							key={card.title}
						/>
					))}
				</div>
			</div>
		</Wrapper>
	);
}

export default App;
