// Função para obter os parâmetros da URL
function getQueryParams() {
  // Cria um objeto URLSearchParams com os parâmetros de consulta da URL
  const params = new URLSearchParams(window.location.search);
  // Retorna o objeto com os parâmetros desejados
  return params;
}

// Recupera o valor do primeiro parâmetro da URL e armazena na variável 'pesquisado'
let pesquisado = Array.from(getQueryParams())[0][0];

// Obtém as referências aos elementos do DOM
const inputPesquisar = document.getElementById("inputPesquisar");
const formPesquisar = document.getElementById("formPesquisar");
const containerErro = document.getElementById("containerErro");
const containerNoticias = document.getElementById("containerNoticias");

// Adiciona um monitor de evento para o envio do formulário
formPesquisar.addEventListener("submit", (event) => {
  // Impede o comportamento padrão de recarregar a página ao submeter o formulário
  event.preventDefault();
  console.log("ygona")
  // Verifica se o campo de pesquisa não está vazio
  if (inputPesquisar.value.trim() !== "") {
    carregarNoticias()
  } else {
    // Se o campo estiver vazio, limpa o valor
    inputPesquisar.value = "";
  }
});

inputPesquisar.value = pesquisado;
function limparNoticiasGeradas(){
  Array.from(containerNoticias.children).forEach(element => {
    element.remove()
  });
}

// Função assíncrona para carregar as notícias com base no termo pesquisado
async function carregarNoticias() {

  limparNoticiasGeradas()
  pesquisado = inputPesquisar.value

  try {
    // Faz a requisição para a API de notícias com o termo pesquisado
    const response = await fetch(
      `https://newsapi.org/v2/everything?language=pt&q=${pesquisado}&sortBy=publishedAt&apiKey=656ebdeedcd04481ac7e9cc2a32de2f9`
    );

    // Converte a resposta para um objeto JSON
    const data = await response.json();
    let noticias = data.articles;

    // Filtra as notícias para remover aquelas sem título ou marcadas como "[Removed]"
    noticias.forEach(element => {
      if (element.title == null || element.title == "[Removed]") {
        noticias.splice(noticias.indexOf(element), 1);
      }
    });

    const seenTitles = {};
    noticias = noticias.filter((item) => {
    if (seenTitles[item.title]) {
      return false; // Exclui o item
    } else {
      seenTitles[item.title] = true;
      return true; // Mantém o item
    }
    });











    // Verifica se há notícias disponíveis
    if (noticias.length === 0) {
      // Se não houver notícias, exibe a mensagem de erro
      containerNoticias.style.display = "none";
      containerErro.style.display = "flex";
    } else {
      // Se houver notícias, exibe o container de notícias e adiciona cada notícia ao DOM
      containerErro.style.display = "none";
      containerNoticias.style.display = "flex";
      noticias.forEach((noticia) => {
        console.log(noticia)
        const divNoticia = document.createElement("div");
        divNoticia.id = "divNoticia";
        divNoticia.innerHTML = `
          <div id="textNoticia">
            <h2>${noticia.title}</h2>
            <h4>${noticia.description}</h4>
            <p>${noticia.content}</p>
            <button id="btnPadrao" href="${noticia.url}">Leia mais</button>
          </div> 
          <div id="imgNoticia"></div>
        `;
        divNoticia.lastElementChild.style.backgroundImage = `url("${noticia.urlToImage}")`;

        // Adiciona evento de clique para expandir/contrair a notícia
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
        });

        // Adiciona evento de clique no botão "Leia mais" para abrir o link da notícia em uma nova aba
        divNoticia.firstElementChild.querySelector("button").addEventListener("click", () => {
          window.open(noticia.url);
        });

        // Esconde o conteúdo adicional e o botão "Leia mais" inicialmente
        divNoticia.firstElementChild.querySelector("p").style.visibility = "hidden";
        divNoticia.firstElementChild.querySelector("p").style.opacity = "0";
        divNoticia.firstElementChild.querySelector("button").style.visibility = "hidden";
        divNoticia.firstElementChild.querySelector("button").style.opacity = "0";

        // Adiciona a notícia ao container de notícias
        containerNoticias.appendChild(divNoticia);
      });
    }
  
  } catch (error) {
    // Caso ocorra algum erro durante a requisição, exibe o erro no console
    console.error("Erro ao buscar notícias:", error);
  }
}

// Chama a função para carregar as notícias assim que o código é executado
carregarNoticias();

// Função para redefinir todas as notícias ao estado original (altura contraída)
function setarNoticiasNormal() {
  const nodes = document.querySelectorAll("#divNoticia");
  nodes.forEach((element) => {
    element.style.height = "150px";
    element.firstElementChild.querySelector("p").style.visibility = "hidden";
    element.firstElementChild.querySelector("p").style.opacity = "0";
    element.firstElementChild.querySelector("button").style.visibility = "hidden";
    element.firstElementChild.querySelector("button").style.opacity = "0";
  });
}