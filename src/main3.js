document.getElementById("btn_get_repos").addEventListener('click', () => {
    console.log('--- Start ---');
    getDate();
} );

let logo = document.getElementById('logo');
let image = document.createElement("img");

const getDate = () =>{
    $.ajax({
        type: "GET",
        url: "https://api.github.com/users",
        dataType: "json",
        success: function(result) {
            console.log('!!!!' + result);
            drawUsers(result);
        }
})}

function drawUsers(users) {
    let html = '';
    let us = '';
    let arlavatarImage = '';
    //console.log(users);
    for (i in users) {
        us = users[i].login;
        arlavatarImage = users[i].avatar_url;
        //console.log('-----' + users[i]);
        console.log(users[i]);
        html += '<div class="list-group-item">'
                    + '<div class="list-group-item-img">'
                        + '<a target="blank" href="https://github.com/' + users[i].login + '">'
                            + '<img class="img-thumbnail" src="' + users[i].avatar_url + '">'
                        + '</a>'
                    + '</div>'
                    + '<div class="list-group-item-text">'
                            + '<div class="list-group-item-text-login">' 
                                + '<span>login: </span>'
                                    + '<a target="blank" href="https://github.com/' + users[i].login + '">' + users[i].login + '</a>'
                            + '</div>'
                            + '<p class="name-item">Name: </p>'
                            + '<p>email: </p>'
                    + '</div>'
                + '</div>';
    }
    $('.item-list').html(html);
}