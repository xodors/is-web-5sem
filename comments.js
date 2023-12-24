document.addEventListener('DOMContentLoaded', async function() { //после полной загрузки выполняется асинхронная функция
    let flag = false;
    const limit = 4;
    const refreshButton = document.getElementById('refresh'); //кнопка обновить
    refreshButton.addEventListener('click', function() { //обработчик событий
        flag = !flag;
        refreshData(flag, limit);
    })
    await refreshData(flag, limit);
});

async function refreshData(firstCall, limit) {
    const preloader = document.getElementById('preloader');//находим preloader и схораняем его в переменную
    const errPlace = document.createElement('div');
    let url = 'https://jsonplaceholder.typicode.com/comments';
    if (firstCall) {
        const randomStart = Math.floor(Math.random() * 8);//если true, то рандомно генерируется число от 0 до 8, прибавляется с значением limit к url
        url += `?_start=${randomStart}&_limit=8`;
    } else {
        url += `?_start=8&_limit=8`;
    }
    try {
        preloader.style.display = 'block';
        const response = await fetch(url); //GET-запрос по url с помощью fetch, сохраняем
        if (!response.ok) {
            throw new Error('ERROR');//ошибка
        }
        const commentsList = await response.json();//получаем данные из ответа
        console.log('Данные:', commentsList);//выводим в консоль
        renderComments(commentsList);
        preloader.style.display = 'none';//скрытие прелоадера
    } catch (error) {
        console.error('Error:', error);//вывод ошибки
        preloader.style.display = 'none';
        errPlace.textContent = '⚠ Что-то пошло не так';
        document.getElementById('commentsList').appendChild(errPlace);
    }
}

function renderComments(commentsList) {
    const commentsListElement = document.getElementById('commentsList');
    commentsListElement.innerHTML = '';//очищаем содержимое
    const template = document.getElementById('commentsTemplate');//находим элемент по id и сохраняем в переменную
    commentsList.forEach(user => {
        const commentElement = document.importNode(template.content, true);
        commentElement.querySelector('.email').textContent = 'Email: ' + user.email;
        commentElement.querySelector('.name').textContent = 'Name: ' + user.name;
        commentElement.querySelector('.body').textContent = 'Comment: ' + user.body;
        commentsListElement.appendChild(commentElement);
    });
}