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


const result = items.map((item) => {
   const payableQuantity = getQuantity(item , offerItems);
   const total = item.price * payableQuantity;

   const discountAmount = total * getDiscountRate(item , itemDiscounts, categoryDiscounts);
   const totalAmount = total - discountAmount;

   const totalDiscountAmount = finalDiscountAmount(totalAmount);
   const taxAmount = totalDiscountAmount * getTaxRate(item, taxes);
   const finalTaxAmount = totalDiscountAmount + taxAmount;

return {
    Name:item.name,
    category:item.category,
    Quantity:item.quantity,
    PayableQuantity:payableQuantity,
    Total:total,
    FinalDiscountAmount:Math.round(totalDiscountAmount),
    FinalTaxAmount:Math.round(finalTaxAmount),
};
}); 

const totalAmount = result.reduce((acc, item) => acc + item.FinalTaxAmount, 0);
const promoCodeDiscount = promoCode === "SAVE10" ? totalAmount * (promoCodeRate / 100) : 0;
const finalPromoCodeAmount = totalAmount - promoCodeDiscount;

console.table(result);
console.log(Math.round(finalPromoCodeAmount));