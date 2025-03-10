(() => {
    const buttonsBlock = document.querySelector('.js-blog-buttons');

    if (buttonsBlock) {
        const buttons = buttonsBlock.querySelectorAll('button');

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                button.classList.toggle('active');
            });
        });
    }
})();
