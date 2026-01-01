const stack = document.getElementById("stack");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const pages = ["about", "resume", "credentials"];
let currentIndex = 0;
let isFirstLoad = true;
let isTransitioning = false;

async function loadPage(index, direction = "next") {
  if (index < 0 || index >= pages.length) return;
  if (isTransitioning) return;

  isTransitioning = true;

  const pageName = pages[index];
  const currentPage = stack.querySelector(".page.active");

  const response = await fetch(`views/${pageName}.html`);
  const html = await response.text();

  const wrapper = document.createElement("section");
  wrapper.className = `page enter-${direction}`;
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
    () => {
      isTransitioning = false;
    },
    { once: true }
  );

  currentIndex = index;
}

prevBtn.addEventListener("click", () => loadPage(currentIndex - 1, "prev"));

nextBtn.addEventListener("click", () => loadPage(currentIndex + 1, "next"));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") loadPage(currentIndex - 1, "prev");
  if (e.key === "ArrowRight") loadPage(currentIndex + 1, "next");
});

loadPage(currentIndex);
