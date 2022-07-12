let Index = 0;
window.addEventListener("load", () => {
    const Menu = document.querySelector("#header-container");
    BtnCloseMenu(Menu);
    DisplayMenu(Menu);
    DisplayMenuFilter();
    MenuStickyScrollStyle();
    DisplayAcordeonForm();
})

function DisplayAcordeonForm() {
    const AcordeonBtnPlus = document.querySelectorAll(".AcordeonBtnPlus");
    AcordeonBtnPlus.forEach(acordeon => {
        const AcordeonForm = document.querySelector("#" + acordeon.attributes.name.value);
        //acordeon.onclick = () => {
        if (AcordeonForm.className.includes("AcordeonFormActive")) {
            acordeon.innerHTML = "+";
            AcordeonForm.className = "AcordeonForm";
        } else {
            acordeon.innerHTML = "-";
            AcordeonForm.className = "AcordeonForm AcordeonFormActive";
        }
        // }
    });
}

function MenuStickyScrollStyle() {
    let scrollV = 0;
    const MenuSticky = document.querySelector("#menu-sticky");
    const AvailTabMenu = document.querySelector("#availTabMenu");
    window.addEventListener("scroll", (e) => {
        if (scrollV <= 75) {
            MenuSticky.className = 'ui-outputpanel ui-widget';
            AvailTabMenu.className = '';
        } else {

            MenuSticky.className = 'ui-outputpanel ui-widget scrollStyle';
            AvailTabMenu.className = 'scrollStyle';
        }
        scrollV = window.scrollY;
    });
}

function DisplayMenu(Menu) {
    const MenuToggle = document.querySelector("#menu-toggle");
    MenuToggle.onclick = () => {
        if (Menu.className.includes("menu-active")) {
            Menu.className = "ui-g header-container";
        } else {
            Menu.className = "ui-g header-container menu-active";
        }
    };
}
function DisplayMenuFilter() {
    const FilterOptions = document.querySelector(".avail-results-order");
    const Menu = document.querySelector(".avail-filters-column");
    const FilterBTN = document.createElement("input");
    FilterBTN.value = "FILTRAR BÚSQUEDA";
    FilterBTN.className = "FilterBTN";
    FilterBTN.type = "button";
    FilterBTN.onclick = () => {
        if (Menu.className.includes("menu-active")) {
            Menu.className = "avail-filters-column";
        } else {
            Menu.className = "avail-filters-column menu-active";
        }
    };
    FilterOptions.insertBefore(FilterBTN, FilterOptions.firstChild);
}
function BtnCloseMenu(Menu) {

    const btnCloseMenu = document.createElement("spam");
    btnCloseMenu.className = "btnCloseMenu";
    btnCloseMenu.innerHTML = "X";
    btnCloseMenu.onclick = () => {
        Menu.className = "ui-g header-container";
    };
    Menu.insertBefore(btnCloseMenu, Menu.firstChild);
    return Menu;
}
