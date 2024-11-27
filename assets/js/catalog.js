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
        catalogMenu.style.display = (catalogMenu.style.display === 'flex') ? 'none' : 'flex';
    });
});
