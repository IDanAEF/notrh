const tabs = () => {
    try {
        //loop images
        const imagesCont = document.querySelectorAll('.main__work-image'),
              modal = document.querySelector('.modal');

        let curr = 0;

        imagesCont.forEach((image, i) => {
            image.addEventListener('click', () => {
                curr = i;
                modal.classList.add('active');

                modal.querySelector('img').src = image.querySelector('img').src;
                modal.querySelector('img').classList.add('active');

                document.querySelector('body').classList.add('fixed');
                document.querySelector('html').classList.add('fixed');
            });
        });

        modal.addEventListener('click', (e) => {
            if (e.target == modal || e.target.classList.contains('modal__close')) {
                modal.classList.remove('active');
                modal.querySelector('img').classList.remove('active');
                document.querySelector('body').classList.remove('fixed');
                document.querySelector('html').classList.remove('fixed');
            }
            if (e.target.classList.contains('arrow')) {
                curr += +e.target.getAttribute('data-slide');

                curr < 0 ? curr = imagesCont.length - 1 : curr > imagesCont.length - 1 ? curr = 0 : '';

                modal.querySelector('img').src = imagesCont[curr].querySelector('img').src;
            }
        });
    } catch (e) {
        console.log(e.stack);
    }

    try {
        //menu sub
        const menuTabs = document.querySelectorAll('.target-menu');

        menuTabs.forEach(tab => {
            const subMenu = document.querySelector(`.header__submenu[data-submenu="${tab.getAttribute('data-sub')}"]`);

            let subIn = false;

            // tab.addEventListener('click', (e) => {
            //     if (e.target.nodeName == 'A') {
            //         window.location.href = e.target.href;
            //     }
            // });

            tab.addEventListener('mouseenter', () => {
                tab.classList.add('active');
                subMenu.classList.add('active');
            });

            tab.addEventListener('mouseleave', () => {
                if (!subIn) {
                    tab.classList.remove('active');
                    subMenu.classList.remove('active');
                }
            });
        });

        // window.addEventListener('wheel', (e) => {
        //     if (e.deltaY > 0){
        //         document.querySelectorAll('.target-menu').forEach(item => item.classList.remove('active'));
        //         document.querySelectorAll('.header__submenu').forEach(item => item.classList.remove('active'));
        //     }
        // });
    } catch (e) {
        console.log(e.stack);
    }
}

export default tabs;