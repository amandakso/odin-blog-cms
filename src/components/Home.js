import React, { useState, useEffect } from "react";

import Navbar from "./Navbar";

const Home = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getPosts = async () => {
      let token = sessionStorage.getItem("token");
      console.log(token);
      if (!token) {
        alert("Error with user access");
      } else {
        try {
          const res = await fetch(`http://localhost:3000/blog/posts/author`, {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
          });
          let resJson = await res.json();
          setData(resJson);
          console.log(resJson);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getPosts();
  }, []);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Home;
