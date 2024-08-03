function getQueryParams() {
  // Cria um objeto URLSearchParams com os parâmetros de consulta da URL
  const params = new URLSearchParams(window.location.search);
  // Retorna um objeto com os parâmetros desejados
  return params;
}

// Recupera o valor da variável e exibe na página
const pesquisado = Array.from(getQueryParams())[0][0];

const inputPesquisar = document.getElementById("inputPesquisar");

inputPesquisar.value = pesquisado;

const containerErro = document.getElementById("containerErro");
const containerNoticias = document.getElementById("containerNoticias");
async function carregarNoticias() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?language=pt&q=${pesquisado}&sortBy=publishedAt&apiKey=656ebdeedcd04481ac7e9cc2a32de2f9`
    );
    const data = await response.json();
    const noticias = data.articles;

    if (noticias.lenght == 0) {
      console.error("Nenhuma noticia encontrada.");
    }

    if (noticias.lenght != 0) {
      noticias.forEach((noticia) => {
        const divNoticia = document.createElement("div");
        divNoticia.id = "divNoticia";
        divNoticia.innerHTML = `<div id="textNoticia"><h2>${noticia.title}</h2><h4>${noticia.description}</h5><p>${noticia.content}</p><button id="btnPadrao" href="${noticia.url}">Leia mais</button></div> <div id="imgNoticia"></div>`;
        divNoticia.lastElementChild.style.backgroundImage = `url("${noticia.urlToImage}")`;
        divNoticia.addEventListener("click", function () {
          if (divNoticia.style.height != "150px") {
            divNoticia.style.height = "150px";
            divNoticia.firstElementChild.querySelector("p").style.visibility =
              "hidden";
            divNoticia.firstElementChild.querySelector("p").style.opacity = "0";

            divNoticia.firstElementChild.querySelector(
              "button"
            ).style.visibility = "hidden";
            divNoticia.firstElementChild.querySelector("button").style.opacity =
              "0";
          } else {
            setarNoticiasNormal();
            divNoticia.style.height = "350px";
            divNoticia.firstElementChild.querySelector("p").style.visibility =
              "visible";
            divNoticia.firstElementChild.querySelector("p").style.opacity = "1";

            divNoticia.firstElementChild.querySelector(
              "button"
            ).style.visibility = "visible";
            divNoticia.firstElementChild.querySelector("button").style.opacity =
              "1";
          }
        });
        divNoticia.firstElementChild
          .querySelector("button")
          .addEventListener("click", () => {
            window.open(noticia.url);
          });

        divNoticia.firstElementChild.querySelector("p").style.visibility =
          "hidden";
        divNoticia.firstElementChild.querySelector("p").style.opacity = "0";
        divNoticia.firstElementChild.querySelector("button").style.visibility =
          "hidden";
        divNoticia.firstElementChild.querySelector("button").style.opacity =
          "0";
        containerNoticias.appendChild(divNoticia);
      });
    }
  } catch (error) {
    console.log("ygona");
    console.error("Erro ao buscar notícias:", error);
  }
}

carregarNoticias();

const imgNoticia = document.querySelectorAll("#imgNoticia");
console.log(imgNoticia);

function setarNoticiasNormal() {
  const nodes = document.querySelectorAll("#divNoticia");
  nodes.forEach((element) => {
    element.style.height = "150px";
    element.firstElementChild.querySelector("p").style.visibility = "hidden";
    element.firstElementChild.querySelector("p").style.opacity = "0";
    divNoticia.firstElementChild.querySelector("button").style.visibility =
      "hidden";
    divNoticia.firstElementChild.querySelector("button").style.opacity = "0";
  });
}
