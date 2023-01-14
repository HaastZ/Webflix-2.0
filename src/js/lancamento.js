const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${chave_api}`;

const filmeContainer = document.querySelector(".filme-container");

async function getMovies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const movies = data.results;

    for (const movie of movies) {
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

    }
  } catch (error) {
    console.error(error);
  }
}


getMovies();