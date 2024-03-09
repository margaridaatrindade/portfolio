$(document).ready(function(){
	if(document.querySelector("#opcoespagamento2")){
		document.querySelector("#opcoespagamento2").disabled = false;
	}
	if(document.querySelector("#btnPagamento")){
		document.querySelector("#btnPagamento").disabled = false;
	}
	

	
	$("#dados").click(function(){
		if(document.querySelector("#selNumPessoas").value == "" || document.querySelector("#txtDataReserva").value == "" || document.querySelector("#selHorasReserva").value == "" || document.querySelector("#txtNome").value == ""  ){
			document.querySelector("#conclui").disabled =true;
			document.querySelector("#first").disabled =true;
		}else{
			document.querySelector("#conclui").disabled = false;
			document.querySelector("#first").disabled =false;
		}
		
	})
	
	if(parseInt(localStorage.getItem('preco'))>0){
		if(document.getElementById("#btnPagamento")!= null || document.getElementById("#opcoespagamento2")!= null){
			document.querySelector("#btnPagamento").disabled = false;
			document.querySelector("#opcoespagamento2").disabled = false;
		}
		
	}

	/*Pagamento*/
	$(".all").click(function(){
		
		this.classList.add("botaoselecionado");
		document.getElementById("opcoespagamento").classList.remove("botaoselecionado");
		var aa = document.getElementsByTagName("input");
		for (var i = 0; i < aa.length; i++)
		 aa[i].checked = true;
		 if(parseInt(localStorage.getItem('preco'))>0){
			document.querySelector("#opcoespagamento2").disabled = false;
		}
		$('.precoP').text(localStorage.getItem('preco') +'€');
	});

	$(".some").click(function(){

		this.classList.add("botaoselecionado");
		document.getElementById("opcoespagamento1").classList.remove("botaoselecionado");
		
		localStorage.setItem('precoP',0)
		$('.precoP').text(localStorage.getItem('precoP') +'€');
		
		document.querySelector("#opcoespagamento2").disabled = true;
		
		precoParte = 0;
		var aa = [...document.getElementsByTagName("input")]
		for (var i = 0; i < aa.length; i++)
		 aa[i].checked = false;

		aa.forEach(x => x.addEventListener("change", () => {
			if(x.checked == true){
				precoParte = precoParte + parseInt(x.value) ;
				if(precoParte==0){
					document.querySelector("#opcoespagamento2").disabled = true;
				}
				if(precoParte>0){
					document.querySelector("#opcoespagamento2").disabled = false;
				}
				localStorage.setItem('precoP',precoParte);
				$('.precoP').text(localStorage.getItem('precoP') +'€');
				
			}if(x.checked == false){
				precoParte = precoParte - parseInt(x.value) ;
				if(precoParte==0){
					document.querySelector("#opcoespagamento2").disabled = true;
				}
				if(precoParte>0){
					document.querySelector("#opcoespagamento2").disabled = false;
				}
				localStorage.setItem('precoP',precoParte);
				$('.precoP').text(localStorage.getItem('precoP') +'€');
			}	
			
		}));
		

	});

	
	
	/*Pedido*/
	
	$('.app').css({"visibility":"hidden"});
	$(".app").hide();
	
	if (localStorage.getItem('shoplistlocal')) {
    	$('.list').html(localStorage.getItem('shoplistlocal'));
		
		if($('.count').text != 0){
			$('.count').css({"display":"block"});
			$('.count').text(localStorage.getItem('shoplistlocal').length);
		}
	}

	if (localStorage.getItem('pedido')) {
		$('.pedidoList').html(localStorage.getItem('pedido'));
	}

	if (localStorage.getItem('quest')) {
		$('.quest').html(localStorage.getItem('quest'));
	}


	if (localStorage.getItem('npedidos')) {
    	$('.count').text(localStorage.getItem('npedidos'));
		$('.count').css({"display":"block"});
	}

	if (localStorage.getItem('preco')) {
		$('.precoP').text(localStorage.getItem('preco') +'€');
		$('.precototal').text(localStorage.getItem('preco') +'€');
		if(localStorage.getItem('preco') == 0 && document.querySelector("#btnPagamento")){
			document.querySelector("#btnPagamento").disabled = true;
		}
	}

	

			
	
    $(".btnpediu").on("click",function(e){

		//$('.openpopup').prop('enabled', true);

		if (!localStorage.getItem('preco')) {
			localStorage.setItem('preco',0);
		}

		
		let listaAlt = [];
		/*for(let i = 0; i < (localStorage.getItem('shoplistlocal').length) ; i++){
			console.log(i)
			listaAlt.push('oi');
		}*/
		console.log($('.list').length)
		console.log(listaAlt)
		var oi = Math.floor(Math.random() * 1000)
        var io = oi.toString();
		$('.pedidoList').append('<label><input type="checkbox" value= ' + parseInt($(this).attr('value')) + ' checked="true"/>'+ $(this).attr('alt') +'</label>')
		$('.count').css({"display":"block"});
		$('.list').append('<li    class="btnpediup" alt="'+ $(this).attr('alt')+ '" value= '+ parseInt($(this).attr('value')) + '>'+$(this).attr('alt')+parseInt($(this).attr('value'))+'€'+'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'+'x'+'<hr>'+'</li>');
		$('.quest').append('<form><p>Avalie o prato: ' + $(this).attr('alt') + '</p> <input class="star star-1" value=1 id=1' + $(this).attr('alt')[0] + io + '1' + ' type="radio" name="star" /><label class="star star-1" value=1 for=1' + $(this).attr('alt')[0] + io + '1' + '></label> <input class="star star-2" value=2 id=2' + $(this).attr('alt')[0] + io + '2' + ' type="radio" name="star" /><label class="star star-2" value=2 for=2' + $(this).attr('alt')[0] + io + '2' + '></label> <input class="star star-3" value=3 id=3' + $(this).attr('alt')[0] + io + '3' + ' type="radio" name="star" /><label class="star star-3" value=3 for=3' + $(this).attr('alt')[0] + io + '3' + '></label> <input class="star star-4" value=4 id=4' + $(this).attr('alt')[0] + io + '4' + ' type="radio" name="star" /> <label class="star star-4" value=4 for=4' + $(this).attr('alt')[0] + io + '4' + '></label> <input class="star star-5" value=5 id=5' + $(this).attr('alt')[0] + io + '5' + ' type="radio" name="star" /><label class="star star-5" value=5 for=5' + $(this).attr('alt')[0] + io + '5' + '></label></form>')
		var quest = $('.quest').html();
		var shoplistlocal = $('.list').html();
		var itemlength = $(".app-body li").length;
		var pagarI = localStorage.getItem('preco');
		var pagar = parseInt(pagarI) + parseInt($(this).attr('value'));
		var pedido = $('.pedidoList').html();

		if(pagar>0){
			document.querySelector("#btnPagamento").disabled = false;
		if(document.querySelector("#opcoespagamento2")){
			document.querySelector("#opcoespagamento2").disabled = false;
		}
			
		}

		localStorage.setItem('quest',quest);
		localStorage.setItem('pedido',pedido);
		localStorage.setItem('npedidos',itemlength);
		localStorage.setItem('preco',pagar);
		localStorage.setItem('shoplistlocal', shoplistlocal);
		$('.precototal').text(pagar +'€');
		return false;
    });

	  			
	$(".list").on("click", ".btnpediup", function () {

		//atualiza o pedido
		$(this).attr('id', 'oi');
		elemento = document.getElementById("oi");
		index = Array.from($(".list").children()).indexOf(elemento);
		$('.quest').children().eq(index).remove();
		$('.pedidoList').children().eq(index).remove();
		quest = $('.quest').html();
		pedido = $('.pedidoList').html();
		localStorage.setItem('pedido', pedido);
		localStorage.setItem('quest', quest);

    	$(this).remove();
        var shoplistlocal = $('.list').html();
		localStorage.setItem('shoplistlocal', shoplistlocal);
    	
		var itemlength = $(".app-body li").length;
		if(itemlength != 0){
			var pagar = parseInt(localStorage.getItem('preco'));
			var pagarI = parseInt($(this).attr('value'));
			localStorage.setItem('preco', pagar-pagarI);
			$('.precototal').text(pagar-pagarI +'€');
			$('.count').text(itemlength);
			localStorage.setItem('npedidos', itemlength);
		}else{
			//$('.openpopup').prop('disabled', true);
			$('.precototal').text(0 +'€');
   			window.localStorage.clear();
			localStorage.setItem('preco', 0);
			$('.count').css({"display":"none"});
		}

		if(parseInt(localStorage.getItem('preco'))>0){
			document.querySelector("#btnPagamento").disabled = false;
			document.querySelector("#opcoespagamento2").disabled = false;
		}
		else{
			document.querySelector("#btnPagamento").disabled = true;
			document.querySelector("#opcoespagamento2").disabled = true;
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
		if (!localStorage.getItem('preco')) {
			localStorage.setItem('preco',0);
		}
		$('.precototal').text(localStorage.getItem('preco') +'€');
		if (!localStorage.getItem('npedidos')) {
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
		localStorage.setItem('preco', 0);
		$('.quest').children().remove();
		$('.pedidoList').children().remove();
		$('.list').children().remove();
		$('.count').hide();
		document.querySelector("#btnPagamento").disabled = true;
		document.querySelector("#opcoespagamento2").disabled = true;
    	return false;
	});	

	$(".paga").click(function() {
		localStorage.removeItem("shoplistlocal");
		localStorage.removeItem("pedido");
		localStorage.removeItem("shoplistlocal");
		localStorage.setItem("npedidofortimer",localStorage.getItem("npedidos"));
		localStorage.removeItem("npedidos");
		localStorage.setItem('preco', 0);
		$('.pedidoList').children().remove();
		$('.list').children().remove();
		$('.count').hide();
		document.querySelector("#btnPagamento").disabled = true;
		document.querySelector("#opcoespagamento2").disabled = true;
		location.href="pagamento.html";
    	return false;
	});

	$("#oi").click(function() {
		location.href="questionario.html";
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


