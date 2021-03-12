const form = document.getElementById("shortenForm");
const input = document.getElementById("inp");
const errorMsg = document.getElementById("error");
const loading = document.getElementById("loading");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copy");
const hamburger = document.getElementById("hamburger");
const modal = document.getElementById("modal");

const url = "https://api.shrtco.de/v2/shorten?url=";

const shorten = async (link) => {
  loading.classList.add("active");
  result.classList.remove("active");

  try {
    const response = await fetch(url + link);
    const shorten = await response.json();

    loading.classList.remove("active");
    if (shorten.ok) {
      result.classList.add("active");
      result.firstElementChild.innerHTML = shorten.result.original_link;
      result.children[1].setAttribute("href", shorten.result.full_short_link2);
      result.children[1].innerHTML = shorten.result.full_short_link2;
      input.value = "";
    } else {
      errorMsg.innerHTML = shorten.error;
      error();
    }
  } catch (error) {
    console.log(error);
  }
};

const error = () => {
  form.classList.add("error");
  setTimeout(() => {
    form.classList.remove("error");
    errorMsg.innerHTML = "Please add a link";
  }, 4000);
};

form.addEventListener(
  "invalid",
  (() => {
    return (e) => {
      e.preventDefault();
      error();
    };
  })(),
  true
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  shorten(input.value);
});

copyBtn.addEventListener("click", () => {
  copyBtn.classList.add("copied");
  copyBtn.innerHTML = "Copied!";
  navigator.clipboard.writeText(result.children[1].innerHTML);

  setTimeout(() => {
    copyBtn.classList.remove("copied");
    copyBtn.innerHTML = "Copy";
  }, 2000);
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  modal.classList.toggle("active");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    hamburger.classList.remove("active");
    modal.classList.remove("active");
  }
});
