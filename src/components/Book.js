import React, { useState } from "react";
import axios from "axios";

export default function Book() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState("AIzaSyA86QzGXjePRSLzFOv-FkxszwSdyuYAauM"
  );

  function handleChange(event) {
    const book = event.target.value;

    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + apiKey + "&maxResults=40")
      .then(data => {
        console.log(data.data.items);
        setResult(data.data.items);
      });
  }

  return (
    <div className="container">
      <h1>Vous cherchez un livre ?</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            onChange={handleChange}
            className="form-control ml-10"
            placeholder="chercher un livre"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-danger">
          Chercher
        </button>
      </form>
      {result.map(book => {
        if (book.volumeInfo.imageLinks) {
          return (<a title={book.volumeInfo.title} target="_blank" href={book.volumeInfo.previewLink}><img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/></a>)
        }
        return (null);
      })}
    </div>
  );
}