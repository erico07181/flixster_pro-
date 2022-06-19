let APIkey = "1855887f77c9265ce36d85e3d981773d";

let page = 1;

let movForm = document.querySelector("form");

let mainScreen = true;




const generateError = (err) => {
    document.lastChild.innerHTML += `
        <span style="color: red;">${err} not found</span>
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

    movSearch = evt.target.movies.value.split(' ').join('+');

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
        generateError(evt.target.movies.value);
    }
});

load_click.addEventListener("click", async(evt) => {
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
            generateError(evt.target.movies.value);
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
            generateError(evt.target.movies.value);
        }   
    }

    

})

function displayResults(responseData){
    console.log(document.querySelector("#movImage"));

    console.log(responseData.results);

    for(let i = 0; i < responseData.results.length; i++){
        movImage.innerHTML += `<img src="https://images.tmdb.org/t/p/w500${responseData.results[i].poster_path}">`;
        console.log(responseData.results[i].title)
        movImage.innerHTML += `<p>${responseData.results[i].title}</p>`
        movImage.innerHTML += `<p>⭐${responseData.results[i].vote_average}</p>`
    }

}





