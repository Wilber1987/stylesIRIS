






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


/* Ventanas */

$('.modal-link').on("click",function(){
  var modalContainer=$(this).attr('href');
  alert(modalContainer);

  $(modalContainer).modal('toggle');

  return false;

});

/* Filtro */

$( '.filter a' ).on( "click", function() {  
  $('.box-filter-sidebar').show();
  return false;
});

$('.filter-content').hide('fast');

$( '.filter-header' ).on( "click", function() {
  $(this).next('.filter-content').toggle('slow');
  return false;
});



$( '.filter-range-hours' ).slider({
  range: true,
  min: $(this).attr('data-min'),
  max: $(this).attr('data-max'),
  values: [ $('#'+$(this).attr('data-min-content')).val(), $('#'+$(this).attr('data-max-content')).val() ],
  slide: function( event, ui ) {

    var min_content=$(this).attr('data-min-content');
    var max_content=$(this).attr('data-max-content');

    $('#'+min_content).val(ui.values[ 0 ]);
    $('#'+max_content).val(ui.values[ 1 ]);

    var totalMinutes = $('#'+min_content).val();        
    var hours = Math.floor(totalMinutes / 60);          
    var minutes = totalMinutes % 60;
    $('label[for="'+min_content+'"]').text(hours+'h '+minutes+'m');

    var totalMinutes = $('#'+max_content).val();        
    var hours = Math.floor(totalMinutes / 60);          
    var minutes = totalMinutes % 60;
    $('label[for="'+max_content+'"]').text(hours+'h '+minutes+'m');

  }
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


  /* Table responsive */


  $('.table-responsive table').each(function(){
    var table = $(this);
    table.find('td').each(function(){
      var td = $(this);     
      var i = $(this).index();
      var label_text = table.find('th').eq(i).text();
      if(!$(this).hasClass('notlabel')){
        $(this).prepend('<span class="label">'+label_text+'</span>');
      }
      
    });
  });




if(!$('.table-info-header').is(':visible'))
{
  $('.table-info').css('display','table-row');
}

  $( '.icon-open' ).on( "click", function() {
    if($(this).hasClass('opened')){
      $(this).removeClass('opened');
      $(this).parent().parent().next('.table-info').hide('slow');
    }else{
      $(this).addClass('opened');
      $(this).parent().parent().next('.table-info').show('slow');
      $(this).parent().parent().next('.table-info').css('display','block');
    }
    
    return false;
  });


});


//DOCUMENT RESIZE
$(window).on('resize', function(){

  if(!$('.table-info-header').is(':visible'))
{
  $('.table-info').css('display','table-row');
}else{
  $('.table-info').css('display','none');
}

});

// DOCUMENT SCROLL


var lastScrollTop = 0;

var RowNavSummary = jQuery('.row-nav-summary');
if (RowNavSummary.length) {
  var stRowNavSummary=RowNavSummary.offset().top;
}else{
  var stRowNavSummary = 0;
}

$(window).scroll(function(event){
   var st = $(this).scrollTop();

   //box_sticky(st,stRowNavSummary,lastScrollTop);
   
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


function box_sticky(st,stRowNavSummary,lastScrollTop){
  var stRowNavSummary = stRowNavSummary;

  var boxFilter = jQuery('.box-filter .filter');
  var boxFilterH = boxFilter.height();
  var boxFilterPosition = boxFilter.offset().top;
  var boxFilterBottom = boxFilterPosition + boxFilterH;
  var boxFilterTop = boxFilterPosition - boxFilterH;

  if (st > lastScrollTop){
    // downscroll code
    if(st > boxFilterTop){
      jQuery('body').addClass('box-filter-sticky');
    }
  

} else {
   // upscroll code

   if(st < boxFilterBottom){
    jQuery('body').removeClass('box-filter-sticky');
  }
}
  

  if (st > stRowNavSummary){
    

    jQuery('.row-nav-summary').addClass('box-sticky');
} else {
   jQuery('.row-nav-summary').removeClass('box-sticky');
}
  
}



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



