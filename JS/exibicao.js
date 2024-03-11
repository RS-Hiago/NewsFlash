
//busca a categoria no localStorage
const categoria = localStorage.getItem("categoria")

//nomeia o header
switch(categoria){

  case "business": document.getElementById("titulo-header").innerHTML = "Negócios"
  break

  case "entertainment": document.getElementById("titulo-header").innerHTML = "Entretenimento"
  break

  case "general": document.getElementById("titulo-header").innerHTML = "Geral"
  break

  case "health": document.getElementById("titulo-header").innerHTML = "Saúde"
  break

  case "science": document.getElementById("titulo-header").innerHTML = "Ciência"
  break

  case "sports": document.getElementById("titulo-header").innerHTML = "Esportes"
  break

  case "technology": document.getElementById("titulo-header").innerHTML = "Tecnologia"
  break

  default: console.log("Categoria não encontrada")

}


//Link da API e Chave (Add sua Chave API)
const apiKey = '5513ca05e62b4475b2ba1e98bf3cd8a4'
const apiUrl = 'https://newsapi.org/v2/top-headlines'
 
//Aqui passamos os parametros (chave da API) (Categoria da noticia) (Pais)
const params = {
  apiKey: apiKey,
  category: categoria,
  country: 'br',
}
 
//Aqui validamos nossa chave e guardamos na variavel URL
const url = new URL(apiUrl);
Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
 
//Busca da API
fetch(url)
  .then(response => response.json())
  .then(data => {

    //o metodo map passa por todo o array das materias e pega o titulo, autor, data da materia e o link da materia
    data.articles.map(artigo=>{

      const card = document.createElement('div')//a variavel card cria divs
      document.getElementById('exibicao').appendChild(card)//cria a div
      card.classList.add('article-card')//cria uma class para div

      const titulo = document.createElement('h2')//a variavel titulo cria h2
      titulo.appendChild(document.createTextNode(artigo.title))//pega o titulo no artigo
      document.getElementById('exibicao').appendChild(titulo)//exibe o titulo
      card.appendChild(titulo);//insere o titulo na div card

      const autor = document.createElement('strong')//a variavel autor cria strong
      autor.appendChild(document.createTextNode(artigo.author))//pega o autor no artigo
      document.getElementById('exibicao').appendChild(autor)//exibe o autor
      card.appendChild(autor);//insere o autor na div card

      const dia = document.createElement('p')//a variavel dia cria p
      const dataPublicacao = new Date(artigo.publishedAt);//pega a data no artigo no formato "Date"
      const formatoData = `${formatarNumero(dataPublicacao.getDate())}-${formatarNumero(dataPublicacao.getMonth() + 1)}-${dataPublicacao.getFullYear()} ${formatarNumero(dataPublicacao.getHours())}:${formatarNumero(dataPublicacao.getMinutes())}:${formatarNumero(dataPublicacao.getSeconds())}`
      dia.appendChild(document.createTextNode(formatoData))//exibe o dia
      card.appendChild(dia)//insere o dia na div card

      const url = document.createElement('a')//a variavel url cria a
      url.classList.add('link')
      url.href = artigo.url//pega a url no objeto e coloca no href do a
      url.target = '_blank' // Abrir em nova guia
      url.appendChild(document.createTextNode('Leia mais'))//exibe a url
      card.appendChild(url)//insere a url na div card

      document.getElementById('exibicao').appendChild(card)//fecha a div
    })
  })
  .catch(error => console.error('Erro ao obter notícias:', error))

  // Função para formatar números com zero à esquerda, se necessário
function formatarNumero(numero) {
  return numero < 10 ? `0${numero}` : numero
}
