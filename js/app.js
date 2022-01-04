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
let fantazyCards = document.querySelector("#fantazyCards");
makeGetRequest2("14",fantazyCards);

// search bar 
let searchBtn = document.querySelector("#search-btn");
let searchInput = document.querySelector("#search-movie");


searchBtn.addEventListener("click", function () {
  localStorage.setItem('searchInput',searchInput.value);
  location.href = "searchPage.html"; 
});



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
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=8715a4d323d0baa4d3dd76d3a1241076&with_genres=${id}&page=1`).then(
    (response) => {
        comp.innerHTML = response.data.results.map((movie) => 
           `
           <div class="col">
           <div class="card  border-0 m-0 mb-2 rounded-3"  style="width:15rem;!important "  >
           <div class="card-body p-0 ">
           <div class="content "> <a href="#">
                   <div class="content-overlay" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${movie.id}" ></div> <img  class="content-image w-100" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                   <div class="content-details ">
                       <h3 class="content-title"> ${movie.title}</h3>
                   </div>
                   <div class="content-list">
                     <a href="#" class=" btn fs-4 text-danger" onclick="addToFav(this)" id="like-btn" name=${movie.id}> <i class="far fa-heart"></i></a>
                  <a href="#" class=" btn fs-4 text-danger"  onclick="addToWatchList(this)" name=${movie.id} id="list-btn"> <i class="far fa-bookmark"></i></a>
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


// print fav + watch icon  
window.onload = function() {
  // ------------- fav 
  let likeBtn =document.querySelectorAll("#like-btn");
  var favoritelist = localStorage.getItem("favorite");
  favoritelist = JSON.parse(favoritelist);
  // add and remove from localstorage 
  for(let i=0; i<likeBtn.length ; i++){
    // movie id 
    let movieID =likeBtn[i].getAttribute("name");  
  // print all favorite icon
  if (favoritelist!= null && favoritelist.includes(movieID)){
      likeBtn[i].innerHTML="<i class='fas fa-heart'></i>"
  }
  }
  // ----------------- watch 
  let watchBtn =document.querySelectorAll("#list-btn");
  var watchList = localStorage.getItem("watchList");
  watchList = JSON.parse(watchList);
  // add and remove from localstorage 
  for(let i=0; i<likeBtn.length ; i++){
    // movie id 
    let movieID =watchBtn[i].getAttribute("name");  
  // print all watch icon
  if (watchList!= null && watchList.includes(movieID)){
      watchBtn[i].innerHTML="<i class='fas fa-bookmark'></i>"
  }
  }



  }