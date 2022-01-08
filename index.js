const express = require("express");

const database = require("./database");

const pallavAPI = express();

pallavAPI.use(
  express.urlencoded({
    extended: true
  })
)
pallavAPI.use(express.json())

pallavAPI.get("/", (req, res) => {
  return res.json({books: database.books});
});

pallavAPI.get("/ISBN/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);

  if(getSpecificBook.length === 0){
    return res.json({error: `No Book Found For The ISBN Of ${req.params.isbn}`,});
  }

  else{
    return res.json({book: getSpecificBook});
}
});

pallavAPI.get("/category/:category", (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category));

    if(getSpecificBook.length === 0){
      return res.json({error: `No Book Found For The ISBN Of ${req.params.category}`,});
    }

    else{
      return res.json({book: getSpecificBook});
    }
});

pallavAPI.get("/author", (req, res) => {
      return res.json({authors: database.author});
});


pallavAPI.get("/author/:authorId", (req, res) => {
  const getSpecificAuthor = database.author.filter((author) => author.id === parseInt(req.params.authorId));

      if(getSpecificAuthor.length === 0){
        return res.json({error: `No Author Found For The id Of ${req.params.authorId}`,});
      }
      else{
    return res.json({id: getSpecificAuthor});
}
});

pallavAPI.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn));

    if(getSpecificAuthor.length === 0){
      return res.json({error: `No Author Found For The Book Of ${req.params.isbn}`,});
    }

    else{
      return res.json({book: getSpecificAuthor});
    }
});

pallavAPI.get("/author", (req, res) => {
      return res.json({authors: database.author});
});


pallavAPI.get("/publication", (req, res) => {
  return res.json({publications: database.publications});
});

pallavAPI.get("/publication/:publicationId", (req, res) => {
  const getSpecificPublication = database.publications.filter((publication) => publication.id === parseInt(req.params.publicationId));

      if(getSpecificPublication.length === 0){
        return res.json({error: `No publication Found For The id Of ${req.params.publicationId}`,});
      }
      else{
    return res.json({id: getSpecificPublication});
}
});




/*   now add or delete */

pallavAPI.post("/book/add", (req, res) => {
  const { newBook } = req.body;
  database.books.push(newBook);
  return res.json({ books: database.books });
});

/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
pallavAPI.post("/author/add", (req, res) => {
  const { newAuthor } = req.body;
  database.author.push(newAuthor);
  return res.json({ authors: database.author });
});

/*
Route           /book/update/title
Description     Update book title
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
pallavAPI.put("/book/update/title/:isbn/:newtitle", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.title = req.params.newtitle;
      return;
    }
  });

  return res.json({ books: database.books });
});

pallavAPI.put("/book/update/title/:isbn", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.title = req.body.newTitle;
      return;
    }
  });

  return res.json({ books: database.books });
});

/*
Route           /book/update/author
Description     update/add new author for a book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
pallavAPI.put("/book/update/author/:isbn/:authorId", (req, res) => {
  // update book database

  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      return book.author.push(parseInt(req.params.authorId));
    }
  });

  // update author database

  database.author.forEach((author) => {
    if (author.id === parseInt(req.params.authorId))
      return author.books.push(req.params.isbn);
  });

  return res.json({ books: database.books, author: database.author });
});

pallavAPI.put("/publication/update/book/:isbn", (req, res) => {
  // update book database
  database.publications.forEach((publication) => {
    if(publication.id === req.body.pubId){
      return publication.books.push(req.params.isbn);
    }
  });
  database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn){
      book.publication = req.body.pubId;
      return;
    }
  });
  return res.json({books: databash.books, publication: database.publications, message:"successfully updated",});
});


/* ---end--- */
pallavAPI.listen(8080, () => console.log("hey server is running"));
