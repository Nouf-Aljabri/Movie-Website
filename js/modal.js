
// Get modal data 
document.addEventListener("DOMContentLoaded", function() {
    var myModal = document.getElementById("exampleModal");
    myModal.addEventListener("show.bs.modal", function(event) {        
        // Get the card that triggered the modal
        var button = event.relatedTarget;
        // Extract movie id 
        var movieID = button.getAttribute("id");
        axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=8715a4d323d0baa4d3dd76d3a1241076&append_to_response=videos`).then(
          (response) => {
              // Change modal data 
              document.querySelector("#movie-img").setAttribute("src",`https://image.tmdb.org/t/p/original/${response.data.poster_path}`)
              document.querySelector("#movie-title").innerHTML = response.data.title +` <span id ="movie-release" class=" fs-5">${response.data.release_date.split("-")[0]}</span>`;           
              document.querySelector("#movie-min").innerHTML = `${response.data.runtime} min`;
              var genres = response.data.genres.map(function(item) {
                return item['name'];
              });
              document.querySelector("#movie-genres").innerHTML = genres;
              document.getElementById("rate").innerHTML = ` <i class="fas fa-star"></i> ${response.data.vote_average} / 10`;
              document.querySelector("#movie-overview").innerHTML =  response.data.overview;
              document.querySelector("#IMDB-btn").setAttribute("onclick",`window.location.href = 'https://www.imdb.com/title/${response.data.imdb_id}'`);
              // trailers videos
              var trailerVideos =[];
               response.data.videos.results.map(function (trailer){
                if (trailer['type']=="Trailer"){
                trailerVideos.push(trailer['key']);}
  
              });
       
             document.querySelector("#trailer-vid").innerHTML = trailerVideos.map((key) =>
             `<div class="col" > 
             <div class="embed-responsive embed-responsive-16by9">
             <iframe class="embed-responsive-item w-100" src="https://www.youtube.com/embed/${key}?rel=0" allowfullscreen></iframe>
             </div>
              </div>`
              ).join("");
             
             
              });
  
    });
  });
 
// add to fav list
function addToFav (favItem) {
    var favoritelist = localStorage.getItem("favorite");
    favoritelist = JSON.parse(favoritelist);
    let movieID = favItem.getAttribute("name");
      // if the favorite list empty 
      if (favoritelist==null){
        favoritelist =[];
       favItem.innerHTML="<i class='fas fa-heart'></i>"
        favoritelist.push(movieID);
        localStorage.setItem("favorite", JSON.stringify(favoritelist));
        // if it not includes in favorite list
      }else if (!favoritelist.includes(movieID)){
       favItem.innerHTML="<i class='fas fa-heart'></i>"
        favoritelist.push(movieID);
        localStorage.setItem("favorite", JSON.stringify(favoritelist));
        // if it includes in favorite list
      }else {
      const itemId = favoritelist.indexOf(movieID); 
      favoritelist.splice(itemId,  1);
       favItem.innerHTML="<i class='far fa-heart'></i>"
        localStorage.setItem("favorite", JSON.stringify(favoritelist));
      }

}

  // add to watch list
function addToWatchList (watchItem) {
    var watchlist = localStorage.getItem("watchList");
    watchlist = JSON.parse(watchlist);
    let movieID = watchItem.getAttribute("name");

      // if the watch list empty 
      if (watchlist==null){
        watchlist =[];
        watchItem.innerHTML="<i class='fas fa-bookmark'></i>"
       watchlist.push(movieID);
        localStorage.setItem("watchList", JSON.stringify(watchlist));
        // if it not includes in watch list
      }else if (!watchlist.includes(movieID)){
        watchItem.innerHTML="<i class='fas fa-bookmark'></i>"
       watchlist.push(movieID);
        localStorage.setItem("watchList", JSON.stringify(watchlist));
        // if it includes in watch list
      }else {
        const itemId = watchlist.indexOf(movieID); 
        watchlist.splice(itemId,  1);
        watchItem.innerHTML="<i class='far fa-bookmark'></i>"
        localStorage.setItem("watchList", JSON.stringify(watchlist));
      }

}  
