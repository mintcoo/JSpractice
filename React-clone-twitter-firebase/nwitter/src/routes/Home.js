import { React, useEffect, useState, useRef } from "react";
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
import {
	getStorage,
	ref,
	uploadString,
	getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import Nweet from "../components/Nweet";

const Home = ({ userObj }) => {
	// console.log("uuuuuuuuuuser", userObj);

	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);
	const [fileUpload, setFileUpload] = useState("");

	// 여기는 reattime 방법
	const dbNweetsRealtime = async () => {
		const dataCollection = await query(
			collection(dbService, "Nweets"),
			orderBy("createdAt", "desc")
		);
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
		let downLoadUrl = "";
		//이미지 첨부하지 않고 텍스트만 올리고 싶을 때도 있기 때문에 fileUpLoad가 있을때만 아래 코드 실행
		//이미지 첨부하지 않은 경우엔 downLoadUrl=""이 된다.
		if (fileUpload !== "") {
			const storage = getStorage();
			//파일 경로 참조 만들기
			const imageFileRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
			//storage 참조 경로로 파일 업로드 하기
			await uploadString(imageFileRef, fileUpload, "data_url");
			//storage 참조 경로에 있는 파일의 URL을 다운로드해서 downLoadUrl 변수에 넣어서 업데이트
			downLoadUrl = await getDownloadURL(imageFileRef);
		}
		//트윗 오브젝트
		const nweetData = {
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			downLoadUrl,
		};

		//트윗하기 누르면 nweetObj 형태로 새로운 document 생성하여 nweets 콜렉션에 넣기
		try {
			const dataCollection = await collection(dbService, "Nweets");
			await addDoc(dataCollection, nweetData);
			setNweet("");
			setFileUpload("");

		} catch (error) {
			console.log(error);
		}


		// -------- 아래로는 nweet 생성 ---------
		// try {
		// 	const dataCollection = await collection(dbService, "Nweets");
		// 	const data = await addDoc(dataCollection, {
		// 		text: nweet,
		// 		createdAt: Date.now(),
		// 		creatorId: userObj.uid,
		// 	});
		// 	setNweet("");
		// 	console.log("Document written with ID: ", data.id);
		// } catch (error) {
		// 	console.log(error);
		// }
	};
	const onChange = event => {
		const { value } = event.target;
		setNweet(value);
	};

	const onFileChange = event => {
		const {
			target: { files },
		} = event;
		const theFile = files[0];
		const reader = new FileReader();
		reader.onloadend = finishedEvent => {
			// console.log('finish',finishedEvent);
			const {
				currentTarget: { result },
			} = finishedEvent;
			setFileUpload(result);
		};

		reader.readAsDataURL(theFile);
	};

	const fileInput = useRef();
	const onClearImage = () => {
		setFileUpload(null);
		console.log(fileInput.current.value);
		fileInput.current.value = null;
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
				<input
					type="file"
					accept="image/*"
					onChange={onFileChange}
					ref={fileInput}
				/>
				<input type="submit" value="nweet" />
				{fileUpload && (
					<div>
						<img src={fileUpload} width="50px" height="50px" alt="fileimage" />
						<button onClick={onClearImage}>Clear</button>
					</div>
				)}
			</form>
			<div>
				<ul>
					{nweets.map(nweet => {
						return (
							<Nweet
								key={nweet.id}
								nweetObj={nweet}
								isOwner={nweet.creatorId === userObj.uid}
							/>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default Home;
