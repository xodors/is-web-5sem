// получаем ссылки на поля
const form = document.getElementById('form')
const inputField = document.getElementById('input');
const outputField = document.getElementById('output');
const submitButton = document.getElementById('send');
const deleteButton = document.getElementById('delete');

// функция, которая будет обрабатывать событие отправки формы
function handleSubmit(event) {
    event.preventDefault(); // предотвращаем перезагрузку страницы

    const input = inputField.value.trim(); // проверка значения и удаление начальных и конечных пробелов

    if (input === '') {
        alert('Пожалуйста, введите что-то!'); // уведомление о пустом поле
        return;
    }

    // сохранение введенного значения в локальное хранилище
    let savedData = localStorage.getItem('savedData');
    if (savedData) {
        savedData = JSON.parse(savedData); // преобразуем сохраненные данные из строки json в объект js
    } else {
        savedData = []; // создаем новый пустой массив, если сохраненные данные не найдены
    }
    savedData.push(input); // добавляем новое значение в массив
    localStorage.setItem('savedData', JSON.stringify(savedData)); // сохраняем обновленные данные в локальное хранилище

    // создаем новый элемент списка и добавляем в сохраненные данные
    const listItem = document.createElement('li');
    listItem.textContent = input;
    outputField.appendChild(listItem);

    // очищаем поле ввода
    inputField.value = '';
}

// функция удаления последней информации
function deleteLastItem() {
    let savedData = localStorage.getItem('savedData');// получаем сохраненные данные
    if (savedData) {
        savedData = JSON.parse(savedData);// проверка, существуют данные, если они существуют, то преобразуем их из строки json в массив
        if (savedData.length > 0) {
            savedData.pop(); // удаление последней информации
            localStorage.setItem('savedData', JSON.stringify(savedData)); // преобразуем массив обратно в строку json
            outputField.lastChild.remove(); // удаление последнего дочернего элемента
        } else {
            alert('Нет информации для удаления!');
        }
    } else {
        alert('Нет информации для удаления!');
    }
}

// получаем данные из локального хранилища и отображаем на странице
function loadSavedData() {
    const savedData = localStorage.getItem('savedData'); // получаем данные из хранилища
    if (savedData) { // если данные существуют
        const parsedData = JSON.parse(savedData); // реобразуем сохраненные данные из строки в массив
        parsedData.forEach(function(item) {
            const listItem = document.createElement('li'); // элемент списка для каждого элемента массива
            listItem.textContent = item; // pаполняем текст элемента списка значением item
            listItem.addEventListener('click', function() { // обработчик события
                parsedData.splice(parsedData.indexOf(item), 1); // удаляем значение из массива данных
                listItem.remove(); // удаляем элемент списка из DOM
                localStorage.setItem('savedData', JSON.stringify(parsedData)); // обновляем данные в хранилище
            });
            outputField.appendChild(listItem); // добавляем элемент списка в выходное поле
        });
    }
}

// обработчик события отправки формы и удаления последней информации
submitButton.addEventListener('click', handleSubmit);
deleteButton.addEventListener('click', deleteLastItem);
loadSavedData(); // функция для загрузки сохраненных данных при загрузке страницы.