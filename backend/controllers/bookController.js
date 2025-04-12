const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, location, coverImage } = req.body;
    
    const newBook = new Book({
      title,
      author,
      genre,
      location,
      coverImage: coverImage || 'https://via.placeholder.com/150',
      owner: req.user.id
    });

    const book = await newBook.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).populate('owner', ['name', 'email', 'mobileNumber']);
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('owner', ['name', 'email', 'mobileNumber']);
    
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    
    res.json(book);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.status(500).send('Server Error');
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    // Ensure only the owner can update the book
    if (book.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const { title, author, genre, location, status, coverImage } = req.body;

    if (title) book.title = title;
    if (author) book.author = author;
    if (genre) book.genre = genre;
    if (location) book.location = location;
    if (status) book.status = status; // Update the status
    if (coverImage) book.coverImage = coverImage;

    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    
    if (book.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    await Book.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Book removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.status(500).send('Server Error');
  }
};

exports.getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.filterBooks = async (req, res) => {
  try {
    const { genre, location, title } = req.query;
    const query = {};
    
    if (genre) query.genre = genre;
    if (location) query.location = location;
    if (title) query.title = { $regex: title, $options: 'i' };
    
    const books = await Book.find(query)
      .sort({ createdAt: -1 })
      .populate('owner', ['name', 'email', 'mobileNumber']);
      
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}; 