function App() {
	return (
		<div className="wrapper clear">
			<div className="overlay">
				<div className="drawer">
					<h2 className="d-flex justify-between mb-30 ">
						Корзина
						<img
							className="removeBtn cu-p"
							src="/img/svg/btn-remove.svg"
							alt="Remove"
						/>
					</h2>
					<div className="items">
						<div className="cartItem d-flex akign-center mb-20">
							<div
								style={{
									backgroundImage: 'url(img/t-shirt/2.jpg)',
								}}
								className="cartItemImg"></div>

							<div className="mr-20 flex">
								<p className="mb-5">Имя товара 2</p>
								<b>1 000 руб.</b>
							</div>
							<img
								className="removeBtn"
								src="/img/svg/btn-remove.svg"
								alt="Remove"
							/>
						</div>
						<div className="cartItem d-flex akign-center mb-20">
							<div
								style={{
									backgroundImage: 'url(img/t-shirt/1.jpg)',
								}}
								className="cartItemImg"></div>

							<div className="mr-20 flex">
								<p className="mb-5">Имя товара 1</p>
								<b>2 000 руб.</b>
							</div>
							<img
								className="removeBtn"
								src="/img/svg/btn-remove.svg"
								alt="Remove"
							/>
						</div>
					</div>
					<div className="cartTotalBlock">
						<ul>
							<li>
								<span>Итого: </span>
								<div></div>
								<b>10 000 руб.</b>
							</li>
							<li>
								<span>Налог 5%</span>
								<div></div>
								<b>1 074 руб.</b>
							</li>
						</ul>
						<button className="blueButton">
							Оформить заказ
							<img
								src="/img/svg/arrow-right.svg"
								alt="Arrow"
								width={20}
								height={20}
							/>
						</button>
					</div>
				</div>
			</div>

			<header className="d-flex justify-between align-center">
				<div className="d-flex align-center">
					<img
						src="/img/logo.png"
						alt=""
						width={40}
						height={40}
						className="mr-20"
					/>
					<div>
						<h3 className="text-uppercase">React T-Shirt</h3>
						<p className="opacity-5">Футболки на любой вкус</p>
					</div>
				</div>
				<ul className="d-flex">
					<li className="mr-30">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M1 1H5.82993L6.57993 5H23.443L19.693 15H8.45493L8.82993 17H19V19H7.17007L4.17007 3H1V1ZM8.07993 13H18.307L20.557 7H6.95493L8.07993 13Z"
								fill="black"
							/>
							<path
								d="M8 21.5C8 20.6716 8.67157 20 9.5 20C10.3284 20 11 20.6716 11 21.5C11 22.3284 10.3284 23 9.5 23C8.67157 23 8 22.3284 8 21.5Z"
								fill="black"
							/>
							<path
								d="M15 21.5C15 20.6716 15.6716 20 16.5 20C17.3284 20 18 20.6716 18 21.5C18 22.3284 17.3284 23 16.5 23C15.6716 23 15 22.3284 15 21.5Z"
								fill="black"
							/>
						</svg>
						<span> 1 000 руб.</span>
					</li>
					<li>
						<svg
							width="20"
							height="20"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 32 32">
							<path
								styles="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans"
								d="M 16 5 C 12.145852 5 9 8.1458513 9 12 C 9 14.408843 10.23116 16.55212 12.09375 17.8125 C 8.5266131 19.342333 6 22.881262 6 27 L 8 27 C 8 22.569334 11.569334 19 16 19 C 20.430666 19 24 22.569334 24 27 L 26 27 C 26 22.881262 23.473387 19.342333 19.90625 17.8125 C 21.76884 16.55212 23 14.408843 23 12 C 23 8.1458513 19.854148 5 16 5 z M 16 7 C 18.773268 7 21 9.2267317 21 12 C 21 14.773268 18.773268 17 16 17 C 13.226732 17 11 14.773268 11 12 C 11 9.2267317 13.226732 7 16 7 z"
								color="#000"
								overflow="visible"
								font-family="Bitstream Vera Sans"
							/>
						</svg>
					</li>
				</ul>
			</header>
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
					<div className="card">
						<div className="favorite">
							<img
								width={22}
								height={22}
								src="/img/svg/heart-unlike.svg"
								alt="Heart unliked"
							/>
						</div>
						<img
							width={133}
							height={112}
							src="/img/t-shirt/1.jpg"
							alt="T-shirt 1"
						/>
						<h5>Имя товара 1</h5>
						<div className="d-flex justify-between align-center">
							<div className="d-flex flex-column ">
								<span>Цена:</span>
								<b>2 000 руб. </b>
							</div>
							<button className="button">
								<img
									width={11}
									height={11}
									src="/img/svg/plus.svg"
									alt="Plus"
								/>
							</button>
						</div>
					</div>
					<div className="card">
						<img
							width={133}
							height={112}
							src="/img/t-shirt/2.jpg"
							alt="T-shirt 2"
						/>
						<h5>Имя товара 2</h5>
						<div className="d-flex justify-between align-center">
							<div className="d-flex flex-column ">
								<span>Цена:</span>
								<b>2000 руб. </b>
							</div>
							<button className="button">
								<img
									width={11}
									height={11}
									src="/img/svg/plus.svg"
									alt="Plus"
								/>
							</button>
						</div>
					</div>
					<div className="card">
						<img
							width={133}
							height={112}
							src="/img/t-shirt/3.jpg"
							alt="T-shirt 3"
						/>
						<h5>Имя товара 3</h5>
						<div className="d-flex justify-between align-center">
							<div className="d-flex flex-column ">
								<span>Цена:</span>
								<b>2000 руб. </b>
							</div>
							<button className="button">
								<img
									width={11}
									height={11}
									src="/img/svg/plus.svg"
									alt="Plus"
								/>
							</button>
						</div>
					</div>
					<div className="card">
						<img
							width={133}
							height={112}
							src="/img/t-shirt/4.jpg"
							alt="T-shirt 4"
						/>
						<h5>Имя товара 4</h5>
						<div className="d-flex justify-between align-center">
							<div className="d-flex flex-column ">
								<span>Цена:</span>
								<b>2000 руб. </b>
							</div>
							<button className="button">
								<img
									width={11}
									height={11}
									src="/img/svg/plus.svg"
									alt="Plus"
								/>
							</button>
						</div>
					</div>
					<div className="card">
						<img
							width={133}
							height={112}
							src="/img/t-shirt/5.jpg"
							alt="T-shirt 5"
						/>
						<h5>Имя товара 5</h5>
						<div className="d-flex justify-between align-center">
							<div className="d-flex flex-column ">
								<span>Цена:</span>
								<b>2000 руб. </b>
							</div>
							<button className="button">
								<img
									width={11}
									height={11}
									src="/img/svg/plus.svg"
									alt="Plus"
								/>
							</button>
						</div>
					</div>
					<div className="card">
						<img
							width={133}
							height={112}
							src="/img/t-shirt/6.jpg"
							alt="T-shirt 6"
						/>
						<h5>Имя товара 6</h5>
						<div className="d-flex justify-between align-center">
							<div className="d-flex flex-column ">
								<span>Цена:</span>
								<b>2000 руб. </b>
							</div>
							<button className="button">
								<img
									width={11}
									height={11}
									src="/img/svg/plus.svg"
									alt="Plus"
								/>
							</button>
						</div>
					</div>
					<div className="card">
						<img
							width={133}
							height={112}
							src="/img/t-shirt/7.jpg"
							alt="T-shirt 7"
						/>
						<h5>Имя товара 7</h5>
						<div className="d-flex justify-between align-center">
							<div className="d-flex flex-column ">
								<span>Цена:</span>
								<b>2000 руб. </b>
							</div>
							<button className="button">
								<img
									width={11}
									height={11}
									src="/img/svg/plus.svg"
									alt="Plus"
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
