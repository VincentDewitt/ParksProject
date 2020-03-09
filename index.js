'use strict';

const searchURL = 
    'https://developer.nps.gov/api/v1/parks';

const apikey = 'Vda0y9avGYSwIvj1Pts7Y0yHVh6aanqzPphVSubg';


function getParksinfo(searchTerm, maxResults=10){
    const params = {
    stateCode : searchTerm,
    api_key : apikey,
    limit: maxResults,
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
$('#results-list').empty();
console.log(responseJson);
for (let i=0; i< responseJson.data.length; i++){
    $('#results-list').append(
        `<li><h3>${responseJson.data[i].fullName}</h3></li>
        <li><p>${responseJson.data[i].description}</p>
        <a href="${responseJson.data[i].url}"> Link to website</a>`
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
