const main = document.querySelector('.main');

fetch(lista_generos_http + new URLSearchParams({
    api_key: chave_api
}))
.then(response => response.json())
.then(data => {
    data.genres.forEach(item => {
        fetchMoviesListByGenres(item.id, item.name)
    });
})

const fetchMoviesListByGenres = (id, genres) => {
    fetch(filme_generos_http + new URLSearchParams({
        api_key: chave_api,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1
    }))
    .then(response => response.json())
    .then(data => {
        makeCategoryElements(`${genres}`, data.results)
    })
    .catch(error => console.log(error))
}

const makeCategoryElements = (categoria, data) => {
    main.innerHTML += `
    <div class="lista-filmes">
            <button class="pre-btn">
                <img src="./src/img/Icone-seta-Png-removebg-preview.png" alt="pre-btn">
            </button>
            <h1 class="filme-categoria">${categoria}</h1>
            <div class="filme-container" id="${categoria}">
                
            </div>

            <button class="next-btn">
                <img src="./src/img/Icone-seta-Png-removebg-preview.png" alt="next-btn">
            </button>
        </div> 
    `

    makeCards(categoria, data);
}

const makeCards = (id, data) => {
    const filmeContainer = document.getElementById(id);
    
    
    data.forEach((item, i)=> {
        const infoUrl = `https://www.themoviedb.org/movie/${data[i].id}-${data[i].title}`;
        
        if(item.backdrop_path == null){
            item.backdrop_path = item.poster_path;
            if(item.backdrop_path == null){
                return;
            }
        }
        filmeContainer.innerHTML += `
            <div class="filme">
                <a href="${infoUrl}" target="_blank"><img src="${img_url}${item.backdrop_path}" alt="poster"></a>
                    <p class="titulo-filme">${item.title}</p>
            </div>
        `
        
        if(i == data.length - 1){
            setTimeout(()=>{
                scroll();
            },100)
        }
    })
}