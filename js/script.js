"use strict";


document.addEventListener('DOMContentLoaded', () => {

    function goToLink(selectorElement) {
        const scrollTarget = document.querySelector(selectorElement);
        const header = document.querySelector('.header').clientHeight;
        const topOffset = header;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;
        window.scrollBy({
            top: offsetPosition,
            behavior: "smooth",
        });
    }

    //Burger

    function burgerClick() {
        const burger = document.querySelector('.header__burger');
        const menu = document.querySelector('.header__nav');
        const btn = document.querySelector('.header__btn');
        const body = document.body;

        const menuMobile = document.createElement('div');
        menuMobile.classList.add('menu-mobile');


        if (burger) {
            burger.addEventListener('click', () => {
                burger.classList.toggle('_active');
                body.classList.toggle('_active');
                menuMobile.classList.toggle('_active');
            });

            if (document.documentElement.clientWidth <= 768) {
                burger.insertAdjacentElement('afterend', menuMobile);
                menuMobile.insertAdjacentElement('beforeend', menu);
            }
            if (document.documentElement.clientWidth <= 500) {
                menuMobile.insertAdjacentElement('beforeend', btn);
            }
        }
    }
    burgerClick();

    //==============================================================


    //Click Menu Header

    function sectionToLink(sections, link) {
        for (let index = 0; index < sections.length; index++) {
            const section = sections[index];
            if (section.dataset.section === link.dataset.header) {
                goToLink(`[data-section='${section.dataset.section}']`);
            }
        }
    }

    function clickHeaderLick() {
        const links = document.querySelectorAll('[data-header]');
        const sections = document.querySelectorAll('[data-section]');
        const burger = document.querySelector('.header__burger');
        const menuMobile = document.querySelector('.menu-mobile');
        const body = document.body;

        if (links.length > 0) {
            for (let index = 0; index < links.length; index++) {
                const link = links[index];
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    sectionToLink(sections, link);
                    if (burger.classList.contains('_active')) {
                        burger.classList.remove('_active');
                        menuMobile.classList.remove('_active');
                        body.classList.remove('_active');
                    }
                });
            }
        }
    }
    clickHeaderLick();

    //===================================================================


    // Modal Open

    function modalOpen() {
        const btns = document.querySelectorAll('[data-btn]');
        const modal = document.querySelector('.modal');
        const modalContainer = document.querySelector('.modal .container');
        const modalClose = document.querySelector('.modal__close');
        const burger = document.querySelector('.header__burger');
        const menuMobile = document.querySelector('.menu-mobile');
        const body = document.body;

        if (btns.length > 0) {
            for (let index = 0; index < btns.length; index++) {
                const btn = btns[index];

                btn.addEventListener('click', () => {
                    modal.classList.add('_active');
                    body.classList.add('_active');

                    if (burger.classList.contains('_active')) {
                        burger.classList.remove('_active');
                        menuMobile.classList.remove('_active');
                    }
                });

                modal.addEventListener('click', (e) => {
                    if (e.target === modal || e.target === modalContainer) {
                        modal.classList.remove('_active');
                        body.classList.remove('_active');
                    }
                });

                modalClose.addEventListener('click', () => {
                    modal.classList.remove('_active');
                    body.classList.remove('_active');
                });
            }
        }
    }
    modalOpen();

    //==============================================================

    // Input Js

    const inputTels = document.querySelectorAll('form input[type="tel"]');
    for (let index = 0; index < inputTels.length; index++) {
        const inputTel = inputTels[index];
        window.intlTelInput(inputTel, {
            separateDialCode: true,
            customPlaceholder: function (
                selectedCountryPlaceholder,
                selectedCountryData
            ) {
                return "e.g. " + selectedCountryPlaceholder;
            },
        });
    }

    //==============================================================




    // Send MAil

    function succesCloseBtn(succesClose, succes, body) {
        succesClose.addEventListener('click', () => {
            succes.classList.remove('_active');
            body.classList.remove('_active');
        });
    }
    function sendMailCatalog() {
        const succes = document.querySelector('.modal-succes');
        const succesClose = document.querySelector('.modal-succes__close');
        const modal = document.querySelector('.modal');
        const body = document.body;
        const forms = document.querySelectorAll('form');


        for (let index = 0; index < forms.length; index++) {
            const form = forms[index];

            form.addEventListener('submit', formSend);
            async function formSend(e) {
                e.preventDefault();

                let formData = new FormData(form);

                let response = await fetch('mail.php', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    form.reset();
                    succes.classList.add('_active');
                    if (modal.classList.contains('_active')) {
                        modal.classList.remove('_active');
                    }
                    succesCloseBtn(succesClose, succes, body);
                } else {
                    form.reset();
                    succes.classList.add('_active');
                    if (modal.classList.contains('_active')) {
                        modal.classList.remove('_active');
                    }
                    succesCloseBtn(succesClose, succes, body);
                }
            }
        }
    }
    sendMailCatalog();

    //===========================================================================














});