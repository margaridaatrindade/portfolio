/*Slides das instruções*/

let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
  //aqui dá erro pq da -1 quando slideIndex = 0 , mas a mostra todos os slides,
  // tentamos por guarda para não haver slides[-1], mas dessa fora deois não mostrava o slide[0]
  //portanto decidimos deixar o erro de forma a ser possivel ver todos os slides
}


