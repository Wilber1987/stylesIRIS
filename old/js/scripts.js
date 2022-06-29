






$( document ).ready(function() {

  $('body').removeClass('mm-wrapper--position-left');

/*
CABECERA / MENUS
*/ 

  $( '#header-mobile .menu-search a' ).on( "click", function() {
    $('#wrapper').addClass('overflow');
    $('#header-search').show();
    return false;
  });


  /*$( '#header-mobile .menu-mobile a' ).on( "click", function() {
    $('#header-top').show();
   // $('#primary-menu').addClass('mm-menu--opened');
    //return false;
  });
  */

  

  $( '#header-search .icon-close' ).on( "click", function() {
    $('#header-search').hide();
    $('#wrapper').removeClass('overflow');
    return false;
  });


  $( '.box-teletipos .icon-close' ).on( "click", function() {
    $('.box-teletipos').hide();
    return false;
  });

  



  $("#content .box-nav ul.carousel").owlCarousel({
    loop:false,
    nav: true,    
    responsive:{
        0:{
            items:6
        },
        788:{
            items:4
        },
        1200:{
            items:6
        }
    }
  })


  /* Formularios */

  if ($('.box-form input:checkbox').is(':checked')) {
    $(this).parent().addClass('is_checked');
  }

  $('.box-form input:checkbox').change(function() {
    if(this.checked) {
      $(this).parent().addClass('is_checked');
    }else{
      $(this).parent().removeClass('is_checked');
    }
});



$('.input-list-button input').change(function() {
  if(this.checked) {



    $(this).parent().parent().parent().find('input').each(function( index ) {
      var item='.'+$(this).attr('id');
      item=item.replace(":", "_"); 
      
      $(item).removeClass('show');
      $(item).addClass('noshow');
    });


    $(this).parent().parent().parent().find('label').removeClass('active');
    $(this).parent().addClass('active');
    

    var item='.'+$(this).attr('id');
    item=item.replace(":", "_"); 
    $(item).removeClass('noshow');
    $(item).addClass('show');

  }else{
    $(this).parent().removeClass('active');
  }
});


$( '.mas-info a' ).on( "click", function() {
  var item=$(this).attr('href');
  item=item.replace("#", "."); 
  var text=$(this).attr('data-text');
  var text_open=$(this).attr('data-text-open');
  
  if($(this).text()==text){
    $(item).show();
    $(this).text(text_open);
  }else{
    $(item).hide();
    $(this).text(text);
  }
  
  return false;
});




/* Menu */

$( "#primary-menu ul li ul li a" )
  .mouseout(function() {
    $('#primary-menu ul li').removeClass('active');
    
  })
  .mouseover(function() {
    $('#primary-menu ul li').removeClass('active');
    $(this).parent().parent().parent().addClass('active');
    
  });






});


// DOCUMENT SCROLL


var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   
   if (st > lastScrollTop){
       // downscroll code
       jQuery('#header-mobile').removeClass('header-up-sticky');
       jQuery('#content .box-nav').addClass('header-down-sticky');
   } else {
      // upscroll code
      jQuery('#header-mobile').addClass('header-up-sticky');

      jQuery('#content .box-nav').removeClass('header-down-sticky');
   }
   lastScrollTop = st;
});



/*

document.addEventListener(
  "DOMContentLoaded", () => {
      new Mmenu( ".primary-menu", {
         "offCanvas": {
            "position": "left"
         },
         "theme": "light"
      });
  }
);

*/


document.addEventListener(
  "DOMContentLoaded", () => {
   //   const menu = new Mmenu( "#primary-menu" );
      const menu = new Mmenu( "#primary-menu-mobile", {
   "offCanvas": {
      "position": "left",
      wrapper: {
                  nodetype: "section"
              }
      
   },
   "theme": "light"
});
      const api = menu.API;

      document.querySelector( ".menu-mobile a" )
          .addEventListener(
              "click", () => {
                  api.open();
                  const panel_1 = document.querySelector( "#mm-1" ); 
                  api.openPanel( panel_1 );
              }
          );


          document.querySelector( ".icon-notification a" )
          .addEventListener(
              "click", () => {
                  api.open();
                  const panel_2 = document.querySelector( "#mm-7" ); //notificaciones
                  api.openPanel( panel_2 );
              }
          );

          document.querySelector( "#primary-menu-mobile .closed" )
          .addEventListener(
              "click", () => {
                  /*api.open();
                  const panel = document.querySelector( "#mm-1" ); 
                  api.openPanel( panel );*/
                  
                  api.close();
              }
          );


          


  }
);



