// 버튼을 누르면 5초후에 alert 5초끝 뜨게!
document.addEventListener("DOMContentLoaded", async () => {
	const secondTime = () => {
		setTimeout(() => {
			console.log("3초후");
		}, 2000);
	};

	const timer = seconds => {
		setTimeout(() => {
			console.log(seconds, "초후..");
		}, seconds * 1000);
	};

	const btnClick = document.querySelector("#promise > button");
	btnClick.addEventListener("click", () => {
		console.log("체크");
		setTimeout(() => {
			console.log("1초후");
			secondTime();
		}, 1000);
	});

	function customTimer(seconds, object) {
		/////////
		//여기는 건드려도되는거임

		///////////
		setTimeout(() => {
			object.value += 5;
			console.log(seconds, "초후..", object.value);
		}, seconds * 1000);
		/////////
	}
	document.querySelector("#test").addEventListener("click", () => {
		let object = { value: 0 }; // 0이고,
		const promise = new Promise((resolve, reject) => {
			object.value++;
			console.log("[0]여기선 1떠야함->", object.value);
			setTimeout(() => {
				object.value += 5;
				resolve(object);
			}, 1000);
		});

		// const promise2 = new Promise((resolve, reject) => {
		//   //이거하는 이유는 기다려야하는거 동기화처리가필요할떄하는건데
		//   //여기안에 1)비동기상태인 코드가있으면됨. 2)거기에 필요한순간 resolve
		//   resolve(object)
		// })

		//callback hell
		//({[]})
		promise
			.then(res => {
				console.log("[1]여기선 6떠야함->", res.value);
				res.value++;
				console.log("[2]여기선 7떠야함->", res.value);
				// A
				return res;
			})
			.then(res => {
				// B.res
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						res.value += 5;
						console.log("[3]여기선 12떠야함->", res.value);
						resolve(res.value);
					}, 2000);
				});
			})
			.then(res => {
				console.log("EEEEEEEss", res);
				setTimeout(() => {
					res += 5;
					console.log("[4]여기선 17떠야함->", res);
				}, 50);
			})
			// promise2.then(res => {
			//
			// 	///////////
			// 	///이 라인은 수정 ㄴㄴ
			// 	console.log("최종결과는 12가 되야합니다 :", object.value);
			// 	///////////////////////
			// });

			.catch(err => {
				console.log(err);
			});
	});

	// setTimeout(() => {
	//   object.value += 5;
	//   console.log("[4]여기선 17떠야함->", res.value);
	// }, 1000);

	// new Promise(resolve => {
	// 	resolve(1);
	// }) //Chaining Pattern
	// 	.then(result => {
	// 		const sum = result + 1;
	// 		return sum;
	// 	})
	// 	.then(result => {
	// 		console.log(result, "<-?");
	// 	});

	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("3초ㅓ가 지났습니다.");
			resolve({ name: "구종인" });
		}, 3000);
	});
	// .then(response=>{
	//   console.log(response.name);
	// });
	const ttest = async function() {
		return 1;
	}
	console.log('test', ttest());
	ttest().then(alert);

	const result = await promise;
	console.log("result", result);
	console.log('!@#!@#', result.name);

	promise.then(result => {});

	return;

	let count = 0;
	console.log("1count(0)", count);
	count++;
	console.log("2count(1)", count);
	wait(오를더하세요, function (result) {
		console.log("4count(6)", count);
		console.log(result);
		return 1;
	}).then(result => {
		console.log("result", result);
		console.log("3count(1)", count);
	});
	//

	// function 오를더하세요() {
	// 	count += 5;
	// }

	// function wait(action, callback) {
	// 	setTimeout(() => {
	// 		action();
	// 		callback("test");
	// 	}, 1000);

	// 	return {
	// 		then: function (callback) {
	// 			callback(123);
	// 		},
	// 	};
	// }

	// function Nongbu(options) {

	//   return fetch('http://회원아이디받는api')
	//   .then((response)=>{
	//     return new Promise(resolve => {
	//       resolve(options);
	//     });
	//   })

	// }

	// Nongbu({
	// 	method: "GET",
	// 	url: "gagewg",
	// }).then(result => {
	// 	console.log("농부라이브러리then", result);
	// });
});
