
const calculateReceiptScore = (receipt) => {
    let points = 0;

    points += scoreRetailerName(receipt.retailer);
    points += scoreTotal(receipt.total);
    points += scoreItems(receipt.items);
    points += scoreDescriptions(receipt.items);
    points += scoreDate(receipt.purchaseDate);
    points += scoreTime(receipt.purchaseTime);

    return points
}

// One point for every alphanumeric character in the retailer name.
const scoreRetailerName = (string) => (string.replace(/[^0-9a-z]/gi, '').length)

/*
    * 50 points if the total is a round dollar amount with no cents.
    * 25 points if the total is a multiple of `0.25`.
*/
const scoreTotal = (totalStr) => {
    const total = parseFloat(totalStr);
    let points = 0;

    if (total === Math.floor(total)) {
        points += 75;
    } else if ((total - Math.floor(total)) % .25 === 0) {
        points += 25;
    }

    return points;
}

// 5 points for every two items on the receipt.
const scoreItems = (itemsArr) => (5 * Math.floor(itemsArr.length / 2))

/*
    If the trimmed length of the item description is a multiple of 3, 
    multiply the price by `0.2` and round up to the nearest integer. 
    The result is the number of points earned.
*/
const scoreDescriptions = (items) => {
    return items.reduce((acc, item) => acc + _scoreDescription(item), 0);
}

const _scoreDescription = (item) => {
    const trimmed = item.shortDescription.trim();

    if (trimmed.length % 3 === 0) {
        return Math.ceil(item.price * 0.2);
    } else {
        return 0;
    }
}

// 6 points if the day in the purchase date is odd
const scoreDate = (purchaseDate) => {
    const points = purchaseDate.slice(-2) % 2 === 1 ? 6 : 0
    return points;
}

// 10 points if the time of purchase is after 2:00pm and before 4:00pm
const scoreTime = (purchaseTime) => {
    const afterTwo = purchaseTime > "14:00";
    const beforeFour = purchaseTime < "16:00";

    if (afterTwo && beforeFour) {
        return 10;
    } else {
        return 0;
    }

}


module.exports.scoreRetailerName = scoreRetailerName;
module.exports.scoreTotal = scoreTotal;
module.exports.scoreItems = scoreItems;
module.exports.scoreDate = scoreDate;
module.exports.scoreTime = scoreTime;
module.exports.scoreDescriptions = scoreDescriptions;
module.exports.calculateReceiptScore = calculateReceiptScore;