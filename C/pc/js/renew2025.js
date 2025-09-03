// 긴급공지 슬라이드 설정
function urgentNoticePopup() {

  function showNoticePopup(noticeKey) {
    var $noticeSlide = $('.notice_slide');
    $noticeSlide.find('.noti_detail_wrap').hide();
    $noticeSlide.find('.noti_detail_wrap[data-key="' + noticeKey + '"]').show();
    $noticeSlide.find('.noti_btn_box, .ps, .btn_arrow').hide();

    if (notices_Swiper && notices_Swiper.stopAutoplay) {
      notices_Swiper.stopAutoplay();
    }
  }

  function hideNoticePopup() {
    var $noticeSlide = $('.notice_slide');
    $noticeSlide.find('.noti_detail_wrap').hide();
    $noticeSlide.find('.noti_btn_box, .ps, .btn_arrow').show();
    if (notices_Swiper && notices_Swiper.startAutoplay) {
	  $('.notice_slideWrap .ps a').removeClass('stop');
      notices_Swiper.startAutoplay();
    }
  }

  $('.notice_slide').on('click', '.btn_arrow', function (e) {
    e.preventDefault();
    var noticeKey = $(this).data('notice-key');
    showNoticePopup(noticeKey);
  });

  $('.notice_slide').on('click', '.noti_btn_close, .noti_close', function (e) {
    e.preventDefault();
    hideNoticePopup();
  });

  $(document).on('click', function (e) {
    var $target = $(e.target);
    if (!$target.closest('.btn_arrow').length &&
      !$target.closest('.noti_detail_wrap').length &&
      !$target.closest('.notice_slide').length) {

      hideNoticePopup();
    }
  });
}
urgentNoticePopup();

// 퀵서비스 blur 처리 막기
window.quickAreaOpen = function () {
  return false;
};

// 퀵서비스 마일리지사용 체크 시 여백
$(document).on('change', '.mile_use input:checkbox', function() {
  var thisBtn = $(this);
  if(thisBtn.is(':checked')){
    $('.quick-reservation .quick_step_wrap').css('margin-top', '-1px');
  }else{
    $('.quick-reservation .quick_step_wrap').css('margin-top', '20px');
  } 
});

// 메인 슬라이드 설정
function mainSlider(){
  var main_Swiper2 = new Swiper('.renew2025 .main_slider_wrap2', {
    slidesPerView: 1,
    speed: 1000,
    spaceBetween: 0,
    loop: true,
    pagination: '.renew2025 .main_slider_wrap2 .swiper-pagination',
    paginationClickable: true,
    paginationBulletRender: function (swiper, index, className) {
      return '<a href="#none" class="' + className + '"><span class="hidden">' + (index + 1) + mfui._uiMainLangs.UM0002 + '</span></a>';
    },
    prevButton: '.renew2025 .main_slider_wrap2 .swiper-button-prev',
    nextButton: '.renew2025 .main_slider_wrap2 .swiper-button-next',
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
  
      $('.main_slider_wrap2 .swiper-pagination a.swiper-pagination-bullet:nth-child(1)').attr('title', mfui._uiMainLangs.UM0001);
  
      if ($('.main_slider_wrap2 .swiper-slide').length == 3) {
        swiperm.stopAutoplay();
        swiperm.lockSwipes();
        $('.main_slider_wrap2 .swiper-button-prev, .main_slider_wrap2 .swiper-button-next').hide();
      } else {
        $('.main_slider_wrap2 .ps').on('click', function () {
          if ($(this).hasClass('stop')) {
            $(this).removeClass('stop');
            swiperm.startAutoplay();
          } else {
            $(this).addClass('stop');
            swiperm.stopAutoplay();
          }
        });
        $('.main_slider_wrap2').hover(
          function () {
            swiperm.stopAutoplay();
          }, function () {
            swiperm.startAutoplay();
          });
      };
    },
    onAutoplayStart: function (swiper) {
      $('.main_slider_wrap2 .ps').removeClass('stop');
    },
    onAutoplayStop: function (swiper) {
      $('.main_slider_wrap2 .ps').addClass('stop');
    },
    onTransitionEnd: function (swiper) {
      // 카운터 추가
      const $current = document.querySelector('.swiper-counter .current');
      if ($current) $current.textContent = (swiper.realIndex + 1).toString().padStart(2, '0');
  
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
    }
  });
}
mainSlider();

//최저가 간편조회 슬라이드 설정
function specialSlider2() {
  var perveiw = "auto";
  var slideTotal = $('.special_slider_wrap .swiper-slide').length;
  var specialSwiper2 = new Swiper('.renew2025 .special_slider2', {
    slidesPerView: 4,
    slidesPerGroup: 1,
    spaceBetween: 16,
    simulateTouch: false,
    watchSlidesVisibility: true,
    prevButton: '.spc_prev',
    nextButton: '.spc_next',
    paginationBulletRender: function (swiper, index, className) {
      return '<a href="#none" class="' + className + '"><span class="hidden">' + (index + 1) + mfui._uiMainLangs.UM0002 + '</span></a>';
    },
    paginationClickable: true,
    loop: true,
    onSlideChangeStart: function (swiper) {
      spcClose();
    },
    onSlideNextEnd: function (swiper) {
      if (amui.specialSliderLastFlg) {
        var spcLastSlide = $('.special_slider2 .swiper-slide').not('.blind').last().prev().find('.spc_card');
        spcLastSlide
          .parent('.swiper-slide')
          .velocity('stop')
          .velocity({ width: '520px', height: '512px' })
          .addClass('on'); 

        spcLastSlide.next('.info_detail')
          .show()
          .find('.graph_list')
          .velocity('stop')
          .velocity({ height: '180px' });
        amui.specialSliderLastFlg = false;
      }
    },
  });
}
function spcClose() {
  $('.special_slider2').find('.swiper-slide').css({ width: '292px', height: '512px' }).removeClass('on');
  $('.info_detail').hide().find('.graph_list').css({ height: '0' });
}
function spcOpenCard($card) {
  var $spcCard = $card.closest('.spc_card');
  var $slide = $spcCard.closest('.swiper-slide');
  var $infoDetail = $spcCard.next('.info_detail');
  var swiperInstance = document.querySelector('.special_slider2').swiper;

  var $visibleSlides = $('.special_slider2 .swiper-slide-visible');
  var isLastVisible = $slide[0] === $visibleSlides.last()[0];

  if (isLastVisible && swiperInstance) {
    swiperInstance.slideTo(swiperInstance.activeIndex + 1);

    setTimeout(function () {
      spcOpenCard($card);
    }, 400);
    return;
  }

  spcClose();

  $slide.velocity('stop').velocity({ width: '520px', height: '500px' }).addClass('on');
  $infoDetail.show().find('.graph_list').velocity('stop').velocity({ height: '180px' });
}
$(document).on('click', '.special_slider2 .spc_card', function (e) {
  e.preventDefault();
  spcOpenCard($(this));
});
$(document).on('click', '.special_slider_wrap .spc_detail_close', function (e) {
  e.preventDefault();
  spcClose();
});
specialSlider2();

//이벤트 슬라이드 설정
function eventSlider2() {
  var thumbSwiper = new Swiper('.event_thumb_swiper', {
    spaceBetween: 10,
    slidesPerView: 3,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
    allowTouchMove: false,
  });

  var eventSwiper2 = new Swiper('.renew2025 .event_slider2', {
    spaceBetween: 0,
    autoplay: false,
    effect: 'fade',
    autoHeight: true,
    prevButton: '.evt_prev',
    nextButton: '.evt_next',
    pagination: '.evt_paging',
    paginationType: 'custom',
    paginationCustomRender: function (swiper, current, total) {
      if(current == 0 || total == 0) return;
      var formattedCurrent = current < 10 ? '0' + current : current;
      var formattedTotal = total < 10 ? '0' + total : total;
      return '<span class="current">' + formattedCurrent + '</span> / <span class="total">' + formattedTotal + '</span>';
    },
    onSlideChangeStart: function () {
      const index = eventSwiper2.activeIndex;
      thumbSwiper.slideTo(index);
      updateActiveThumb(index);
    }
  });

  thumbSwiper.on('tap', function () {
    var clickedIndex = thumbSwiper.clickedIndex;
    if (typeof clickedIndex !== 'undefined') {
      eventSwiper2.slideTo(clickedIndex);
      updateActiveThumb(clickedIndex);
    }
  });

  var prevBtn = document.querySelector('.evt_prev');
  var nextBtn = document.querySelector('.evt_next');

  prevBtn.addEventListener('click', function () {
    setTimeout(function () {
      var currentIndex = eventSwiper2.activeIndex;
      thumbSwiper.slideTo(currentIndex);
      updateActiveThumb(currentIndex);
    }, 0);
  });

  nextBtn.addEventListener('click', function () {
    setTimeout(function () {
      var currentIndex = eventSwiper2.activeIndex;
      thumbSwiper.slideTo(currentIndex);
      updateActiveThumb(currentIndex);
    }, 0);
  });

  function updateActiveThumb(index) {
    var thumbSlides = document.querySelectorAll('.event_thumb_swiper .swiper-slide');
    thumbSlides.forEach(function (el) {
      el.classList.remove('is-active');
    });
    if (thumbSlides[index]) {
      thumbSlides[index].classList.add('is-active');
    }
  }
  updateActiveThumb(0);
}
eventSlider2();

// 스크롤 시 우측 탑 버튼
$(window).on('scroll', function () {
  var document_scroll = $(document).scrollTop();
  if (document_scroll > 200) {
    $('#goTop').css('display', 'block');
  } else {
    $('#goTop').css('display', 'none');
  }
});

// 플로팅 메뉴 챗봇 툴팁 위치
(function() {
  const $trigger = $('.right_wing .btn_chatbot');
  const $tooltipWrap = $trigger.find('.hdlayer_wrap');

  const tooltipPosition = function() {
    if (!$trigger.hasClass('show')) {
      return;
    }

    $trigger.removeClass('top');

    const triggerOffset = $trigger.offset();
    const tooltipHeight = $tooltipWrap.outerHeight();
    const triggerHeight = $trigger.outerHeight();
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();

    if (triggerOffset.top + triggerHeight + tooltipHeight > windowHeight + scrollTop) {
      $trigger.addClass('top');
    }
  };

  $trigger.on('mouseenter', function() {
    $(this).addClass('show');
    tooltipPosition();
  });

  $trigger.on('mouseleave', function() {
    $(this).removeClass('show top');
  });

  $(window).on('resize scroll', tooltipPosition);

  tooltipPosition();
})();

// 우측 탑 버튼만 있을 때 위치
$(function () {
  var $wing = $('.right_wing .inner');
  if (
    $wing.find('.best_week').length === 0 &&
    $wing.find('.btn_coupon').length === 0 &&
    $wing.find('.btn_chatbot').length === 0
  ) {
    $('.right_wing').addClass('only_goTop');
  }
});