var win;
var els = {};

//window load
$(window).load(function () {
  doResize();
   win = $(window);

    els.menu = $('.menu-section__wrapper');

    els.menuItems = els.menu.find('.menu-item');

    win.scroll(scrollHandler);

    $(".video").on("click",function(e){
    $this = $(this);
    this_video = document.getElementById($this.attr("id"));

    if(this_video.hasAttribute("controls") == false){
      this_video.setAttribute( "controls", "controls");
      // this_video.play();
    }
  });

    $(".topNav h1 , .popup_logo").on("click", function() {
    $(".popUp").removeClass("active");
  });

  if(BrowserDetect.browser == "Explorer"){
    $(".hero video").remove();
    $(".hero .video_shade").remove();
  }

    $(".toggler .toggler-handle").click(function(){
        $(this).parent().toggleClass('expanded');
    });
});
//window load end

//document ready
$(document).ready(function () {
    win = $(window);

    els.menu = $('.menu-section__wrapper');

    els.menuItems = els.menu.find('.menu-item');

    win.scroll(scrollHandler);

    $(".video").on("click",function(e){
    $this = $(this);
    this_video = document.getElementById($this.attr("id"));

    if(this_video.hasAttribute("controls") == false){
      this_video.setAttribute( "controls", "controls");
      // this_video.play();
    }
  });

    $(".topNav h1 , .popup_logo").on("click", function() {
    $(".popUp").removeClass("active");
  });

  if(BrowserDetect.browser == "Explorer"){
    $(".hero video").remove();
    $(".hero .video_shade").remove();
  }

    $(".toggler .toggler-handle").click(function(){
        $(this).parent().toggleClass('expanded');
    });

  //DORESIZE
  doResize();
  $window.resize(function() {
    doResize();
  });
});
//document ready end

// FUNCTIONS ----------------------


function scrollHandler() {

    var windowYOffset = window.pageYOffset;


    if (windowYOffset > 10 ) {
        $('.menu-section__wrapper').addClass('show');
    }
    else {
        if (!$('.menu-section__wrapper').hasClass('open') ) {
            $('.menu-section__wrapper').removeClass('show');
        }
    }

    var windowYOffset = window.pageYOffset + 100  ;

    var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
    var windowHeight = $(window).height(); // get the height of the window
    var docHeight = $(document).height();

    $(els.menuItems).each(function() {
        var link = $(this).find('a');
        var href = link.attr('href');
        var selector = '[name=' + href.replace('#', '') + ']';
        var divPos = $(selector).offset().top; // get the offset of the div from the top of page
        if ( windowPos >= divPos ) {
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
        }
    });
}

// header original proportions
var n_orig_margin_top = 430;
var n_orig_width = 1180;
var n_orig_height = 410;
var n_orig_bg_y = 170;
var hh2_orig_margin_top = 140;
var hh2_orig_height = 45;

//changes
/*
var n_orig_margin_top = 310;
var hh2_orig_margin_top = 40;
*/

function doResize(){
  $(".video").each(function(e){
    var $this = $(this);
    var this_width = $this.width();
    //1280 x 720
    $this.height((this_width/1280)*720).width("100%");
  })
  $("video").css("height","");
}