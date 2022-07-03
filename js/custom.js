let Index = 0;
window.addEventListener("load", () => {
   
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
    const btnNotifications =  document.querySelector("#notifications-toggle");
    btnNotifications.onclick = ()=>{
        const nodes = document.querySelectorAll(".ui-menu.ui-menu-dynamic.ui-widget");
        nodes.forEach(node => {
            if (node.id.includes("notificationsBTN_menu")) {
                if (node.className.includes("menu-active")) { 
                    node.style.display = "none"; 
                    node.style.webkitTransform = "center top"                 
                    node.className += " menu-active";
                }else {
                    node.style.display = "block";          
                    node.className.replace(" menu-active","");
                }  
            }
        });
    }
    let scrollV = 0
    const MenuSticky = document.querySelector("#menu-sticky");    
    window.addEventListener("scroll", (e)=>{        
        if(scrollV <= 75 ) {
            MenuSticky.className = 'ui-outputpanel ui-widget';
        }else {
            
            MenuSticky.className = 'ui-outputpanel ui-widget scrollStyle';
        }
        scrollV = window.scrollY
    })
})

//--->

