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
  console.log(data);
}
async function searchMovies(query) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
  const data = await response.json();

  if (data.Response === "False") {
    console.log("No results:", data.Error);
    return;
  }

  console.log(data.Search);
}