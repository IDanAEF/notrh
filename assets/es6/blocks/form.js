const form = () => {
    try {
        const list = document.querySelectorAll('.main__contacts-left ul li'),
              format = document.querySelectorAll('.main__contacts-format button'),
              inputs = document.querySelectorAll('.main__contacts-inp input');

        inputs.forEach(inp => {
            inp.addEventListener('focus', () => {
                inp.classList.add('active');
                inp.previousElementSibling.classList.add('active');
            });

            inp.addEventListener('blur', () => {
                inp.classList.remove('active');
                inp.previousElementSibling.classList.remove('active');
            });

            inp.addEventListener('keyup', () => {
                if (!inp.value) {
                    inp.previousElementSibling.classList.remove('hide');
                } else {
                    inp.previousElementSibling.classList.add('hide');
                }
            });
        });

        format.forEach(ft => {
            ft.addEventListener('click', () => {
                format.forEach(it => it.classList.remove('check'));

                ft.classList.add('check');
            });
        });

        list.forEach(li => {
            li.addEventListener('click', () => {
                li.classList.toggle('check');
            });
        });
    } catch (e) {
        console.log(e.stack);
    }
}

export default form;