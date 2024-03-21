import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import ShowBooks from "./pages/ShowBooks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/books/create" element={<CreateBook></CreateBook>}></Route>
      <Route
        path="/books/details/:id"
        element={<ShowBooks></ShowBooks>}
      ></Route>
      <Route path="/books/edit/:id" element={<EditBook></EditBook>}></Route>
      <Route
        path="/books/delete/:id"
        element={<DeleteBook></DeleteBook>}
      ></Route>
    </Routes>
  );
}

export default App;
