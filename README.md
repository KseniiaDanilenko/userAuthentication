# userAuthentication
Скрипт, описывающий авторизацию уже зарегистрированного пользователя. 
- Создается класс UserService,сеттерами назначается логин и пароль, также проводится проверка на длину пароля. 
- В классе есть статический метод отвечающий за авторизацию пользователя - формируется XMLHttpRequest запрос, содержащий в себе имя пользователя и пароль и отправляется на сервер. 
- В случае успешного запроса, авторизация пройдена и возвращается true. 
- Через jquery находится кнопка авторизации и на нее вешается обработчик. При срабатывании создается новый объект user класса UserService, где username и password - введенные значения в соответствующие поля формы (назначаются через сеттеры).
- Вызывается статический метод UserService.authenticateUser,с аргументами username и password).
- В случае успешной авторизации загружается домашняя страница. 
