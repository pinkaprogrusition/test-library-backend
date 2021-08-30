///Exspress сервер.
///Весь проект разбит на модули. 
///Маршруты подключаются из файлов директории routes.

const { json } = require('express');
const express = require('express');
const personRouter = require('./routes/personRoutes')
const bookRouter = require('./routes/bookRoutes')

const app = express();

const HOST = 'localhost'; 
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', personRouter);
app.use('/api', bookRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on ${HOST}:${PORT}`);
});