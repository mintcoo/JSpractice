import React, { useEffect, useState } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
	collection,
	// addDoc,
	getDocs,
	where,
	query,
	orderBy,
	// onSnapshot,
} from "firebase/firestore";
import { dbService } from "../firebase";
// import { Link } from "react-router-dom";

const Profile = ({ userObj }) => {
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
	const navigate = useNavigate();
	const auth = getAuth();
	const onLogOutClick = () => {
		signOut(auth);
		navigate("/");
	};

	const getMyNweets = async userObj => {
		//2. 내 nweets 얻는 function 생성
		const nweets = query(
			//3. 트윗 불러오기
			//3-1. dbService의 컬렉션 중 "nweets" Docs에서 userObj의 uid와 동일한 creatorID를 가진 모든 문서를 내림차순으로 가져오는 쿼리(요청) 생성
			collection(dbService, "Nweets"),
			where("creatorId", "==", `${userObj.uid}`),
			orderBy("createdAt", "desc")
		);
		//3-2. getDocs()메서드로 쿼리 결과 값 가져오기
		const nweetsSnapshot = await getDocs(nweets);
		nweetsSnapshot.forEach(doc => {
			console.log(doc.id, "=>", doc.data());
		});
	};
	const onChange = event => {
		const {
			target: { value },
		} = event;
		setNewDisplayName(value);
	};
	const onSubmit = async event => {
		event.preventDefault();
		if (userObj.displayName !== newDisplayName) {
			await updateProfile(userObj, { displayName: newDisplayName });
		}
	};

	useEffect(() => {
		getMyNweets(userObj);
	}, [userObj]);
	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					onChange={onChange}
					type="text"
					placeholder="Display name"
					value={newDisplayName}
				/>
				<input type="submit" value="Update Profile" />
			</form>
			<button onClick={onLogOutClick}>LogOut</button>
		</>
	);
};

export default Profile;
