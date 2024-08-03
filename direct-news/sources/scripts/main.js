const containerNoticia1 = document.querySelector("#noticia1");
const containerNoticia2 = document.querySelector("#noticia2");
const containerNoticia3 = document.querySelector("#noticia3");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function carregarNoticias() {
  try {
    const response = await fetch(
      "https://newsapi.org/v2/everything?language=pt&q=Em%20alta&sortBy=publishedAt&apiKey=656ebdeedcd04481ac7e9cc2a32de2f9"
    );
    const data = await response.json();
    const noticias = data.articles;

    if (noticias.lenght === 0) {
      console.error("Nenhuma noticia encontrada.");
      return;
    }

    if (noticias.lenght !== 0) {
      const listaContainerNoticias =
        document.querySelector("#tabela-noticias").children;
      Array.from(listaContainerNoticias).forEach((element) => {
        let indice = getRandomInt(Array.from(noticias).length);

        element.style.backgroundImage = `url("${noticias[indice].urlToImage}")`;
        element.firstElementChild.textContent = noticias[indice].title;

        element.addEventListener("click", () => {
          window.open(noticias[indice].url);
        });
      });
    }
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
  }
}

carregarNoticias();

const formPesquisar = document.getElementById("formPesquisar");

const inputPesquisar = document.getElementById("inputPesquisar");

formPesquisar.addEventListener("submit", (event) => {
  event.preventDefault();

  if (inputPesquisar.value.trim() !== "") {
    localStorage.setItem("pesquisa", inputPesquisar.value);
    console.log(localStorage.getItem("pesquisa"));
    location.href = `./sources/search.html?${inputPesquisar.value}`;
  } else {
    inputPesquisar.value = "";
  }
});
