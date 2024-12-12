import api from "./../services/home-api.js";

const getEleId = (id) => document.getElementById(id);
let products = [];

const renderListProduct = (data) => {
  let content = "";

  data.forEach((product) => {
    content += `
    <div class="w-full bg-white border border-gray-200 rounded-lg shadow p-4">
        <div>
            <img src="${product.img}" class="p-8 rounded-t-lg" alt="..." /> 
        </div>
        <div class="my-5">
            <h5 class="text-2xl font-bold text-gray-900">${product.name}</h5>
        </div>
        <div class="mb-4">
            <span class="text-lg font-semibold text-orange-500">"${product.desc}"</span>    
        </div>
        <div class="mb-6 flex flex-wrap justify-between">
            <span class="text-gray-600 text-base py-3">Camera trước: ${product.frontCamera}</span>
            <span class="text-gray-600 text-base py-3">Màn hình rộng: ${product.screen}</span>
            <span class="text-gray-600 text-base py-3">Camera sau: ${product.backCamera}</span>
            <span class="hidden">Camera sau: ${product.type}</span>
        </div>
        <div class="flex flex-wrap justify-between items-center">
            <span class="text-2xl font-bold text-red-600">$${product.price}</span>
            <button
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5"
            >
                Add to cart
            </button>
            </div>
    </div>
    `;
  });

  // *Show products to UI
  getEleId("mainProduct").innerHTML = content;
};

const fetchListProduct = () => {
  getEleId("loader").style.display = "block";
  const promise = api.fetchData();

  promise
    .then((result) => {
      products = result.data;
      renderListProduct(products);
      // *Resolved => hide loader
      getEleId("loader").style.display = "none";
    })
    .catch((error) => {
      console.log(error);
      // *Reject => hide loader
      getEleId("loader").style.display = "none";
    });
};

const filterProducts = () => {
  const filterValue = getEleId("productFilter").value;

  // Kiểm tra nếu filterValue là "all", không cần lọc gì
  let filteredProducts = products;

  // Kiểm tra nếu filterValue không phải "all"
  if (filterValue !== "all") {
    filteredProducts = products.filter(
      (product) => product.type.toLowerCase() === filterValue.toLowerCase()
    );
  }

  renderListProduct(filteredProducts);
};

window.filterProducts = filterProducts;

fetchListProduct();
