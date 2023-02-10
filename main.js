var resultado = "";
var resultadoInicial = "";
var valor1 = 0;
var valor2 = 0;
var valorAux = 0;
var primeiroValor = true;
var tipoConta = "";
var addOperador = true;
var adicionaDecimal = false;
var ultimoTotal;
var igual = false;


function adicionarValor(valor) {
    if (primeiroValor) {
        if (igual==true  ) {
            valor1 = 0;
            resultado = "";
            igual = false;
        }
        document.getElementById("resultado").innerText = "";
        if (parseInt(valor1) != parseFloat(valor1)) {
            var aux = valor1.toString();
            aux = aux + valor;
            valor1 = parseFloat(aux);
        }
        else if (parseInt(valor1) == parseFloat(valor1) && adicionaDecimal) {
            if(valor>0) valor*-1;
            valor1 += (valor / 10);
            resultado = valor1;
            adicionarConteudo("");
            adicionaDecimal = false;
            return;
        }
        else {
            if(valor>0) valor*-1;
            valor1 = (valor1 * 10) + valor;
        }
    }
    else {
        if (addOperador) {
            var conteudo = "";
            if (valor1 == 0) conteudo = "0"
            conteudo = conteudo + converterEmOperador(tipoConta);
            adicionarConteudo(conteudo);
            addOperador = false;
            resultadoInicial = resultado;
        }
        if (parseInt(valor2) != parseFloat(valor2)) {
            var aux = valor2.toString();
            aux = aux + valor;
            valor2 = parseFloat(aux);
        }
        else if (parseInt(valor2) == parseFloat(valor2) && adicionaDecimal) {
            valor2 += (valor / 10);
            resultado = resultadoInicial + valor2;
            executarOperacao();
            adicionarConteudo("");
            adicionaDecimal = false;
            return;
        }
        else if (parseInt(valor2) == parseFloat(valor2)) {
            valor2 = (valor2 * 10) + valor
        }
        executarOperacao();
    }
    adicionarConteudo(valor.toString());
}

function adicionarOperador(operador) {
    if (igual==true && valor1==0 ) {
        valor1 = ultimoTotal;
        igual = false;
        resultado = valor1;
    }
    if (!primeiroValor && valor2 != 0) {
        var total = executarOperacao();
        valor1 = total;
        valor2 = 0;
        resultado = valor1;
        document.getElementById("resultado").innerHTML = "";
        addOperador = true;
    }
    tipoConta = operador;
    if (valor1 == 0){
        document.getElementById("conta").innerHTML = "0" + converterEmOperador(operador);
    } 
    else document.getElementById("conta").innerHTML = resultado + converterEmOperador(operador);
    primeiroValor = false;

}




function limparConta() {
    if (addOperador) {
        resultado = "";
        document.getElementById("conta").innerHTML = "";
        document.getElementById("resultado").innerHTML = valor1;
        igual = true;
    } else {
        resultado = "";
        ultimoTotal = executarOperacao();
        valor1 = ultimoTotal;
        valor2 = 0;
        resultado = valor1;
        document.getElementById("conta").innerHTML = "";
        primeiroValor = true;
        addOperador = true;
        tipoConta = "";
        igual = true;
    }
    
}



/*
var valor1 = 0;
var valor2 = 0;
var total = 0 ;
var conteudoConta = "";
var conteudoTotal = "";
var possuiOperador = false;

function buttonNumero(valor){
    if(!possuiOperador){
        var aux = valor2.toString();
        aux = aux + valor;
        if (parseInt(valor1) != parseFloat(valor1)) {
            valor2 = parseFloat(aux);
        }
        if (parseInt(valor1) == parseFloat(valor1)) {
            valor2 = parseInt(aux);
        }
        
        var aux = valor1.toString();
            aux = aux + valor;
            valor1 = parseFloat(aux);
    }
}

function adicionaEmTela(conta, resultado);
document.getElementById("conta").innerHTML = conta;
document.getElementById("resultado").innerHTML = resultado;*/

function inverterValor(){
    if(primeiroValor){
        valor1 = -1*valor1;
        resultado = valor1;
    }
    else{
        
        valor2 = -1*valor2;
        resultado = resultadoInicial + valor2;
        executarOperacao();
    }
    document.getElementById("conta").innerHTML = resultado;
    
}
function adicionarDecimal() {
    if (primeiroValor) {
        if (parseInt(valor1) == parseFloat(valor1)) {
            if (valor1 == 0) document.getElementById("conta").innerHTML = "0.";
            else document.getElementById("conta").innerHTML = valor1 + ".";
            adicionaDecimal = true;
        }
    } else {
        if (parseInt(valor2) == parseFloat(valor2)) {
            if (valor2 == 0) document.getElementById("conta").innerHTML = resultadoInicial + "0.";
            else document.getElementById("conta").innerHTML = resultadoInicial + valor2 + ".";
            adicionaDecimal = true;
        }
    }
}
function transformaEmPorcetagem() {
    if (primeiroValor) {
        valor1 = valor1 / 100;
        resultado = valor1;
        document.getElementById("conta").innerHTML = resultado;
    } else {
        if (tipoConta == "mult" || tipoConta == "div") {
            valor2 = valor2 / 100;
            resultado = resultadoInicial + valor2;
            document.getElementById("conta").innerHTML = resultado;
            executarOperacao();
        } else {
            valor2 = valor1 / 100 * valor2;
            resultado = resultadoInicial + valor2;
            document.getElementById("conta").innerHTML = resultado;
            executarOperacao();
        }
    }
}
function converterEmOperador(operador) {
    switch (operador) {
        case "div":
            {
                return " &#247; ";
            }
        case "mult":
            {
                return " x ";
            }
        case "sub":
            {
                return " - ";
            }
        case "soma":
            {
                return " + ";
            }
    }
}
function executarOperacao() {
    var total = 0;
    switch (tipoConta) {
        case "div":
            {
                if (valor2 == 0) total = "Não é possivel divisão por 0";
                else total = (valor1 / valor2);
                break;
            }
        case "mult":
            {
                total = valor1 * valor2;
                break;
            }
        case "sub":
            {
                total = valor1 - valor2;
                break;
            }
        case "soma":
            {
                total = valor1 + valor2;
                break;
            }
    }
    document.getElementById("resultado").innerHTML = total;
    return total;
}
function adicionarConteudo(conteudo) {
    resultado = resultado + conteudo;
    document.getElementById("conta").innerHTML = resultado;
}
function zerarDados() {
    resultado = "";
    valor1 = 0;
    valor2 = 0;
    primeiroValor = true;
    addOperador = true;
    tipoConta = "";
    document.getElementById("conta").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
}
function zerarValor() {
    if (primeiroValor) {
        zerarDados();
    } else {
        valor2 = 0;
        resultado = resultadoInicial;
        document.getElementById("conta").innerHTML = resultadoInicial;
        document.getElementById("resultado").innerHTML = "";
    }
}