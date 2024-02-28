const minToMs = 60000;

const btnconcluirpopup1 = document.querySelector("#popupnumerario > div > .btnconcluirpopup")
const btnconcluirpopup2 = document.querySelector("#popupmultibanco > div > .btnconcluirpopup")
const btnconcluirpopup3 = document.querySelector("#popupmbway > div > .btnconcluirpopup")

var getTimePass = parseInt(localStorage.getItem("timePass"));

const npedidos = localStorage.getItem("npedidofortimer");

const timeWaiting = npedidos * 2 * minToMs;

const countDownDate = new Date().getTime() + timeWaiting - (getTimePass * 1000);

if((btnconcluirpopup1 || btnconcluirpopup2 || btnconcluirpopup3) && npedidos != null){
  btnconcluirpopup1.addEventListener("click",timeStart);
  btnconcluirpopup2.addEventListener("click",timeStart);
  btnconcluirpopup3.addEventListener("click",timeStart);
  
}

function timeStart(){
  localStorage.removeItem("timeEnd");
  localStorage.setItem("timePass",0);
  localStorage.setItem("timeStartCheck",true);

  setTimeout(() => {
    document.location.reload();
  }, 100);
};

if(!localStorage.getItem("timeStartCheck")){
  document.querySelector("#icontempo").style.display = "none"
}

if(!localStorage.getItem("timeStartCheck")){
  document.querySelector("#tray").style.marginLeft = "32vw";
}



if(localStorage.getItem("timeStartCheck")){
  var x = setInterval(function() {  

    var now = new Date().getTime();
  
    var distance = countDownDate - now;
  
    var timePass = parseInt(localStorage.getItem("timePass")) || 0;
  
    timePass += 1;
  
    localStorage.setItem("timePass",timePass)
  
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    document.getElementById("time").innerHTML = "Tempo previsto de espera: " + hours + "h "
    + minutes + "m " + seconds + "s ";

    if(document.querySelector("#popuptempo > div > #countdown > #time")){
      document.querySelector("#popuptempo > div > #countdown > #time").innerHTML = "Tempo previsto de espera: " + hours + "h "
      + minutes + "m " + seconds + "s ";
    }

    var valor = timePass * 100 / (timeWaiting / 1000);

    if(document.querySelector("#popuptempo > div > div.progress > div")){
      document.querySelector("#popuptempo > div > div.progress > div").style.width = `${valor.toFixed(2)}%`;
      document.querySelector("#popuptempo > div > div.progress > span").textContent = `${valor.toFixed(2)}%`;
    }

    document.querySelector("#popuptempoespera > div > div.progress > div").style.width = `${valor.toFixed(2)}%`;
    document.querySelector("#popuptempoespera > div > div.progress > span").textContent = `${valor.toFixed(2)}%`;
      
    if (distance < 0 || !localStorage.getItem("timeStartCheck") || valor >= 100) {
      clearInterval(x);
      document.getElementById("time").innerHTML = "Bom apetite! \n Responda ao nosso questionário e ganhe Prémios!";
      document.querySelector("#oi").disabled = false;
      
      if(localStorage.getItem("quest")){
        location.href="#popuptempoespera";
      }
      
      if(document.querySelector("#popuptempo > div > #countdown > #time")){
        document.querySelector("#popuptempo > div > #countdown > #time").innerHTML = "Bom apetite! \n Responda ao nosso questionário e ganhe Prémios!";
        document.querySelector("#oi").disabled = false;
        if(localStorage.getItem("quest")){
          location.href="#popuptempoespera";
        }
        
      }

      localStorage.removeItem("timePass");
      localStorage.removeItem("timeStartCheck");
      localStorage.removeItem("npedidofortimer");
      localStorage.setItem("timeEnd",true);
    }
  }, 1000)
}

function timePassed(){
  localStorage.setItem("timePass",timeWaiting/1000) ;
}

if(localStorage.getItem("timeEnd")){
  document.getElementById("time").innerHTML = localStorage.remove("timeEnd");
  document.querySelector("#oi").disabled = false;
  localStorage.remove("timeEnd");
}

if(localStorage.getItem("timeEnd") && localStorage.getItem("quest")){
  location.href="#popuptempoespera";
  localStorage.remove("timeEnd");
}