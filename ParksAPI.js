const apiKey = "diKkZy9kWvd9T7L4KxljR96dcbMwpbG5tr2d1uOp";
const searchURL = "https://developer.nps.gov/api/v1/parks?";

function getParksInfo(state, query, limit = 10) {
  const params = {
    api_key: apiKey,
    q: query,
    stateCode: state,
    limit: limit,
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + queryString;

  console.log(url);

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $("#results-list").empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++) {
    $("#results-list").append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <a href ="${responseJson.data[i].url}">${responseJson.data[i].fullName} Homepage</a>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].addresses[0].line1}</p>
      <p>${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode}</p>
      <p>${responseJson.data[i].addresses[0].postalCode}</p>
      <p>${responseJson.data[i].addresses[0].type}</p>
      </li>`
    );
  }
  //display the results section
  $("#results").removeClass("hidden");
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    const state = $("#js-search-state").val();
    const searchTerm = $("#js-search-term").val();
    const maxResults = $("#js-max-results").val();
    getParksInfo(state, searchTerm, maxResults);
  });
}

$(watchForm);
