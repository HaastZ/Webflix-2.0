const pesquisado = sessionStorage.getItem('pesquisado');
fetch('https://api.themoviedb.org/3/search/movie?api_key=a7c8f3e436b89729fc0f9d797ee42c55&query=' + pesquisado)
  .then(response => response.json())
  .then(data => {
    const filmeContainer = document.querySelector(".filme-container");
    const movies = data.results;
    let titulo = document.getElementsByTagName("title");
    
    titulo[0].text = `Webflix - ${pesquisado}`
    movies.forEach(movie => {
        const infoUrl = `https://www.themoviedb.org/movie/${movie.id}-${movie.title}`;
        
        if(movie.backdrop_path == null){
            movie.backdrop_path = movie.poster_path;
            if(movie.backdrop_path == null){
                return;
            }
        }
        filmeContainer.innerHTML += `
        <div class="filme">
          <a href="${infoUrl}" target="_blank"><img src="${img_url}${movie.backdrop_path}" alt="poster"></a>
            <p class="titulo-filme">${movie.title}</p>
        </div>
      `
    });
  })
  .catch(error => {
    console.error(error);
  });
