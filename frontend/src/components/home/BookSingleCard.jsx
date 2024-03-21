import React from "react";
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import BookModel from "./BookModel";
import { useState } from "react";

const BookSingleCard = ({ book }) => {
  const [showModel, setshowModel] = useState(false);
  return (
    <div className=" border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl">
      <h2 className=" absolute top-2 right-2 px-4 py-1 bg-red-300 rounded-lg">
        {book.publishyear}
      </h2>
      <h4 className=" my-2 text-gray-500">{book._id}</h4>
      <div className=" flex justify-start items-center gap-x-2">
        <PiBookOpenTextLight className=" text-red-300 text-2xl"></PiBookOpenTextLight>
        <h2 className=" my-1">{book.title}</h2>
      </div>
      <div className=" flex justify-start items-center gap-x-2">
        <BiUserCircle className=" text-red-300 text-2xl"></BiUserCircle>
        <h2 className="my-1">{book.author}</h2>
      </div>
      <div className=" flex justify-between items-center gap-x-2 mt-4 p-4">
        <BiShow
          className=" text-3xl text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setshowModel(true)}
        ></BiShow>

        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className=" text-2xl text-green-800 hover:text-black"></BsInfoCircle>
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className=" text-2xl text-yellow-600 hover:text-black"></AiOutlineEdit>
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className=" text-2xl text-red-600 hover:text-black"></MdOutlineDelete>
        </Link>
      </div>

      {showModel && (
        <BookModel book={book} onClose={() => setshowModel(false)}></BookModel>
      )}
    </div>
  );
};

export default BookSingleCard;
