function validateBook(req, res, next) {
    const { title, author, ISBN, publishedDate, genre, copiesAvailable } = req.body;
    const errors = [];
  
    if (!title) errors.push({ field: "title", message: "Title is required." });
    if (!author) errors.push({ field: "author", message: "Author is required." });
    if (!ISBN) {
      errors.push({ field: "ISBN", message: "ISBN is required." });
    } else {
      const isbnRegex = /^(?:\d{9}[\dX]|\d{13})$/;
      if (!isbnRegex.test(ISBN)) {
        errors.push({ field: "ISBN", message: "Invalid ISBN format." });
      }
    }
    if (!publishedDate) {
      errors.push({ field: "publishedDate", message: "Published date is required." });
    } else {
      if (new Date(publishedDate) > new Date()) {
        errors.push({ field: "publishedDate", message: "Published date cannot be in the future." });
      }
    }
    if (genre === "Academic" && copiesAvailable < 5) {
      errors.push({ field: "copiesAvailable", message: "Academic books must have at least 5 copies." });
    }
  
    if (errors.length > 0) {
      return res.status(400).json({ valid: false, errors });
    }
  
    next();
  }
  
  module.exports = { validateBook };
  