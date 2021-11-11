class UserService {
  //конструктор оставлен на случай дальнейшего расширения функционала кода
  constructor (){}
  //использованы сеттеры для назначения защищенных свойств (имя пользователя и пароль). Методом trim удаляются пробелы в начале и конце строки
 set username(username){
   this._username = username.trim();
 }
//с помощью сеттера внедрена проверка пароля на минимальную длину и убраны пробелы в начале и конце. Если длина недостаточна в консоль вылетает ошибка
 set password(password){
  if(password.length>=8){
    this._password = password.trim();  
  }else{
    throw 'Password is too short'
  }
}
//геттеры для получения логина и пароля
 get username(){
   return this._username;
 }
 
get password(){
  return this._password;
}
//создан статический метод авторизации пользователя, логин и пароль передаются при создании объекта класса UserService
static authenticateUser(username, password){
  //создаем новый запрос 
  let xhr = new XMLHttpRequest();
  //фоормируем запрос. Имя пользователя и пароль переданы с помощью шаблонных строк
  xhr.open('GET', `https://examples.com/api/user/authenticate?username=${username}&password=${password}`);  
  //указываем ожидаемый тип ответа
  xhr.responseType = 'json';
  //отправляем запрос на сервер
  xhr.send()
  //осуществляем проверку респонса. Если код состояния HTTP  200 - аутентификация пройдена. 
  let result;
  xhr.onload = ()=>{
  result = (xhr.status!==200) ? false : true;
  }
  return result;
}
}
//через jquery вешаем обработчик на кнопку submit в форме.
$('form #login').submit((e)=>{
  //методом preventdefault отменяем перезагрузку страницы
  e.preventDefault();
  //создаем объект user класса UserService
  const user = new UserService();
  //данные логина и пароля берем из значений полей ввода 
  user.username = $('#username').val();
  user.password =  $('#password').val();
  //помещаем результат аутентификации в переменную authResult
let authResult = UserService.authenticateUser(user.username, user.password);
//в случае успешной аутентификации перенаправляем пользователя на домашнюю страницу. 
if(authResult){
  window.location.href = '/home';  
}
//в случае ошибки авторизации создаем сообщение об ошибке
else {
 throw ('Ошибка авторизации');
}
})

