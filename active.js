//обработчик события "DOMContentLoaded", который срабатывает, когда веб-страница полностью загружена
window.addEventListener("DOMContentLoaded", () => {
    //вывод в консоль текущего URL адрес страницы
    console.log(window.location.href);
    //все элементы ссылок, которые находятся в классе menu. document.querySelectorAll возвращает все элементы, удовлетворяющие селектору.
    const links = document.querySelectorAll('.menu ul li a');
    //цикл по списку ссылок
    for (let i = 0; i < links.length; i++) {
        //проверка на совпадение href и URL
        if (links[i].href === window.location.href) {
            //если совпадает, то добавляем класс active
            links[i].classList.add("active");
        }
    }
});
