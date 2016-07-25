const CartItems = require('../src/models/cart-item');
const ReceiptItems = require('../src/models/receipt-item');
const Receipt = require('./models/receipt');
const Items = require('./models/items');
const Promotions = require('./models/promotions');

function printReceipt(tags) {
  const cartItems = CartItems.buildCartItems(tags, Items.all());
  const receiptItems = ReceiptItems.buildReceiptItems(cartItems, Promotions.all());
  const receipt = new Receipt(receiptItems);
  const receiptText = Receipt.buildReceiptText(receipt);

  console.log(receiptText);
}

exports.printReceipt = printReceipt;
