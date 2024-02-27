const text1_options = [
  "В наличии новые цвета",
  "Самый мощный процессор",
  "Новое поколение часов"
];
const text2_options = [
  "Топовый флагман Apple 2023 года, который не стали переименовывать в iPhone 15 Ultra. Ему нет равных ни в дизайне, ни в характеристиках, ни в цене.",
  "Последний обновленный MacBook Pro от Apple предлагает более широкий набор процессоров, более низкую цену и новый вариант черного цвета, а также еще большую производительность и время автономной работы.",
  "Apple Watch Series 9 — новейшая версия самых популярных в мире часов. С новым чипом S9 они стали ещё более мощными, а ещё поддерживают контроль через двойное касание пальцами в воздухе.",
];
// const color_options = ["#EBB9D2", "#cdc8c5", "#7FE0EB", "#6CE5B1"];

const color_options = [
  'transparent', 'transparent', 'transparent',
]
const image_options = [
  "../images/slider/iphone-15.png",
  "../images/slider/macbook.png",
  "../images/slider/watch9.png",
];
var i = 0;
const currentOptionText1 = document.getElementById("current-option-text1");
const currentOptionText2 = document.getElementById("current-option-text2");
const currentOptionImage = document.getElementById("image");
const carousel = document.getElementById("carousel-wrapper");
const mainMenu = document.getElementById("menu");
const optionPrevious = document.getElementById("previous-option");
const optionNext = document.getElementById("next-option");

currentOptionText1.innerText = text1_options[i];
currentOptionText2.innerText = text2_options[i];
currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
mainMenu.style.background = color_options[i];

optionNext.onclick = function () {
  i = i + 1;
  i = i % text1_options.length;
  currentOptionText1.dataset.nextText = text1_options[i];

  currentOptionText2.dataset.nextText = text2_options[i];

  mainMenu.style.background = color_options[i];
  carousel.classList.add("anim-next");

  setTimeout(() => {
    currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
  }, 455);

  setTimeout(() => {
    currentOptionText1.innerText = text1_options[i];
    currentOptionText2.innerText = text2_options[i];
    carousel.classList.remove("anim-next");
  }, 650);
};

optionPrevious.onclick = function () {
  if (i === 0) {
    i = text1_options.length;
  }
  i = i - 1;
  currentOptionText1.dataset.previousText = text1_options[i];

  currentOptionText2.dataset.previousText = text2_options[i];

  mainMenu.style.background = color_options[i];
  carousel.classList.add("anim-previous");

  setTimeout(() => {
    currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
  }, 455);

  setTimeout(() => {
    currentOptionText1.innerText = text1_options[i];
    currentOptionText2.innerText = text2_options[i];
    carousel.classList.remove("anim-previous");
  }, 650);
};
