///Маршрутизация запросов для сущности "person".
///Сами операции описаны в контроллере.

const Router = require('express');
const router = new Router();
const controller = require('../controllers/controller');

router.post('/person', controller.personController.createPerson);
router.get('/person', controller.personController.getAllPersons);
router.get('/person/:personID', controller.personController.getOnePerson);
router.put('/person/:personID', controller.personController.updatePerson);
router.put('/person/subscribe/:personID', controller.personController.activateSubscriptionOfPerson);
router.delete('/person/:personID', controller.personController.deletePerson);

module.exports = router;