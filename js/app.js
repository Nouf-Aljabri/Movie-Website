
// read puoular Movies  
function makeGetRequest(path , comp) {
  axios.get(path).then(
    (response) => {
        comp.innerHTML = response.data.results.map((movie) => 
           `
            <div class="col">
            <!-- card -->
            <div class="card border-0" style="width:25rem;" id="myCard">
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
function makeGetRequest2(path ,  comp) {
  axios.get(path).then(
    (response) => {
        comp.innerHTML = response.data.results.map((movie) => 
           `
           <div class="col">
           <div class="card  border-0 m-0 mb-2  rounded-3" style="width:15rem;!important " >
           <div class="card-body p-0 ">
           <div class="content "> <a href="#">
                   <div class="content-overlay "></div> <img class="content-image w-100" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                   <div class="content-details ">
                       <h3 class="content-title"> ${movie.title}</h3>
                   </div>
                   <div class="content-list">
                     <a href="#" class=" btn fs-4 text-danger" id="like-btn"> <i class="far fa-heart"></i></a>
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


// Puoular Movies 
let popularCard = document.querySelector("#popularCards");
makeGetRequest("https://api.themoviedb.org/3/movie/popular?api_key=8715a4d323d0baa4d3dd76d3a1241076&language=en-US&page=1",popularCard);
// Action Movies 
let actionCards = document.querySelector("#actionCards");
makeGetRequest2("https://api.themoviedb.org/3/discover/movie?api_key=8715a4d323d0baa4d3dd76d3a1241076&with_genres=28",actionCards);
// Animation Movies 
let animationCards = document.querySelector("#animationCards");
makeGetRequest2("https://api.themoviedb.org/3/discover/movie?api_key=8715a4d323d0baa4d3dd76d3a1241076&with_genres=16",animationCards);
// Crime Movies 
let crimeCards = document.querySelector("#crimeCards");
makeGetRequest2("https://api.themoviedb.org/3/discover/movie?api_key=8715a4d323d0baa4d3dd76d3a1241076&with_genres=80",crimeCards);
// Comedy Movies 
let comedyCards = document.querySelector("#comedyCards");
makeGetRequest2("https://api.themoviedb.org/3/discover/movie?api_key=8715a4d323d0baa4d3dd76d3a1241076&with_genres=35",comedyCards);
// History Movies 
let historyCards = document.querySelector("#historyCards");
makeGetRequest2("https://api.themoviedb.org/3/discover/movie?api_key=8715a4d323d0baa4d3dd76d3a1241076&with_genres=36",historyCards);
// Fantazy Movies 
let documentaryCards = document.querySelector("#fantazyCards");
makeGetRequest2("https://api.themoviedb.org/3/discover/movie?api_key=8715a4d323d0baa4d3dd76d3a1241076&with_genres=14",fantazyCards);
