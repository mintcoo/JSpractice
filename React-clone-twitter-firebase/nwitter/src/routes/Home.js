import { React, useEffect, useState } from "react";
import { dbService } from "../firebase";
import {
  collection,
  // addDoc,
  // getDocs,
  // where,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";



import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";

const Home = ({ userObj }) => {
  // console.log("uuuuuuuuuuser", userObj);

  const [nweets, setNweets] = useState([]);

  // 여기는 reattime 방법
  const dbNweetsRealtime = async () => {
    const dataCollection = query(
      collection(dbService, "Nweets"),
      orderBy("createdAt", "desc"),
    );
    onSnapshot(dataCollection, (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => {
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



  return (
    <div>
			<NweetFactory userObj={userObj} />
      <div>
        <ul>
          {nweets.map((nweet) => {
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
