const books = [
  {
      ISBN:"12345Book",
      title:"getting started with nodejs",
      pubDate: "2021-12-12",
      language: "en",
      numPage: 250,
      author:[1, 2],
      publication: 1,
      category: ["tech", "programming", "education", "romantic"],
  },
];

const author = [
  {
      id: 1,
      name: "pallav",
      books: ["12345Book","pallavbook"],
  },
  {
    id: 2,
    name: "ravi",
    books: ["12345Book"],
  },
];

const publications = [
  {
    id: 1,
    name: "demo",
    books:["12345Book"],
  },
  {
    id: 2,
    name: "d",
    books:["12345Book"],
  }
];

var newBookTitle = [];

module.exports = {books, author, publications};
