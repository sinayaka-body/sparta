function openModal(element) {
  let modal = element.nextElementSibling;
  modal.style.display = "block";
}

function closeModal(element) {
  let modal = element.parentElement.parentElement.parentElement;
  modal.style.display = "none";
}
