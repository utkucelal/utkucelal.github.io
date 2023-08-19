document.addEventListener('DOMContentLoaded', function() {
document.getElementById("start-btn").addEventListener("click", function() {
  var checkboxes = document.querySelectorAll('input[name=subject]:checked');
  if (checkboxes.length === 0) {
    alert('aga ders yok');
    return;
  }
  for (var i = 0; i < checkboxes.length; i++) {
    var value = checkboxes[i].value;
    if (value === "matematik") {
      window.open("https://www.youtube.com/@MatematiginGulerYuzu");
      window.open("https://www.youtube.com/playlist?list=PLVoSZ0D0CB3qumKpYrmwu5bXZx2AEPteH");
    } else if (value === "biyoloji") {
      window.open("https://www.youtube.com/@BARISHOCABIYOLOJI");
      window.open("https://www.youtube.com/playlist?list=PLpxUDBelD0KUm7ano7BpyanpdnMiJ-URf");
    } else if (value === "fizik") {
      window.open("https://www.youtube.com/playlist?list=PLw6C1pT6u509A1Jd_h7swPEV9ynodUYEK");
      window.open("https://www.youtube.com/playlist?list=PLpxUDBelD0KWVmr4Ff_IqoxKdCngFNc1a");
    } else if (value === "kimya") {
      window.open("https://www.youtube.com/playlist?list=PLSpJ0wMFysE5zDmaOfQdubERoyWffoRXu");
      window.open("https://www.youtube.com/playlist?list=PLpxUDBelD0KVmroALbIYMh1oVfP53A-O5");
    }
    else if (value === "pomodoro") {
      window.open("chrome-extension://elkehbokdlnbdookgpphfkinomjdagpk/index.html");
    }
  }
});
});