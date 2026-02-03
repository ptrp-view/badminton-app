import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const LIFF_ID = "2009035097-yQ2lNE9u";
const GROUP_ID = "today-group";

async function initAdmin() {
  await liff.init({ liffId: LIFF_ID });
  if (!liff.isLoggedIn()) liff.login();
  renderMembers();
}

async function renderMembers() {
  const snap = await getDocs(
    collection(db, "groups", GROUP_ID, "members")
  );

  const list = document.getElementById("adminMemberList");
  list.innerHTML = "";

  snap.forEach(d => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${d.data().name}
      <button onclick="remove('${d.id}')">ลบ</button>
    `;
    list.appendChild(li);
  });
}

window.remove = async (id) => {
  await deleteDoc(
    doc(db, "groups", GROUP_ID, "members", id)
  );
  renderMembers();
};

initAdmin();
