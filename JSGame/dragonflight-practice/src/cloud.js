
function Cloud(images, rect) {
	const { width, height, draw } = rect;
	const randomSpeed = Math.random(); // 0.0~ 0.9999999999 0.xxx~9.9999999999999
	const randomPosition = Math.floor(Math.random() * 300);
	const randomCloudIndex = Math.floor(Math.random() * 2);
	const randomCloudImage = images[randomCloudIndex];

	return {
		id: createUniqueId(),
		speed: randomSpeed,
		image: randomCloudImage,
		hp: 3,
		x: 0,
		y: randomPosition,
		height,
		width,
		draw,
	};
}
