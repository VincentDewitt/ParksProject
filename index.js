'use strict';

const searchURL = 
    'https://developer.nps.gov/api/v1/parks';

const apikey = 'Vda0y9avGYSwIvj1Pts7Y0yHVh6aanqzPphVSubg';


function getParksinfo(searchTerm, maxResults=10){
    const params = {
    stateCode : searchTerm,
    api_key : apikey,
    };
    const queryString = formatParams(params)
    const url = searchURL + '?' + queryString;
    console.log(url);

    fetch(url)
    .then(response => {
        if (response.ok){
            return response.json();
        }
        throw new Error ("Something went wrong.")
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
$('results-list').empty();
for (let i=0; i< responseJson.items.length; i++){
    $('results-list').append(
        `<li><h3>${responseJson.items[i].fullName}</h3></li>`
    )};
$('#results').removeClass('hidden');
}

function formatParams(params){
    //stateCode=CA&api_key=
    const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');

}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-state').val();
        const maxResults = $('#js-max-results').val();
        console.log(searchTerm);
        getParksinfo(searchTerm, maxResults);

    });
}
watchForm();
