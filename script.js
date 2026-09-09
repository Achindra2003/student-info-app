const dateElement = document.querySelector("#current-date");

if (dateElement) {
  dateElement.textContent = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date());
}
