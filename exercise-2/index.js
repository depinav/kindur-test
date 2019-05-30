const fs = require('fs');
const _ = require('lodash');

(function() {
  const total = _.last(process.argv);
  
  fs.readFile(_.nth(process.argv, -2), 'utf8', function(err, data) {
    if (err) throw err;
    const result = findClosestPair(data, total);

    process.stdout.write(result);
  });
})();

function findClosestPair(prices, target) {

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
  firstItem = priceBinarySearch(sortedPriceList, _.floor(len/2), 0, len -1, target);

  if(firstItem) {
    const newSortedPriceList = _.remove(sortedPriceList, (price) => price != firstItem);
    const len = newSortedPriceList.length;
    const newTarget = target - firstItem.amount;
    secondItem = priceBinarySearch(newSortedPriceList, _.floor(len/2), 0, len -1, newTarget);

  }
  
  if(firstItem && secondItem) {
      return `${_.values(firstItem)} ${_.values(secondItem ? secondItem : '')}`;
  } else {
      return 'Not possible';
  }
}

function priceBinarySearch(arr, midIndex, startIndex, endIndex, target) {
  
  if(startIndex > endIndex || 
     (startIndex === 0 && midIndex === 0 && endIndex ===0) ||
     (startIndex < 0 || midIndex < 0 || endIndex < 0)
    ) return false;
  
  const midIndexAmount = arr[midIndex].amount;

  if(midIndex < arr.length && midIndexAmount <= target && arr[midIndex +1].amount > target) return arr[midIndex];
  if(midIndex > 0 && midIndexAmount > target && arr[midIndex -1].amount <= target) return arr[midIndex -1];
    
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