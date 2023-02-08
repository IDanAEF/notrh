const animations = () => {
    function fixedPos() {
        document.querySelector('body').classList.add('fixed');
        document.querySelector('html').classList.add('fixed');
    }

    function freePos() {
        document.querySelector('body').classList.remove('fixed');
        document.querySelector('html').classList.remove('fixed');
    }

    function preloadImages(sources, callback) {
        let loaded = 0; 

        const dash = document.querySelector('.progress .dash span'),
              progr = document.querySelector('.progress .number'),
              imageCont = document.querySelector('.main-sequence-cont');

        function onLoad() {
            loaded++;

            let res = Math.ceil(loaded / (sources.length / 100));

            dash.style.width = `${res}%`;
            progr.textContent = `${res < 10 ? '0'+res : res}%`;

            if (loaded == sources.length) callback();
        }
        
        for (let i = 0; i < sources.length; i++) {
            let img = document.createElement("img");
            img.src = sources[i];
            img.addEventListener("load", onLoad);
            img.addEventListener("error", onLoad);

            if (i == 0) img.style.display = 'block';

            imageCont.append(img);
        }
    }

    try {
        //buttons
        const btns = document.querySelectorAll('.button.button_black');

        let timeout;

        btns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.classList.remove('leave');
                btn.classList.add('enter');
                clearTimeout(timeout);
            });
            btn.addEventListener('mouseleave', () => {
                btn.classList.remove('enter');
                btn.classList.add('leave');
                timeout = setTimeout(() => {
                    btn.classList.remove('leave');
                }, 1500);
            });
        });
    } catch (e) {
        console.log(e.stack);
    }

    try {
        //header scroll
        const header = document.querySelector('header');

        window.addEventListener('wheel', (e) => {
            if (e.deltaY > 0){
                header.classList.add('hide');
            } else {
                header.classList.remove('hide');
            }
        });
    } catch (e) {
        console.log(e.stack);
    }

    try {
        //scroll seq
        const seq = document.querySelector('.main-sequence'),
              targetImage = seq.querySelector('.main-sequence-cont'),
              betterBuild = document.querySelector('.better-build'),
              preloadCont = document.querySelector('#preload');

        let images = seq.getAttribute('desktop-sequence').split(','),
            current = 0,
            trans = 400,
            top = 20, 
            isDown = false,
            load = true;

        let domImages;

        for(let i = 0; i < images.length; i++) {
            images[i] = seq.getAttribute('desktop-path') + images[i];
        }

        function callbackPreload() {
            preloadCont.style.cssText = 'opacity: 0; visibility: hidden';
            load = false;

            domImages = targetImage.querySelectorAll('img');
        }

        function imageSeq(e) {
            if (e.deltaY > 0){
                if (current < images.length - 1) {
                    current += 2;
                    trans -= 10;
                    top -= 2;
                }
            } else {
                if (current > 0) {
                    current -= 2;
                    trans += 10;
                    top += 2;
                }
            }
            if (current >= images.length - 1) {
                isDown = true;
                freePos();
            }
            if (trans > 400) trans = 400;
            if (trans < 0) trans = 0;

            if (top < -100) top = -100;
            if (top > 20) top = 20;

            domImages[current].style.display = 'block';
            domImages[current - 2] ? domImages[current - 2].style.display = '' : '';
            domImages[current + 2] ? domImages[current + 2].style.display = '' : '';
            //targetImage.src = images[current];
            targetImage.style.transform = `translateX(-50%) translateY(${trans}px)`;
            betterBuild.style.top = `${top}%`;
        }

        preloadImages(images, callbackPreload);

        fixedPos();

        window.addEventListener('wheel', (e) => {
            if (isDown && window.scrollY == 0) {
                isDown = false;
                fixedPos();
            }
            if (!isDown && !load) {
                imageSeq(e);
                setTimeout(() => {
                    imageSeq(e);
                }, 100);
                setTimeout(() => {
                    imageSeq(e);
                }, 200);
                setTimeout(() => {
                    imageSeq(e);
                }, 300);
                setTimeout(() => {
                    imageSeq(e);
                }, 400);
                setTimeout(() => {
                    imageSeq(e);
                }, 500);
                setTimeout(() => {
                    imageSeq(e);
                }, 600);
            }
        });
    } catch (e) {
        console.log(e.stack);
    }

    // try {
    //     //image scroll
    //     const image = document.querySelector('.main__work-images img.target'),
    //           block = document.querySelector('.main__work'),
    //           toprate = document.querySelector('.main__toprate');

    //     let posBott = block.offsetTop + block.offsetHeight;

    //     let scale = 1,
    //         scaleBlock = 1,
    //         isIn = false,
    //         isF = true,
    //         trans3 = 0;

    //     window.addEventListener('scroll', () => {
    //         posBott = block.offsetTop + block.offsetHeight;
    //         if (!isIn) {
    //             if ((posBott <= window.scrollY + window.innerHeight && isF) || (posBott >= window.scrollY + window.innerHeight && !isF)) {
    //                 isIn = true;
    //                 if (!isF) {
    //                     image.parentElement.classList.remove('active');
    //                     toprate.classList.remove('active');
    //                 }
    //                 isF = !isF;
    //                 fixedPos();
    //             }
    //         }
    //     });

    //     window.addEventListener('wheel', (e) => {
    //         // if (!isIn) {
    //         //     if (posBott <= window.scrollY + window.innerHeight && posBott + 300 >= window.scrollY + window.innerHeight) {
    //         //         isIn = true;
    //         //         fixedPos();
    //         //     }
    //         // }
    //         if (isIn) {
    //             if (e.deltaY > 0){
    //                 scale += 0.07;
    //                 scaleBlock += 0.03;
    //                 trans3 += 20;
    //             } else {
    //                 scale -= 0.07;
    //                 scaleBlock -= 0.03;
    //                 trans3 -= 20;
    //             }

    //             if (scale > 1.5) scale = 1.5;
    //             if (scale < 1) scale = 1;

    //             if (scaleBlock > 1.5) scaleBlock = 1.5;
    //             if (scaleBlock < 1) scaleBlock = 1;

    //             if (trans3 > 400) trans3 = 400;
    //             if (trans3 < 0) trans3 = 0;

    //             if ((scaleBlock == 1.5 && scale == 1.5) || (scaleBlock == 1 && scale == 1)) {
    //                 isIn = false;
    //                 freePos();

    //                 if (!isF) {
    //                     image.parentElement.classList.add('active');
    //                     toprate.classList.add('active');
    //                     window.scroll({
    //                         top: toprate.offsetTop,
    //                         left: 0,
    //                         behavior: 'smooth'
    //                     });
    //                 }
    //             }

    //             image.style.transform = `scale(${scale})`;
    //             image.parentElement.style.transform = `scale(${scaleBlock})`;

    //             block.querySelector('.rt').style.transform = `translate(${trans3}px, -${trans3}px)`;
    //             block.querySelector('.ct').style.transform = `translateY(-${trans3}px)`;
    //             block.querySelector('.lt').style.transform = `translate(-${trans3}px, -${trans3}px)`;

    //             block.querySelector('.rb').style.transform = `translateX(${trans3}px)`;
    //             block.querySelector('.lb').style.transform = `translateX(-${trans3}px)`;
    //         }
    //     });
    // } catch (e) {
    //     console.log(e.stack);
    // }

    try {
        //elem-text animate
        const targetElem = document.querySelectorAll('.elem_animate');

        function returnHeight() {
            return window.innerWidth <= 600 ? window.innerHeight / 1.05 : window.innerHeight / 1.2
        }

        function setAnim(mass) {
            mass.forEach(item => {
                if (returnHeight() + window.pageYOffset >= item.getBoundingClientRect().y + window.pageYOffset) {
                    item.classList.add('vis');
                }
            });
        }

        setAnim(targetElem);

        window.addEventListener('scroll', () => {
            setAnim(targetElem);
        });
    } catch (e) {
        console.log(e.stack);
    }

    window.onbeforeunload = () => {
        freePos();
        window.scroll(0, 0);
    }
}

export default animations;