import CartItem from "./home-cartItem.js";

class CartList {
  constructor() {
    this.cart = [];
    // Tải giỏ hàng từ LocalStorage khi khởi tạo
    this.loadCartFromLocalStorage();
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product) {
    const existingItem = this.cart.find((item) => item.id === product.id);

    if (existingItem) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
      existingItem.quantity += 1;
    } else {
      // Nếu chưa có, tạo mới sản phẩm và thêm vào giỏ
      const newItem = new CartItem(product);
      this.cart.push(newItem);
    }

    // Lưu giỏ hàng vào localStorage sau khi thay đổi
    this.saveCartToLocalStorage();
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeCartItem(id) {
    // Tìm sản phẩm trong giỏ và xóa nó
    this.cart = this.cart.filter((item) => item.id !== id);
    // Lưu lại giỏ hàng sau khi xóa
    this.saveCartToLocalStorage();
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItemQuantity(id, quantityChange) {
    const product = this.cart.find((item) => item.id === id);
    if (product) {
      product.quantity += quantityChange;
      if (product.quantity <= 0) {
        // Nếu số lượng giảm xuống <= 0, xóa sản phẩm khỏi giỏ
        this.removeCartItem(id);
      }
    }

    // Lưu lại giỏ hàng vào LocalStorage sau khi thay đổi
    this.saveCartToLocalStorage();
  }

  // Xóa giỏ hàng
  clearCart() {
    // Đặt giỏ hàng thành mảng rỗng
    this.cart = [];
    // Lưu lại giỏ hàng rỗng vào localStorage
    this.saveCartToLocalStorage();
  }

  // Lưu giỏ hàng vào localStorage
  saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  // Tải giỏ hàng từ localStorage
  loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }
}

export default CartList;
