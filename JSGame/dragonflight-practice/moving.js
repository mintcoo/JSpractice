document.addEventListener("DOMContentLoaded", async () => {
	const canvasElement = document.querySelector("canvas");

	const context = canvasElement.getContext("2d");

	const GAME_STATE = {
		PLAYING: "playing",
		PAUSE: "pausing",
		GAMEOVER: "gameover"
	};
	let gameState = GAME_STATE.PLAYING;

	const imgSrc1 = "./01.png";
	const cloudImgSrc = ["./cloud.png", "./cloud2.png"];

	const getImage = function (imgSrc) {
		return new Promise((resolve, reject) => {
			const img = new Image(); //이미지 객체 생성
			img.src = imgSrc;
			img.onload = function () {
				//로그가 다되면 불리는곳;
				resolve(img);
			};
		});
	};

	/****************
	 * initialize
	 ******************/
	// const [a, b, c] = [1, 2, 3];
	// const { name, height } = { name: 1, height: 3 };

	const cloudOnLoadImagesPromises = cloudImgSrc.map(cloud => {
		return getImage(cloud);
	});
	const [backgroundImage, missileImage, pinkImage, ...cloudImages] =
		await Promise.all([
			getImage(imgSrc1),
			getImage("./missile.png"),
			getImage("./pink.png"),
			...cloudOnLoadImagesPromises,
		]);

	// const a = [1, 2, 3];
	// const b = [4, 5, 6];
	// const c = [...a,...b];
	// const ab = a.concat(b);
	// // console.log('c',c);
	// console.log('12',cloudtest);

	// const cloudImage = await getImage(cloudImgSrc);

	// const cloudrealtest = await Promise.all(cloudtest)
	// console.log('22',cloudrealtest[0]);

	const backWidth = backgroundImage.width;
	const backHeight = backgroundImage.height;

	const cloudWidth = cloudImages[0].width;
	const cloudHeight = cloudImages[0].height;
	const cloudDrawWidth = 80;
	const cloudDrawHeigth = 50;

	let y = 0;

	let keyboard = {};
	let gameScore = 0;

	window.addEventListener("keydown", event => {
		const { key, code } = event;
		if (key == "ArrowRight") {
			keyboard.right = true;
		}
		if (key == "ArrowLeft") {
			keyboard.left = true;
		}
		if (key == "ArrowUp") {
			keyboard.up = true;
		}
		if (key == "ArrowDown") {
			keyboard.down = true;
		}
		if (code == "Space") {
			keyboard.space = true;
		}
	});

	window.addEventListener("keyup", event => {
		const { key, code } = event;
		if (key == "ArrowRight") {
			keyboard.right = false;
		}
		if (key == "ArrowLeft") {
			keyboard.left = false;
		}
		if (key == "ArrowUp") {
			keyboard.up = false;
		}
		if (key == "ArrowDown") {
			keyboard.down = false;
		}
		if (code == "Space") {
			keyboard.space = false;
		}
	});

	const cloudDummy = {
		width: cloudWidth,
		height: cloudHeight,
		draw: {
			width: cloudDrawWidth,
			height: cloudDrawHeigth,
		},
	};


	let player;
	let missiles;
	let elapsedTime;
	let clouds;
	function init() {
		player = new Player(backWidth, backHeight);
		missiles = [];
		elapsedTime = 0;
		clouds = [new Cloud(cloudImages, cloudDummy)];
	}
	init();

	// const clouds = [new Cloud(cloudImages, cloudDummy)];
	const cloudsLength = Array.from({ length: 7 }, (v, i) => i);
	cloudsLength.forEach(() => {
		clouds.push(new Cloud(cloudImages, cloudDummy));
	});

	function Player(backWidth, backHeight) {
		const playerWidthSize = 30;
		const playerHeightSize = 30;
		return {
			speed: 5,
			x: backWidth / 2 - playerWidthSize / 2,
			y: backHeight - playerHeightSize,
			width: playerWidthSize,
			height: playerHeightSize,
			lastFiredTime: 0,
		};
	}

	function Missile(x, y) {
		this.x = x;
		this.y = y;
		this.width = 32;
		this.height = 32;
		this.speed = 5;
		this.damage = 1;
		return {
			id: createUniqueId(),
			x: this.x,
			y: this.y,
			speed: this.speed,
			width: this.width,
			height: this.height,
			damage: this.damage,
			update: function (context) {
				context.drawImage(
					missileImage,
					this.x,
					this.y,
					this.width,
					this.height
				);
				this.y -= this.speed;
			},
		};
	}

	function update() {
		elapsedTime += 60;
		context.clearRect(0, 0, backWidth, backHeight);
		drawBackground();
		drawCloud(context, clouds, player);
		drawPlayer(context, player, backWidth, backHeight);
		drawText(context, gameScore);
	}

	function updateGameover() {
		const gameOverMessage = 'GAME OVER';
		const gameRestart = 'Press Enter';
		context.fillText(gameOverMessage, 100, 100);
		context.fillText(gameRestart, 100, 130);
		if (keyboard.space) {
			gameState = GAME_STATE.PLAYING;
			elapsedTime = 0;
			gameScore = 0;
			init();
		}
	}

	setInterval(() => {
		if (gameState == GAME_STATE.PLAYING) {
			update();
		}
		if (gameState == GAME_STATE.GAMEOVER) {
			updateGameover();
		}
	}, 1000 / 60);

	let shootCoolTime = 1800;

	function drawPlayer(context, target, backWidth, backHeight) {
		const { x, y, width, height, speed, lastFiredTime } = target;
		//원래 검은색이었
		context.save();
		context.fillStyle = "#ffc";
		context.drawImage(pinkImage, x, y, width, height);
		context.restore();

		if (keyboard.right) {
			target.x += speed;
		}
		if (keyboard.left) {
			target.x -= speed;
		}
		if (keyboard.up) {
			target.y -= speed;
		}
		if (keyboard.down) {
			target.y += speed;
		}

		if (target.x >= backWidth - width) {
			target.x = backWidth - width;
		}
		if (target.x <= 0) {
			target.x = 0;
		}
		if (keyboard.space) {
			if (elapsedTime - lastFiredTime >= shootCoolTime) {
				const missileTriple = Math.floor(gameScore / 3);
				missiles.push(new Missile(target.x, target.y));
				if (gameScore >= 3) {
					console.log('2',missileTriple);
					const missileMany = Array.from({ length: missileTriple }, (v, i) => i);
					missileMany.forEach((missile, index) => {
						missiles.push(new Missile(target.x + 10 * (index + 1), target.y));
					});					
					
				}
				target.lastFiredTime = elapsedTime;
			}
		}

		missiles.forEach(ms => {
			ms.update(context);
		});
	}

	// de-coupling 커플이 남ㅈ+여 결합되다뭐이런 ㅇ연결되어있다<-> 연결되어있지않은
	function drawBackground() {
		context.drawImage(backgroundImage, 0, y);
		context.drawImage(backgroundImage, 0, -backHeight + y);
		y += 1;
		if (y >= backHeight) {
			y = 0;
		}
	}

	function drawCloud(context, targets, player) {
		if (clouds.length <= 5) {
			clouds.push(new Cloud(cloudImages, cloudDummy));
		}
		const randomYspeed = Math.random();
		targets.forEach(cloud => {
			cloudCollidePlayer(cloud, player, gameState);
			context.drawImage(
				cloud.image,
				cloud.x,
				cloud.y,
				cloud.draw.width,
				cloud.draw.height
			);
			cloud.x += cloud.speed;
			cloud.y += randomYspeed;
			if (cloud.x >= backWidth + cloudDrawWidth) {
				cloud.x = 0;
			}
			if (cloud.y >= backHeight) {
				cloud.y = -cloudDrawHeigth;
			}

			missiles.forEach((missile, missileIndex) => {
				const isCollided = isCollision(cloud, missile);
				if (isCollided) {
					console.log("충돌?", cloud.id, cloud.hp);
					const foundCloudIndex = clouds.findIndex(cloudForFind => {
						return cloudForFind.id == cloud.id;
					});

					const selectedCloud = clouds[foundCloudIndex];
					selectedCloud.hp -= missile.damage;

					if (selectedCloud.hp <= 0) {
						clouds.splice(foundCloudIndex, 1);
						gameScore++;
					}

					// const foundMissileIndex = missiles.findIndex(ms => {
					// 	return ms.id == missile.id;
					// });

					// if (foundMissileIndex >= 0) {
					// 	missiles.splice(foundMissileIndex, 1);
					// }
					missiles.splice(missileIndex, 1);
				}
			});
		});
	}
	function cloudCollidePlayer(cloudPosition, playerPosition) {
		const playerDeathCollision = 	cloudPosition.x <= playerPosition.x &&
		playerPosition.x <= cloudPosition.x + cloudPosition.draw.width &&
		cloudPosition.y <= playerPosition.y &&
		playerPosition.y <= cloudPosition.y + cloudPosition.draw.height; 		
		if (playerDeathCollision) {
			console.log('주금');
			gameState = GAME_STATE.GAMEOVER;
		}
	}

	function isCollision(position1, position2) {
		return (
			position1.x <= position2.x &&
			position2.x <= position1.x + position1.draw.width &&
			position1.y <= position2.y &&
			position2.y <= position1.y + position1.draw.height
		);
	}

	function drawText(context, gameScore) {
		context.font = "bold 25px serif";
		context.fillStyle = "#ffffff";
		const scoreBoard = `Score ${gameScore}`;
		context.fillText(scoreBoard, 10, 30);
	}

	// const drawCloud = function (image) {
	//   let x = 0;
	//   const backWidth = image.width;
	//   const backHeight = image.height;
	//   setInterval(() => {
	//     // context.clearRect(0,0,backWidth,backHeight);

	//     context.drawImage(image, x, 0, 50, 30);
	//     context.drawImage(image, -backWidth + x, 0, 50, 30);
	//     x += 1;
	//     if (x >= backWidth) {
	//       x = 0;
	//     }
	//   }, 1000/60);
	// }
});
