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
const P0B = document.getElementById("p0B")
const P1B = document.getElementById("p1B")
const P2B = document.getElementById("p2B")
const P3B = document.getElementById("p3B")
const P0img = document.getElementById("p0img")
const P1img = document.getElementById("p1img")
const P2img = document.getElementById("p2img")
const P3img = document.getElementById("p3img")
const plistbuttons = document.getElementById("plist_buttons")
const header = document.getElementById("title")
const background = document.getElementById("backgroundBody")
const infocard = document.getElementById("infocard")
const info = document.getElementById("info")
const textbody = document.getElementById("textBody")
const full_url = window.location.href
var url = window.location.origin+window.location.pathname
console.log(url)

function getCookie(cname) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cname}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

loginButton.addEventListener("click", () => {
    window.location.href = window.location.origin+"/callback.html"
});
var accessToken = getCookie(cname= "accessToken")

// Değerleri kontrol et
if (accessToken) {
    // Çıktıları kontrol etmek için konsola yazdır
    console.log("spotiy bağlantısı başarılı");
    setTimeout(userdata, 1000);
} else {
    console.log("Access Token bulunamadı.");
}

window.onload = function() {
    const usertheme = getCookie(cname= "theme")
    themechanger(theme = usertheme)
}

var id
function gecikmeliget() {
    id = setTimeout(getUserDataAndDisplayTrack, 10000)
}
var singer
var trackName
var trackthumb
var volume
var playlisthref
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
                if (trackName == "Never Gonna Give You Up"){
                    trackthumb = "/beta/icerikler/rickroll-roll.gif"
                    }
                else{
                    trackthumb = data.item.album.images[0].url
                }
                volume = data.device.volume_percent
                try {
                    playlisthref = data.context.href
                    playlistdetailsdisplay(href=playlisthref)
                } catch (error) {
                    plistbutton.style.display = "none"
                }
                document.cookie = `volume= ${volume}`
                document.getElementById("current-track").innerHTML = trackName;
                header.innerHTML = trackName;
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
    if (href == "https://api.spotify.com/v1/me/tracks") {
        const plistname = " Beğenilenler"
        const plsitico = "/beta/icerikler/liked.png"
        plsiturl = "https://open.spotify.com/collection/tracks"
        plistbutton.style.display = "block"
        document.getElementById("plist").innerHTML = `<img src="${plsitico}" width="30px" style="border-radius: 20%" id="plistthumb">  ${plistname}`;
    }else{
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
            infocard.style.display = "none"
            textbody.style.top = "50%"

        })
        .catch(error => {
            console.error("API Hatası:", error);
        });
        window.clearTimeout(id)
        setTimeout(getUserDataAndDisplayTrack(), 15000)
        setTimeout(userplists(), 15000)
}

var p0uri
var p1uri
var p2uri
var p3uri
function userplists () {
    const apiEndpoint = "https://api.spotify.com/v1/me/playlists?limit=5";
    const requestoptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    };
    fetch(apiEndpoint, requestoptions)
        .then(response => response.json())
        .then(data => {
            console.log(data.items)
            // resim çekme data.items[0].images[0].url
            // id çekme data.items[0].id
            //id tanımlama
            p0uri = data.items[0].uri
            p1uri = data.items[1].uri
            p2uri = data.items[2].uri
            p3uri = data.items[3].uri
            //kapakları göster
            plistbuttons.style.display = "block" // plistleri göster
            P0B.innerHTML = `<img src="${data.items[0].images[0].url}" width="60px" id="p0img" style="border-radius: 20%;" title="${data.items[0].name}">`;
            P1B.innerHTML = `<img src="${data.items[1].images[0].url}" width="60px" id="p0img" style="border-radius: 20%;" title="${data.items[1].name}">`;
            P2B.innerHTML = `<img src="${data.items[2].images[0].url}" width="60px" id="p0img" style="border-radius: 20%;" title="${data.items[2].name}">`;
            P3B.innerHTML = `<img src="${data.items[3].images[0].url}" width="60px" id="p0img" style="border-radius: 20%;" title="${data.items[3].name}">`;
        })
        .catch(error => {
            console.error("API Hatası:", error);

        });
}

function startplist (uri) {
    const apiEndpoint = "https://api.spotify.com/v1/me/player/play";
    const requestoptions = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            'context_uri': uri,
            'position_ms': 0
          })
    };

    fetch(apiEndpoint, requestoptions)
        .then(response => response.json())
        .then(data => {
            console.log("API Cevabı:", data);
        })
        .catch(error => {
        });
        setTimeout(getUserDataAndDisplayTrack, 1000)
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

P0B.addEventListener("click", () => {console.log("p0") 
startplist(uri= p0uri)} )

P1B.addEventListener("click", () => {console.log("p1") 
startplist(uri= p1uri)} )

P2B.addEventListener("click", () => {console.log("p2") 
startplist(uri= p2uri)} )

P3B.addEventListener("click", () => {console.log("p3") 
startplist(uri= p3uri)} )

exitbutton.addEventListener("click", () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = window.location.origin
})

info.addEventListener("click", () => {
    if(infocard.style.display == "none"){
        infocard.style.display = "block"
        textbody.style.top = "35%"
        console.log("infocard açıldı")
    }else{
        infocard.style.display = "none"
        textbody.style.top = "50%"
        console.log("infocard kapandı")
    }
})

function themechanger(theme) {
    if (theme == undefined){
        var theme = document.getElementById("theme").value;
        
    }
    if (theme == "witch"){
        yearCookie(yname="theme", ythemevalue=theme)
        document.getElementById("backgroundBody").style.background = 'linear-gradient(315deg, #c31432, #240b36)'
    }

    if (theme == "twilight"){
        yearCookie(yname="theme", ythemevalue=theme)
        document.getElementById("backgroundBody").style.background = 'linear-gradient(315deg, #0f0c29, #302b63, #24243e)'
    }

    if(theme == "atlas"){
        yearCookie(yname="theme", ythemevalue=theme)
        document.getElementById("backgroundBody").style.background = 'linear-gradient(315deg, #FEAC5E, #C779D0, #4BC0C8)'
    }

    if (theme == "classic"){
        yearCookie(yname="theme", ythemevalue=theme)
        document.getElementById("backgroundBody").style.background = 'linear-gradient(315deg, rgb(143, 36, 236), rgb(100, 12, 248), rgb(148, 40, 244))'
    }
  }

function yearCookie(yname, yvalue) {
    var date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year in milliseconds
    var expires = "; expires=" + date.toUTCString();
    document.cookie = yname + "=" + yvalue + expires + ";secure";
}
  

function testfunc(test){
    if (test == undefined){
        console.log("değer yok")
    }
}