const API_KEY = 'a7c8f3e436b89729fc0f9d797ee42c55';
const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;

const filmeContainer = document.querySelector(".filme-container");

async function getMovies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const movies = data.results;

    for (const movie of movies) {
    const trailerUrl = `https://www.themoviedb.org/movie/${movie.id}-${movie.title}`;

      filmeContainer.innerHTML += `
      <div class="filme">
      <a href="${trailerUrl}" target="_blank"><img src="${img_url}${movie.backdrop_path}" alt="poster"></a>
                <p class="titulo-filme">${movie.title}</p>
        </div>
      `

    }
  } catch (error) {
    console.error(error);
  }
}


getMovies();