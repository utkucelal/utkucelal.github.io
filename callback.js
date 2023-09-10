const full_url = window.location.href
var url = window.location.href
const actokenexist = window.location.href.includes("access_token")

var accessToken
var hash
window.onload = function() {
if(actokenexist == true){
    // URL'den hash kısmını al
    const hash = window.location.hash;

    // Hash içindeki parametreleri nesne olarak sakla
    const params = {};
    hash.substring(1).split("&").forEach(pair => {
    const [key, value] = pair.split("=");
    params[key] = decodeURIComponent(value);
    });
    var accessToken = params.access_token;
    document.cookie = `accessToken= ${accessToken}`;
    window.location.href = window.location.origin
}else {
    const scopes = "user-read-playback-state user-modify-playback-state";
    const redirectUri = url; 
    const authUrl = `https://accounts.spotify.com/authorize?client_id=a32624d1680147a09f703bcd8268b0db&response_type=token&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    // Kullanıcıyı oturum açma sayfasına yönlendir
    window.location.href = authUrl;
}
}