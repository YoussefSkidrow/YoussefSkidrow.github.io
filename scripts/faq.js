document.addEventListener('click', function (event) {
  var faqElement = event.target.closest('.c-faq');

  if (faqElement) {
    document.querySelectorAll('.c-faq').forEach(function (element) {
      element.classList.remove('c-faq--active');
    });

    faqElement.classList.add('c-faq--active');
  }
});