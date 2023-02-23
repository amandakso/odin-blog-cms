import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

const Edit = () => {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("true");
  const { postid } = useParams();

  const navigate = useNavigate();

  const updatePost = async (e) => {
    e.preventDefault();
    let token = sessionStorage.getItem("token");
    if (!token) {
      alert("Error with user access");
    } else {
      try {
        let res = await fetch(
          `https://odin-blog-api.onrender.com/blog/posts/${postid}`,
          {
            method: "PUT",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
            body: JSON.stringify({
              title: title,
              content: content,
              published: status,
            }),
          }
        );
        let resJson = await res.json();
        if (res.status === 200) {
          if (resJson.msg) {
            alert(resJson.msg);
          }
          navigate("/odin-blog-cms/");
        } else {
          console.log("An error occurred");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    const getPost = async () => {
      if (postid) {
        try {
          const res = await fetch(
            `https://odin-blog-api.onrender.com/blog/posts/${postid}`,
            {
              method: "GET",
              mode: "cors",
            }
          );
          let resJson = await res.json();
          if (resJson.msg) {
            alert(resJson.msg);
          } else {
            setData(resJson);
            setTitle(resJson.title);
            setContent(resJson.content);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    getPost();
  }, [postid]);

  return (
    <div>
      <Navbar />
      <h1>Edit Post</h1>
      {data ? (
        <form>
          <div className="field">
            <label>Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label>Blog</label>
            <div className="control">
              <textarea
                className="textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="field">
            Publish Post?
            <div className="control">
              <label className="radio">
                <input
                  type="radio"
                  name="answer"
                  defaultChecked
                  value="true"
                  onChange={(e) => handleChange(e)}
                />
                Yes
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="answer"
                  value="false"
                  onChange={(e) => handleChange(e)}
                />
                No
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button" onClick={(e) => updatePost(e)}>
                Update
              </button>
            </div>
          </div>
        </form>
      ) : (
        <h2>Post Not Found</h2>
      )}
    </div>
  );
};

export default Edit;
