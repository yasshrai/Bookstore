import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishyear, setPublishyear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    if (!title.trim() || !author.trim() || isNaN(publishyear)) {
      alert("Please fill out all fields correctly.");
      return;
    }

    setLoading(true);

    const data = {
      title: title.trim(),
      author: author.trim(),
      publishyear: parseInt(publishyear),
    };

    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          alert("Bad request! Please check your input.");
        } else {
          alert("An error occurred. Please try again later.");
          console.log("Error:", error.message);
        }
      });
  };

  return (
    <div className="p-4">
      <BackButton></BackButton>
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 w-full py-2"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 w-full py-2"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishyear}
            onChange={(e) => setPublishyear(e.target.value)}
            className="border-2 border-gray-500 px-4 w-full py-2"
          />
        </div>
        <button className="p-2 bg-sky-400 m-8" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
