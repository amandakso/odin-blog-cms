import React, { useState, useEffect } from "react";

import Navbar from "./Navbar";

const Home = () => {
  const [data, setData] = useState(null);
  console.log(data);
  useEffect(() => {
    const getPosts = async () => {
      let token = sessionStorage.getItem("token");
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
          if (res.status === 200) {
            if (resJson.error) {
              alert(resJson.error);
            }
            if (resJson.data) {
              setData(resJson.data);
            }
          } else {
            console.log("error occurred");
          }
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
      <table className="table">
        <caption>Your Posts</caption>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Content</th>
            <th>Preview</th>
            <th></th>
            <th></th>
            <th>Published?</th>
          </tr>
        </thead>
        {data ? (
          <tbody>
            {data.map(
              ({
                author,
                title,
                content,
                publish_date_formatted,
                published,
                updated,
                updated_formatted,
                _id,
              }) => (
                <tr key={_id}>
                  <td>Test</td>
                </tr>
              )
            )}
          </tbody>
        ) : (
          <tbody></tbody>
        )}
      </table>
    </div>
  );
};

export default Home;
