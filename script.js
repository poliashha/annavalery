const scriptURL =
  "https://script.google.com/macros/s/AKfycbybIOFuD2nd9Sfr8lpVma2TGprvSBnot4imEf0dl7v7_50avlyGXUWYAbHP2RnmTNAGjg/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const formSendResult = document.querySelector(".form-send");
  formSendResult.textContent = "";
  const drinks = formData.getAll("drinks");
  const submitButton = document.querySelector(".button");
  submitButton.textContent = "Отправка...";
  // Преобразуем массив в строку с разделителем (например, запятая)
  const drinksString = drinks.join(", ");

  // Создаем новый FormData и добавляем все поля
  const newFormData = new FormData();
  newFormData.append("name", formData.get("name"));
  newFormData.append("presence", formData.get("presence"));
  newFormData.append("eat", formData.get("eat") || "-");
  newFormData.append("drinks", drinksString);
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: newFormData,
    });
    formSendResult.textContent = "Спасибо! Анкета отправлена.";
    form.reset(); // Очищаем форму
  } catch (error) {
    formSendResult.textContent = "Повторите попытку позже.";
    console.error(error);
  } finally {
    // Возвращаем кнопку в исходное состояние
    submitButton.textContent = "Отправить";
  }
});

const nameInput = document.getElementById("name");
const errorElement = document.getElementById("error-text");

nameInput.addEventListener("invalid", function (event) {
  event.preventDefault();
  if (this.validity.valueMissing) {
    errorElement.classList.add("show");
  }
});

nameInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    errorElement.classList.remove("show");
  }
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("invalid", function (e) {
    e.preventDefault();
    document.getElementById("presenceError").classList.add("show");
    return false;
  });
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    document.getElementById("presenceError").classList.remove("show");
  });
});

const button = document.querySelector(".button");
const mapbutton = document.querySelector(".map-button");
button.addEventListener("touchstart", function (e) {
  this.classList.add("touch-pressed");
});

button.addEventListener("touchend", function (e) {
  this.classList.remove("touch-pressed");
});
mapbutton.addEventListener("touchstart", function (e) {
  this.classList.add("touch-pressed");
});

mapbutton.addEventListener("touchend", function (e) {
  this.classList.remove("touch-pressed");
});

const convertWrapper = document.getElementById("convertWrapper");
const animationContainer = document.getElementById("animationContainer");
const clickArea = document.getElementById("clickArea");
const mainContent = document.getElementById("mainContent");
const body = document.body;

let animationStarted = false;

function startAnimation() {
  if (animationStarted) return;
  animationStarted = true;

  console.log("Анимация запущена!");

  // ЗАПУСКАЕМ АНИМАЦИЮ
  animationContainer.classList.add("animate");

  // РАЗБЛОКИРУЕМ ПРОКРУТКУ (убираем класс no-scroll)
  body.classList.remove("no-scroll");

  setTimeout(() => {
    convertWrapper.classList.add("hidden");
    mainContent.classList.add("visible");
    console.log("Анимация завершена, конверт скрыт");
  }, 900);

  setTimeout(() => {
    convertWrapper.remove();
  }, 1500);
}

// Клик по области конверта запускает анимацию и разблокирует прокрутку
clickArea.addEventListener("click", startAnimation);
animationContainer.addEventListener("click", startAnimation);

const audio = new Audio("./audio/music.mp3");
audio.loop = true;
audio.volume = 0.5;

const btn = document.getElementById("audioBtn");
const img = btn.querySelector(".music");
let isPlaying = false;

// Пытаемся запустить музыку при загрузке


// Управление по клику
btn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    img.data = "./img/off.svg";
  } else {
    audio.play();
    isPlaying = true;
    img.data = "./img/on.svg";
  }
});

document.body.addEventListener(
  "click",
  function firstClick() {
    if (!isPlaying && audio.paused) {
      audio.play();
      isPlaying = true;
      img.data = "./img/on.svg";
    }
    document.body.removeEventListener("click", firstClick);
  },
  { once: true },
);