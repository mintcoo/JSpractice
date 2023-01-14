import { React, useEffect, useState } from "react";
import { dbService } from "../firebase";
import {
	collection,
	addDoc,
	// getDocs,
	// where,
	query,
  orderBy,
	onSnapshot,
} from "firebase/firestore";

const Home = ({ userObj }) => {
	console.log("uuuuuuuuuuser", userObj);

	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);

  // 여기는 reattime 방법
	const dbNweetsRealtime = async () => {
		const dataCollection = await query(collection(dbService, "Nweets"), orderBy("createdAt", "desc"));
		onSnapshot(dataCollection, snapshot => {
			const nweetArray = snapshot.docs.map(doc => {
				return { id: doc.id, ...doc.data() };
			});
			setNweets(nweetArray);
		});
	};
	// ------- 아래로는 실시간이 아닌 방식 ----------
	// const dbNweets = async () => {
	// 	const dataCollection = await collection(dbService, "Nweets");
	// 	const dataNweets = await getDocs(dataCollection);
	// 	dataNweets.forEach(document => {
	// 		// console.log("data?", document.data());
	// 		const nweetObject = {
	// 			...document.data(),
	// 			id: document.id,
	// 		};
	// 		setNweets(prev => [nweetObject, ...prev]);
	// 	});

	// 	// 필터걸어 검색하기
	// 	// const dataCollection2 = await query(collection(dbService, "Nweets"), where("nweet", "==", "ttest"));
	// 	// const dataNweets2 = await getDocs(dataCollection2);
	// 	// dataNweets2.forEach(document => console.log('22',document.id, document.data()));
	// };
	useEffect(() => {
		// dbNweets();
		dbNweetsRealtime();
	}, []);

	const onSubmit = async event => {
		event.preventDefault();
		try {
			const dataCollection = await collection(dbService, "Nweets");
			const data = await addDoc(dataCollection, {
				text: nweet,
				createdAt: Date.now(),
				creatorId: userObj.uid,
			});
			setNweet("");
			console.log("Document written with ID: ", data.id);
		} catch (error) {
			console.log(error);
		}
	};
	const onChange = event => {
		const { value } = event.target;
		setNweet(value);
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					onChange={onChange}
					value={nweet}
					type="text"
					placeholder="What's on your mind"
					maxLength={120}
				/>
				<input type="submit" value="nweet" />
			</form>
			<div>
				<ul>
					{nweets.map(nweet => {
						return <li key={nweet.id}>{nweet.text}</li>;
					})}
				</ul>
			</div>
		</div>
	);
};

export default Home;
