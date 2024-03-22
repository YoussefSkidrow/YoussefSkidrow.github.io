(function () {
  "use strict";

  console.log('slider...')
  var carousel = document.getElementsByClassName('carousel')[0],
    slider = carousel.getElementsByClassName('carousel__slider')[0],
    items = carousel.getElementsByClassName('carousel__slider__item')

  var width, height, totalWidth, margin = 20,
    currIndex = 0,
    interval, intervalTime = 4000;

  function init() {
    resize();
    move(Math.floor(items.length / 2));
    bindEvents();
    timer();
  }

  function resize() {
    width = 320 // > 800px
    height = 570 * .5,
      totalWidth = width * items.length;


    slider.style.width = totalWidth + "px";

    for (var i = 0; i < items.length; i++) {
      let item = items[i];
      item.style.width = (width - (margin * 2)) + "px";
      item.style.height = height + "px";
    }
  }

  function move(index) {

    if (index < 1) index = items.length;
    if (index > items.length) index = 1;
    currIndex = index;

    for (var i = 0; i < items.length; i++) {
      let item = items[i],
        box = item.getElementsByClassName('item__3d-frame')[0];
      if (i == (index - 1)) {
        item.classList.add('carousel__slider__item--active');
        box.style.transform = "perspective(1200px)";
      } else {
        item.classList.remove('carousel__slider__item--active');
        box.style.transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 40 : -40) + "deg)";
      }
    }

    slider.style.transform = "translate3d(" + ((index * -width) + (width / 2) + 1000 / 2) + "px, 0, 0)";
  }

  function timer() {
    clearInterval(interval);
    interval = setInterval(() => {
      move(++currIndex);
    }, intervalTime);
  }

  function bindEvents() {
    window.onresize = resize;
  }



  const observer = new MutationObserver(() => {
    init();
  })
  observer.disconnect()

  observer.observe(carousel, { childList: true, subtree: true })
})();