const CartItems = require('../src/models/cart-item');
const ReceiptItems = require('../src/models/receipt-item');
const Receipt = require('./models/receipt');
const Items = require('./models/items');
const Promotions = require('./models/promotions');

function printReceipt(tags) {
  const cartItems = CartItems.buildCartItems(tags, Items.all());
  const receiptItems = ReceiptItems.buildReceiptItems(cartItems, Promotions.all());
  const receipt = buildReceipt(receiptItems);
  const receiptText = buildReceiptText(receipt);

  console.log(receiptText);
}

function buildReceipt(receiptItems) {
  let total = 0;
  let savedTotal = 0;

  for (const receiptItem of receiptItems) {
    total += receiptItem.subtotal;
    savedTotal += receiptItem.saved;
  }

  return new Receipt(receiptItems, total, savedTotal);
}

function buildReceiptText(receipt) {

  let receiptItemsText = receipt.receiptItems
    .map(receiptItem => {
      const cartItem = receiptItem.cartItem;
      return `名称：${cartItem.item.name}，\
数量：${cartItem.count}${cartItem.item.unit}，\
单价：${formatMoney(cartItem.item.price)}(元)，\
小计：${formatMoney(receiptItem.subtotal)}(元)`;
    })
    .join('\n');

  return `***<没钱赚商店>收据***
${receiptItemsText}
----------------------
总计：${formatMoney(receipt.total)}(元)
节省：${formatMoney(receipt.savedTotal)}(元)
**********************`;
}

function formatMoney(money) {
  return money.toFixed(2);
}

exports.printReceipt = printReceipt;
