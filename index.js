function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
