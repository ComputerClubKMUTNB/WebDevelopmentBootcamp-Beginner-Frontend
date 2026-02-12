const apiUrl = 'http://localhost:3000';

function buttonHandler(){
    fetch(apiUrl + "/items")
    .then((response) => response.json())
    .then((data) => {
        console.log('data :>> ', data);
    })
}