import React from 'react';
import './SliderButton.scss';

const SliderButton = ({ direction, disabled, onClick }) => {
	let cls = 'icon-button';
	if (direction === 'left') cls += ' left';
	if (direction === 'right') cls += ' right';
	if (disabled) cls += 'disable';
	return <div className={cls} onClick={onClick}></div>;
};

export default SliderButton;
