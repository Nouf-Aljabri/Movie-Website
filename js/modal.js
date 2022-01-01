
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
             `<div class="col"> 
             <div class="embed-responsive embed-responsive-16by9 ">
             <iframe class="embed-responsive-item w-100" src="https://www.youtube.com/embed/${key}?rel=0" allowfullscreen></iframe>
             </div>
              </div>`
              ).join("");
             
             
              });
  
    });
  });