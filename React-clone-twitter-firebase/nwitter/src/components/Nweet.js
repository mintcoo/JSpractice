import React, { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { dbService } from "../firebase";

const Nweet = ({ nweetObj, isOwner }) => {
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState(nweetObj.text);
  const { downLoadUrl } = nweetObj;

  const dataDoc = doc(dbService, "Nweets", `${nweetObj.id}`);
	const storage = getStorage();
	const imageFileRef = ref(storage, `${nweetObj.downLoadUrl}`);

	const onDeleteNweet = async () => {
		const ok = window.confirm("ㄹㅇ 지울거임???");
		if (ok) {
			await deleteDoc(dataDoc);
			await deleteObject(imageFileRef)
		} else {
			console.log("안지워짐 ㅋㅋ");
		}
	};
	const toggleEditing = () => setEditing(prev => !prev);

	const onSubmit = async event => {
		event.preventDefault();
		await updateDoc(dataDoc, { text: newNweet });
    setEditing(false);
		// console.log(nweetObj, newNweet);
	};

	const onChangeText = event => {
		const { value } = event.target;
		setNewNweet(value);
	};

	return (
		<div className="nweet">
			{editing ? (
				<>
					<form onSubmit={onSubmit} className="container nweetEdit">
						<input
							type="text"
							value={newNweet}
							required
							onChange={onChangeText}
							className="formInput"
							autoFocus
						/>
						<button value="Update Nweet" className="formBtn">업데이트!!</button>
					</form>
					<button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
				</>
			) : (
				<>
					<h4>{nweetObj.text}</h4>
          {downLoadUrl && <img src={downLoadUrl} width="50px" height="50px" alt={downLoadUrl}/> }
					{isOwner && (
						<div className="nweet__actions">
							<button onClick={onDeleteNweet}>Delete</button>
							<button onClick={toggleEditing}>Update</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Nweet;
