import React from 'react';
import SliderTitle from '../SliderTitle/SliderTitle';
import './SliderTextContent.scss';
import SliderButton from '../SliderButton/SliderButton';

const SliderTextContent = () => {
	return (
		<div className="text-content">
			<SliderTitle>Популярные бренды и мерчи</SliderTitle>
			<div className="text-content__grid">
				<p>
					Ежедневно выходят новые модели по всему миру, появляются
					новые мерчи, будь в тренде!
				</p>
				<div className="action">
					<SliderButton direction={'left'} />
					<SliderButton direction={'right'} disable />
				</div>
			</div>
		</div>
	);
};

export default SliderTextContent;
