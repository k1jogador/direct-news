"use strict";

// Função que retorna um número aleatório entre 0 e o valor máximo especificado (não inclusivo)
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
} // Função assíncrona para buscar e carregar as notícias principais (capa)


function carregarNoticias() {
  var apiURl, response, data, noticias, listaContainerNoticias;
  return regeneratorRuntime.async(function carregarNoticias$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          apiURl = "https://newsapi.org/v2/everything?language=pt&q=Em%20alta&sortBy=publishedAt&apiKey=656ebdeedcd04481ac7e9cc2a32de2f9"; // Faz uma requisição HTTP para a API de notícias usando a função fetch e armazena a resposta na variável "response"

          _context.next = 4;
          return regeneratorRuntime.awrap(fetch(apiURl));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          // Extrai a array "articles" do objeto JSON e armazena na variável "noticias"
          noticias = data.articles; // Seleciona os elementos filhos de #tabela-noticias (containers das notícias da capa) e os converte para um array

          listaContainerNoticias = Array.from(document.querySelector("#tabela-noticias").children);
          noticias.forEach(function (element) {
            if (element.title == "null" || element.title == "Removed") {
              console.log(element.title);
              noticias.splice(noticias.indexOf(element), 1);
            }
          }); // Itera sobre cada elemento do array "listaContainerNoticias"

          listaContainerNoticias.forEach(function (element) {
            // Gera um índice aleatório para selecionar uma notícia
            var indice = getRandomInt(noticias.length); // Define a imagem de fundo do elemento atual com a URL da imagem da notícia selecionada

            element.style.backgroundImage = "url(\"".concat(noticias[indice].urlToImage, "\")"); // Define o texto do primeiro filho do elemento atual (h1) com o título da notícia selecionada

            element.firstElementChild.textContent = noticias[indice].title; // Adiciona um monitor de evento de clique ao elemento, que abrirá a URL da notícia em uma nova aba

            element.addEventListener("click", function () {
              window.open(noticias[indice].url); // REQUISITO "Tratamento de eventos, como eventos de teclado, mouse e formulários" ATENDIDO
            });
          });
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          // Caso ocorra algum erro durante a requisição ou manipulação dos dados, exibe o erro no console
          console.error("Erro ao buscar notícias:", _context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
} // Chama a função para carregar as notícias assim que o código é executado


carregarNoticias(); // Obtém a referência ao formulário de pesquisa pelo seu ID

var formPesquisar = document.getElementById("formPesquisar"); // Obtém a referência ao campo de entrada de texto pelo seu ID

var inputPesquisar = document.getElementById("inputPesquisar"); // Adiciona um monitor de evento para o envio do formulário

formPesquisar.addEventListener("submit", function (event) {
  // REQUISITO "Tratamento de eventos, como eventos de teclado, mouse e formulários" ATENDIDO
  event.preventDefault(); // Impede o comportamento padrão de recarregar a página ao submeter o formulário
  // Verifica se o campo de pesquisa não está vazio

  if (inputPesquisar.value.trim() !== "") {
    // Redireciona o usuário para a página de resultados de pesquisa de noticias, passando o valor da pesquisa na URL
    location.href = "./sources/search.html?".concat(inputPesquisar.value);
  } else {
    // Se o campo estiver vazio, limpa o valor
    inputPesquisar.value = "";
  }
});