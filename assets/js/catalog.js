const hover = {
    menu: {},
    submenu: {},
    currentElement: null,
    timeoutOver: null,
    time: 100,
    activate: function(menu, submenu, time){
        if(typeof menu === "undefined" || typeof submenu === "undefined") return
        if(typeof time !== "undefined") this.time = parseInt(time);
        this.menu = document.querySelector(menu)
        this.submenu = document.querySelector(submenu)

        this.over();
        this.out();
    },
    over: function() {
        this.menu.onmouseover = (e) => {
            clearTimeout(this.timeoutOver)

            this.timeoutOver = setTimeout(() => {
                if((this.menu.contains(e.relatedTarget) && this.currentElement) || this.menu === e.target) return;

                let parentElement = e.target;
                let menuChildren = [...this.menu.children];
                let submenuChildren = [...this.submenu.children];

                menuChildren.forEach(index => index.removeAttribute('style'))
                submenuChildren.forEach(index => index.removeAttribute('style'))

                while(this.menu !== parentElement && this.menu.contains(parentElement)){
                    this.currentElement = parentElement;
                    parentElement = this.currentElement.parentNode;
                }

                if(!this.currentElement) return;

                let index = menuChildren.indexOf(this.currentElement);

                this.currentElement.style.color = "white"
                this.currentElement.style.background = "#21327a"
                submenuChildren[index].style.display = 'grid'


            }, this.time);
        }
    },
    out: function() {
        this.menu.onmouseout = (e) => {
            if(!this.currentElement || this.menu === e.relatedTarget || !this.menu.contains(e.relatedTarget)) return;

            let relatedTarget = e.relatedTarget;
            while(this.menu.contains(relatedTarget)) {
                if(relatedTarget === this.currentElement) return

                relatedTarget = relatedTarget.parentNode;
            }

            this.currentElement = null;
        }
    },
}

document.addEventListener("DOMContentLoaded", () => {
    hover.activate("#menu", "#column_container", 50);

    const catalogButton = document.querySelector('.cat-toggle-btn');
    const catalogMenu = document.getElementById('catalog_menu');

    catalogButton.addEventListener('click', () => {
        const isMenuOpen = catalogMenu.style.display === 'flex';

        catalogMenu.style.display = isMenuOpen ? 'none' : 'flex';

        if (isMenuOpen) {
            document.body.classList.remove('no-scroll');
        } else {
            document.body.classList.add('no-scroll');
        }
    });

    // Найти все контейнеры и кнопки
    const containers = document.querySelectorAll('.categories_container');
    const buttons = document.querySelectorAll('.show_more_btn');

    containers.forEach((container, index) => {
        const items = Array.from(container.querySelectorAll('a'));
        const button = buttons[index];
        const maxVisibleItems = 5;

        if (items.length > maxVisibleItems) {
            items.slice(maxVisibleItems).forEach(item => (item.style.display = 'none'));
            button.style.display = 'block';

            let isExpanded = false;

            button.addEventListener('click', () => {
                if (isExpanded) {
                    items.slice(maxVisibleItems).forEach(item => (item.style.display = 'none'));
                    button.textContent = 'Еще';
                } else {
                    items.forEach(item => (item.style.display = 'block'));
                    button.textContent = 'Скрыть';
                }
                isExpanded = !isExpanded;
            });
        }
    });
});
