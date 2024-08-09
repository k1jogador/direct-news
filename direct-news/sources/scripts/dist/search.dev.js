"use strict";

// Função para obter os parâmetros da URL
function getQueryParams() {
  // Cria um objeto URLSearchParams com os parâmetros de consulta da URL
  var params = new URLSearchParams(window.location.search); // Retorna o objeto com os parâmetros desejados

  return params;
} // Recupera o valor do primeiro parâmetro da URL e armazena na variável 'pesquisado'


var pesquisado = Array.from(getQueryParams())[0][0]; // Obtém as referências aos elementos do DOM

var inputPesquisar = document.getElementById("inputPesquisar");
var formPesquisar = document.getElementById("formPesquisar");
var containerErro = document.getElementById("containerErro");
var containerNoticias = document.getElementById("containerNoticias"); // Define o valor do campo de entrada de texto com o valor pesquisado

inputPesquisar.value = pesquisado; // Adiciona um monitor de evento para o envio do formulário

formPesquisar.addEventListener("submit", function (event) {
  // Impede o comportamento padrão de recarregar a página ao submeter o formulário
  event.preventDefault(); // Verifica se o campo de pesquisa não está vazio

  if (inputPesquisar.value.trim() !== "") {
    // Redireciona o usuário para a página de resultados de pesquisa de notícias, passando o valor da pesquisa na URL
    location.href = "./search.html?".concat(inputPesquisar.value);
  } else {
    // Se o campo estiver vazio, limpa o valor
    inputPesquisar.value = "";
  }
}); // Função assíncrona para carregar as notícias com base no termo pesquisado

function carregarNoticias() {
  var response, data, noticias;
  return regeneratorRuntime.async(function carregarNoticias$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("https://newsapi.org/v2/everything?language=pt&q=".concat(pesquisado, "&sortBy=publishedAt&apiKey=656ebdeedcd04481ac7e9cc2a32de2f9")));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;
          noticias = data.articles; // Filtra as notícias para remover aquelas sem título ou marcadas como "[Removed]"

          noticias.forEach(function (element) {
            if (element.title == null || element.title == "[Removed]") {
              noticias.splice(noticias.indexOf(element), 1);
            }
          });
          console.log(noticias); // Verifica se há notícias disponíveis

          if (noticias.length === 0) {
            // Se não houver notícias, exibe a mensagem de erro
            containerErro.style.display = "flex";
          } else {
            // Se houver notícias, exibe o container de notícias e adiciona cada notícia ao DOM
            containerNoticias.style.display = "flex";
            noticias.forEach(function (noticia) {
              var divNoticia = document.createElement("div");
              divNoticia.id = "divNoticia";
              divNoticia.innerHTML = "\n          <div id=\"textNoticia\">\n            <h2>".concat(noticia.title, "</h2>\n            <h4>").concat(noticia.description, "</h4>\n            <p>").concat(noticia.content, "</p>\n            <button id=\"btnPadrao\" href=\"").concat(noticia.url, "\">Leia mais</button>\n          </div> \n          <div id=\"imgNoticia\"></div>\n        ");
              divNoticia.lastElementChild.style.backgroundImage = "url(\"".concat(noticia.urlToImage, "\")"); // Adiciona evento de clique para expandir/contrair a notícia

              divNoticia.addEventListener("click", function () {
                if (divNoticia.style.height != "150px") {
                  divNoticia.style.height = "150px";
                  divNoticia.firstElementChild.querySelector("p").style.visibility = "hidden";
                  divNoticia.firstElementChild.querySelector("p").style.opacity = "0";
                  divNoticia.firstElementChild.querySelector("button").style.visibility = "hidden";
                  divNoticia.firstElementChild.querySelector("button").style.opacity = "0";
                } else {
                  setarNoticiasNormal();
                  divNoticia.style.height = "350px";
                  divNoticia.firstElementChild.querySelector("p").style.visibility = "visible";
                  divNoticia.firstElementChild.querySelector("p").style.opacity = "1";
                  divNoticia.firstElementChild.querySelector("button").style.visibility = "visible";
                  divNoticia.firstElementChild.querySelector("button").style.opacity = "1";
                }
              }); // Adiciona evento de clique no botão "Leia mais" para abrir o link da notícia em uma nova aba

              divNoticia.firstElementChild.querySelector("button").addEventListener("click", function () {
                window.open(noticia.url);
              }); // Esconde o conteúdo adicional e o botão "Leia mais" inicialmente

              divNoticia.firstElementChild.querySelector("p").style.visibility = "hidden";
              divNoticia.firstElementChild.querySelector("p").style.opacity = "0";
              divNoticia.firstElementChild.querySelector("button").style.visibility = "hidden";
              divNoticia.firstElementChild.querySelector("button").style.opacity = "0"; // Adiciona a notícia ao container de notícias

              containerNoticias.appendChild(divNoticia);
            });
          }

          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          // Caso ocorra algum erro durante a requisição, exibe o erro no console
          console.error("Erro ao buscar notícias:", _context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
} // Chama a função para carregar as notícias assim que o código é executado


carregarNoticias(); // Função para redefinir todas as notícias ao estado original (altura contraída)

function setarNoticiasNormal() {
  var nodes = document.querySelectorAll("#divNoticia");
  nodes.forEach(function (element) {
    element.style.height = "150px";
    element.firstElementChild.querySelector("p").style.visibility = "hidden";
    element.firstElementChild.querySelector("p").style.opacity = "0";
    element.firstElementChild.querySelector("button").style.visibility = "hidden";
    element.firstElementChild.querySelector("button").style.opacity = "0";
  });
}