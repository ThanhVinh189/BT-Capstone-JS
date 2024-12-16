import api from "./../services/home-api.js";
import CartList from "./../models/home-cartList.js";

const getEleId = (id) => document.getElementById(id);
// Khai báo cartList trong phạm vi toàn cục
window.cartList = new CartList(); // Đảm bảo cartList được gán vào window
const cartList = window.cartList;

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
        </div>
        <div class="flex flex-wrap justify-between items-center">
            <span class="text-2xl font-bold text-red-600">$${product.price}</span>
            <button
              onclick="handleAdd('${product.id}')"
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

// Thêm sản phẩm vào giỏ hàng
window.handleAdd = (id) => {
  const product = products.find((product) => product.id === id);
  if (product) {
    cartList.addToCart(product);
    // Cập nhật số lượng sản phẩm trong giỏ
    updateCartItemCount();
    // Hiển thị lại giỏ hàng
    renderCart();
  }
};

// Xóa sản phẩm khỏi giỏ hàng
window.handleRemove = (id) => {
  cartList.removeCartItem(id);
  // Render lại giỏ hàng
  renderCart();
  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItemCount();
};

// Render giỏ hàng trong modal
const renderCart = () => {
  let content = "";
  let totalPrice = 0;

  cartList.cart.forEach((item) => {
    const total = item.price * item.quantity;
    totalPrice += total;
    content += `
      <tr>
          <td class="px-6 py-3">${item.id}</td>
          <td class="px-6 py-3">${item.name}</td>
          <td class="px-6 py-3"><img src="${item.img}" alt="${item.name}" width="50"></td>
          <td class="px-6 py-4">
              <div class="flex items-center">
                  <button
                      class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-white bg-red-500 border border-gray-300 rounded-full focus:outline-none hover:bg-red-800 focus:ring-4 focus:ring-red-300"
                      type="button"
                      onclick="updateCartItemQuantity('${item.id}', -1)"
                  >
                  <span class="sr-only">Quantity button</span>
                  <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                  >
                      <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h16"
                      />
                  </svg>
                  </button>
                  <div>
                      <input
                        type="number"
                        id="product_${item.id}_quantity"
                        class="bg-gray-50 text-center w-14 border border-gray-300 text-gray-900 text-sm rounded-lg"
                        value="${item.quantity}"
                        readonly
                        required
                      />
                  </div>
                  <button
                      class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-white bg-green-500 border border-gray-300 rounded-full focus:outline-none hover:bg-green-800 focus:ring-4 focus:ring-green-200"
                      type="button"
                      onclick="updateCartItemQuantity('${item.id}', 1)"
                  >
                  <span class="sr-only">Quantity button</span>
                  <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                  >
                      <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 1v16M1 9h16"
                      />
                  </svg>
                  </button>
              </div>     
          </td>
          <td class="px-6 py-3">$${item.price}</td>
          <td class="px-6 py-3">$${total}</td>
          <td class="px-6 py-3">
          <button
           class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2"
           onclick="handleRemove('${item.id}')">Remove</button>
          </td>
      </tr>
      `;
  });
  getEleId("cartTable").innerHTML = content;
  // Cập nhật tổng tiền
  getEleId("totalPrice").innerText = `Tổng: $${totalPrice}`;
  // Cập nhật lại tổng số lượng sản phẩm trong giỏ hàng
  updateCartItemCount();
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
const updateCartItemCount = () => {
  let totalQuantity = 0;

  // Duyệt qua tất cả các sản phẩm trong giỏ hàng
  cartList.cart.forEach((item) => {
    const quantityInput = document.getElementById(
      `product_${item.id}_quantity`
    );

    if (quantityInput) {
      // Nếu tìm thấy input, lấy giá trị quantity
      const quantity = parseInt(quantityInput.value);
      totalQuantity += quantity;
    }
  });

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const cartItemCount = document.getElementById("cartItemCount");
  cartItemCount.innerText = totalQuantity;
};

// Cập nhật số lượng của sản phẩm trong giỏ hàng
window.updateCartItemQuantity = (id, change) => {
  const item = cartList.cart.find((item) => item.id === id);

  if (item) {
    // Nếu sản phẩm tồn tại, thay đổi số lượng
    item.quantity += change;

    // Nếu số lượng sản phẩm < 1, xóa sản phẩm khỏi giỏ hàng
    if (item.quantity < 1) {
      cartList.removeCartItem(id);
    } else {
      // Lưu giỏ hàng sau khi thay đổi
      cartList.saveCartToLocalStorage();
    }

    // Cập nhật lại giao diện
    renderCart();
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartItemCount();
  }
};

// Thanh toán giỏ hàng và cập nhật giao diện
const clearCartAndUpdateUI = () => {
  // Xóa tất cả sản phẩm trong giỏ hàng
  cartList.clearCart();
  // Cập nhật giao diện giỏ hàng
  renderCart();
  // Cập nhật lại số lượng sản phẩm trong giỏ
  updateCartItemCount();
  // Thông báo cho người dùng
  alert("Thanh toán thành công!");
};

// Đặt hàm thanh toán vào window để có thể gọi trực tiếp
window.handleCheckout = () => {
  clearCartAndUpdateUI();
};

// Khi trang load xong, render lại giỏ hàng
window.onload = () => {
  // Gọi renderCart để hiển thị giỏ hàng khi trang được tải lại
  renderCart();
};

fetchListProduct();
