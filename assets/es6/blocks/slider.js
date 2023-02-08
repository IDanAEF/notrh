const slider = () => {
    try {
        //slider main
        // const mainSliderItems = document.querySelectorAll('.main__slider-item');

        // mainSliderItems.forEach(item => {
        //     item.addEventListener('click', () => {
        //         mainSliderItems.forEach(it => it.classList.remove('active'));

        //         item.classList.add('active');
        //     });
        // });

        const sliderTabs = document.querySelectorAll('.main__tabs-tab'),
              sliderPages = document.querySelectorAll('.main__tabs-page');
    
        sliderTabs.forEach((tab, i) => {
            tab.addEventListener('mouseenter', () => {
                sliderTabs.forEach(item => item.classList.remove('active'));
                sliderPages.forEach(item => item.classList.remove('active'));

                tab.classList.add('active');
                sliderPages[i].classList.add('active');
            });
        });
    } catch (e) {
        console.log(e.stack);
    }
}

export default slider;