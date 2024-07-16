// Corrigindo altura do vh =>

    function atualizarVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    window.addEventListener('load', atualizarVH);
    window.addEventListener('resize', atualizarVH);

//

// RECONHECENDO A PÁGINA ATUAL (para alterar a variável "--tema" para a respectiva cor do módulo) =>

    var nomeDaPaginaAtual = document.title.split(' ')[0];
    document.documentElement.style.setProperty('--cor-da-pagina-atual', `${getComputedStyle(document.documentElement).getPropertyValue(`--tema-${nomeDaPaginaAtual.toLowerCase()}`)}`);

//

// ABRIR NAV MÓDULO

    var btPuxarNavModulo = document.querySelector("#bt_puxar_nav_aulas");
    var btPuxarNavModuloTexto = document.querySelector("#bt_puxar_nav_aulas p");
    var areaNavAulas = document.querySelector(".area_nav_aulas");
    var areaConteudoAulas = document.querySelector(".area_conteudo_aulas");
    var btAcionado = false;

    btPuxarNavModulo.addEventListener("click", function() {
        areaConteudoAulas.style.transition = "1s";
        areaNavAulas.style.transition = "1s";
        if (!btAcionado) {
            if (window.innerWidth < 800 && window.innerWidth > 550) {
                areaNavAulas.style.transform = "translateX(0%)";
                areaConteudoAulas.style.transform = "translate(300px)";
                btPuxarNavModuloTexto.textContent = "Fechar";
            } else if (window.innerWidth < 550) {
                areaNavAulas.style.transform = "translateX(0%)";
                areaConteudoAulas.style.transform = "translate(100%)";
            }
            btAcionado = true;
        } else {
            if (window.innerWidth < 800 && window.innerWidth > 550) {
                areaNavAulas.style.transform = "translateX(-100%)";
                areaConteudoAulas.style.transform = "translate(0px)";
                btPuxarNavModuloTexto.textContent = "Tópicos";
            } else if (window.innerWidth < 550) {
                areaNavAulas.style.transform = "translateX(-100%)";
                areaConteudoAulas.style.transform = "translate(0%)";
            }
            btAcionado = false;
        }
        
    });

    window.addEventListener('resize', function() { 
        btPuxarNavModuloTexto.textContent = "Tópicos";
        areaConteudoAulas.style.transition = "0s";
        areaNavAulas.style.transition = "0s";
        if (window.innerWidth > 800) {
            areaNavAulas.style.transform = "translateX(0%)";
        } else {
            areaNavAulas.style.transform = "translateX(-100%)";
        }
        areaConteudoAulas.style.transform = "translate(0%)";
        btAcionado = false;
    })
    
//

// FECHAR NAV MÓDULO

    var btPuxarNavModulo = document.querySelector("#bt_fechar_nav_aulas");

    btPuxarNavModulo.addEventListener("click", function() {
        btPuxarNavModuloTexto.textContent = "Tópicos";
        if (window.innerWidth < 800 && window.innerWidth > 550) {
            areaNavAulas.style.transform = "translateX(-100%)";
            areaConteudoAulas.style.transform = "translate(0px)";
        } else if (window.innerWidth < 550) {
            areaNavAulas.style.transform = "translateX(-100%)";
            areaConteudoAulas.style.transform = "translate(0%)";
        }
        btAcionado = false;
    });
//

// PROSSEGUIR AULA

    var titlePag = document.title;
    
    var listaDeAncoras = document.querySelectorAll(".lista_nav_aulas li");
    var qntdItensListaAncoras = listaDeAncoras.length - 1;
    var listaProgressoInicial = []; 
    for (var i = 0; i < qntdItensListaAncoras; i++) {
        listaProgressoInicial.push(false);
    };
    var listaProgresso = JSON.parse(localStorage.getItem(`progressoModulo${nomeDaPaginaAtual}`)) || listaProgressoInicial;


    // Definindo barra de progresso do módulo => 

        var preenchimentoProgressoAulas = document.querySelector(".preenchimento_progresso_aulas");
        var aulasAssistidas = JSON.parse(localStorage.getItem(`aulasAssistidas${nomeDaPaginaAtual}`)) || 0;
        var porcentagemAssistida = (aulasAssistidas / listaProgresso.length) * 100;
        preenchimentoProgressoAulas.style.width = `${porcentagemAssistida}%`;

    //

    var btProsseguir = document.querySelector(".prosseguir_aula");
    btProsseguir.addEventListener("click", function() {
        
        for (var i = 0; i < qntdItensListaAncoras; i++) {
            if (titlePag[titlePag.length - 1] == (i + 1).toString()) {
                listaProgresso[i] = true;
                localStorage.setItem(`progressoModulo${nomeDaPaginaAtual}`, JSON.stringify(listaProgresso));
            }
        }

        // Atualizando barra de progresso do módulo => 

            aulasAssistidas = 0;
            listaProgresso.forEach(function (item) {
                if (item == true) {
                    aulasAssistidas += 1;
                }
            })
            localStorage.setItem(`aulasAssistidas${nomeDaPaginaAtual}`, JSON.stringify(aulasAssistidas));
            var porcentagemAssistida = (aulasAssistidas / listaProgresso.length) * 100;
            preenchimentoProgressoAulas.style.transition = "1s";
            preenchimentoProgressoAulas.style.filter = "brightness(1.4)";
            preenchimentoProgressoAulas.style.width = `${porcentagemAssistida}%`;
        
        //

            let faltaAula = listaProgresso.some(aula => aula == false);

            if (!localStorage.getItem(`conclusaoModulo${nomeDaPaginaAtual}`)) {
                setTimeout (function(){

                    if (!faltaAula) {
                        window.location.href = "../conclusao.html";
                        localStorage.setItem(`conclusaoModulo${nomeDaPaginaAtual}`, true);
                    } else if (titlePag[titlePag.length - 1] < qntdItensListaAncoras) {
                        window.location.href = `aula${parseInt(titlePag[titlePag.length - 1]) + 1}.html`;
                    } else {
        
                        let progressoLinear = listaProgresso.findIndex(aula => aula == false);
        
                        if (!faltaAula) {
                            window.location.href = "../conclusao.html";
                            localStorage.setItem(`conclusaoModulo${nomeDaPaginaAtual}`, true);
                        } else {
                            window.location.href = `aula${progressoLinear + 1}.html`
                        }
        
                    }

                },1000)

            } else {
                if (titlePag[titlePag.length - 1] < qntdItensListaAncoras) {
                    window.location.href = `aula${parseInt(titlePag[titlePag.length - 1]) + 1}.html`;
                } else {
                    window.location.href = "../../plataforma.html";
                }
            }
            

    });

    // Código para alterar o status_ancora_nav_aulas

        var textoAncoraNavAulas = document.querySelectorAll(".ancora_nav_aulas p");
        var statusAncoraNavAulas = document.querySelectorAll(".status_ancora_nav_aulas");

        textoAncoraNavAulas.forEach(function (texto) {
            if (listaProgresso[parseInt(texto.textContent[5]) - 1] == true) {
                statusAncoraNavAulas[parseInt(texto.textContent[5]) - 1].style.display = "block";
            }

            // DEFININDO O TÍTULO DO CONTEUDO DA AULA

                var tituloDoConteudo = document.querySelector("#titulo_conteudo_aula");
                tituloDoConteudo.textContent = titlePag;

            //
        })
    
    //

    // Código para alterar o selecionado do ancora_nav_aulas

        var ancoraNavAulas = document.querySelectorAll(".ancora_nav_aulas");
        ancoraNavAulas[titlePag[titlePag.length - 1]].style.backdropFilter = "brightness(2)";

    //

//