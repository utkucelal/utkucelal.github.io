code = document.getElementById("code")

function getCookie(cname) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cname}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function createCookie(cname, cvalue) {
; // 3600 seconds in milliseconds
    document.cookie = cname + "=" + cvalue+ ";secure";
  }

var accessToken = getCookie(cname= "accessToken")

if(accessToken){
    console.log("User is authenticated")
}
else{
    createCookie(cname="notsite",cvalue=window.location.href)
    window.location.href = window.location.href = window.location.origin+"/callback.html"
}

function copyToClipboard() {
    if (accessToken) {
        var copyText = accessToken;
        var tempInput = document.createElement("input");
        tempInput.value = copyText;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        alert("Copied the text: " + copyText);
    } else {
        alert("No access token available to copy.");
    }
}
// write the access token to the page so that the user can copy it
code.innerHTML = accessToken
