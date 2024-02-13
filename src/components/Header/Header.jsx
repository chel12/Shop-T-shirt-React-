import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onOpenDrawer }) => {
	return (
		<header className="d-flex justify-between align-center">
			<Link to={'/'}>
				<div className="d-flex align-center">
					<img
						src="/img/logo.png"
						alt="Лого"
						width={40}
						height={40}
						className="mr-20"
					/>
					<div>
						<h3 className="text-uppercase">React T-Shirt</h3>
						<p className="opacity-5">Футболки на любой вкус</p>
					</div>
				</div>
			</Link>
			<ul className="d-flex cu-p align-center">
				<li className="mr-30" onClick={onOpenDrawer}>
					<svg
						alt="Корзина"
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
				</li>
				<li className="mr-30" onClick={onOpenDrawer}>
					<span> 1 000 руб.</span>
				</li>
				<li className="mr-10">
					<Link to={'/favorite'}>
						<img
							width={22}
							height={22}
							src="/img/svg/heart-unlike.svg"
							alt="Избранное"
						/>
					</Link>
				</li>
				<li>
					<svg
						alt="Пользователь"
						width="22"
						height="22"
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
	);
};

export default Header;
