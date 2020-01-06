$(document).ready(function() {
  $(".test").slick({
    slidesToShow: 2,
    arrows: false,
    dots: true,
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }]
  });

  // fancybox
  // $("[data-fancybox]").fancybox({
  //   infobar: false,
  //   buttons: false,
  //   afterLoad: function(instance, current) {
  //     console.log("====================================");
  //     console.log(current);
  //     console.log("====================================");
  //     if (instance.group.length > 1 && current.$content) {
  //       current.$content.append(
  //         '<a data-fancybox-next class="button-next" href="javascript:;"><img src="icons/arrow-right.svg" /></a><a data-fancybox-previous class="button-previous" href="javascript:;"><img src="icons/arrow-left.svg" /></a>'
  //       );
  //     }
  //     current.$content.append(
  //       '<a data-fancybox-close class="button-close" href="javascript:;"><img src="icons/close_white.svg" /></a>'
  //     );
  //     current.$content.append(
  //       '<div class="fanc_indexes"><span class="indexCount1" data-fancybox-index>' +
  //         (current.index + 1) +
  //         '</span><span class="indexCount2" data-fancybox-count>' +
  //         instance.group.length +
  //         "</span></div>"
  //     );
  //   }
  // });
});
