var tempo = 0;
var trabalhando = false;
var intervalo = null;
var alertSound = document.getElementById('alertSound');


function exibir(){
    let hora = Math.floor(tempo / 3600);
    let minuto = Math.floor((tempo % 3600) / 60);
    let segundo = tempo % 60;

    let stringHora = hora.toString().padStart(2, '0');
    let stringMinuto = minuto.toString().padStart(2, '0');
    let stringSegundo = segundo.toString().padStart(2, '0');

    let tempoTela = stringHora + ":" + stringMinuto + ":" + stringSegundo;

    document.getElementById('cronometro').value = tempoTela;

    if (tempo <= 15 && tempo > 0) {
        document.getElementById('cronometro').style.color = 'red';
    } else {
        document.getElementById('cronometro').style.color = 'black';
    }
   
    if (tempo === 0){
        alertSound.play();
    }

    if(tempo <= 0){
        trabalhando = false;
        clearInterval(intervalo);
        intervalo = null;  // Limpa a variável intervalo quando o tempo acaba
        document.getElementById('cronometro').value = "00:00:00";  // Redefine o cronômetro na tela
        return; // Para evitar que o tempo continue decrementando após chegar a zero
    }
   
    tempo--;
}


function timer(){
    if(!trabalhando){
        let hora = parseInt(document.getElementById('horas').value) || 0;
        let minuto = parseInt(document.getElementById('minutos').value) || 0;
        let segundo = parseInt(document.getElementById('segundos').value) || 0;

        if(hora === 0 && minuto === 0 && segundo === 0){
            alert("Coloque um tempo");
            return;
        }

        tempo = hora * 3600 + minuto * 60 + segundo;
        trabalhando = true;
        exibir();
        intervalo = setInterval(exibir, 1000); 
    }
}

function pause(){
    clearInterval(intervalo);
    intervalo = null;  // Limpa a variável intervalo ao pausar
}

function voltar(){
    if (!intervalo) {  // Verifica se não há um intervalo ativo antes de iniciar um novo
        intervalo = setInterval(exibir, 1000);
    }
}

function reset() {
    clearInterval(intervalo);
    intervalo = null;
    trabalhando = false;
    tempo = 0;
    document.getElementById('cronometro').value = "00:00:00";  // Redefine o cronômetro na tela
}
