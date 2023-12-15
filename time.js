(function() {
    function displayPageLoadStats() { // функция статистики времени загрузки страницы
        // вычитание времени окончания события из времени начала навигации
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        // возвращение текущего времени в мс
        const loadTime2 = window.performance.now();
        const footer = document.getElementById('footer');
        if (footer) {
            const loadTimeInfo = document.createElement('p');
            loadTimeInfo.style.fontSize = '90%';
            loadTimeInfo.textContent = `Время загрузки страницы - ${loadTime} мс`;
            // добавляется в конец элемента footer
            footer.appendChild(loadTimeInfo);
        }
    }

    // подписываемся на событие загрузки страницы
    window.addEventListener('load', displayPageLoadStats);
})();