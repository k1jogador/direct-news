// Função que retorna um número aleatório entre 0 e o valor máximo especificado (não inclusivo)
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Função assíncrona para buscar e carregar as notícias principais (capa)
async function carregarNoticias() {
  try {
    const apiURl =
      "https://newsapi.org/v2/everything?q=governo%20OR%20esporte%20OR%20em%20alta&language=pt&apiKey=656ebdeedcd04481ac7e9cc2a32de2f9";

    // Faz uma requisição HTTP para a API de notícias usando a função fetch e armazena a resposta na variável "response"
    const response = await fetch(apiURl);

    // REQUISITO "Integração com APIs externas para buscar e exibir informações dinâmicas no website" ATENDIDO

    // Converte a resposta da API para um objeto JSON e armazena na variável "data"
    const data = await response.json();

    // Extrai a array "articles" do objeto JSON e armazena na variável "noticias"
    let noticias = data.articles;

    // Seleciona os elementos filhos de #tabela-noticias (containers das notícias da capa) e os converte para um array
    const listaContainerNoticias = Array.from(
      document.querySelector("#tabela-noticias").children
    );

    noticias.forEach(element => {
      if (element.title == null || element.title == "[Removed]") {
        noticias.splice(noticias.indexOf(element), 1);
      }
    });

    // Itera sobre cada elemento do array "listaContainerNoticias"
    listaContainerNoticias.forEach((element) => {
      // Gera um índice aleatório para selecionar uma notícia
      let indice = getRandomInt(noticias.length);

      // Define a imagem de fundo do elemento atual com a URL da imagem da notícia selecionada
      element.style.backgroundImage = `url("${noticias[indice].urlToImage}")`;

      // Define o texto do primeiro filho do elemento atual (h1) com o título da notícia selecionada
      element.firstElementChild.textContent = noticias[indice].title;

      // Adiciona um monitor de evento de clique ao elemento, que abrirá a URL da notícia em uma nova aba
      element.addEventListener("click", () => {
        window.open(noticias[indice].url);

        // REQUISITO "Tratamento de eventos, como eventos de teclado, mouse e formulários" ATENDIDO
      });
    });
  } catch (error) {
    // Caso ocorra algum erro durante a requisição ou manipulação dos dados, exibe o erro no console
    console.error("Erro ao buscar notícias:", error);
  }
}

// Chama a função para carregar as notícias assim que o código é executado
carregarNoticias();

// Obtém a referência ao formulário de pesquisa pelo seu ID
const formPesquisar = document.getElementById("formPesquisar");

// Obtém a referência ao campo de entrada de texto pelo seu ID
const inputPesquisar = document.getElementById("inputPesquisar");

// Adiciona um monitor de evento para o envio do formulário
formPesquisar.addEventListener("submit", (event) => {
  // REQUISITO "Tratamento de eventos, como eventos de teclado, mouse e formulários" ATENDIDO

  event.preventDefault(); // Impede o comportamento padrão de recarregar a página ao submeter o formulário

  // Verifica se o campo de pesquisa não está vazio
  if (inputPesquisar.value.trim() !== "") {
    // Redireciona o usuário para a página de resultados de pesquisa de noticias, passando o valor da pesquisa na URL
    location.href = `./sources/search.html?${inputPesquisar.value}`;
  } else {
    // Se o campo estiver vazio, limpa o valor
    inputPesquisar.value = "";
  }
});
