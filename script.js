let APIkey = "1855887f77c9265ce36d85e3d981773d";


let movForm = document.querySelector("form");

//let url = `https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&query=Jack+Reacher`;


const generateError = (err) => {
    document.lastChild.innerHTML += `
        <span style="color: red;">${err} not found</span>
    `;
}

movForm.addEventListener("submit", async(evt) => {
    evt.preventDefault();


    movSearch = evt.target.movies.value.split(' ').join('+');

    console.log(movSearch);

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&query=${movSearch}`;

    //https://images.tmdb.org/t/p/w500

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

function displayResults(responseData){
    console.log(document.querySelector("#movImage"));

    console.log(responseData.results);

    for(let i = 0; i < responseData.results.length; i++){
        movImage.innerHTML += `<img src="https://images.tmdb.org/t/p/w500${responseData.results[i].poster_path}">`;
        console.log(responseData.results[i].title)
        movImage.innerHTML += `<p>${responseData.results[i].title}</p>`
    }
}





