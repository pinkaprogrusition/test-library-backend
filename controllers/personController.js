///Контроллер сущности "person".

const db = require('../database/dbPool')

class PersonController {
    ///Создание нового пользователя
    async createPerson(req,res){
        const {login, password} = req.body;
        const person = await db.query('SELECT * FROM person where login = $1',[login]);

        if(person.rows.length == 0){
            await db.query('INSERT INTO person (login, password, subscription, book_count) values ($1, $2, $3, $4) RETURNING *', [login, password, false, 0]);
            res.json({"status":"succeed"});
        }
        else{
            res.json({"status":"failed"});
        }
    }
    ///Получение списка всех пользователей
    async getAllPersons(req,res){
        const persons = await db.query('SELECT * FROM person');
        res.json(persons.rows);
    }
    ///Получение конкретного пользователя
    async getOnePerson(req,res){
        const personID = req.params.personID;
        const person = await db.query('SELECT * FROM person where id = $1',[personID]);

        if(person.rows.length == 1){
            const books = await db.query('SELECT * FROM book where user_id = $1',[personID]);
            person.rows[0]["books"] = books.rows;
    
            res.json(person.rows[0]);
        }
        else{
            res.json({"status":"failed"})
        }
        
    }
    ///Обновление информации про конкретного пользователя
    async updatePerson(req,res){
        const {oldPassword, newPassword} = req.body;
        const personID = req.params.personID;
        const person = await db.query('UPDATE person set password = $1 where id = $2 AND password = $3 RETURNING *',[newPassword, personID, oldPassword]);
        
        if(person.rows.length == 1){
            res.json({"status":"succeed"});
        }
        else{
            res.json({"status":"failed"});
        }
    }
    ///Удаление конкретного пользователя
    async deletePerson(req,res){
        const personID = req.params.personID;
        const person = await db.query('DELETE FROM person where id = $1',[personID]);
       
        res.json({"status":"succeed"});
    }
    ///Оформление абонимента для конкретного пользователя
    async activateSubscriptionOfPerson(req,res){
        const personID = req.params.personID;
        const person = await db.query('UPDATE person set subscription = $1 where id = $2 AND subscription = $3 RETURNING *',[true, personID, false]);
        
        if(person.rows.length == 1){
            res.json({"status":"succeed"});
        }
        else{
            res.json({"status":"failed"});
        }
    }
}

module.exports = new PersonController();