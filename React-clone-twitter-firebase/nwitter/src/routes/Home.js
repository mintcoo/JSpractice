import { React, useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
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
