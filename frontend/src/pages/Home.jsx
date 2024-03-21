import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BookTable from "../components/home/BookTable";
import BookCard from "../components/home/BookCard";

const Home = () => {
  const [Books, setBooks] = useState([]);
  const [Loding, setLoding] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoding(true);
    axios
      .get("http://localhost:5555/books/")
      .then((response) => {
        setBooks(response.data.data);
        setLoding(false);
      })
      .catch((error) => {
        console.log(error);
        setLoding(false);
      });
  }, []);

  return (
    <div className=" p-4 ">
      <div className=" flex justify-center items-center gap-x-4">
        <button
          className=" bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className=" bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("Card")}
        >
          Card
        </button>
      </div>
      <div className=" flex justify-between items-center">
        <h1 className=" text-3xl my-8">Books List</h1>
        <Link to={"/books/create"}>
          <MdOutlineAddBox className=" text-sky-800 text-4xl"></MdOutlineAddBox>
        </Link>
      </div>
      {Loding ? (
        <Spinner></Spinner>
      ) : showType === "table" ? (
        <BookTable Books={Books}></BookTable>
      ) : (
        <BookCard Books={Books}></BookCard>
      )}
    </div>
  );
};

export default Home;
