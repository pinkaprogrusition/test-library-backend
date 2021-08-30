///Маршрутизация запросов для сущности "book".
///Сами операции описаны в контроллере.

const Router = require('express');
const router = new Router();
const controller = require('../controllers/controller');

router.post('/book', controller.bookController.createBook);
router.get('/book', controller.bookController.getAllBooks);
router.get('/book/:bookID', controller.bookController.getOneBook);
router.put('/book/borrow/:bookID', controller.bookController.borrowTheBook);
router.put('/book/return/:bookID', controller.bookController.returnTheBook);
router.delete('/book/:bookID', controller.bookController.deleteBook);

module.exports = router;