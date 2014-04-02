/* Empty Controller */


/* Defines */
var   NXB = {};

/*** Detection ***/
//TBD: Viewport Width, Touch...

/******* Global Event Handlers *********/
$(document).ready(function () {
  // Fired when DOM is ready = before Page is loaded

});


$(window).load(function () {
  // Fired when Page is loaded
  frost();
});

$( window ).resize(function() {
  // Fired when window is resized
  frost();
});




//var lastScrollTop = 0;
$(window).scroll(function(){


 $("canvas").css("-webkit-transform", "translatey(-" + $(window).scrollTop() + "px)");




  // Fired when window is scrolled
//frost();
  /*var st = $(this).scrollTop();
   if (st > lastScrollTop){
       $('header').addClass('header-small');
   } else {
      $('header').removeClass('header-small');
   }
   lastScrollTop = st;
*/
})


frost = function () {
        $(".blurheader").empty().css('height', $('header').height());

        var w = $('#content').width();
        html2canvas($('#content'), {
            onrendered: function (canvas) {
                $(".blurheader").append(canvas);
                 $(".blurheader canvas").attr("id","canvas");

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
    $('body').append('<svg id="svg-image-blur"><filter id="blur-effect-1"><feGaussianBlur stdDeviation="18"/></filter></svg>');
});
