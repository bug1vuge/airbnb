const swiperSliderModule = function() {
    if (window.screen.width <= 768){
        const swiper = new Swiper('.reviews', {
            spaceBetween: 30,
            longSwipes: false,
        });
    
        const swiper2 = new Swiper('.rented-house__gallery', {
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction'
            },
        });
    };
};

const toggleDatesSelectModule = function(){
    const selectTrigger = document.querySelector('.checking-dates__select-wrap');
    const selectList = document.querySelector('.checking-dates__select-items');
    const closeSelectList = document.querySelector('.checking-dates__select-close-button');

    selectTrigger.addEventListener('click', () => {
        selectTrigger.classList.toggle('active');
        selectList.classList.toggle('visible');
    });

    closeSelectList.addEventListener('click', (e) => {
        e.preventDefault();

        if (selectList.classList.contains('visible')) {
            selectTrigger.classList.remove('active');
            selectList.classList.remove('visible')
        };
        
    });
    
};

const toggleDatesCalendarModule = function() {

    const datesBlock = document.querySelector('.checking-dates__dates');
    const calendars = document.querySelectorAll('.checking-dates__calendar');


    datesBlock.addEventListener('click', (e) => {

        const currentItem = e.target;

        if (currentItem.classList.contains('checking-dates__arrival-date')) {

            calendars.forEach(el => {
                el.style.display = 'none';
                if (el.classList.contains('checking-dates__arrival-calendar')) {
                    el.style.display = 'block';
                };
            });
        };

        if (currentItem.classList.contains('checking-dates__leave-date')) {
            
            calendars.forEach(el => {
                el.style.display = 'none';
                if (el.classList.contains('checking-dates__leave-calendar')) {
                    el.style.display = 'block';
                };
            });
        };

        if (currentItem.classList.contains('date__calendar-close-button')) {
            
            calendars.forEach(el => {
                el.style.display = 'none';
            });
        };
    });
};

const smoothScrollModule = function () {
    const links = document.querySelectorAll('.header__menu-list-link');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const blockID = link.getAttribute('href');
            document.querySelector('' + blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
};

const fixedHeaderModule = function() {
    
    const header = document.querySelector('.header');
    const main = document.querySelector('.main');

    const headerOffsetHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {

        let scrollDistance = window.scrollY;

        if (scrollDistance >= header.offsetHeight) {

            header.classList.add('fixed');
            main.style.marginTop = `${headerOffsetHeight}px`
        } else {

            header.classList.remove('fixed');
            main.style.marginTop = `${0}px`
        }
    });
};

const galleryModalModule = function() {

    const body = document.querySelector('body'),
          header = document.querySelector('.header');
          commonInfoBlock = document.querySelector('.checking-dates__common-info'),
          galleryModal = document.querySelector('.gallery-modal'),
          galleryBlock = document.querySelector('.rented-house__gallery'),
          closeButton = document.querySelector('.gallery-modal__close-button');
    

    const disableScroll = function() {

        const marginOffset = window.innerWidth - document.body.offsetWidth;

        body.style.overflowY = 'hidden';
        body.style.marginRight = `${marginOffset - 0.2}px`;

        header.style.paddingLeft = `${offsetValue - 0.2}px`;
    };

    const enableScroll = function() {

        body.style.overflowY = 'visible';
        body.style.marginRight = 0;

        header.style.paddingLeft = `${0}px`;
    };


    galleryBlock.addEventListener('click', (e) => {

        const currEl = e.target;

        if (currEl.closest('.rented-house__gallery-item') || currEl.closest('.rented-house__gallery-button')) {
            commonInfoBlock.classList.add('hide');
            galleryModal.classList.add('visible');
            disableScroll();
        };
    });
    

    closeButton.addEventListener('click', () => {

        commonInfoBlock.classList.remove('hide');
        galleryModal.classList.remove('visible');
        setTimeout(enableScroll, 150);
    })
};

const calendarCarouselModule = function(obj) {

    const manageButtons = document.querySelector(obj.manageButtons);
    const calendarItems = document.querySelectorAll(obj.calendarItems);

    let currSlide = 0;


    const showNextCalendar = function() {

        if (window.screen.width > 1024) {

            calendarItems[currSlide].classList.remove('active');
            calendarItems[currSlide + 1].classList.remove('active');

            currSlide += 2;

            if (currSlide >= calendarItems.length) {
                currSlide = 0;
            };

            calendarItems[currSlide].classList.add('active');
            calendarItems[currSlide + 1].classList.add('active');
        } else {

            calendarItems[currSlide].classList.remove('active');

            currSlide += 1;

            if (currSlide >= calendarItems.length) {
                currSlide = 0;
            };

            calendarItems[currSlide].classList.add('active');
        }

    };

    const showPrevCalendar = function() {
        
        if (window.screen.width > 1024) {

            calendarItems[currSlide].classList.remove('active')
            calendarItems[currSlide + 1].classList.remove('active');

            currSlide -= 2;

            if (currSlide <= 0) {
                currSlide = 0;
                manageButtons.querySelector('.date__calendar-left-button').setAttribute('disabled', 'disable');
            };


            calendarItems[currSlide].classList.add('active')
            calendarItems[currSlide + 1].classList.add('active');
        } else {

            calendarItems[currSlide].classList.remove('active');

            currSlide -= 1;

            if (currSlide <= 0) {
                currSlide = 0;
                manageButtons.querySelector('.date__calendar-left-button').setAttribute('disabled', 'disable');
            };

            calendarItems[currSlide].classList.add('active');
        };
    };

    
    if (window.screen.width <= 1024) {

        calendarItems.forEach(el => {
            el.classList.remove('active');
        });

        calendarItems[currSlide].classList.add('active');
    };

    
    manageButtons.addEventListener('click', (e) => {

        if (e.target.closest('.date__calendar-left-button')) {

            showPrevCalendar();
        } else {

            showNextCalendar();
            
            if (currSlide !== 0) {
                manageButtons.querySelector('.date__calendar-left-button').removeAttribute('disabled');
            };
        };
    });
};

const loadReviewsModule = function() {

    const loadMoreButton = document.querySelector('.reviews-modal__loadmore-button');
    const reviews = document.querySelectorAll('.reviews-modal__review-container');
    
    let defaultValue = 4;
    let showValue = 4;


    const showReviews = function () {

        showValue = defaultValue + showValue;

        reviews.forEach((review, index) => {

            if (index < showValue) {
                review.classList.add('visible');
            };
        });

        if (showValue >= reviews.length) {
            loadMoreButton.style.display = 'none';
            return 0;
        };
    };

    const showDefaultReviews = function () {

        reviews.forEach((review, index) => {

            if (index < defaultValue) {
                review.classList.add('visible');
            };
        });
    };

    if (reviews.length < 4) {
        loadMoreButton.style.display = 'none';
    }

    showDefaultReviews();

    loadMoreButton.addEventListener('click', showReviews);
};

const modalModule = function(obj) {

    const overlay = document.querySelector('.overlay'),
          commonInfoBlock = document.querySelector('.checking-dates__common-info'),
          body = document.querySelector('body'),
          header = document.querySelector('.header'),
          openButton = document.querySelector(obj.openButton),
          closeButton = document.querySelector(obj.closeButton),
          modal = document.querySelector(obj.modal);



    const disableScroll = function() {

        const offsetValue = window.innerWidth - document.body.offsetWidth;

        body.style.overflowY = 'hidden';
        body.style.marginRight = `${offsetValue - 0.2}px`;

        header.style.paddingRight = `${offsetValue - 0.2}px`;
    };

    const enableScroll = function() {

        body.style.overflowY = 'visible';
        body.style.marginRight = `${0}px`;

        header.style.paddingRight = `${0}px`;
    };

    const addClasses = function() {
        commonInfoBlock.classList.add('hide');
        overlay.classList.add('visible');
        modal.classList.add('visible');
    };

    const removeClasses = function() {
        commonInfoBlock.classList.remove('hide');
        overlay.classList.remove('visible');
        modal.classList.remove('visible');
    };


    openButton.addEventListener('click', () => {
        addClasses();
        disableScroll();
    });

    closeButton.addEventListener('click', () => {
        removeClasses();
        setTimeout(enableScroll, 150);
    });

    overlay.addEventListener('click', () => {
        removeClasses();
        setTimeout(enableScroll, 150);
    });
};

const selectDateModule = function() {

    // Объявление переменных
    const arrivalField = document.querySelector('.checking-dates__dates .checking-dates__arrival-date'),
          leaveField = document.querySelector('.checking-dates__dates .checking-dates__leave-date'),

          arrivalCalendar = document.querySelector('.checking-dates__arrival-calendar');
          leaveCalendar = document.querySelector('.checking-dates__leave-calendar');

          arrivalCalendarItems = document.querySelectorAll('.checking-dates__arrival-calendar .date__calendar-item');
          leaveCalendarItems = document.querySelectorAll('.checking-dates__leave-calendar .date__calendar-item');

          calendarData = [];

    let arrivalItemsCounter = 1;
    let leaveItemsCounter = 1;


    // Описание функций
    const pushArrayElement = function() {

        for (let i = 0; i < 12; i++) { 
            calendarData.push({});
        };
    };

    const setDataAttribute = function(items, counter) {

        items.forEach(item => {

            item.setAttribute('data-month-id', counter);
            counter += 1;
        });
    };

    const addZero = (num) => {
        if (num < 10) {
            return '0' + num;
        } else {
            return num;
        };
    };

    const setDateValue = function(items) {

        items.forEach(item => {

            const dataAttributeValue = +item.getAttribute('data-month-id');

            item.addEventListener('click', (e) => {

                const target = e.target;

                calendarData.forEach((el, index) => {
                    if (dataAttributeValue === index + 1) {
                        el.id = dataAttributeValue;
                        el.year = 2022;
                    };
                });

                if (target.classList.contains('date__calendar-number')) {
                    
                    if (target.classList.contains('disabled') || target.classList.contains('rented')) {
                        return 0;
                    } else {
    
                        calendarData.forEach((el, index) => {
                            if (dataAttributeValue === index + 1) {
                                el.value = target.textContent;
                            };

                            if (target.closest('.arrival-calendar__item')) {

                                if (dataAttributeValue === index + 1) {

                                    arrivalField.value = `${addZero(el.value)}.${addZero(el.id)}.${el.year}`;
                                    arrivalCalendar.style.display = 'none';
                                    leaveCalendar.style.display = 'block';
                                };

                            } else {
                                
                                if (dataAttributeValue === index + 1) {

                                    leaveField.value = `${addZero(el.value)}.${addZero(el.id)}.${el.year}`;
                                    arrivalCalendar.style.display = 'none';
                                    leaveCalendar.style.display = 'none';
                                };
                            };
                        });

                    };
                };
            });
        });
    };


    // Функциональный блок
    pushArrayElement();

    setDataAttribute(arrivalCalendarItems, arrivalItemsCounter);
    setDataAttribute(leaveCalendarItems, leaveItemsCounter);

    setDateValue(arrivalCalendarItems);
    setDateValue(leaveCalendarItems);

};




selectDateModule();
loadReviewsModule();
swiperSliderModule();
toggleDatesCalendarModule();
galleryModalModule();
fixedHeaderModule();
toggleDatesSelectModule();
smoothScrollModule();



modalModule({openButton: '.reviews__button', modal: '.reviews-modal', closeButton: '.reviews-modal__close-button'});
modalModule({openButton: '.conveniences__button', modal: '.conveniences-modal', closeButton: '.conveniences-modal__close-button'});
modalModule({openButton: '.rented-house__owner-button', modal: '.contacts-modal', closeButton: '.contacts-modal__close-button'});
modalModule({openButton: '.description__content-button', modal: '.description-modal', closeButton: '.description-modal__close-button'});
modalModule({openButton: '.checking-dates__open-modal', modal: '.dates-modal', closeButton: '.dates-modal__close-button'});


calendarCarouselModule({manageButtons: '.main-calendar__buttons', calendarItems: '.main-calendar__item'});
calendarCarouselModule({manageButtons: '.arrival-calendar__buttons', calendarItems: '.arrival-calendar__item'});
calendarCarouselModule({manageButtons: '.leave-calendar__buttons', calendarItems: '.leave-calendar__item'});

