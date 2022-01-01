let comp = document.querySelector("#searchCards");
let localSearchInput = localStorage.getItem('searchInput');
localStorage.removeItem('searchInput');
// search from home page 
searchResults(localSearchInput, comp);

// search from search page 
let searchBtn = document.querySelector("#search-btn");
let searchInput = document.querySelector("#search-movie");
searchBtn.addEventListener("click", function () {
    searchResults(searchInput.value, comp);

});


// read search categorimovies  
function searchResults(data ,  comp) {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8715a4d323d0baa4d3dd76d3a1241076&query=${data}&language=en-US&page=1&include_adult=false`).then(
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
                       <a href="#" class=" btn fs-4 text-danger"  id="like-btn" name=${movie.id}> <i class="far fa-heart"></i></a>
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