// read puoular Movies  
function makeGetRequest(cat , comp) {
  axios.get(`https://api.themoviedb.org/3/movie/${cat}?api_key=8715a4d323d0baa4d3dd76d3a1241076&language=en-US&page=1`).then(
    (response) => {
        comp.innerHTML = response.data.results.map((movie) => 
           `
            <div class="col">
            <!-- card -->
            <div class="card border-0 myCard" data-bs-toggle="modal" data-bs-target="#exampleModal" style="width:25rem;" id="${movie.id}">
              <div class="card-body p-0 ">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="img-fluid card-img-top rounded-3" alt="">          
          </div>
      </div>
      </div>
      
            `
        ).join("")
    },
    (error) => {
      console.log(error);
    }
  );
}


// read other categories  
function makeGetRequest2(id ,  comp) {
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=8715a4d323d0baa4d3dd76d3a1241076&with_genres=${id}`).then(
    (response) => {
        comp.innerHTML = response.data.results.map((movie) => 
           `
           <div class="col">
           <div class="card  border-0 m-0 mb-2  rounded-3" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${movie.id}" style="width:15rem;!important "  >
           <div class="card-body p-0 ">
           <div class="content "> <a href="#">
                   <div class="content-overlay "></div> <img class="content-image w-100" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                   <div class="content-details ">
                       <h3 class="content-title"> ${movie.title}</h3>
                   </div>
                   <div class="content-list">
                     <a href="javascript:MyFunction();" class=" btn fs-4 text-danger"  id="like-btn" name=${movie.id}> <i class="far fa-heart"></i></a>
                  <a href="#" class=" btn fs-4 text-danger" id="list-btn"> <i class="far fa-bookmark"></i></a>
                   </div>
               </a> </div>
              </div>
              </div>
       </div>
     `
        ).join("");
    },
    (error) => {
      console.log(error);
    }
  );
}


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


// Puoular Movies 
let popularCard = document.querySelector("#popularCards");
makeGetRequest("popular",popularCard);
// Action Movies 
let actionCards = document.querySelector("#actionCards");
makeGetRequest2("28",actionCards);
// Animation Movies 
let animationCards = document.querySelector("#animationCards");
makeGetRequest2("16",animationCards);
// Crime Movies 
let crimeCards = document.querySelector("#crimeCards");
makeGetRequest2("80",crimeCards);
// Comedy Movies 
let comedyCards = document.querySelector("#comedyCards");
makeGetRequest2("35",comedyCards);
// History Movies 
let historyCards = document.querySelector("#historyCards");
makeGetRequest2("36",historyCards);
// Fantazy Movies 
let documentaryCards = document.querySelector("#fantazyCards");
makeGetRequest2("14",fantazyCards);


