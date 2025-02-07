(() => {
    const authButtons = document.querySelectorAll('.js-auth-button');

    const popup = document.querySelector('.js-popup-auth');
    const popupForgotPass = document.querySelector('.js-popup-forgot-pass');
    const popupLogin = document.querySelector('.js-popup-login');
    const popupSupport = document.querySelector('.js-popup-support');

    const closePopupButtons = document.querySelectorAll('.js-close-popup');
    const forgotPassButtons = document.querySelectorAll(
        '.js-auth-button-forgot'
    );
    const loginButtons = document.querySelectorAll('.js-login-button');
    const supportButtons = document.querySelectorAll('.js-support-button');

    closePopupButtons.forEach((button) => {
        button?.addEventListener('click', closeAllPopup);
    });

    authButtons.forEach((button) => {
        button?.addEventListener('click', () => {
            closeAllPopup();
            openPopup(popup)();
        });
    });

    forgotPassButtons.forEach((button) => {
        button?.addEventListener('click', () => {
            closeAllPopup();
            openPopup(popupForgotPass)();
        });
    });

    loginButtons.forEach((button) => {
        button?.addEventListener('click', () => {
            closeAllPopup();
            openPopup(popupLogin)();
        });
    });

    supportButtons.forEach((button) => {
        button?.addEventListener('click', () => {
            closeAllPopup();
            openPopup(popupSupport)();
        });
    });

    popup?.addEventListener('click', overlayClose(popup));
    popupForgotPass?.addEventListener('click', overlayClose(popupForgotPass));
    popupLogin?.addEventListener('click', overlayClose(popupLogin));
    popupSupport?.addEventListener('click', overlayClose(popupSupport));

    function closeAllPopup() {
        closePopup(popup)();
        closePopup(popupForgotPass)();
        closePopup(popupLogin)();
        closePopup(popupSupport)();
    }

    function overlayClose(element) {
        return (evt) => {
            if (evt.target === element) {
                closePopup(element)();
            }
        };
    }

    function openPopup(element) {
        return () => {
            element?.classList.remove('hidden');
            element?.focus();
            document.body.classList.add('body-lock');
            trapFocus(element);
        };
    }

    function closePopup(element) {
        return () => {
            element?.classList.add('hidden');
            document.body.classList.remove('body-lock');
        };
    }

    function trapFocus(element) {
        const focusableElements = element?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (element && focusableElements) {
            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement =
                focusableElements[focusableElements.length - 1];

            element.addEventListener('keydown', function (e) {
                const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

                if (!isTabPressed) {
                    return;
                }

                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            });
        }
    }
})();
