import styles from './EmptyDrawer.module.scss';

const EmptyDrawer = ({ title, img, description, onClose, textBtn }) => {
	return (
		<div className="cartEmpty d-flex align-center justify-center flex-column flex">
			<img
				className="mb-20"
				width={200}
				height={150}
				src={img}
				alt="Empty"
			/>
			<h2>{title}</h2>
			<p className="opacity-6">{description}</p>
			<button onClick={onClose} className={styles.blueButton}>
				<img
					src="img/svg/arrow-left.svg"
					alt="Arrow"
					width={20}
					height={20}
				/>
				{textBtn}
			</button>
		</div>
	);
};

export default EmptyDrawer;
