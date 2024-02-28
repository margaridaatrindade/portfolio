/*questionario*/

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide1() {
  showSlides(slideIndex += 1);
}

function currentSlide2() {
  showSlides(slideIndex -= 1);
}


function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
 
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; 
    
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
 
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}



