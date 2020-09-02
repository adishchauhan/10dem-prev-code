$(document).ready(function(){

  jQuery(function($){
    $('.navbar-toggle').click(function(){
    $('.navbar-collapse').toggleClass('right');
    $('.navbar-toggle').toggleClass('indexcity');
    });
  });

  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $('#collapse-icon').toggleClass('fa-angle-left fa-angle-right');
    if($('#sidebar').hasClass("active")){
      $('#sidebarCollapse').css('left', '-15px')
    } else {
      $('#sidebarCollapse').css('left', '230px')
    }
    
  });

  $('.main-content .owl-carousel').owlCarousel({
    stagePadding: 50, //new
    loop: true,
    dots: false,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ], //new
    navContainer: '.main-content .custom-nav', //new
    margin: 25,
    responsive: {
      0: {
          items: 1
      },
      500: {
          items: 2
      },
      900: {
          items: 3
      },
      1200: {
          items: 4
      },
      1600: {
          items: 5
      }
    }
  });

  $('.main-content-2 .owl-carousel').owlCarousel({
    stagePadding: 50, //new
    loop:true,
    dots: false,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ], //new
    navContainer: '.main-content-2 .custom-nav', //new
    margin: 25,
    responsive: {
      0: {
          items: 1
      },
      500: {
          items: 2
      },
      900: {
          items: 3
      },
      1200: {
          items: 4
      },
      1600: {
          items: 5
      }
    }
  });
    
});
