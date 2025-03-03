(() => {
    if (document.querySelector('.splide')) {
        const slider = new Splide('.splide', {
            arrows: false,
            pagination: false,
        });

        slider.mount();
    }
})();
