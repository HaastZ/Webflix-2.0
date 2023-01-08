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
        const trailerUrl = `https://www.themoviedb.org/movie/${data[i].id}-${data[i].title}`;
        
        if(item.backdrop_path == null){
            item.backdrop_path = item.poster_path;
            if(item.backdrop_path == null){
                return;
            }
        }
        console.log(data);
        filmeContainer.innerHTML += `
      <div class="filme">
      <a href="${trailerUrl}" target="_blank"><img src="${img_url}${item.backdrop_path}" alt="poster"></a>
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

const init = ()=> {
    let xhr = new XMLHttpRequest ();
    let url = "https://api.themoviedb.org/3/movie/top_rated?api_key=a7c8f3e436b89729fc0f9d797ee42c55&language=pt-BR"
    xhr.onload = makeCards;
    xhr.open ('GET', url, true);
    xhr.send ();
}

document.body.onload = init