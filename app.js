const API_KEY = "66e99457"; // your key
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const movieListEl = document.querySelector("#movieList");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value;
  searchMovies(query);
});

async function searchMovies(query) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
  const data = await response.json();

  if (data.Response === "False") {
    movieListEl.innerHTML = `<p>${data.Error}</p>`;
    return;
  }

  const firstSix = data.Search.slice(0, 6);
  movieListEl.innerHTML = firstSix.map(movie => movieHTML(movie)).join("");
}

function movieHTML(movie) {
  const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Poster";
  return `
    <div class="movie-card">
      <img src="${poster}" alt="${movie.Title} poster">
      <div class="movie-card__info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      </div>
    </div>
  `;
}