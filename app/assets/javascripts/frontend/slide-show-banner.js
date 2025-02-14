$(document).ready(function () {
  let slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    let slides = $(".mySlides");
    let dots = $(".dot");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    slides.hide();
    dots.removeClass("active");

    $(slides[slideIndex - 1]).show();
    $(dots[slideIndex - 1]).addClass("active");
  }
});

