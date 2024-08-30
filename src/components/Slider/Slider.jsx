import React, { useState } from 'react';
import './Slider.scss';
import SliderButton from '../SliderButton/SliderButton';

const Slider = ({ data }) => {
	const [activeId, setActiveId] = useState(0);
	const prev = () => {
		setActiveId((activeId) => {
			if (activeId > 0) {
				return activeId - 1;
			}
			return activeId;
		});
	};
	const next = () => {
		setActiveId((activeId) => {
			if (activeId < data.length - 1) {
				return activeId + 1;
			}
			return activeId;
		});
	};

	return (
		<div className="slider-wrap">
			<div className="slider__actions">
				<SliderButton
					direction={'left'}
					onClick={prev}
					disable={activeId === 0}
				/>
				<SliderButton
					direction={'right'}
					onClick={next}
					disable={activeId === data.length}
				/>
			</div>
			<div className="slider">
				{data.map((slide, index) => (
					<div
						className={`slide ${
							index === activeId ? ' active' : ''
						}`}
						key={index}>
						<div className="slide__info">
							<div className="slide__job">{slide.job}</div>
							<div className="slide__name">{slide.name}</div>
						</div>
							<img src={slide.img} alt={`Slide ${index + 1}`} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Slider;
