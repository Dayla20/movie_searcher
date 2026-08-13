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
  showSkeletons();

  const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
  const data = await response.json();

  if (data.Response === "False") {
    movieListEl.innerHTML = `<p>${data.Error}</p>`;
    return;
  }

  const firstSix = data.Search.slice(0, 6);
  movieListEl.innerHTML = firstSix.map(movie => movieHTML(movie)).join("");
}

function showSkeletons() {
  const skeletonCard = `
    <div class="movie-card skeleton">
      <div class="skeleton-img"></div>
      <div class="movie-card__info">
        <div class="skeleton-text"></div>
        <div class="skeleton-text short"></div>
      </div>
    </div>
  `;
  movieListEl.innerHTML = Array(6).fill(skeletonCard).join("");
}

function movieHTML(movie) {
  const fallback = "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22445%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23e0e0e0%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2220%22%3ENo Poster%3C/text%3E%3C/svg%3E";
  const poster = movie.Poster !== "N/A" ? movie.Poster : fallback;
  return `
    <div class="movie-card">
      <img src="${poster}" alt="${movie.Title} poster"
           onerror="this.onerror=null; this.src='${fallback}';">
      <div class="movie-card__info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      </div>
    </div>
  `;
}
let currentMovies = [];
const sortSelect = document.querySelector("#sortSelect");
async function searchMovies(query) {
  showSkeletons();

  const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
  const data = await response.json();

  if (data.Response === "False") {
    movieListEl.innerHTML = `<p>${data.Error}</p>`;
    currentMovies = [];
    return;
  }

  currentMovies = data.Search.slice(0, 6);
  renderSortedMovies();
}
sortSelect.addEventListener("change", () => {
  renderSortedMovies();
});

function renderSortedMovies() {
  const sortValue = sortSelect.value;

  const sorted = [...currentMovies].sort((a, b) => {
    if (sortValue === "title-asc") return a.Title.localeCompare(b.Title);
    if (sortValue === "title-desc") return b.Title.localeCompare(a.Title);
    if (sortValue === "year-desc") return parseInt(b.Year) - parseInt(a.Year);
    if (sortValue === "year-asc") return parseInt(a.Year) - parseInt(b.Year);
  });

  movieListEl.innerHTML = sorted.map(movie => movieHTML(movie)).join("");
}