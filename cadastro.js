if (localStorage.getItem("userName")) {
    var loading = document.querySelector("#loading")
    loading.style.display = "flex";
    setTimeout(function(){
        window.location.href = 'pagePlataforma/plataforma.html';
    }, 2000)
}

fecharAlerta = document.querySelector("#fechar_alerta_inicial")
alertaInicial = document.querySelector("#alerta_inicial")
fecharAlerta.addEventListener('click', function () {
    alertaInicial.style.display = "none";
})

// Corrigindo altura do vh =>

    function atualizarVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    window.addEventListener('load', atualizarVH);
    window.addEventListener('resize', atualizarVH);

//

// Telas =>
var telaLogin = document.querySelector("#tela_login");
var telaCadastro1 = document.querySelector("#tela_cadastro1");
var telaCadastro2 = document.querySelector("#tela_cadastro2");
var telaCadastro3 = document.querySelector("#tela_cadastro3");
var telaCadastro4 = document.querySelector("#tela_cadastro4");

var telas = [telaLogin, telaCadastro1, telaCadastro2, telaCadastro3, telaCadastro4]
var contadorTela = 0;

// Inputs das telas =>
var inputsTela1 = document.querySelectorAll("#tela_cadastro1 input");
var inputsTela2 = document.querySelectorAll("#tela_cadastro2 input");

// Progresso =>
var progressoTelaCadastro = document.querySelector(".preenchimento_barra_status_cadastro");
var progressoCadastroLogin = 0;

// Botões => 
var btComecarCadastro = document.querySelector("#botao_comecar_cadastro");
var btVoltarCadastro = document.querySelector("#botao_voltar_cadastro");
var btProximoCadastro = document.querySelector("#botao_proximo_cadastro");
var btVoltarCadastro2 = document.querySelector("#botao_voltar_cadastro2");
var btProximoCadastro2 = document.querySelector("#botao_proximo_cadastro2");
var btVoltarCadastro3 = document.querySelector("#botao_voltar_cadastro3");

function proximo (event, bt) {
    event.preventDefault();

    // Bloquear duplo clique=>
    bt.disabled = true;
    setTimeout(() => bt.disabled = false, 1000);

    progressoCadastroLogin += 25;
    progressoTelaCadastro.style.width = `${progressoCadastroLogin}%`;

    let telaAtual = telas[contadorTela];
    telaAtual.style.transition = "0.3s";
    telaAtual.style.opacity = "0";
    telaAtual.style.zIndex = "-1";

    let proxTela = telas[contadorTela + 1];
    setTimeout(function(){
        proxTela.style.transition = "0.3s";
        proxTela.style.opacity = "1";
        proxTela.style.zIndex = "0";
    }, 300)
    
    contadorTela += 1;
}

function voltar (event, bt) {
    event.preventDefault();

    // Bloquear duplo clique=>
    bt.disabled = true;
    setTimeout(() => bt.disabled = false, 1000);

    progressoCadastroLogin -= 25;
    progressoTelaCadastro.style.width = `${progressoCadastroLogin}%`;

    let telaAtual = telas[contadorTela];
    telaAtual.style.transition = "0.5s";
    telaAtual.style.opacity = "0";
    telaAtual.style.zIndex = "-1";

    let anteriorTela = telas[contadorTela - 1];
    setTimeout(function(){
        anteriorTela.style.transition = "0.5s";
        anteriorTela.style.opacity = "1";
        anteriorTela.style.zIndex = "0";
    }, 300)

    contadorTela -= 1;
}

function conferirInputs (event, tela) {
    event.preventDefault();
    let tudoOk = true;

    tela.forEach(function(input){
        if (input.type == "checkbox") {
            if (!input.checked) {
                input.style.outline = "solid 1px red";
                tudoOk = false;
            } else {
                input.style.outline = "none";
            }
        } else if (!input.value) {
            input.style.outline = "solid 1px red";
            tudoOk = false;
        } else {
            input.style.outline = "none";
        }
    })   

    return tudoOk;
}

// Aplicando as funções nos botões =>

    btComecarCadastro.addEventListener('click', function (event) {
        proximo(event, this);
    })

    btVoltarCadastro.addEventListener('click', function (event) {
        voltar(event, this);
    })

    btProximoCadastro.addEventListener('click', function (event) {
        if (conferirInputs(event, inputsTela1)) {
            proximo(event, this);
        }
    })

    btVoltarCadastro2.addEventListener('click', function (event) {
        voltar(event, this);
    })

    btProximoCadastro2.addEventListener('click', function (event) {
        if (conferirInputs(event, inputsTela2)) {
            proximo(event, this);
        }
    })

    btVoltarCadastro3.addEventListener('click', function (event) {
        voltar(event, this);
    })

//

var btConcluirCadastro = document.querySelector("#botao_concluir_cadastro");

btConcluirCadastro.addEventListener('click', function(event) {
    proximo(event, this);
    
    localStorage.setItem("userName", document.querySelector("#input_username_cad").value);
    localStorage.setItem("corDoPerfil", document.querySelector(".perfil_user").style.background);

    var logoPlataforma = document.querySelector(".logo_plataforma");
    logoPlataforma.style.opacity = 0;

    progressoTelaCadastro.style.transition = "2.5s";

    setTimeout(function(){
        window.location.href = 'pagePlataforma/plataforma.html';
    }, 2500);
})



//--------------------------------------------------------------------------------------------------------------------------------------------


// CORES PARA O PERFIL =>

    var tema1ParaPerfil = [
        getComputedStyle(document.documentElement).getPropertyValue('--cor-perfil-1'),
        getComputedStyle(document.documentElement).getPropertyValue('--cor-perfil-2'),
        getComputedStyle(document.documentElement).getPropertyValue('--cor-perfil-3'),
        getComputedStyle(document.documentElement).getPropertyValue('--cor-perfil-4'),
        getComputedStyle(document.documentElement).getPropertyValue('--cor-perfil-5'),
    ];

    var corFundoPerfil = document.querySelector('.perfil_user');

    // Cor de fundo do perfil padrão =>

        corFundoPerfil.style.background = `${tema1ParaPerfil[0]}`;

    //

    // Alteração da cor de fundo do perfil =>

        // Definindo o "value" dos inputs "radio" para as tema1 de perfil =>
            for (var i = 1; i <= 5; i++) {
                    document.querySelector("#bt_cor_"+i).value = `${tema1ParaPerfil[i-1]}`;
            }
        //

        document.querySelectorAll(".bt_cor_cad").forEach(function(bt) {
            bt.addEventListener("click", function(event) {
                event.preventDefault();
                for (var i = 1; i <= 5; i++) {
                    if (document.querySelector("#bt_cor_"+i).contains(bt)) {
                        corFundoPerfil.style.background = `${tema1ParaPerfil[i-1]}`;
                    }
                }
            })
        })

    //

//