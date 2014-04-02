/* Empty Controller */


/* Defines */
var   NXB = {};

/*** Detection ***/
//TBD: Viewport Width, Touch...

/******* Global Event Handlers *********/
$(document).ready(function () {
  // Fired when DOM is ready = before Page is loaded
  console.log(navigator.appVersion);
  NXB.isIE = (navigator.appVersion.indexOf("Trident")!=-1);
  if (NXB.isIE){
    $('.blurheader').hide();
  }
  else frost();

});


$(window).load(function () {
  // Fired when Page is loaded
  //frost();
});

$( window ).resize(function() {
  // Fired when window is resized
 if(!NXB.isIE) frost();
});




var lastScrollTop = 0;
$(window).scroll(function(){


 if(!NXB.isIE) $("canvas").css("transform", "translatey(-" + $(window).scrollTop() + "px)");




  // Fired when window is scrolled
//frost();

  /*var st = $(this).scrollTop();
   if (st > lastScrollTop){
       $('header').addClass('header-small');
   } else {
      $('header').removeClass('header-small');
   }
   lastScrollTop = st;*/

})


frost = function () {

        var scrollpos = $(window).scrollTop();
        //var w = $('#content').width();
        html2canvas($('#content'), {
            onrendered: function (canvas) {
                $(".blurheader").empty().css('height', $('header').height()).append(canvas);
                $(".blurheader canvas").attr("id","canvas");
                window.scrollTo(40,scrollpos);
            }
        });

        //$('canvas, #header, #cover').hide();
        /*$('#cover').fadeIn('slow', function () {
            $('#header').fadeIn('slow');
        });*/
    };

/********** Global Functions ***********/

$(document).ready(function () {
    //$('body').append('<div id="contain"><canvas /></div>');
    $('body').append('<svg id="svg-image-blur"><filter id="blur-effect-1"><feGaussianBlur stdDeviation="4"/></filter></svg>');
});
