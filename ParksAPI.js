function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    const searchTerm = $("#js-search-term").val();
    const maxResults = $("#js-max-results").val();
    getYouTubeVideos(searchTerm, maxResults);
  });
}

$(watchForm);
