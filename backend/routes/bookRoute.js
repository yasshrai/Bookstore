const express = require("express");
const Book = require("../models/bookModel.js");

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);

    return response.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for save a new book

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishyear
    ) {
      return response.status(400).send({
        message: "send all required filed :title,authore,publishyear",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishyear: request.body.publishyear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishyear
    ) {
      return response.status(400).send({
        message: "send all required fields: title, author, publishYear",
      });
    }
    const { id } = request.params;
    console.log("Updating book with id:", id);
    const result = await Book.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    console.log("Updated book:", result);
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response
      .status(200)
      .json({ message: "Book updated successfully", book: result });
  } catch (error) {
    console.error("Error updating book:", error.message);
    return response.status(500).send({ message: error.message });
  }
});

// route for delete

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "book not found" });
    }

    return response.status(200).send({ message: "book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;
