
// module.exports = function cart(oldCart) {
//   this.items = oldCart.items || {};
//   this.totalQty = oldCart.totalQty || 0;
//   this.totalPrice = oldCart.totalPrice || 0;
//   this.add = function (item, id) {
//     let storedItem = this.items[id];
//     if (!storedItem) {
//       storedItem = this.items[id] == { item, qty: 0, price: 0 };
//     }
//     storedItem.qty++;
//     storedItem.price = storedItem.item.price * storedItem.qty;
//     this.totalQty++;
//     this.totalPrice += storedItem.item.price;
//   };
//   this.generateArray = function () {
//     const arr = [];
//     for (const id in this.items) {
//       arr.push(this.items[id]);
//     }
//     return arr;
//   };
// };
// export default cart;

const dummyData = [{
  id: 1,
  name: 'habillement',
  description: 'ojojojojojo',
  price: 20,
  itemNumber: 1,
},
{
  id: 2,
  name: 'habillement',
  description: 'ojojojojojo',
  price: 20,
  itemNumber: 1,
},
{
  id: 3,
  name: 'habillement',
  description: 'ojojojojojo',
  price: 20,
  itemNumber: 1,
}, {
  id: 4,
  name: 'habillement',
  description: 'ojojojojojo',
  price: 20,
  itemNumber: 1,
},
{
  id: 5,
  name: 'habillement',
  description: 'ojojojojojo',
  price: 20,
  itemNumber: 1,
},
{
  id: 6,
  name: 'habillement',
  description: 'ojojojojojo',
  price: 20,
  itemNumber: 1,
},
{
  id: 7,
  name: 'habillement',
  description: 'ojojojojojo',
  price: 20,
  itemNumber: 1,
},
{
  id: 8,
  name: 'habillement',
  description: 'ojojojojojo',
  price: 20,
  itemNumber: 1,
},
{
  id: 9,
  name: 'habillement',
  description: 'ojojojojojo',
  price: 20,
  itemNumber: 1,
}];

export default dummyData;
