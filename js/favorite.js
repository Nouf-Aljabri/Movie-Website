
var favoritelist = localStorage.getItem("favorite");
     if (favoritelist!=null){
    favoritelist = JSON.parse(favoritelist);
    for(let i=0; i<favoritelist.length; i++){
        axios.get(`https://api.themoviedb.org/3/movie/${favoritelist[i]}?api_key=8715a4d323d0baa4d3dd76d3a1241076`).then(
            (response) => {
                document.querySelector("#favoriteCards").innerHTML+=( `
                <div class="col">
                <div class="card  border-0 m-0 mb-2  rounded-3"  id="${response.data.id}" style="width:15rem;!important "  >
                <div class="card-body p-0 ">
                <div class="content "> <a href="#">
                        <div class="content-overlay "  data-bs-toggle="modal" data-bs-target="#exampleModal" id="${response.data.id}"></div> <img class="content-image w-100" src="https://image.tmdb.org/t/p/w500/${response.data.poster_path}">
                        <div class="content-details ">
                            <h3 class="content-title"> ${response.data.title}</h3>
                        </div>
                        <div class="content-list">
                          <a href="#" class=" btn fs-4 text-danger" onclick="removeFromFav(${response.data.id})" id="trash-btn"> <i class="fas fa-trash"></i></a>
                       
                        </div>
                    </a> </div>
                   </div>
                   </div>
            </div>
          `);
        }
     
        )}
       
    }
     
  
// remove from fav list 
function removeFromFav(movieID) {
    var favoritelist = localStorage.getItem("favorite");
    favoritelist = JSON.parse(favoritelist);
    const itemId = favoritelist.indexOf(movieID); 
    favoritelist.splice(itemId,  1);
    localStorage.setItem("favorite", JSON.stringify(favoritelist));
    location.reload();
    
}

   