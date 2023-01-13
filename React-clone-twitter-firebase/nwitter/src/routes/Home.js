import { React, useEffect, useState } from "react";
import { dbService } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const dataCollection = await collection(dbService, "Nweets");
      const data = await addDoc(dataCollection, {
        nweet,
        createdAt: Date.now(),
      });
      setNweet("");
      console.log("Document written with ID: ", data.id);
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (event) => {
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
    </div>
  );
};

export default Home;
