const input = document.getElementById("password");
const bar = document.getElementById("bar");
const text = document.getElementById("strengthText");
const info = document.getElementById("info");

const commonPasswords = [
  "password", "123456", "12345678", "123456789",
  "qwerty", "abc123", "password123",
  "admin", "admin123", "letmein",
  "welcome", "iloveyou", "000000",
  "111111", "123123", "login"
];

function isCommon(password) {
  const lower = password.toLowerCase();
  return commonPasswords.some(p =>
    lower === p || lower.includes(p)
  );
}

function entropy(password) {
  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^A-Za-z0-9]/.test(password)) pool += 32;
  return password.length * Math.log2(pool || 1);
}

input.addEventListener("input", () => {
  const pw = input.value;

  if (pw.length && isCommon(pw)) {
    bar.style.width = "100%";
    bar.style.background = "#ff0033";
    bar.style.boxShadow = "0 0 25px #ff0033";

    text.textContent = "VERY WEAK • COMMON PASSWORD";
    text.style.color = "#ff0033";
    text.style.textShadow = "0 0 18px #ff0033";

    info.textContent = "This password is commonly used and easily cracked.";
    return;
  }

  const e = entropy(pw);
  const percent = Math.min((e / 100) * 100, 100);

  let color, label;
  if (e < 28) { color = "#ff4d4d"; label = "VERY WEAK"; }
  else if (e < 36) { color = "#ff884d"; label = "WEAK"; }
  else if (e < 60) { color = "#ffe44d"; label = "FAIR"; }
  else if (e < 80) { color = "#6dff6d"; label = "STRONG"; }
  else { color = "#00ffd5"; label = "VERY STRONG"; }

  bar.style.width = percent + "%";
  bar.style.background = color;
  bar.style.boxShadow = `0 0 20px ${color}`;

  text.textContent = `${label} • ${e.toFixed(1)} BITS`;
  text.style.color = color;
  text.style.textShadow = `0 0 14px ${color}`;

  info.textContent = "Higher entropy = harder to crack";
});

function toggle() {
  input.type = input.type === "password" ? "text" : "password";
}

function generate() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]<>?";
  let pw = "";
  for (let i = 0; i < 16; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)];
  }
  input.value = pw;
  input.dispatchEvent(new Event("input"));
}