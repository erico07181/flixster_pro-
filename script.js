let APIkey = "1855887f77c9265ce36d85e3d981773d";

let page = 1;

let movForm = document.querySelector("form");

let mainScreen = true;



const generateError = (err) => {
    document.lastChild.innerHTML += `
        <span style="color: red;">${err} Please try again</span>
    `;
}


document.addEventListener('DOMContentLoaded', async(evt) => {
    evt.preventDefault();

    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIkey}&language=en-US&page=${page}`;

    console.log(url);

    movImage = document.querySelector("#movImage");

    try {
        document.querySelector("#movImage").innerHTML= "";

        let response = await fetch(url);

        let responseData = await response.json();

        console.log("responseData is: ", responseData);


        displayResults(responseData);
    }

    catch(e){
        console.log("error")
    }

})

movForm.addEventListener("submit", async(evt) => {
    evt.preventDefault();
    mainScreen = false;
    page = 1;

    document.querySelector("#movImage").innerHTML= "";

    movSearch = evt.target.search_input.value.split(' ').join('+');

    console.log(movSearch);

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&query=${movSearch}&page=${page}`;

    console.log(url);

    movImage = document.querySelector("#movImage")


    try {
        document.querySelector("#movImage").innerHTML= "";

        let response = await fetch(url);

        let responseData = await response.json();

        console.log("responseData is: ", responseData);


        displayResults(responseData);
    }

    catch(e){
        generateError(evt.target.search_input.value);
    }
});

load_more_movies_btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    page++;
    console.log(page)

    if (mainScreen == true){
        let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIkey}&language=en-US&page=${page}`;
        movImage = document.querySelector("#movImage")

        try {
            let response = await fetch(url);

            let responseData = await response.json();

            console.log("responseData is: ", responseData);


            displayResults(responseData);
        }

        catch(e){
            generateError(evt.target.search_input.value);
        }
    }
    else{
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&query=${movSearch}&page=${page}`;
        try {
            let response = await fetch(url);

            let responseData = await response.json();

            console.log("responseData is: ", responseData);


            displayResults(responseData);
        }

        catch(e){
            generateError(evt.target.search_input.value);
        }   
    }
})

function displayResults(responseData){
    console.log(document.querySelector("#movImage"));

    console.log(responseData.results);

    for(let i = 0; i < responseData.results.length; i++){

        document.getElementById("movImage").innerHTML += `<div id="movie_card">
        <img id="movie-poster" src="https://images.tmdb.org/t/p/w500${responseData.results[i].poster_path}">
            <div id="text_box">
                <p id="movie-votes">⭐${responseData.results[i].vote_average}</p>
                <p id="movie-title">${responseData.results[i].title}</p>
            </div>
        </div>`;
    }


}





