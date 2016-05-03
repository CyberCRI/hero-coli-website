/**
 * Created by TTAK on 18/03/16.
 */

/**
 * This function is called when an user log in
 * @param googleUser the google user return by the google API SingleSignIn process
 */
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    gUser = googleUser;
    //TODO show the game
    //TODO hide the button
}

function readResulst(status, response) {
    if(status){
        console.log('Backend response : ' + response);
    }else{
        console.log('Backend error');
    }
}

/**
 * Simple HTTP Get asynchronous function
 * @param url url of the get request
 * @param callback the callback function which is going to be called when the response arrive
 */
function httpGetAsync(url, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4){
            if(xmlHttp.status == 200){
                callback(true, xmlHttp.responseText);
            }else{
                callback(false, null);
            }
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

function signIn(sessionID){
    var profile = gUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    var id_token = gUser.getAuthResponse().id_token;
    httpGetAsync("ttak.chzo.fr:54321/session/"+id_token+"/"+sessionID+"/", readResulst);
}