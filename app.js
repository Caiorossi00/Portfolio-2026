const stack = document.getElementById("stack");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const pages = ["home", "about", "resume", "credentials"];

let currentIndex = 0;
let isFirstLoad = true;
let isTransitioning = false;

function loadPageStyle(pageName) {
  const id = `page-style-${pageName}`;
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `views/${pageName}/${pageName}.css`;
  link.id = id;

  document.head.appendChild(link);
}

async function loadPage(index, direction = "next") {
  if (index < 0 || index >= pages.length) return;
  if (isTransitioning) return;

  isTransitioning = true;

  const pageName = pages[index];
  loadPageStyle(pageName);

  const currentPage = stack.querySelector(".page.active");
  const response = await fetch(`views/${pageName}/${pageName}.html`);
  const html = await response.text();

  const wrapper = document.createElement("section");
  wrapper.className = `page enter-${direction}`;
  wrapper.dataset.page = pageName;
  wrapper.innerHTML = html;

  stack.appendChild(wrapper);
  wrapper.offsetHeight;
  wrapper.classList.add("active");

  if (isFirstLoad) {
    stack.style.visibility = "visible";
    isFirstLoad = false;
  }

  if (currentPage) {
    currentPage.classList.remove("active");
    currentPage.classList.add(`exit-${direction}`);
    currentPage.addEventListener("transitionend", () => currentPage.remove(), {
      once: true,
    });
  }

  wrapper.addEventListener(
    "transitionend",
    async () => {
      isTransitioning = false;
      updateNavigation();

      if (pageName === "about") {
        const module = await import("./views/about/about.js");
        module.initAboutPage(wrapper);
      }
    },
    { once: true }
  );

  currentIndex = index;
}

function updateNavigation() {
  prevBtn.style.visibility = currentIndex === 0 ? "hidden" : "visible";
  nextBtn.style.visibility =
    currentIndex === pages.length - 1 ? "hidden" : "visible";
}

prevBtn.addEventListener("click", () => loadPage(currentIndex - 1, "prev"));
nextBtn.addEventListener("click", () => loadPage(currentIndex + 1, "next"));

document.addEventListener("keydown", (e) => {
  if (isTransitioning) return;
  if (e.key === "ArrowLeft") loadPage(currentIndex - 1, "prev");
  if (e.key === "ArrowRight") loadPage(currentIndex + 1, "next");
});

let scrollCooldown = false;
const scrollDelay = 500;
document.addEventListener("wheel", (e) => {
  if (isTransitioning || scrollCooldown) return;
  if (e.deltaY > 0) loadPage(currentIndex + 1, "next");
  else if (e.deltaY < 0) loadPage(currentIndex - 1, "prev");

  scrollCooldown = true;
  setTimeout(() => {
    scrollCooldown = false;
  }, scrollDelay);
});

stack.addEventListener("click", (e) => {
  const target = e.target.closest("[data-index]");
  if (!target) return;
  const index = Number(target.dataset.index);
  if (Number.isNaN(index)) return;
  loadPage(index, index > currentIndex ? "next" : "prev");
});

setTimeout(() => {
  const info = document.querySelector("#navbar p");
  if (info) info.remove();
}, 5000);

loadPage(1);
