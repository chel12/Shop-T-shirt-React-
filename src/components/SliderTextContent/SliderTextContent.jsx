import React from 'react';
import SliderTitle from '../SliderTitle/SliderTitle';
import './SliderTextContent.scss';
import SliderButton from '../SliderButton/SliderButton';
import Slider from '../Slider/Slider';
import photo_1 from '../../img-slide/photo_1.jpg';
import photo_2 from '../../img-slide/photo_2.jpg';
import photo_3 from '../../img-slide/photo_3.png';
import photo_4 from '../../img-slide/photo_4.jpg';
import photo_5 from '../../img-slide/photo_5.jpg';
import photo_6 from '../../img-slide/photo_6.jpg';

const sliderData = [
	{
		job: 'Kurwa',
		name: 'Bober',
		img: photo_1,
	},
	{
		job: 'lalos',
		name: 'Perdos',
		img: photo_2,
	},
	{
		job: 'kuL',
		name: 'Peper',
		img: photo_3,
	},
	{
		job: 'Asya',
		name: 'GTI',
		img: photo_4,
	},
	{
		job: 'Lokol',
		name: 'Focol',
		img: photo_5,
	},
	{
		job: 'Qww',
		name: 'XTY',
		img: photo_6,
	},
];

const SliderTextContent = () => {
	return (
		<div className="text-content">
			<SliderTitle>Популярные бренды и мерчи</SliderTitle>
			<div className="text-content__grid">
				<p>
					Ежедневно выходят новые модели по всему миру, появляются
					новые мерчи, будь в тренде!
				</p>
			</div>
			<Slider data={sliderData} />
			{/* 
				<img src={photo_1} alt="Slide 1" />
				<img src={photo_2} alt="Slide 2" />
				<img src={photo_3} alt="Slide 3" />
				<img src={photo_4} alt="Slide 4" />
				<img src={photo_5} alt="Slide 5" />
				<img src={photo_6} alt="Slide 6" /> */}
		</div>
	);
};

export default SliderTextContent;
