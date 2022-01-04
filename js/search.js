let comp = document.querySelector("#searchCards");
let localSearchInput = localStorage.getItem('searchInput');
if (localSearchInput!=null){
// search from home page 
searchResults(localSearchInput, comp);
localStorage.removeItem('searchInput');
}
// search from search page 
let searchBtn = document.querySelector("#search-btn");
let searchInput = document.querySelector("#search-movie");
searchBtn.addEventListener("click", function () {
  searchResults(searchInput.value, comp);
});


// read search categorimovies  
function searchResults(data ,  comp) {
  var favoritelist = localStorage.getItem("favorite");
  favoritelist = JSON.parse(favoritelist);
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8715a4d323d0baa4d3dd76d3a1241076&query=${data}`).then(
      (response) => {
           response.data.results.map((movie) => {
             // print fav movie 
             if (favoritelist.includes(movie.id)){
           comp.innerHTML +=`
             <div class="col">
             <div class="card  border-0 m-0 mb-2  rounded-3" style="width:15rem;!important "  >
             <div class="card-body p-0 ">
             <div class="content "> <a href="#">
                     <div class="content-overlay " data-bs-toggle="modal" data-bs-target="#exampleModal" id="${movie.id}"  ></div> <img class="content-image w-100" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                     <div class="content-details ">
                         <h3 class="content-title"> ${movie.title}</h3>
                     </div>
                     <div class="content-list">
                    <a href="#" class=" btn fs-4 text-danger" onclick="addToFav(this)" id="like-btn" name=${movie.id}> <i class="fas fa-heart"></i></a>
                    <a href="#" class=" btn fs-4 text-danger"  onclick="addToWatchList(this)" name=${movie.id} id="list-btn"> <i class="far fa-bookmark"></i></a>
                   </div>
                 </a> </div>
                </div>
                </div>
         </div>
       `
             }else {
              comp.innerHTML +=`
              <div class="col">
              <div class="card  border-0 m-0 mb-2  rounded-3" style="width:15rem;!important "  >
              <div class="card-body p-0 ">
              <div class="content "> <a href="#">
                      <div class="content-overlay " data-bs-toggle="modal" data-bs-target="#exampleModal" id="${movie.id}"  ></div> <img class="content-image w-100" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                      <div class="content-details ">
                          <h3 class="content-title"> ${movie.title}</h3>
                      </div>
                      <div class="content-list">
                      <a href="#" class=" btn fs-4 text-danger" onclick="addToFav(this)" id="like-btn" name=${movie.id}> <i class="far fa-heart"></i></a>
                   <a href="#" class=" btn fs-4 text-danger" id="list-btn"> <i class="far fa-bookmark"></i></a>
                    </div>
                  </a> </div>
                 </div>
                 </div>
          </div>
        `

             }   
      },)}
   
    )}

