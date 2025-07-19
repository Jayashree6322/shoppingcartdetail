const config = require('./config.json');
const {
    items,
    itemDiscounts,
    categoryDiscounts,
    taxes,
    offerItems,     
    promoCode,
    promoCodeRate       
} = config;

const { getQuantity, getDiscountRate, getTaxRate, finalDiscountAmount } = require('./function.cjs');


const shoppingCart = items.map((item) => {
   const payableQuantity = getQuantity(item , offerItems);
   const total = item.price * payableQuantity;
   
   const { item: itemRate, category: categoryRate } = getDiscountRate(item, itemDiscounts, categoryDiscounts);
   const discountRate = itemRate || categoryRate;
   const discountAmount = total * discountRate;
   const discountedTotal = total - discountAmount;

   const finalDiscount = finalDiscountAmount(discountedTotal);

   const taxAmount = finalDiscount * getTaxRate(item, taxes);
   const finalAmount = finalDiscount + taxAmount;

return {
    Name:item.name,
    category:item.category,
    Quantity:item.quantity,
    PayableQuantity:payableQuantity,
    Total:total,
    FinalDiscountAmount:Math.round(finalDiscount),
    FinalAmount:Math.round(finalAmount),
};
}); 

const totalAmount = shoppingCart.reduce((acc, item) => acc + item.FinalAmount, 0);
const promoCodeDiscount = promoCode === "SAVE10" ? totalAmount * (promoCodeRate / 100) : 0;
const finalPromoCodeAmount = totalAmount - promoCodeDiscount;

console.table(shoppingCart);
console.log(Math.round(finalPromoCodeAmount));