/**
 * Created by TTAK on 18/03/16.
 */

var herocoliAuth = {};
herocoliAuth.tokendId = false;
herocoliAuth.sessionId = false;

herocoliAuth.postSession = function(){
    console.log("http://api.herocoli.com:54321/session/"+this.tokendId+"/"+this.sessionId+"/");
    httpGetAsync("http://api.herocoli.com:54321/session/"+this.tokendId+"/"+this.sessionId+"/", readResulst);
};

herocoliAuth.authReady = function(tokenId){
    this.tokendId = tokenId;
    if(this.sessionId != false){
        this.postSession();
    }
};

herocoliAuth.sessionReady = function(sessionId){
    this.sessionId = sessionId;
    if(this.tokendId != false){
        this.postSession();
    }
};

function postSessionId(sessionId){
    herocoliAuth.sessionReady(sessionId);
}

/**
 * This function is called when an user log in
 * @param googleUser the google user return by the google API SingleSignIn process
 */
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    document.getElementsByClassName("clear")[0].style.position = "absolute";
    document.getElementsByClassName("clear")[0].style.top = "50%";
    herocoliAuth.authReady(id_token);
    console.log(redmetrics.playerId);
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



