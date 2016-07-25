class CartItem {
  constructor(item, count) {
    this.item = item;
    this.count = count;
  }

  getBarcode() {
    return this.item.barcode;
  }

  getName() {
    return this.item.name;
  }

  getPrice() {
    return this.item.price;
  }

  getUnit() {
    return this.item.unit;
  }

  static buildCartItems(tags, allItems) {
    const cartItems = [];

    for (const tag of tags) {

      const tagArray = tag.split('-');
      const barcode = tagArray[0];
      const count = parseFloat(tagArray[1] || 1);

      const cartItem = cartItems.find(cartItem => cartItem.getBarcode() === barcode);

      if (cartItem) {
        cartItem.count += count;
      } else {
        const item = allItems.find(item => item.barcode === barcode);
        cartItems.push(new CartItem(item, count));
      }
    }

    return cartItems;
  }
}

module.exports = CartItem;
