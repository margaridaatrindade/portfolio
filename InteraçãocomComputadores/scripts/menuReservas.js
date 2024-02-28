$(document).ready(function(){
	
	/*Pedido*/
	
	$('.app').css({"visibility":"hidden"});
	$(".app").hide();
	
	if (localStorage.getItem('shoplistlocalRe')) {
    	$('.list').html(localStorage.getItem('shoplistlocalRe'));
		if($('.count').text != 0){
			$('.count').css({"display":"block"});
			$('.count').text(localStorage.getItem('shoplistlocalRe').length);
		}
	}

	if (localStorage.getItem('npedidosRe')) {
    	$('.count').text(localStorage.getItem('npedidosRe'));
		$('.count').css({"display":"block"});
	}

	if (localStorage.getItem('precoRe')) {
		$('.precototal').text(localStorage.getItem('precoRe') +'€');
	}
	
	
    $(".btnpediu").on("click",function(e){

		if (!localStorage.getItem('precoRe')) {
			localStorage.setItem('precoRe',0);
		}
		
		if (!localStorage.getItem('pedidoRe')) {
			localStorage.setItem('pedidoRe','');
		}

		pedido = localStorage.getItem('pedidoRe');
		
		pedido.concat('<label><input type="checkbox" value= ' + parseInt($(this).attr('value')) + '/>'+ $(this).attr('alt') +'</label>')
		$('.count').css({"display":"block"});
		$('.list').append('<li    class="btnpediup" alt="'+ $(this).attr('alt')+ '" value= '+ parseInt($(this).attr('value')) + '>'+$(this).attr('alt')+parseInt($(this).attr('value'))+'€'+'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'+'x'+'<hr>'+'</li>');
		var shoplistlocal = $('.list').html();
		var itemlength = $(".app-body li").length;

		var pagarI = localStorage.getItem('precoRe');
		var pagar = parseInt(pagarI) + parseInt($(this).attr('value'));

		localStorage.setItem('pedidoRe',pedido);
		console.log(pedido);

		localStorage.setItem('npedidosRe',itemlength);
		localStorage.setItem('precoRe',pagar);
		localStorage.setItem('shoplistlocalRe', shoplistlocal);
		$('.precototal').text(pagar +'€');
		return false;
    });

	  			
	$(".list").on("click", ".btnpediup", function () {

		
    	$(this).remove();
        var shoplistlocal = $('.list').html();
		localStorage.setItem('shoplistlocalRe', shoplistlocal);
    	
		var itemlength = $(".app-body li").length;
		if(itemlength != 0){
			var pagar = parseInt(localStorage.getItem('precoRe'));
			var pagarI = parseInt($(this).attr('value'));
			localStorage.setItem('precoRe', pagar-pagarI);
			$('.precototal').text(pagar-pagarI +'€');
			$('.count').text(itemlength);
			localStorage.setItem('npedidosRe', itemlength);
		}else{
			$('.precototal').text(0 +'€');
   			window.localStorage.clear();
			localStorage.setItem('precoRe', 0);
			$('.count').css({"display":"none"});
		}

		return false;
    });


	
	    			 
     $(".closepopup").click(function(){
	 $(".app").hide(200);
    });
	

	$('.closewindow').click(function(){
		$('.app').fadeOut(500);
	});	

	$('#tray').click(function(){
		$('.app').css({"visibility":"visible"});
		$('.app').fadeIn(500);
		if (!localStorage.getItem('precoRe')) {
			localStorage.setItem('precoRe',0);
		}
		$('.precototal').text(localStorage.getItem('precoRe') +'€');
		if (!localStorage.getItem('npedidosRe')) {
			//$('.openpopup').prop('disabled', true);
		}
		else{
			//$('.openpopup').prop('enabled', true);
		}
	});	
		
		
	$('.btnpediu').click(function() {
		var itemlength = $(".app-body li").length;
		$('.count').text(itemlength);	
	});
		
		
	$(".openpopup2").click(function() {
		$('.precototal').text(0 +'€');
   		window.localStorage.clear();
		localStorage.setItem('precoRe', 0);
		$('.list').children().remove();
		$('.count').hide();
    	return false;
	});		
});

/*Checkboxes dos filtros*/

var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

/*Ligar filtros ao menu*/

/*quadrado 1*/

function showMe1(it, elem){
	var elems = document.getElementsByClassName("quadrado1");
	var currentState = elem.checked;
	var elemsLength = elems.length;
  
	for(i=0; i<elemsLength; i++){
	  if(elems[i].type === "checkbox"){
		elems[i].checked = false;   
	  }
	}
	elem.checked = currentState;
	var elements = document.getElementsByClassName('quadrado1');            
	for(j=0; j < elements.length; j++){
	  if(elements[j].id != it || currentState == true){
		elements[j].style.display = "none";
	  }if(elements[j].id == it || currentState == false){
		elements[j].style.display = "grid";
	  }
	}           
  }

/*quadrado 2*/

function showMe2(it, elem){
	var elems = document.getElementsByClassName("quadrado2");
	var currentState = elem.checked;
	var elemsLength = elems.length;
  
	for(i=0; i<elemsLength; i++){
	  if(elems[i].type === "checkbox"){
		elems[i].checked = false;   
	  }
	}
	elem.checked = currentState;
	var elements = document.getElementsByClassName('quadrado2');            
	for(j=0; j < elements.length; j++){
	  if(elements[j].id != it || currentState == true){
		elements[j].style.display = "none";
	  }if(elements[j].id == it || currentState == false){
		elements[j].style.display = "grid";
	  }
	}           
  }

/*quadrado 3*/

function showMe3(it, elem){
	var elems = document.getElementsByClassName("quadrado3");
	var currentState = elem.checked;
	var elemsLength = elems.length;
  
	for(i=0; i<elemsLength; i++){
	  if(elems[i].type === "checkbox"){
		elems[i].checked = false;   
	  }
	}
	elem.checked = currentState;
	var elements = document.getElementsByClassName('quadrado3');            
	for(j=0; j < elements.length; j++){
	  if(elements[j].id != it || currentState == true){
		elements[j].style.display = "none";
	  }if(elements[j].id == it || currentState == false){
		elements[j].style.display = "grid";
	  }
	}           
  }

/*quadrado 4*/

function showMe4(it, elem){
	var elems = document.getElementsByClassName("quadrado4");
	var currentState = elem.checked;
	var elemsLength = elems.length;
  
	for(i=0; i<elemsLength; i++){
	  if(elems[i].type === "checkbox"){
		elems[i].checked = false;   
	  }
	}
	elem.checked = currentState;
	var elements = document.getElementsByClassName('quadrado4');            
	for(j=0; j < elements.length; j++){
	  if(elements[j].id != it || currentState == true){
		elements[j].style.display = "none";
	  }if(elements[j].id == it || currentState == false){
		elements[j].style.display = "grid";
	  }
	}           
  }

/*quadrado 5*/

function showMe5(it, elem){
	var elems = document.getElementsByClassName("quadrado5");
	var currentState = elem.checked;
	var elemsLength = elems.length;
  
	for(i=0; i<elemsLength; i++){
	  if(elems[i].type === "checkbox"){
		elems[i].checked = false;   
	  }
	}
	elem.checked = currentState;
	var elements = document.getElementsByClassName('quadrado5');            
	for(j=0; j < elements.length; j++){
	  if(elements[j].id != it || currentState == true){
		elements[j].style.display = "none";
	  }if(elements[j].id == it || currentState == false){
		elements[j].style.display = "grid";
	  }
	}           
  }

/*quadrado 6*/

function showMe6(it, elem){
	var elems = document.getElementsByClassName("quadrado6");
	var currentState = elem.checked;
	var elemsLength = elems.length;
  
	for(i=0; i<elemsLength; i++){
	  if(elems[i].type === "checkbox"){
		elems[i].checked = false;   
	  }
	}
	elem.checked = currentState;
	var elements = document.getElementsByClassName('quadrado6');            
	for(j=0; j < elements.length; j++){
	  if(elements[j].id != it || currentState == true){
		elements[j].style.display = "none";
	  }if(elements[j].id == it || currentState == false){
		elements[j].style.display = "grid";
	  }
	}           
  }

/*quadrado 7*/

function showMe7(it, elem){
	var elems = document.getElementsByClassName("quadrado7");
	var currentState = elem.checked;
	var elemsLength = elems.length;
  
	for(i=0; i<elemsLength; i++){
	  if(elems[i].type === "checkbox"){
		elems[i].checked = false;   
	  }
	}
	elem.checked = currentState;
	var elements = document.getElementsByClassName('quadrado7');            
	for(j=0; j < elements.length; j++){
	  if(elements[j].id != it || currentState == true){
		elements[j].style.display = "none";
	  }if(elements[j].id == it || currentState == false){
		elements[j].style.display = "grid";
	  }
	}           
  }

/*quadrado 8*/

function showMe8(it, elem){
	var elems = document.getElementsByClassName("quadrado8");
	var currentState = elem.checked;
	var elemsLength = elems.length;
  
	for(i=0; i<elemsLength; i++){
	  if(elems[i].type === "checkbox"){
		elems[i].checked = false;   
	  }
	}
	elem.checked = currentState;
	var elements = document.getElementsByClassName('quadrado8');            
	for(j=0; j < elements.length; j++){
	  if(elements[j].id != it || currentState == true){
		elements[j].style.display = "none";
	  }if(elements[j].id == it || currentState == false){
		elements[j].style.display = "grid";
	  }
	}           
  }
