const dateElement = document.querySelector("#current-date");

if (dateElement) {
  dateElement.textContent = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date());
}
const showDetailsButton = document.querySelector("#show-details-btn");
const studentDetails = document.querySelector("#student-details");

if (showDetailsButton && studentDetails) {
    showDetailsButton.addEventListener("click", () => {
        studentDetails.hidden = false;
        showDetailsButton.textContent = "Details Shown";
        showDetailsButton.disabled = true;
    });
}
