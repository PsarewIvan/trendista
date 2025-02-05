class ItcAccordion {
    constructor(target, config) {
        this._el =
            typeof target === 'string'
                ? document.querySelector(target)
                : target;
        const defaultConfig = {
            alwaysOpen: true,
            duration: 350,
        };
        this._config = Object.assign(defaultConfig, config);
        this.addEventListener();
    }

    addEventListener() {
        this._el.addEventListener('click', (e) => {
            const elHeader = e.target.closest('.js-accordion-header');

            if (!elHeader) {
                return;
            }
            if (!this._config.alwaysOpen) {
                const elOpenItem = this._el.querySelector(
                    '.accordion__item_show'
                );
                if (elOpenItem) {
                    elOpenItem !== elHeader.parentElement
                        ? this.toggle(elOpenItem)
                        : null;
                }
            }
            this.toggle(elHeader.parentElement);
        });
    }

    show(el) {
        const elBody = el.querySelector('.accordion__body');
        if (
            elBody.classList.contains('collapsing') ||
            el.classList.contains('accordion__item_show')
        ) {
            return;
        }
        elBody.style['display'] = 'block';
        const height = elBody.offsetHeight;
        elBody.style['height'] = 0;
        elBody.style['overflow'] = 'hidden';
        elBody.style['transition'] = `height ${this._config.duration}ms ease`;
        elBody.classList.add('collapsing');
        el.classList.add('accordion__item_slidedown');
        elBody.offsetHeight;
        elBody.style['height'] = `${height}px`;
        window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            el.classList.remove('accordion__item_slidedown');
            elBody.classList.add('collapse');
            el.classList.add('accordion__item_show');
            elBody.style['display'] = '';
            elBody.style['height'] = '';
            elBody.style['transition'] = '';
            elBody.style['overflow'] = '';
        }, this._config.duration);
    }

    hide(el) {
        const elBody = el.querySelector('.accordion__body');
        if (
            elBody.classList.contains('collapsing') ||
            !el.classList.contains('accordion__item_show')
        ) {
            return;
        }
        elBody.style['height'] = `${elBody.offsetHeight}px`;
        elBody.offsetHeight;
        elBody.style['display'] = 'block';
        elBody.style['height'] = 0;
        elBody.style['overflow'] = 'hidden';
        elBody.style['transition'] = `height ${this._config.duration}ms ease`;
        elBody.classList.remove('collapse');
        el.classList.remove('accordion__item_show');
        elBody.classList.add('collapsing');
        window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            elBody.classList.add('collapse');
            elBody.style['display'] = '';
            elBody.style['height'] = '';
            elBody.style['transition'] = '';
            elBody.style['overflow'] = '';
        }, this._config.duration);
    }

    toggle(el) {
        el.classList.contains('accordion__item_show')
            ? this.hide(el)
            : this.show(el);
    }
}

(() => {
    const accordions = document.querySelectorAll('.js-accordion');

    accordions.forEach((accordion) => {
        new ItcAccordion(accordion, {
            alwaysOpen: true,
        });
    });
})();

(() => {
    document.addEventListener('DOMContentLoaded', function () {
        const offset = 20;

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const target = document.querySelector(
                    this.getAttribute('href')
                );
                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            });
        });
    });
})();

(() => {
    const authButtons = document.querySelectorAll('.js-auth-button');

    const popup = document.querySelector('.js-popup-auth');
    // const popupForgotPass = document.querySelector('.js-popup-forgot-pass');
    // const popupLogin = document.querySelector('.js-popup-login');
    // const popupSuccess = document.querySelector('.js-popup-success');

    const closePopupButtons = document.querySelectorAll('.js-close-popup');
    // const forgotPassButtons = document.querySelectorAll(
    //     '.js-auth-button-forgot'
    // );
    // const loginButtons = document.querySelectorAll('.js-login-button');
    // const successButtons = document.querySelectorAll('.js-success-button');

    closePopupButtons.forEach((button) => {
        button?.addEventListener('click', closeAllPopup);
    });

    authButtons.forEach((button) => {
        button?.addEventListener('click', openPopup(popup));
    });

    // forgotPassButtons.forEach((button) => {
    //     button?.addEventListener('click', () => {
    //         closeAllPopup();
    //         // openPopup(popupForgotPass)();
    //     });
    // });

    // loginButtons.forEach((button) => {
    //     button?.addEventListener('click', () => {
    //         closeAllPopup();
    //         // openPopup(popupLogin)();
    //     });
    // });

    // successButtons.forEach((button) => {
    //     button?.addEventListener('click', () => {
    //         closeAllPopup();
    //         // openPopup(popupSuccess)();
    //     });
    // });

    popup?.addEventListener('click', overlayClose(popup));
    // popupForgotPass?.addEventListener('click', overlayClose(popupForgotPass));
    // popupLogin?.addEventListener('click', overlayClose(popupLogin));
    // popupSuccess?.addEventListener('click', overlayClose(popupSuccess));

    function closeAllPopup() {
        closePopup(popup)();
        // closePopup(popupForgotPass)();
        // closePopup(popupLogin)();
        // closePopup(popupSuccess)();
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

(() => {
    const nodes = document.querySelectorAll('.js-pass-input-node');

    nodes.forEach((node) => {
        const input = node.querySelector('.js-pass-input');
        const show = node.querySelector('.js-pass-input-show');
        const openIcon = node.querySelector('.js-pass-input-icon-open');
        const closedIcon = node.querySelector('.js-pass-input-icon-closed');

        show?.addEventListener('click', () => {
            const type = input?.getAttribute('type');

            if (type === 'password') {
                input.setAttribute('type', 'text');
                openIcon?.classList.remove('hidden');
                closedIcon?.classList.add('hidden');
            } else {
                input.setAttribute('type', 'password');
                openIcon?.classList.add('hidden');
                closedIcon?.classList.remove('hidden');
            }
        });
    });
})();

(() => {
    const ACTIVE_CLASS = 'active';

    const nodes = document.querySelectorAll('.js-text-input-node');

    nodes.forEach((node) => {
        const input = node.querySelector('.js-text-input');
        const reset = node.querySelector('.js-text-input-reset');
        const alert = node.querySelector('.js-text-input-alert');

        if (input.value !== '') {
            reset?.classList.add(ACTIVE_CLASS);
        }

        input?.addEventListener('blur', (event) => {
            if (event.target.value === '') {
                alert?.classList.add(ACTIVE_CLASS);
            } else {
                alert?.classList.remove(ACTIVE_CLASS);
            }
        });

        input?.addEventListener('input', (event) => {
            if (event.target.value === '') {
                reset?.classList.remove(ACTIVE_CLASS);
            } else {
                reset?.classList.add(ACTIVE_CLASS);
                alert?.classList.remove(ACTIVE_CLASS);
            }
        });

        reset?.addEventListener('click', () => {
            if (input) {
                input.value = '';
                reset?.classList.remove(ACTIVE_CLASS);
            }
        });
    });
})();

//# sourceMappingURL=index.js.map
