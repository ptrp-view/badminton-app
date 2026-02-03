const LIFF_ID = "2009035097-yQ2lNE9u";

async function start() {
  try {
    await liff.init({ liffId: LIFF_ID });

    if (!liff.isLoggedIn()) {
      document.getElementById("loginBtn").style.display = "block";
      document.getElementById("loginBtn").onclick = () => {
        liff.login();
      };
    } else {
      showProfile();
    }
  } catch (err) {
    alert("LIFF init error");
    console.error(err);
  }
}

async function showProfile() {
  const profile = await liff.getProfile();

  document.getElementById("loginBtn").style.display = "none";
  document.getElementById("joinBtn").style.display = "block";

  document.getElementById("status").innerText =
    "👤 สวัสดี " + profile.displayName;
}

start();
