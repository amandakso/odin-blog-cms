import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const createPost = async (e, status) => {
    e.preventDefault();
    let token = sessionStorage.getItem("token");
    if (!token) {
      alert("Error with user access");
    } else {
      try {
        let res = await fetch("https://odin-blog-api.onrender.com/blog/posts", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({
            title: title,
            content: content,
            published: status.publish_status,
          }),
        });
        let resJson = await res.json();

        if (res.status === 200) {
          if (resJson.errors) {
            setErrors(resJson.errors);
          }
          if (resJson.error) {
            alert(resJson.error);
          }
          if (resJson.message) {
            alert(resJson.message);
            setErrors(null);
            navigate("/odin-blog-cms/");
          }
        } else {
          console.log("An error occurred");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <form>
        <div className="field">
          <label>Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title here"
            />
          </div>
        </div>
        <div className="field">
          <label>Blog</label>
          <div className="control">
            <textarea
              className="textarea"
              value={content}
              placeholder="Enter blog post here..."
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              className="button"
              onClick={(e) => createPost(e, { publish_status: "false" })}
            >
              Save as Draft
            </button>
          </div>
          <div className="control">
            <button
              className="button"
              onClick={(e) => createPost(e, { publish_status: "true" })}
            >
              Publish Post
            </button>
          </div>
        </div>
      </form>
      {errors ? (
        <ul>
          {errors.map((item, index) => (
            <li key={index}>{item.msg}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Create;
