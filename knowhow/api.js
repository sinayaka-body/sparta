// この関数はボタンがクリックされたときに呼び出されます。
function fetchData() {
  // Get values from the input fields
  let phase = document.querySelector("#phaseSelect").value;
  let sales = document.querySelector("#salesSelect").value;
  let product = document.querySelector("#productSelect").value;
  // Add values as parameters to the request URL
  let url = `/get_data?phase=${phase}&sales=${sales}&product=${product}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let rows = data["result"];
      $("#cards-box").empty();
      rows.forEach((list) => {
        let imageSrc = list["imageSrc"];
        let url = list["url"];
        let title = list["title"];
        let cardText = list["cardText"];
        let tag = list["tag"];
        let cardHtml = `
        <div class="col">
          <div class="card h-100">
            <figure id="modalOpen" class="card__img" onclick="openModal(this)">
              <img src="${imageSrc}" class="" alt="..." />
            </figure>
            <div id="easyModal" class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <span class="modalClose" onclick="closeModal(this)">×</span>
                </div>
                <div class="modal-body">
                  <a href="${url}" target="_blank">
                    <img src="${imageSrc}" class="card-img-top" alt="..." />
                  </a>
                  <h3>${title}</h3>
                  <p class="card-text">${cardText}</p>
                  <p>URL：<a href="${url}" target="_blank">${url}</a></p>
                  <p class="tag">タグ：${tag}</p>
                </div>
              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="tag">タグ：${tag}</p>
            </div>
          </div>
        </div>
        `;
        $("#cards-box").append(cardHtml);
      });
    })
    .catch((error) => console.error("Error:", error));
}

// この関数はドキュメントが読み込まれたときに呼び出されます。
$(document).ready(function () {
  // ボタンのクリックイベントに上記のfetchData関数を紐付けます。
  $("#myButton").click(fetchData);
});
