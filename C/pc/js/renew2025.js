// 메인 슬라이드 재설정
var main_Swiper2;
main_Swiper2 = new Swiper('.renew2025 .main_slider_wrap', {
  slidesPerView: 1,
  speed: 1000,
  spaceBetween: 0,
  loop: true,
  pagination: '.main_slider_wrap .swiper-pagination',
  paginationClickable: true,
  paginationBulletRender: function (swiper, index, className) {
    //console.log(swiper,index, className);
    return '<a href="#none" class="' + className + '"><span class="hidden">' + (index + 1) + mfui._uiMainLangs.UM0002 + '</span></a>';
  },
  prevButton: '.main_slider_wrap .swiper-button-prev',
  nextButton: '.main_slider_wrap .swiper-button-next',
  initialSlide: 0,
  autoplayDisableOnInteraction: true,
  autoplay: 3000,
  rander: true,
  onInit: function (swiperm) {
    mt_new = swiperm.height;

    // 카운터 추가
    const $current = document.querySelector('.swiper-counter .current');
    const $total = document.querySelector('.swiper-counter .total');
    if ($current) $current.textContent = (swiperm.realIndex + 1).toString().padStart(2, '0');
    if ($total) {
      const realSlideCount = swiperm.wrapper[0].querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;
      $total.textContent = realSlideCount.toString().padStart(2, '0');
    }

    $('.main_slider_wrap .swiper-pagination a.swiper-pagination-bullet:nth-child(1)').attr('title', mfui._uiMainLangs.UM0001);

    if ($('.main_slider_wrap .swiper-slide').length == 3) {
      swiperm.stopAutoplay();
      swiperm.lockSwipes();
      $('.main_slider_wrap .swiper-button-prev,.main_slider_wrap .swiper-button-next,.main_slider_wrap .mp_wrap').hide();
    } else {
      $('.main_slider_wrap .ps').on('click', function () {
        if ($(this).hasClass('stop')) {
          $(this).removeClass('stop');
          swiperm.startAutoplay();
        } else {
          $(this).addClass('stop');
          swiperm.stopAutoplay();
        }
      });
      $('.main_slider_wrap').hover(
        function () {
          swiperm.stopAutoplay();
        }, function () {
          swiperm.startAutoplay();
        });
    };
    // main_slideSize();
    // mainSlide_pt();
  },
  onAfterResize: function (swiper) {
    // main_slideSize();
  },
  onAutoplayStart: function (swiper) {
    //console.log(swiper);
    $('.main_slider_wrap .ps').removeClass('stop');
  },
  onAutoplayStop: function (swiper) {

    $('.main_slider_wrap .ps').addClass('stop');
  },
  onSlideChangeStart: function (swiper) {
    var $target = swiper.container.find('.swiper-pagination a'),
      activeIndex = swiper.activeIndex,
      _length = $target.length,
      _activeIdx = (_length === activeIndex) ? activeIndex : (activeIndex % _length);
    $target.each(function (idx, el) {
      var $text = $(el).find("span"),
        text = $text.text().replace(/ 선택됨/g, "");
      if (_activeIdx === (idx + 1)) {
        $text.text(text + " 선택됨");
        $(el).attr('title', mfui._uiMainLangs.UM0001);
      } else {
        $text.text(text);
        $(el).attr('title', '');
      }
    });
    var slide_two_view = swiper.container.find('.swiper-slide .swiper_slide_two_view');
    slide_two_view.velocity('stop').velocity({ duration: 800, opacity: '0' });
  },
  onSlideChangeEnd: function (swiper) {
    swiper.fixLoop();
    var slide_two_view = swiper.container.find('.swiper-slide.swiper-slide-active .swiper_slide_two_view');
    slide_two_view.velocity('stop').velocity({ opacity: '1' });
    
    // 카운터 추가
    const $current = document.querySelector('.swiper-counter .current');
    if ($current) $current.textContent = (swiper.realIndex + 1).toString().padStart(2, '0');
  }
});

//최저가 간편조회 슬라이드 부분 재설정