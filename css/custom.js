let Index = 0;
window.addEventListener("load", () => {
    const Tab = document.querySelector("#availTabMenu");
    const UlTab = Tab.querySelector("ul");
    const count = UlTab.querySelectorAll("li").length;
    if (count > 8) {
        const btnTabNext = document.createElement("spam");
        btnTabNext.className = "btnTab btnTabNext";
        btnTabNext.onclick = () => {
            myFunctionNext(UlTab, btnTabBefore, count);
        }
        const btnTabBefore = document.createElement("spam");
        btnTabBefore.className = "btnTab btnTabBefore";
        btnTabBefore.style.display = "none";
        btnTabBefore.onclick = () => {
            myFunctionPrev(UlTab, btnTabBefore, count);
        }
        Tab.append(btnTabBefore, btnTabNext);
    }
    //HEADER MENU
    const Menu = document.querySelector("#header-container");
    const btnCloseMenu = document.createElement("spam");
    btnCloseMenu.className = "btnCloseMenu";
    btnCloseMenu.innerHTML = "X"
    btnCloseMenu.onclick = () => {
        Menu.className = "ui-g header-container"
    }
    Menu.insertBefore(btnCloseMenu, Menu.firstChild);
    const MenuToggle = document.querySelector("#menu-toggle");
    MenuToggle.onclick = () => {
        if (Menu.className.includes("menu-active")) {
            Menu.className = "ui-g header-container"
        }else {
            Menu.className = "ui-g header-container menu-active"
        }        
    }
    let scrollV = 0
    const MenuSticky = document.querySelector("#menu-sticky");    
    window.addEventListener("scroll", (e)=>{
        console.log(scrollV)
        if(scrollV <= 75 ) {
            MenuSticky.className = 'ui-outputpanel ui-widget';
        }else {
            
            MenuSticky.className = 'ui-outputpanel ui-widget scrollStyle';
        }
        scrollV = window.scrollY
    })
})
const myFunctionNext = (slider, btnTabBefore, count) => {
    Index++;
    if (Index == count) Index = 0;
    const { widthAnimation, LastCard, firstCard } = SlideElements(btnTabBefore, slider);
    slider.style.webkitTransform = "translateX(-" + widthAnimation + "px)";
    setTimeout(function () {
        slider.style.transition = "none";
        slider.style.webkitTransform = "translateX(-" + 0 + "px)";
        LastCard.parentNode.insertBefore(firstCard, LastCard.nextSibling);
    }, 400);
}
const myFunctionPrev = (slider, btnTabBefore, count) => {
    Index--;
    if (Index == count) Index = 0;
    const { widthAnimation, LastCard, firstCard } = SlideElements(btnTabBefore, slider);
    slider.style.webkitTransform = "translateX(+" + widthAnimation + "px)";
    setTimeout(function () {
        slider.style.transition = "none";
        slider.style.webkitTransform = "translateX(+" + 0 + "px)";
        slider.insertBefore(LastCard, slider.firstChild);
    }, 400);
}
function SlideElements(btnTabBefore, slider) {
    if (Index == 0)
        btnTabBefore.style.display = "none";
    else
        btnTabBefore.style.display = "block";
    const firstCard = slider.firstElementChild;
    const LastCard = slider.lastElementChild;
    const widthAnimation = firstCard.offsetWidth + 0;
    slider.style.transition = "all 0.5s";
    return { widthAnimation, LastCard, firstCard };
}
//--->

