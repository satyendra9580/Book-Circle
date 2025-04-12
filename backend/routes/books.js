const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middlewares/auth');
const owner = require('../middlewares/owner');

router.post('/', auth, owner, bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/filter', bookController.filterBooks);
router.get('/my', auth, bookController.getMyBooks);
router.get('/:id', bookController.getBookById);
router.put('/:id', auth, bookController.updateBook);
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router; 
