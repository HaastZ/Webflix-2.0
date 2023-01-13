const botao = document.getElementById("botao-pesquisa");

botao.addEventListener('click', () => {
    const pesquisado = document.getElementById("campo_pesquisa").value;

    sessionStorage.setItem('pesquisado', pesquisado);
    if(!pesquisado){
        return;
    }
    window.location.href = 'pesquisa.html';
})