// Giriş butonunu alalım
const loginButton = document.getElementById("login-button");
const devicesDiv = document.getElementById("devices");
const exitbutton = document.getElementById("exit-button")
const accountbutton = document.getElementById("account")
const PauseButton = document.getElementById("pause");
const StartButton = document.getElementById("play");
const ReloadButton = document.getElementById("reload");
const RefreshButton = document.getElementById("refresh");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const muteButton = document.getElementById("mute");
const voldownButton = document.getElementById("voldown");
const volupButton = document.getElementById("volup");
const thhbutton = document.getElementById("thh-button")
const plistbutton = document.getElementById("plist")
const thumb = document.getElementById("thumb")
const full_url = window.location.href
var url = window.location.origin+window.location.pathname
console.log(url)

// Giriş butonuna tıklanınca Spotify oturum açma sayfasına yönlendir
loginButton.addEventListener("click", () => {
    // Spotify izinleri ve oturum açma URL'si
    const scopes = "user-read-playback-state user-modify-playback-state";
    const redirectUri = url; // Bu kısmı kendi uygulamanızın geri dönüş URL'si ile değiştirin
    const authUrl = `https://accounts.spotify.com/authorize?client_id=a32624d1680147a09f703bcd8268b0db&response_type=token&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    // Kullanıcıyı oturum açma sayfasına yönlendir
    window.location.href = authUrl;
});

// URL'den hash kısmını al
const hash = window.location.hash;

// Hash içindeki parametreleri nesne olarak sakla
const params = {};
hash.substring(1).split("&").forEach(pair => {
    const [key, value] = pair.split("=");
    params[key] = decodeURIComponent(value);
});
var accessToken = params.access_token;

// Değerleri kontrol et
if (params.access_token) {

    const accessToken = params.access_token;
    const tokenType = params.token_type;
    const expiresIn = params.expires_in;

    // Çıktıları kontrol etmek için konsola yazdır
    console.log("Access Token:", accessToken);
    console.log("Token Type:", tokenType);
    console.log("Expires In:", expiresIn);
    setTimeout(userdata, 1000);
} else {
    console.log("Access Token bulunamadı.");
}

var id
function gecikmeliget() {
    id = setTimeout(getUserDataAndDisplayTrack, 10000)
    //console.log(id)
    //window.clearTimeout(id)
}
var singer
var trackName
var trackthumb
var volume
var playlisthref
// Butona tıklanma olayını dinleyelim
function getUserDataAndDisplayTrack() {
    const apiEndpoint = "https://api.spotify.com/v1/me/player";
    const requestoptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    };

    fetch(apiEndpoint, requestoptions)
        .then(response => response.json())
        .then(data => {
            console.log("API Cevabı:", data);
            const type = data.currently_playing_type
            if (type === "track") {
                singer = data.item.artists[0].name
                trackName = data.item.name;
                trackthumb = data.item.album.images[0].url
                volume = data.device.volume_percent
                try {
                    playlisthref = data.context.href
                    playlistdetailsdisplay(href=playlisthref)
                } catch (error) {
                    plistbutton.style.display = "none"
                }
                document.cookie = `volume= ${volume}`
                document.getElementById("current-track").innerHTML = trackName;
                document.getElementById("singer").innerHTML= singer;
                document.getElementById("thumb").src=trackthumb

            }
            else {
                volume = data.device.volume_percent
                document.cookie = `volume= ${volume}`
                document.getElementById("current-track").innerHTML = "podcast";
                document.getElementById("singer").innerHTML= "maalesef podcast ayrıntılarını göstermiyoruz ...";
                document.getElementById("thumb").src=  '/beta/icerikler/podcast.png'
            }
    window.clearTimeout(id)
    gecikmeliget()
        })
        .catch(error => {
            console.error("API Hatası:", error);
            document.getElementById("singer").innerHTML = "Hala olmadıysa gir çık yap (cidden düzeliyor)."
            document.getElementById("current-track").innerHTML = "Hata: Eğer açmadıysan önce Spotify’den bir şey aç.";
            document.getElementById("thumb").src='/beta/icerikler/Rickrolling-in-4K.jpg'
            plistbutton.style.display = "none"
        });
};

var plsiturl

function playlistdetailsdisplay (href) {
    const apiEndpoint = href;
    const requestoptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    };

    fetch(apiEndpoint, requestoptions)
        .then(response => response.json())
        .then(data => {
            const plistname = data.name
            const plsitico = data.images[0].url
            plsiturl = data.external_urls.spotify
            plistbutton.style.display = "block"
            document.getElementById("plist").innerHTML = `<img src="${plsitico}" width="30px" style="border-radius: 20%" id="plistthumb">  ${plistname}`;
        })
        .catch(error => {
            console.log("aga cinayet var")
        });
}

var pp
var username
function userdata() {
    const apiEndpoint = "https://api.spotify.com/v1/me";
    const requestoptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    };

    fetch(apiEndpoint, requestoptions)
        .then(response => response.json())
        .then(data => {
            console.log("API Cevabı:", data);
            username = data.display_name
            try {
                pp = data.images[0].url
                console.log(pp)
                loginButton.innerHTML = `<img src="${pp}" style="height: 24px; width: 24px;margin:5px;border-radius: 40%"></img>`+ username
            } catch (error) {
                loginButton.innerHTML = `<img src="/beta/icerikler/Spotify_Icon_RGB_White.png" style="height: 24px; width: 24px;margin:5px;border-radius: 40%"></img>`+ username
            }
            exitbutton.style.display = "block";
            accountbutton.style.display = "block";
            document.getElementById("current-track").innerHTML = "Şimdi ise sağ alttaki yenileme tuşuna bas.";
            document.getElementById("singer").innerHTML = "Evet, haklısın biraz fazla avellik";
            document.getElementById("thumb").src='/beta/icerikler/level2.png'
        })
        .catch(error => {
            console.error("API Hatası:", error);
        });
        setTimeout(getUserDataAndDisplayTrack(), 15000)
}

PauseButton.addEventListener("click", () => {
    // API isteği için gerekli ayarlar
    const apiEndpoint = "https://api.spotify.com/v1/me/player/pause"; // Örnek API endpoint
    const requestoptions = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    };
    // API isteği yapma
    fetch(apiEndpoint, requestoptions)
        .then(response => response.json()) // JSON formatında parse et
        .then(data => {
            console.log("API Cevabı:", data);
        })
        .catch(() => {
        });
    setTimeout(getUserDataAndDisplayTrack, 1000)
});

StartButton.addEventListener("click", () => {
    // API isteği için gerekli ayarlar
    const apiEndpoint = "https://api.spotify.com/v1/me/player/play"; // Örnek API endpoint
    const requestoptions = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    };
    // API isteği yapma
    fetch(apiEndpoint, requestoptions)
        .then(response => response.json()) // JSON formatında parse et
        .then(data => {
            console.log("API Cevabı:", data);
        })
        .catch(() => {
        });
    setTimeout(getUserDataAndDisplayTrack, 1000)
});

nextButton.addEventListener("click", () => {
    // API isteği için gerekli ayarlar
    const apiEndpoint = "https://api.spotify.com/v1/me/player/next"; // Örnek API endpoint
    const requestoptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    };
    // API isteği yapma
    fetch(apiEndpoint, requestoptions)
        .then(response => response.json()) // JSON formatında parse et
        .then(data => {
            console.log("API Cevabı:", data);
        })
        .catch(() => {
        });
    setTimeout(getUserDataAndDisplayTrack, 1000)
});

previousButton.addEventListener("click", () => {
    // API isteği için gerekli ayarlar
    const apiEndpoint = "https://api.spotify.com/v1/me/player/previous"; // Örnek API endpoint
    const requestoptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    };
    // API isteği yapma
    fetch(apiEndpoint, requestoptions)
        .then(response => response.json()) // JSON formatında parse et
        .then(data => {
            console.log("API Cevabı:", data);
        })
        .catch(() => {
        });
    setTimeout(getUserDataAndDisplayTrack, 1000)
});

RefreshButton.addEventListener("click", () => {
    window.clearTimeout(id)
    getUserDataAndDisplayTrack()
    window.clearTimeout(id)
})

thhbutton.addEventListener("click", () => {
    const podurl = 'https://open.spotify.com/show/1hExfvB0UnSuwDVhOSE4Oh'
    window.open(
        podurl, "_blank");
})

plistbutton.addEventListener("click", () => {
    window.open(
     plsiturl, "_blank");
})