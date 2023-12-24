const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,

    mousewheel: {
        invert: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    autoplay: {
        delay: 8000,
    },

    scrollbar: {
        el: '.swiper-scrollbar',
    },
    slidesPerView: 1,
    centeredSlides: false,
    spaceBetween: 8,
    grabCursor: true,
    init: true

});