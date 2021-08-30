Описание API

Все запросы происходят по протоколу HTTP.
URL для запросов: <ip>:<port>/api/<additionalURL>
BODY - JSON.

Person API

1) Создать нового пользователя
additionalURL: /person/
TYPE: POST
BODY: {
    "login": VARCHAR(255)
    "password": VARCHAR(255)
}

2) Получить сведения о всех пользователях
additionalURL: /person/
TYPE: GET
BODY: -

3)Получить сведения о конкретном пользователе
additionalURL: /person/<personID>
TYPE: GET
BODY: -

4) Обновить информацию о конкретном пользователе
additionalURL: /person/<personID>
TYPE: PUT
BODY: {
    "oldPassword": VARCHAR(255)
    "newPassword": VARCHAR(255)
}

5) Удалить конкретного пользователя
additionalURL: /person/<personID>
TYPE: DELETE
BODY: -

6) Офорпить абонимент для конкретного пользователя
additionalURL: /person/subscribe/<personID>
TYPE: PUT
BODY: -


Book API

1) Создать новую книгу
additionalURL: /book/
TYPE: POST
BODY: {
    "title": VARCHAR(255)
}

2) Получить сведения о всех книгах
additionalURL: /book/
TYPE: GET
BODY: -

3)Получить сведения о конкретной книге
additionalURL: /book/<bookID>
TYPE: GET
BODY: -

4) Удалить конкретную книгу
additionalURL: /book/<bookID>
TYPE: DELETE
BODY: -

5) Отдать книгу конкретному пользователю
additionalURL: /book/borrow/<bookID>
TYPE: PUT
BODY: {
    "personID": INTEGER
}

6) Вернуть книгу конкретным пользователем
additionalURL: /book/return/<bookID>
TYPE: PUT
BODY: -
