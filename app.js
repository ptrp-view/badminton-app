const LIFF_ID = "2009035097-yQ2lNE9u";
const STORAGE_KEY = "badminton_members";

let currentUser = null;

async function init() {
  await liff.init({ liffId: LIFF_ID });

  if (!liff.isLoggedIn()) {
    document.getElementById("loginBtn").onclick = () => liff.login();
  } else {
    loadProfile();
  }

  document.getElementById("joinBtn").onclick = joinGroup;
  document.getElementById("leaveBtn").onclick = leaveGroup;

  renderMembers();
}

async function loadProfile() {
  const profile = await liff.getProfile();
  currentUser = profile;

  document.getElementById("profile").classList.remove("hidden");
  document.getElementById("avatar").src = profile.pictureUrl;
  document.getElementById("username").innerText = profile.displayName;

  document.getElementById("loginBtn").classList.add("hidden");

  checkJoined();
}

function getMembers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveMembers(members) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
}

function checkJoined() {
  const members = getMembers();
  const joined = members.find(m => m.userId === currentUser.userId);

  document.getElementById("joinBtn").classList.toggle("hidden", joined);
  document.getElementById("leaveBtn").classList.toggle("hidden", !joined);
}

function joinGroup() {
  const members = getMembers();

  if (members.find(m => m.userId === currentUser.userId)) return;

  members.push({
    userId: currentUser.userId,
    name: currentUser.displayName
  });

  saveMembers(members);
  renderMembers();
  checkJoined();

  document.getElementById("status").innerText = "✅ เข้าร่วมก๊วนแล้ว";
}

function leaveGroup() {
  let members = getMembers();
  members = members.filter(m => m.userId !== currentUser.userId);

  saveMembers(members);
  renderMembers();
  checkJoined();

  document.getElementById("status").innerText = "❌ ยกเลิกเรียบร้อย";
}

function renderMembers() {
  const list = document.getElementById("memberList");
  list.innerHTML = "";

  getMembers().forEach(m => {
    const li = document.createElement("li");
    li.innerText = m.name;
    list.appendChild(li);
  });
}

init();
