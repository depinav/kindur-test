const _ = require('lodash');

const prices = `Candy Bar, 500
Paperback Book, 700
Detergent, 102200
Headphones, 1400
Earmuffs, 2000
Bluetooth Stereo, 6000`;
const total = 1000;


let firstItem, secondItem;

const splitPrices = prices.split(/\r\n|\r|\n/);

const priceList = _.map(splitPrices, (price, i) => {
  const [item, amount] = price.split(',');
  const parsedAmount = _.parseInt(amount);
  return {
    item,
    amount: parsedAmount
  }
});

const sortedPriceList = priceList.sort((a, b) => a.amount - b.amount);
const len = sortedPriceList.length;
firstItem = priceBinarySearch(sortedPriceList, _.floor(len/2), 0, len -1, total);

if(firstItem) {
  const newSortedPriceList = _.remove(sortedPriceList, (price) => price != firstItem);
  const len = newSortedPriceList.length;
  const newTarget = total - firstItem.amount;
  secondItem = priceBinarySearch(newSortedPriceList, _.floor(len/2), 0, len -1, newTarget);
  
}

if(firstItem && secondItem) {
    
} else {
    return 'Not possible';
}

function priceBinarySearch(arr, midIndex, startIndex, endIndex, target) {
  
  if(startIndex > endIndex || 
     (startIndex === 0 && midIndex === 0 && endIndex ===0) ||
     (startIndex < 0 || midIndex < 0 || endIndex < 0)
    ) return false;
  
  const midIndexAmount = arr[midIndex].amount;
  
  if(midIndexAmount === target) return arr[midIndex];µ
  if(midIndex > 0 && midIndexAmount > target && arr[midIndex -1].amount < target) return arr[midIndex -1];
    
  if(midIndexAmount < target) {
    const newStartIndex = midIndex +1;
    const newMidIndex = _.floor((newStartIndex + endIndex) /2);
    return priceBinarySearch(arr, newMidIndex, newStartIndex, endIndex, target);
  } else {
    const newEndIndex = midIndex -1;
    const newMidIndex = _.floor((startIndex + newEndIndex) /2)
    return priceBinarySearch(arr, newMidIndex, startIndex, newEndIndex, target);
  }
}