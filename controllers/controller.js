///Объединение всех контроллеров в один общий.

const personController = require('./personController');
const bookController = require('./bookController');

const controller = {
    personController: personController,
    bookController: bookController
};

module.exports = controller;