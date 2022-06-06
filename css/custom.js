let Index = 0;
window.addEventListener("load", () => {
    const Tab = document.querySelector("#availTabMenu");
    const UlTab = Tab.querySelector("ul");
    const count = UlTab.querySelectorAll("li").length;
    if (count > 8) {
        const btnTabNext = document.createElement("spam");
        btnTabNext.className = "btnTab btnTabNext";
        btnTabNext.innerHTML = ">"
        btnTabNext.onclick = () => {
            myFunctionNext(UlTab, btnTabBefore, count);
        }
        const btnTabBefore = document.createElement("spam");
        btnTabBefore.className = "btnTab btnTabBefore";
        btnTabBefore.style.display = "none";
        btnTabNext.innerHTML = "<"
        btnTabBefore.onclick = () => {
            myFunctionPrev(UlTab, btnTabBefore, count);
        }
        Tab.append(btnTabBefore, btnTabNext);
    }
})
myFunctionNext = (slider, btnTabBefore, count) => {
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
myFunctionPrev = (slider, btnTabBefore, count) => {
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