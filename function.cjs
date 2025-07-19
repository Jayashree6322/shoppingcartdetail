const getQuantity = (item , offerItems) => 
    offerItems.includes(item.name) 
      ? item.quantity - Math.floor(item.quantity / 3) 
      : item.quantity;

const getDiscountRate = (item, itemDiscounts, categoryDiscounts) => {
    const itemDiscount = itemDiscounts[item.name];
    const categoryDiscount = categoryDiscounts[item.category];
    return {
        item: itemDiscount ? itemDiscount / 100 : 0,
        category: categoryDiscount ? categoryDiscount / 100 : 0
    };
};
const getTaxRate = (item, taxes) => taxes[item.category]/100;

const applyDiscount = (finalAmount) => 
    finalAmount > 200 ? finalAmount - (finalAmount * 0.05) : finalAmount;

const applyFixedDiscount = (finalAmount) => 
    finalAmount >= 50 && finalAmount <= 100 ? finalAmount - 20 : finalAmount;

const finalDiscountAmount = (finalAmount) => 
     finalAmount > 200 ? applyDiscount(finalAmount) : applyFixedDiscount(finalAmount);

module.exports = {
    getQuantity,
    getDiscountRate,
    getTaxRate,
    finalDiscountAmount
};
