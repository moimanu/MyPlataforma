if (!localStorage.getItem("userName")) {
    var loading = document.querySelector("#loading")
    loading.style.display = "flex";
    setTimeout(function(){
        window.location.href = '../index.html';
    }, 2000)
}

// Corrigindo altura do vh =>

    function atualizarVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    window.addEventListener('load', atualizarVH);
    window.addEventListener('resize', atualizarVH);

//

// CABECALHO E MENU

    // Conteúdos para a area_menu =>

        var info = `
            <h1>Informações gerais</h1>
            <div class="box_area_menu">
                <h2>A plataforma de estudos tem essa cara!</h2>
                <p>A temática é genérica, pois a intenção do projeto foi a de criar um sistema que funcionasse como uma plataforma de estudos.</p>
            </div>
            <div class="box_area_menu">
                <h2>Status</h2>
                <p>• Pode-se observar que, em cada módulo, tem-se um status referente à visualização do material, assim você não se perde no caminho.</p>
            </div>
            <div class="box_area_menu">
                <h2>Módulos</h2>
                <p>• Selecione um dos blocos para continuar... Você poderá visualizar o resumo do que te espera!</p>
                <p>• Cada um dos conteúdos possui uma cor temática, o que vai facilitar a sua localização pelo site.</p>
            </div>
            <div class="box_area_menu">
                <h2>Progresso</h2>
                <p>• Você pode conferir o seu progresso no seu perfil.</p>
                <p>Dito isso, bons estudos!</p>
            </div>
        `;

        var creditos = `
            <h1>Créditos</h1>
            <div class="box_area_menu">
                <h2>Sobre a criação do site:</h2>
                <p>A plataforma de estudos foi inteiramente criada por Moisés Emanuel, Tecnólogo em Design Gráfico e Bacharelando em Sistemas de Informação.</p>
                <div id="perfil_creditos">
                    <img src="https://media.licdn.com/dms/image/D4D03AQEuYhK0jzFjNw/profile-displayphoto-shrink_100_100/0/1713390631788?e=1727913600&v=beta&t=B5FP68yf-3jKz2F8eQ4WKX-n3RpPt9CEVklo3IvHFHU">
                    <p>Moisés Emanuel</p>
                </div>
            </div>
            <div class="box_area_menu">
                <a href="">Repositório do projeto</a>
            </div>
            <div class="box_area_menu">
                <a href="https://linkedin.com/in/moisesemanuel/">LinkedIn</a>
            </div>
            <div class="box_area_menu">
                <a href="https://www.instagram.com/moisesemanuel.rc/">Instagram</a>
            </div>
            <div class="box_area_menu">
                <a href="https://github.com/moimanu">GitHub</a>
            </div>
            <div class="box_area_menu">
                <a href="https://moisesemanuel.vercel.app/">Meu portfolio</a>
            </div>
        `;

        var plus = `
            <h1>Plataforma Plus</h1>
            <div class="box_area_menu">
                <p>Em breve, novos projetos chegarão à plataforma...</p>
            </div>
            <div class="box_area_menu">
                <h2>Novos cursos e treinamentos...</h2>
                <p>Mantenha-se atualizado sobre as novidades por aqui na Plataforma!</p>
            </div>
        `;

        var perfil = `
            <h1>Meu perfil</h1>
            <div class="box_area_menu box_area_menu_perfil">
                <div class="perfil_user">
                    <div class="fundo_perfil_user">
                        <img src="../img/icones/perfil.png">
                    </div>
                </div>
                <h3 class="nome_perfil_user"></h3>
            </div>
            <div class="box_area_menu box_progresso_total">
                <p id="legenda_porcentagem">Progresso total do curso base: 0%</p>
                <div class="barra_progresso_total">
                    <div class="preenchimento_progresso_total"></div>
                </div>
            </div>
            <button id='apagar_local_storage' onClick="apagarLocalStorage()">Apagar LocalStorage</button>
        `;

        var conteudoAreaMenu = ["" , info, plus, creditos, perfil];

    //

    // Variáveis do menu =>

        var btNavegacao = document.querySelectorAll(".bt_nav");
        var areaMenu = document.querySelector(".area_menu");
        var containerAreaMenu = document.querySelector("#container_area_menu");
        var menuAcionado = false;
        
        // Botões da navegação =>

            var btNavModulos = document.querySelector("#bt_nav_modulos");
            var btNavInfo = document.querySelector("#bt_nav_info");
            var btNavplus = document.querySelector("#bt_nav_plus");
            var btNavCreditos = document.querySelector("#bt_nav_creditos");
            var btNavPerfil = document.querySelector("#bt_nav_perfil");
    
            var botoesNav = [btNavModulos, btNavInfo, btNavplus, btNavCreditos, btNavPerfil];
        //
    
    //

    // Função para movimentar menu =>

        function movimentarMenu (transitionTime, translateMaiorQue1024, translateMaiorQue550, translateBase) {
            areaMenu.style.transition = transitionTime;
            if (window.innerWidth > 1024) {
                areaMenu.style.transform = translateMaiorQue1024;
            } else if (window.innerWidth > 550) {
                areaMenu.style.transform = translateMaiorQue550;
            } else {
                areaMenu.style.transform = translateBase;
            }
        }

    //

    // Função para alterar o conteúdo do menu e alterar o status "selecionado" dos botões =>

        function alterarConteudoMenu (bt) {

            for (let i = 0; i < botoesNav.length; i++) {

                if (bt == botoesNav[0]) { // <= Condição para que o botão módulo apenas retire o menu
                    movimentarMenu ("0.3s", "translate(300px, -110%)", "translate(100px, -110%)", "translate(110%, 70px)");
                    botoesNav[i].style.filter = "invert(1)";
                    menuAcionado = false;

                } else if (bt == botoesNav[i]) {
                    bt.style.background = "black";
                    bt.style.filter = "invert(1)";
                    containerAreaMenu.style.opacity = "0%";
                    setTimeout(function(){
                        movimentarMenu ("1s", "translate(300px, 0px)", "translate(100px, 0px)", "translate(0px, 70px)");
                        containerAreaMenu.innerHTML = conteudoAreaMenu[i];
                        containerAreaMenu.style.opacity = "100%";

                        // Código para alterar a cor do fundo do perfil

                            var corFundoPerfil = document.querySelector(".fundo_perfil_user");
                            var nomePerfil = document.querySelector(".nome_perfil_user");
                            
                            if (corFundoPerfil) {
                                if (localStorage.getItem("corDoPerfil")) {
                                    corFundoPerfil.style.backgroundColor = `${localStorage.getItem("corDoPerfil")}`;
                                    nomePerfil.textContent = localStorage.getItem("userName")
                                }
                            }

                        //

                        // Código para atualizar o valor da legenda do progresso total
                    
                            var legendaProgressoTotal =  document.querySelector("#legenda_porcentagem");
                            if (legendaProgressoTotal) {
                                legendaProgressoTotal.textContent = `Progresso total do curso base (${parseInt(progressoTotal)}%)`;
                            }
                        
                        //

                    }, 300)
                    menuAcionado = true;
                }

                if (bt != botoesNav[i]) { // <= Condição para que os outros botões voltem ao normal
                    botoesNav[i].style.background = "transparent";
                    bt.style.background = "black";
                    botoesNav[i].style.filter = "invert(0)";
                }
            }
        }

    //

    btNavegacao.forEach(function (bt) { // <= Específico para cada id dos botões
        bt.addEventListener("click", function() {
            movimentarMenu ("1s","translate(300px, 0px)", "translate(100px, 0px)", "translate(0px, 70px)");
            alterarConteudoMenu(bt);
        })
    })

    window.addEventListener('resize', function() { // <= Correção para o menu não aparecer durante a responsividade
        if (menuAcionado) {
            movimentarMenu ("0s", "translate(300px, 0px)", "translate(100px, 0px)", "translate(0px, 70px)");
        } else {
            movimentarMenu ("0s", "translate(300px, -110%)", "translate(100px, -110%)", "translate(110%, 70px)");
        }
    })

// FIM - CABECALHO E MENU


/*------------------------------------------------------------------------------------------------------------------------------------------*/


// INTERAÇÃO COM OS MÓDULOS DE ESTUDO

    // Conteúdos para o container_area_3 =>

        var cTema1 = `
            <div class="divisoria_box_area3 cabecalho_box_area3">
                <div class="capa_modulo"></div>
                <div class="titulo_cabecalho_box_area3">
                    <h1>Tema1</h1>
                    <p>Subtítulo</p>
                </div>
            </div>
                      
            <div class="divisoria_box_area3">Aqui vai um texto resumindo o conteúdo do módulo tema1.</div>

            <div class="informacoes_do_modulo">
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/relogio.png">
                    <p>Duração: 8h</p>
                </div>
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/play.png">
                    <p id="qntd_aulas">Aulas: 10</p>
                </div>
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/check.png">
                    <p>Gratuito</p>
                </div>
                <button id="bt_acessar_modulo" class="item_informacoes_do_modulo">Acessar</button>
            </div>
            
            <ul class="lista_conteudo_modulo">
                <li class="item_aula_conteudo">
                    <p>Aula 1</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 2</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 3</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 4</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
            </ul>
        `;

        var cTema2 = `
            <div class="divisoria_box_area3 cabecalho_box_area3">
                <div class="capa_modulo"></div>
                <div class="titulo_cabecalho_box_area3">
                    <h1>Tema2</h1>
                    <p>Subtítulo</p>
                </div>
            </div>

            <div class="divisoria_box_area3">Aqui vai um texto resumindo o conteúdo do módulo tema2.</div>

            <div class="informacoes_do_modulo">
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/relogio.png">
                    <p>Duração: 8h</p>
                </div>
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/play.png"">
                    <p id="qntd_aulas">Aulas: 10</p>
                </div>
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/check.png">
                    <p>Gratuito</p>
                </div>
                <button id="bt_acessar_modulo" class="item_informacoes_do_modulo">Acessar</button>
            </div>
            
            <ul class="lista_conteudo_modulo">
                <li class="item_aula_conteudo">
                    <p>Aula 1</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 2</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 3</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 4</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 5</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>        
            </ul>
        `;

        var cTema3 = `
            <div class="divisoria_box_area3 cabecalho_box_area3">
                <div class="capa_modulo"></div>
                <div class="titulo_cabecalho_box_area3">
                    <h1>Tema3</h1>
                    <p>Subtítulo</p>
                </div>
            </div>

            <div class="divisoria_box_area3">Aqui vai um texto resumindo o conteúdo do módulo tema3.</div>

            <div class="informacoes_do_modulo">
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/relogio.png">
                    <p>Duração: 8h</p>
                </div>
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/play.png">
                    <p id="qntd_aulas">Aulas: 10</p>
                </div>
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/check.png">
                    <p>Gratuito</p>
                </div>
                <button id="bt_acessar_modulo" class="item_informacoes_do_modulo">Acessar</button>
            </div>
            
            <ul class="lista_conteudo_modulo">
                <li class="item_aula_conteudo">
                    <p>Aula 1</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 2</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 3</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 4</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 5</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
            </ul>
        `;

        var cTema4 = `
            <div class="divisoria_box_area3 cabecalho_box_area3">
                <div class="capa_modulo"></div>
                <div class="titulo_cabecalho_box_area3">
                    <h1>Tema4</h1>
                    <p>Subtítulo</p>
                </div>
            </div>

            <div class="divisoria_box_area3">Aqui vai um texto resumindo o conteúdo do módulo tema4.</div>

            <div class="informacoes_do_modulo">
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/relogio.png">
                    <p>Duração: 8h</p>
                </div>
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/play.png">
                    <p id="qntd_aulas">Aulas: 10</p>
                </div>
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/check.png">
                    <p>Gratuito</p>
                </div>
                <button id="bt_acessar_modulo" class="item_informacoes_do_modulo">Acessar</button>
            </div>
            
            <ul class="lista_conteudo_modulo">
                <li class="item_aula_conteudo">
                    <p>Aula 1</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 2</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 3</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 4</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
            </ul>
        `;

        var cTema5 = `
            <div class="divisoria_box_area3 cabecalho_box_area3">
                <div class="capa_modulo"></div>
                <div class="titulo_cabecalho_box_area3">
                    <h1>Tema5</h1>
                    <p>Subtítulo</p>
                </div>
            </div>

            <div class="divisoria_box_area3">Aqui vai um texto resumindo o conteúdo do módulo tema5.</div>

            <div class="informacoes_do_modulo">
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/relogio.png">
                    <p>Duração: 8h</p>
                </div>
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/play.png">
                    <p id="qntd_aulas">Aulas: 10</p>
                </div>
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/check.png">
                    <p>Gratuito</p>
                </div>
                <button id="bt_acessar_modulo" class="item_informacoes_do_modulo">Acessar</button>
            </div>
            
            <ul class="lista_conteudo_modulo">
                <li class="item_aula_conteudo">
                    <p>Aula 1</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 2</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 3</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 4</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 5</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
            </ul>
        `;

        var cTema6 = `
            <div class="divisoria_box_area3 cabecalho_box_area3">
                <div class="capa_modulo"></div>
                <div class="titulo_cabecalho_box_area3">
                    <h1>Tema6</h1>
                    <p>Subtítulo</p>
                </div>
            </div>

            <div class="divisoria_box_area3">Aqui vai um texto resumindo o conteúdo do módulo tema6.</div>

            <div class="informacoes_do_modulo">
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/relogio.png">
                    <p>Duração: 8h</p>
                </div>
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/play.png">
                    <p id="qntd_aulas">Aulas: 10</p>
                </div>
                <div class="item_informacoes_do_modulo">
                    <img src="../img/icones/check.png">
                    <p>Gratuito</p>
                </div>
                <button id="bt_acessar_modulo" class="item_informacoes_do_modulo">Acessar</button>
            </div>
            
            <ul class="lista_conteudo_modulo">
                <li class="item_aula_conteudo">
                    <p>Aula 1</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 2</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 3</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
                <li class="item_aula_conteudo">
                    <p>Aula 4</p>
                    <img src="../img/icones/checkSF.png" class="status_item_aula_conteudo">
                </li>
            </ul>
        `;

        var conteudoboxArea3 = [cTema1, cTema2, cTema3, cTema4, cTema5, cTema6];

    //

    // Botões módulo =>

        var btModTema1 = document.querySelector("#btm1");
        var btModTema2 = document.querySelector("#btm2");
        var btModTema3 = document.querySelector("#btm3");
        var btModTema4 = document.querySelector("#btm4");
        var btModTema5 = document.querySelector("#btm5");
        var btModTema6 = document.querySelector("#btm6");

        var botoesModulo = [btModTema1, btModTema2, btModTema3, btModTema4, btModTema5, btModTema6];
    
    //

    // Tema1 temáticas =>

        let tema1 = [
            getComputedStyle(document.documentElement).getPropertyValue('--tema-tema1'),
            getComputedStyle(document.documentElement).getPropertyValue('--tema-tema2'),
            getComputedStyle(document.documentElement).getPropertyValue('--tema-tema3'),
            getComputedStyle(document.documentElement).getPropertyValue('--tema-tema4'),
            getComputedStyle(document.documentElement).getPropertyValue('--tema-tema5'),
            getComputedStyle(document.documentElement).getPropertyValue('--tema-tema6'),
        ];

    //

    //Função para movimentar area3 =>

        var area3 = document.querySelector(".area3");
        var area3Acionado = false;

        function movimentarArea3 (transitionTime, translateMenorQue1500, translateMenorQue550) {
            area3.style.transition = transitionTime;
            if (window.innerWidth > 1500) {
                area3.style.transition = "0s";
                area3.style.transform = "translate(0%, 0px)";
            } else if (window.innerWidth > 550) {
                area3.style.transform = translateMenorQue1500;
            } else {
                area3.style.transform = translateMenorQue550;
            }
            area3Acionado = true;
        }

    //

    // Função para alterar o conteúdo do box_area_3 =>

        var containerArea3 = document.querySelector(".container_area3");
        var boxArea3 = document.querySelector(".box_area3");

        function alterarConteudoArea3 (bt) {

            for (let i = 0; i < botoesModulo.length; i++) {

                if (bt == botoesModulo[i]) {
                    boxArea3.innerHTML = conteudoboxArea3[i];
                    containerArea3.style.borderTop = `20px solid ${tema1[i]}`;

                    setTimeout(function() {
                        var listaAulas = document.querySelectorAll(".lista_conteudo_modulo li");
                        var qntdAulas = document.querySelector("#qntd_aulas");

                        qntdAulas.textContent = `Aulas: ${listaAulas.length}`;

                        var capaModulo = document.querySelector(".capa_modulo");
                        var btAcessarModulo = document.querySelector("#bt_acessar_modulo");
                        btAcessarModulo.style.backgroundColor = tema1[i];

                        // Código para alterar o status_item_aula_conteudo

                            var nomeDoModuloAtual = document.querySelector(".titulo_cabecalho_box_area3 h1").textContent;
                            var listaProgresso = JSON.parse(localStorage.getItem(`progressoModulo${nomeDoModuloAtual}`)) || [];
                            var textoItemAulaConteudo = document.querySelectorAll(".item_aula_conteudo p");
                            var statusItemAulaConteudo = document.querySelectorAll(".status_item_aula_conteudo");

                            textoItemAulaConteudo.forEach(function (texto) {
                                if (listaProgresso[parseInt(texto.textContent[5]) - 1] == true) {
                                    statusItemAulaConteudo[parseInt(texto.textContent[5]) - 1].style.display = "block";
                                    statusItemAulaConteudo[parseInt(texto.textContent[5]) - 1].style.backgroundColor = tema1[i];
                                }
                            })
                        
                        //
        
                        // CÓDIGO PARA IR ATÉ A PÁGINA DE AULAS DO MÓDULO

                            var tituloBoxArea3 = document.querySelector(".titulo_cabecalho_box_area3 h1");

                            btAcessarModulo.addEventListener("click", function() {
                                window.location.href = `modulosPages/${tituloBoxArea3.textContent.split(' ')[0].toLowerCase()}Mod/aula1.html`;
                            });
                            
                        //

                    }, 0);
                }

            }
        }
    
    //

    var btModulo = document.querySelectorAll(".button_modulo");

    btModulo.forEach(function(bt) {

        bt.addEventListener("click", function() {

            // Animação de preenchimento com a bolinha_tematica =>

                // Código para desfazer a animação dos outros botões módulos =>

                    document.querySelectorAll(".bolinha_tematica_bt").forEach(function(outras_bolinhas){
                        if (window.innerWidth > 1024) {
                            outras_bolinhas.style.top = "20px";
                            outras_bolinhas.style.right = "20px";
                        } else {
                            outras_bolinhas.style.top = "10px";
                            outras_bolinhas.style.right = "10px";
                        }
                        
                        outras_bolinhas.style.width = "20px";
                        outras_bolinhas.style.height = "20px";
                        outras_bolinhas.style.borderRadius = "100px";
                    });

                //

                document.querySelectorAll(".titulo_button_modulo").forEach(function(outros_titulos){
                    outros_titulos.style.color ="var(--cor-da-fonte-principal)"; // Aqui, todos os botões assumem color var(--cor-da-fonte-principal), mas, a seguir, apenas o selecionado assume color black
                });

                for (var i = 1; i <= 6; i++) {

                    if (document.querySelector("#btm"+i) == bt) {
                        
                        var tituloBtModulo = document.querySelector(`#btm${i} .titulo_button_modulo`)
                        var bolinhaTematicaRelativa = document.querySelector(`#btm${i} .bolinha_tematica_bt`);

                        tituloBtModulo.style.color  = "black";
                        bolinhaTematicaRelativa.style.height = "100%";
                        bolinhaTematicaRelativa.style.width = "100%";
                        bolinhaTematicaRelativa.style.top = "0px";
                        bolinhaTematicaRelativa.style.right = "0px";
                        bolinhaTematicaRelativa.style.borderRadius = "10px";
                    } 
                }
            //
        
            alterarConteudoArea3 (bt);
            setTimeout (function () {
                movimentarArea3 ("1s", "translate(0%, 0px)", "translate(0%, 0px)");
                area3Acionado = true;
            }, 400)
            
        })
    })

    var btFecharArea3 = document.querySelector(".fechar_area3");
    btFecharArea3.addEventListener("click", function() {
        movimentarArea3 ("1s", "translate(100%, 0px)", "translate(0px, 100%)");
        area3Acionado = false;
    })

    window.addEventListener('resize', function() { // <= Correção para a area3 não aparecer durante a responsividade
        if (area3Acionado) {
            movimentarArea3 ("0s", "translate(0px, 0px)", "translate(0px, 0px)");
        } else {
            movimentarArea3 ("0s", "translate(100%, 0px)", "translate(0px, 100%)");
            area3Acionado = false;
        }
    })

// FIM - INTERAÇÃO COM OS MÓDULOS DE ESTUDO 


/*------------------------------------------------------------------------------------------------------------------------------------------*/


// CÓDIGO PARA ATUALIZAR O NOME DE PERFIL 

    var textoBtNavPerfil = document.querySelector("#bt_nav_perfil p");
    if (localStorage.getItem("userName")) {
        textoBtNavPerfil.textContent = localStorage.getItem("userName");
    }

// FIM - CÓDIGO PARA ATUALIZAR O NOME DE PERFIL 


/*------------------------------------------------------------------------------------------------------------------------------------------*/


// CÓDIGO PARA APAGAR O LOCALSTORAGE
  
    function apagarLocalStorage () {
        localStorage.clear();
        window.location.href = '../index.html';
    }
            
// FIM - CÓDIGO PARA APAGAR O LOCALSTORAGE


/*------------------------------------------------------------------------------------------------------------------------------------------*/


// CÓDIGO PARA ATUALIZAR O STATUS DO MÓDULO, DE ACORDO COM O PROGRESSO

    var arrayDeTitulosDosModulos = [];
    document.querySelectorAll(".titulo_button_modulo").forEach(function(titulo){
        arrayDeTitulosDosModulos.push(titulo.textContent);
    })

    arrayDeTitulosDosModulos.forEach(function(titulo){

        var localStorageProgressoModulo = localStorage.getItem(`progressoModulo${titulo}`) || "[]"; // <- Array paleativa (excluir depois)
        var arraylocalStorageProgressoModulo = JSON.parse(localStorageProgressoModulo)              //
                                                                                                    //
        // Conferir se o status deve ser "cursando"                                                 //
            if (localStorageProgressoModulo && localStorageProgressoModulo != "[]") { // <----------//
                let statusAMudar = document.querySelector(`#btm${arrayDeTitulosDosModulos.indexOf(titulo) + 1} .status_modulo`);
                statusAMudar.textContent = "Cursando";
                statusAMudar.style.backgroundColor = "transparent";
                statusAMudar.style.fontWeight = "bold";
                statusAMudar.style.border = "1px solid";
            }
        //

        // Conferir se o status é concluído
            function conferirProgressoModulo(aula) {
                return aula;
            }

            if (arraylocalStorageProgressoModulo.every(conferirProgressoModulo) && localStorage.getItem(`progressoModulo${titulo}`)) {
                let statusAMudar = document.querySelector(`#btm${arrayDeTitulosDosModulos.indexOf(titulo) + 1} .status_modulo`);
                statusAMudar.textContent = "Concluído";
                statusAMudar.style.backgroundColor = "white";
                statusAMudar.style.color = "black";
                statusAMudar.style.fontWeight = "bold";
            }
        //
    })

//


/*------------------------------------------------------------------------------------------------------------------------------------------*/


// CONTABILIZANDO O PROGRESSO TOTAL

    var aulasCursadas = 0;
    var aulasTotais = 24;

    for (let i = 0; i < 6; i++) {
        var arrayAtual = JSON.parse(localStorage.getItem(`progressoModulo${arrayDeTitulosDosModulos[i]}`));
        
        if (arrayAtual) {
            arrayAtual.forEach(function(item){
                if (item == true) {
                    aulasCursadas += 1;
                }
            })
        }
          
    }

    var progressoTotal = (aulasCursadas / aulasTotais) * 100;

    document.documentElement.style.setProperty('--progresso-total', `${progressoTotal}%`);

    // Cor da barra de progresso =>

        document.documentElement.style.setProperty('--cor-tema-atual', localStorage.getItem("corDoPerfil"));

//
