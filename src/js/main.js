$(window).on("scroll", function() {
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    $(".scrollReveal").each(function() {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).css("opacity", 1);
      } else {
        $(this).css("opacity", 0);
      }
     });
   });
