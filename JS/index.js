function selecionarCategoria(categoria) {
  localStorage.setItem("categoria", categoria);
  window.location.href = "exibicao.html";
}
