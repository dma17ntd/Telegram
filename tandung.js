// Hiển thị tin nhắn xem trước
document.getElementById('message').addEventListener('input', () => {
  const content = document.getElementById("message").value;
  document.getElementById("previewBubble").innerHTML = `<div style="background:#6e45e2;padding:10px 15px;border-radius:15px;margin:10px 0;max-width:80%;color:white">💬 ${content}</div>`;
});

// Loader ẩn sau khi tải
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

// Toggle chế độ sáng/tối
const body = document.body;
const themeIcon = document.getElementById("themeIcon");
document.getElementById("themeToggle").addEventListener("change", function () {
  body.classList.toggle("light-theme");
  themeIcon.className = body.classList.contains("light-theme") ? "fa fa-sun-o" : "fa fa-moon-o";
});

// Gửi thông tin qua Telegram
document.getElementById('messageForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const userName = document.getElementById('userName').value.trim();
  const message = document.getElementById('message').value.trim();
  const time = new Date().toLocaleString();

  if (!userName || !message) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  const telegramToken = 'YOUR_BOT_TOKEN'; // ← Thay bằng token thật
  const chatId = 'YOUR_CHAT_ID';          // ← Thay bằng chat ID thật

  const textMessage = `✨ *Thông tin mới*\n👤 Tên: ${userName}\n🕒 Thời gian: ${time}\n💬 Nội dung:\n${message}`;

  const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
  const data = {
    chat_id: chatId,
    text: textMessage,
    parse_mode: "Markdown"
  };

  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(result => {
    if (result.ok) {
      alert("Đã gửi tin nhắn!");
      document.getElementById("messageForm").reset();
    } else {
      alert("Có thể đang lỗi server⚠️");
    }
  })
  .catch(err => {
    console.error("Lỗi gửi:", err);
    alert("Đã xảy ra lỗi khi gửi!");
  });
});

// Giao diện theo thời gian
const hour = new Date().getHours();
if (hour >= 6 && hour < 18) {
  document.body.style.background = "radial-gradient(ellipse at bottom, #cfd9df 0%, #e2ebf0 100%)";
  document.body.style.color = "#333";
}

// Hiệu ứng typing cho tiêu đề
const titleText = "Gửi Thông Tin ";
let index = 0;
function typing() {
  if (index <= titleText.length) {
    document.getElementById("dynamicTitle").innerHTML = `<i class="fa-solid fa-paper-plane icon-wrapper"></i> ` + titleText.slice(0, index);
    index++;
    setTimeout(typing, 100);
  }
}
typing();

// Đếm lượt gửi và truy cập
let count = localStorage.getItem("sendCount") || 0;
document.querySelectorAll("p")[0].innerHTML += `: ${count}`;

document.getElementById("messageForm").addEventListener("submit", function () {
  count++;
  localStorage.setItem("sendCount", count);
  document.querySelectorAll("p")[0].innerHTML = `<i class="fa fa-send-o icon-wrapper"></i>Số lượt gửi: ${count}`;
});

let visit = localStorage.getItem("visitCount") || 1;
visit++;
localStorage.setItem("visitCount", visit);
document.querySelectorAll("p")[1].innerHTML = `<i class="fa fa-user-plus icon-wrapper"></i> Số người truy cập: ${visit}`;

// Ngăn F12, Ctrl+Shift+I...
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
    (e.ctrlKey && e.key.toUpperCase() === 'U')
  ) {
    e.preventDefault();
  }
});

// Hiệu ứng sao rơi
const colors = ['#ffffff', '#ff6ec7', '#6effe7', '#ffe56e', '#6e9eff', '#ff6e6e', '#aaff6e'];
const createStar = () => {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.left = Math.random() * 100 + "vw";
  star.style.animationDuration = (Math.random() * 3 + 2) + "s";
  star.style.opacity = Math.random();
  const size = Math.random() * 2 + 1;
  star.style.width = star.style.height = size + "px";
  const color = colors[Math.floor(Math.random() * colors.length)];
  star.style.background = color;
  star.style.boxShadow = `0 0 10px ${color}`;
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 6000);
}
setInterval(createStar, 100);
