const products = [
  {
    id: 1,
    title: "1번 전자레인지 1인 밥솥",
    description: "자취생용 간편 조리 아이템",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=300&q=80",
    link: "https://link.coupang.com/a/eaP83M",
  }
];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

function renderProducts(items) {
  productList.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.className = "product-card";

    li.innerHTML = `
      <a class="product-link" href="${item.link}" target="_blank">
        <img class="product-thumb" src="${item.image}" />
        <div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </a>
    `;

    productList.appendChild(li);
  });
}

searchInput.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(keyword) ||
    p.description.toLowerCase().includes(keyword)
  );

  renderProducts(filtered);
});

renderProducts(products);