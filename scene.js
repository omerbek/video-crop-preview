'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const mint = '#9ef4dc';
const amber = '#ffcb7d';
const ink = '#152129';
const duration = 8;

function rect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function label(value, x, y, size = 24, color = mint) {
  ctx.fillStyle = color;
  ctx.font = `600 ${size}px system-ui`;
  ctx.fillText(value, x, y);
}

function dot(x, y, radius, color = mint) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}


function render(t) {
  const sizes = [[192, 108, '16:9'], [145, 145, '1:1'], [108, 192, '9:16']];
  sizes.forEach(([w, h, ratio], i) => {
    const x = 140 + i * 214 - w / 2;
    const y = 212 - h / 2;
    rect(x, y, w, h, '#214640');
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    dot(x + w * (.5 + .27 * Math.sin(t)), 212, 21, amber);
    ctx.restore();
    label(ratio, x + 8, y + h + 28, 18);
  });
}

const seek = document.querySelector('#seek');
const play = document.querySelector('#play');
const time = document.querySelector('#time');
let position = 0;
let playing = false;
let previous = null;
let animationId = null;

function draw() {
  rect(0, 0, canvas.width, canvas.height, ink);
  render(position);
  seek.value = position;
  time.value = `${position.toFixed(2)} ${language === 'en' ? 's' : 'sn'}`;
}

function frame(timestamp) {
  if (!playing) return;
  if (previous !== null) position = (position + (timestamp - previous) / 1000) % duration;
  previous = timestamp;
  draw();
  animationId = requestAnimationFrame(frame);
}

play.addEventListener('click', () => {
  playing = !playing;
  updatePlaybackLabel();
  if (playing) {
    previous = null;
    animationId = requestAnimationFrame(frame);
  } else {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
});

seek.addEventListener('input', () => {
  position = Number(seek.value);
  draw();
});

document.querySelector('#save').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'video-crop-preview.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

const copy = {"title": ["Teslim kadrajları", "Video Crop Preview"], "description": ["Aynı kompozisyonun yatay, kare ve dikey kesimlerini karşılaştır.", "Preview three aspect ratios and crop a local video to MP4."], "preview": ["Seçili hareket deneyinin önizlemesi", "Animation preview"], "timeline": ["Zaman çizelgesi", "Timeline"], "settings": ["Sahne ayarları", "Scene settings"], "save": ["PNG indir", "Download PNG"], "cli": ["Dosyalarla çalışmak için crop.py komutunu kullan. Örnekler README içinde.", "Use crop.py for local files. See the repository README for examples."]};
const dictionary = {"Debi": "Flow", "ÇIKIŞ DEBİSİ": "OUTLET FLOW", "Normal çalışma": "Operating normally", "Ölçüm birimi görünür": "Unit is visible", "Durum etiketi okunur": "Status label is legible", "Geçiş sekiz saniyeye sığar": "Transition fits in eight seconds", "SU AKIŞI": "WATER FLOW", "Yalova · Su istasyonu": "Yalova · Water station", "İstasyon": "Station", "Komut": "Prompt", "Tohum": "Seed", "Örnekle": "Sample", "Çıktı": "Output", "Suyu sarı bir uyarı çizgisiyle anlat.": "Show the water as a yellow alert line.", "Akışı camgöbeği bir dalgaya dönüştür.": "Turn the flow into a cyan wave.", "Veriyi noktalardan oluşan bir haritaya işle.": "Map the data as a field of dots.", "Akış": "Flow", "Ölçüm": "Reading", "Mavi saat": "Blue hour", "Bakır günbatımı": "Copper sunset", "Yeşil şafak": "Green dawn", "Kare": "Frame", "Oynat": "Play", "Duraklat": "Pause"};
const fieldDefaults = {};
let language = 'tr';
function translate(value) {
  return language === 'en' ? (Object.hasOwn(dictionary, value) ? dictionary[value] : value) : value;
}
function updatePlaybackLabel() {
  play.textContent = translate(playing ? 'Duraklat' : 'Oynat');
}
function setLanguage(next) {
  const previousLanguage = language;
  language = next;
  document.documentElement.lang = next;
  const index = next === 'en' ? 1 : 0;
  document.title = copy.title[index];
  for (const item of document.querySelectorAll('[data-i18n]')) item.textContent = copy[item.dataset.i18n][index];
  for (const item of document.querySelectorAll('[data-i18n-label]')) item.setAttribute('aria-label', copy[item.dataset.i18nLabel][index]);
  for (const code of ['tr', 'en']) document.querySelector('#lang-' + code).setAttribute('aria-pressed', String(code === next));
  if (previousLanguage !== next) {
    for (const field of document.querySelectorAll('#settings input[type="text"]')) {
      const original = field.defaultValue;
      const english = Object.hasOwn(fieldDefaults, original) ? fieldDefaults[original] : original;
      if (field.value === (previousLanguage === 'en' ? english : original)) {
        field.value = next === 'en' ? english : original;
        field.dispatchEvent(new Event('input'));
      }
    }
  }
  updatePlaybackLabel();
  draw();
}
for (const code of ['tr', 'en']) document.querySelector('#lang-' + code).addEventListener('click', () => setLanguage(code));

setLanguage('tr');
