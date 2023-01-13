const botao = document.getElementById("botao-pesquisa");

botao.addEventListener('click', () => {
    const pesquisado = document.getElementById("campo_pesquisa").value;

    sessionStorage.setItem('pesquisado', pesquisado);

    window.location.href = 'pesquisa.html';
})