var closePopup = document.getElementById("popupclose");
var overlay = document.getElementById("overlay");
var popup = document.getElementById("popup");
if(closePopup != null){
// Fecha popo-up
closePopup.onclick = function(){
  overlay.style.display = 'none';
  popup.style.display = 'none';
};}
