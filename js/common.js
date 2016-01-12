if (typeof console == "undefined") var console = { log: function() {} };

var $window;
var $html;
var $body;
var $holder;
var WH;
var WW;
var $video;

var WHAT_TO_SCROLL = "html";

$(window).load(function () {
  doCommonResize();
});

//document ready
$(document).ready(function () {
  /*cache jquery*/
  $window = $(window);
  $html = $("html");
  $body = $("body");
  $video = $("video");

  if (BrowserDetect.browser == "Chrome" || BrowserDetect.browser == "Safari"){
      WHAT_TO_SCROLL = "body"
  };

  $('body').addClass( browserDetection + ' ' + browserVersion + ' ' + OSname);

  $("a[rel=showSocial]").on("click",function(e) {
        console.log('suck it');
    $("#PopUpSocial").addClass("active");
    e.preventDefault();
  });

  $("a[rel=showContact]").on("click",function(e){
    $("#PopUpContact").addClass("active");
    resetForm();
    e.preventDefault();
  });

  $("a[rel=closePopup]").on("click",function(e){
    $(".popUp").removeClass("active");
    e.preventDefault();
  });

  startFlexSlider();
  setFormEvents();
  setShare();

  //
  if(supportsSvg() == false ){
    $("[rel='svg']").each(function(){
      $this = $(this);
      if(typeof($this.attr("src")) !=="undefined" ){
        var src = $this.attr("src");
      }else{
        var src =  "";

      }
      var nu_src = src.replace(".svg",".png");
      nu_src = nu_src.replace("svg/","img/");
      $this.attr("src",nu_src);
    })
  }

  doCommonResize();
  $window.resize(function() {
    doCommonResize();
  });
});
//document ready end

//resize
function doCommonResize(){
  WH = $window.height();
  WW = $window.width();
}

// CONTACT FORM
function setFormEvents(){
  $("#ContactInfo .submit").on("click",function(e){
    if(!validateContactForm()){
      return false;
    }else{
      submitForm();
    }
  })

  $("#ContactInfo input").on("change",function(e){
    var $this = $(this);
    var name= $this.attr("name");
    var val= $this.val();
    $("#contactForm [name='"+name+"']").val(val);

  })

  $("#ContactInfo input[name=email] , #ContactInfo input[name=phone]").on("change keypress",function(e){
    $("#ContactInfo").parent().find(".formNextButton a").removeClass("inactive");
  })

  $("#ContactInfo .checkbox").on("click",function(e){
    $("#ContactInfo .checkbox").removeClass("active");
    $("#ContactInfo [name='email']").val("");
    $("#ContactInfo [name='phone']").val("");
    $("#ContactInfo [name='email']").parent().parent().parent().removeClass("error");
    $("#ContactInfo [name='phone']").parent().parent().parent().removeClass("error");
    $(this).addClass("active");
    e.preventDefault();
  })
}

function submitForm(){
    var post_data = $("#contactForm").serialize();
    var post_url = 'http:\/\/campaign-manager.twinehealth.com\/mail-manager\/lc\/ws';
    $.ajax({
        url :post_url,
        data: post_data,
        crossDomain: true,
        type : "POST",
        success: function(data) {
            resetForm();
            $(".popUp").removeClass("active");
            $("#PopUpSocialContact").addClass("active");

        },
        error : function(x,z,y){
            var data = {x:x,z:z,y:y};
            resetForm();
            $(".popUp").removeClass("active");
            $("#PopUpSocialContact").addClass("active");
        }
    });
}

function validateContactForm(){
  var valid = true;
  //
  if($("#contactForm [name='name']").val() == ""){
    valid = false;
    $("#ContactInfo [name='name']").parent().addClass("error");
  }else{
    $("#ContactInfo [name='name']").parent().removeClass("error");
  }
  // IF email is selected
  if( $("#ContactInfo .active [name='email']").length ){
    if( !validateEmail($("#contactForm [name='email']").val()) ){
      valid = false;
      $("#ContactInfo [name='email']").parent().parent().parent().addClass("error");
    }else{
      $("#ContactInfo [name='email']").parent().parent().parent().removeClass("error");
    }
    $("#ContactInfo [name='phone']").parent().parent().parent().removeClass("error");
  }
  //
  if( $("#ContactInfo .active [name='phone']").length ){
    if($("#contactForm [name='phone']").val() == ""){
      valid = false;
      $("#ContactInfo [name='phone']").parent().parent().parent().addClass("error");
    }else{
      $("#ContactInfo [name='phone']").parent().parent().parent().removeClass("error");
    }
    $("#ContactInfo [name='email']").parent().parent().parent().removeClass("error");
  }
  return valid;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function resetForm(){
  $("#ContactInfo input").val("");
  $("#ContactInfo .formBox").removeClass("active");
  $("#ContactInfo a").removeClass("active");
  document.getElementById("contactForm").reset();
  $(".formNextButton a").addClass("inactive");
}
// end CONTACT FORM

//FLEXSLIDER
function startFlexSlider(){
  $('#Quotes .flexslider').flexslider({
          animation: "slide",
          slideshow: "false",
          prevText: "",
          nextText: "",
          slideshowSpeed: 9000
      });
 }
// end FLEXSLIDER

//SHARE
function setShare(){
  //
  var left = (window.screen.width / 2) - (640/2);
  var topLoc = (window.screen.height / 2)- (450/2);
  //
  var SHARE_URL = "http://www.twinehealth.com";
  var SHARE_TITLE = "Twine Health - Itâ€™s what you think healthcare always should have been.";
  var SHARE_DESC = "It's called healthCARE for a reason. Technology is a powerful tool, but people are the solution. Thatâ€™s why we created an entirely new class of digital health technology: The Collaborative Care Platform.";

  $('.share-twitter').sharrre({
      share: { twitter: true },
      url: SHARE_URL,
      enableHover: false,
      enableTracking: true,
      template: '<a class="box" href="#"><div class="share"> <span class="ic" ><img rel="svg" src="/svg/twitter-social.svg" alt="twitter" width="39" height="39"></span><span class="desc" >Share on Twitter</span><span class="count" href="#"><span>{total}</span></div></div></a>',
      click: function(api, options){
      api.simulateClick();
      api.openPopup('twitter');
    }
    });

    $('.share-facebook').sharrre({
      share: { facebook: true },
      url: SHARE_URL,
      enableHover: false,
      enableTracking: true,
      template: '<a class="box" href="#"><div class="share"><span class="ic" ><img rel="svg" src="/svg/facebook.svg" alt="Facebook" width="39" height="39"></span><span class="desc" >Share on Facebook</span><span class="count" href="#"><span>{total}</span></div></div></a>',
      click: function(api, options){
      api.simulateClick();
      api.openPopup('facebook');
    }
    });

    $('.share-google').sharrre({
    share: {
      googlePlus: false,
          },
    url: SHARE_URL,
    template: '<a class="box" href="#" ><div class="share"><span class="ic" ><img rel="svg" src="/svg/google-plus.svg" alt="twitter" width="39" height="39"></span><span class="desc" >Share on Google+</span><span class="count" href="#"><span>{total}</span></div></div></a>',
    enableHover: false,
    enableTracking: true,
    click: function(api, options){
      api.simulateClick();
      api.openPopup('googlePlus');
    }
  });
  $('.share-linkedin').sharrre({
    share: {
      linkedin: true
    },
    url: SHARE_URL,
    template: '<a class="box" href="#"><div class="share"><span class="ic" ><img rel="svg" src="/svg/linkedin-social.svg" alt="Linkedin" width="39" height="39"></span><span class="desc" >Share on LinkedIn</span><span class="count" href="#"><span>{total}</span></div></div></a>',
    enableHover: false,
    enableTracking: true,
    click: function(api, options){
        window.open('http://www.linkedin.com/shareArticle?mini=true&url='+SHARE_URL+'&title='+encodeURIComponent(SHARE_TITLE)+'&source='+SHARE_URL+'&summary='+encodeURIComponent(SHARE_DESC), 'linkedin', 'height=450, width=640,top='+topLoc+', left='+left+', toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, directories=no, status=no');
        api.simulateClick();
    }
  });
}
// end SHARE

//svg
function supportsSvg() {
    if(BrowserDetect.browser == "Explorer" || (BrowserDetect.browser == "Mozilla" &&  BrowserDetect.version == "11") ){
        $("body").addClass("no_svg");
        return false;
    }
    if(document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") == false){
        $("body").addClass("no_svg");
        return false;
    }
    $("body").addClass("supports_svg");
    return true;
}

//IE8 polyfills
if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}