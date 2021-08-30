///Контроллер сущности "book".

const db = require('../database/dbPool')

class BookController {
    ///Создание новой книги
    async createBook(req,res){
        const {title} = req.body;
        const book = await db.query('SELECT * FROM book where title = $1',[title]);

        if(book.rows.length == 0){
            await db.query('INSERT INTO book (title) values ($1) RETURNING *', [title]);
            res.json({"status":"succeed"});
        }
        else{
            res.json({"status":"failed"});
        }
    }
    ///Получение списка всех книг
    async getAllBooks(req,res){
        const books = await db.query('SELECT * FROM book');
        res.json(books.rows);
    }
    ///Получение сведений о конкретной книге
    async getOneBook(req,res){
        const bookID = req.params.bookID;
        const book = await db.query('SELECT * FROM book where id = $1',[bookID]);

        if(book.rows.length == 1){
            res.json(book.rows[0]);
        }
        else{
            res.json({"status":"failed"})
        }
        
    }
    ///Удаление конкретной книги
    async deleteBook(req,res){
        const bookID = req.params.bookID;
        const book = await db.query('DELETE FROM book where id = $1',[bookID]);
        
        res.json({"status":"succeed"});
    }
    ///Выдача книги конкретному пользователю
    async borrowTheBook(req,res){
        const bookID = req.params.bookID;
        const {personID} = req.body; 

        const person = await db.query('SELECT * FROM person where id = $1 AND subscription = $2 AND book_count < 5',[personID, true]);
        console.log(person.rows);

        if(person.rows.length == 1){

            const book = await db.query('UPDATE book set user_id = $1 where id = $2 AND user_id IS NULL RETURNING *',[personID, bookID]);
            console.log(book);

            if(book.rows.length == 1){
                await db.query('UPDATE person set book_count = $1 where id = $2 RETURNING *',[person.rows[0]["book_count"]+1,personID]);
            
                res.json({"status":"succeed"});
            }
            else{
                res.json({"status":"failed"});
            }
        }
        else{
            res.json({"status":"failed"})
        }
    }
    ///Возврат книги
    async returnTheBook(req,res){
        const bookID = req.params.bookID;

        const book = await db.query('SELECT * FROM book where id = $1',[bookID]);
        console.log(book.rows);

        if(book.rows.length == 1 && book.rows[0]["user_id"] != null){
            const personID = book.rows[0]["user_id"];
            const person = await db.query('SELECT * FROM person where id = $1',[personID]);

            await db.query('UPDATE person set book_count = $1 where id = $2 RETURNING *',[person.rows[0]["book_count"]-1,personID]);
            
            await db.query('UPDATE book set user_id = $1 where id = $2 RETURNING *',[null, bookID]);
           
            res.json({"status":"succeed"});
        }
        else{
            res.json({"status":"failed"})
        }
    }
}

module.exports = new BookController();