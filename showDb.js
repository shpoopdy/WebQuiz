function get(endpoint, params="") {

        return jQuery.ajax({

            type: "GET",
            url: endpoint,
            data: {
                req: params
            },
            dataType: "html"

        })

}


async function getResults() {
  let results = await get("./showDb.php");

  return JSON.parse(results);
}

async function fillTable() {
  let results = await getResults();

  let resultsContainer = $("#quiz_results");

  resultsContainer.html("");

  for (let r of results) {
    let row = $("<tr></tr>");

    for (let col in r) {
      row.append(`<td>${r[col]}</td>`);
    }

    resultsContainer.append(row);
  }
}

fillTable();
