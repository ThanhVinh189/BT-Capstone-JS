class CartItem {
  constructor(product) {
    this.id = product.id;
    this.name = product.name;
    this.img = product.img;
    this.price = product.price;
    this.quantity = 1; 
  }
}

export default CartItem;
