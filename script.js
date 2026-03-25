const products = [
  {
    id: 3,
    title: "3번 유아용 물감",
    description: "물에 잘 지워지는 물감(타이거 워터페인트)",
    image: "images/03_item.jpg",
    link: "https://link.coupang.com/a/ebi8h0",
  },
  {
    id: 2,
    title: "2번 코코피트 블럭",
    description: "코코넛 껍질 기반 배양토",
    image: "images/02_item.jpg",
    link: "https://link.coupang.com/a/ebdKOM",
  },
  {
    id: 1,
    title: "1번 전자레인지 1인 밥솥",
    description: "자취생용 간편 조리 아이템",
    image: "images/01_item.jpg",
    link: "https://link.coupang.com/a/eaP83M",
  }
];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const sortLatestBtn = document.getElementById("sortLatestBtn");
const sortNameBtn = document.getElementById("sortNameBtn");

let currentSort = "latest";
let currentKeyword = "";

function getFilteredProducts() {
  let items = [...products];

  if (currentKeyword) {
    items = items.filter(p =>
      p.title.toLowerCase().includes(currentKeyword) ||
      p.description.toLowerCase().includes(currentKeyword)
    );
  }

  if (currentSort === "latest") {
    items.sort((a, b) => b.id - a.id);
  } else if (currentSort === "name") {
    items.sort((a, b) => a.title.localeCompare(b.title, "ko"));
  }

  return items;
}

function renderProducts(items) {
  productList.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.className = "product-card";

    li.innerHTML = `
      <a class="product-link" href="${item.link}" target="_blank" rel="noopener noreferrer">
        <img class="product-thumb" src="${item.image}" alt="${item.title}" />
        <div class="product-copy">
          <h3 class="product-title">${item.title}</h3>
          <p class="product-desc">${item.description}</p>
        </div>
      </a>
    `;

    productList.appendChild(li);
  });

  resultCount.textContent = `${items.length}개 상품`;

  if (items.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}

function updateView() {
  const items = getFilteredProducts();
  renderProducts(items);
}

searchInput.addEventListener("input", (e) => {
  currentKeyword = e.target.value.trim().toLowerCase();
  updateView();
});

sortLatestBtn.addEventListener("click", () => {
  currentSort = "latest";
  sortLatestBtn.classList.add("active");
  sortNameBtn.classList.remove("active");
  updateView();
});

sortNameBtn.addEventListener("click", () => {
  currentSort = "name";
  sortNameBtn.classList.add("active");
  sortLatestBtn.classList.remove("active");
  updateView();
});

updateView();
