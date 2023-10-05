const receiptFields = {
    // "retailer": "^\\S+$",
    "purchaseDate": "^\\d{4}-\\d{2}-\\d{2}$",
    "purchaseTime": "^([01]\\d|2[0-3]):([0-5]\\d)$",
    "total": "^\\d+\\.\\d{2}$"
};

const itemFields = {
    "shortDescription": "^[\\w\\s\\-]+$",
    "price": "^\\d+\\.\\d{2}$"
};

const isValidReceipt = (receipt) => {
    for (const field in receiptFields) {
        const pattern = new RegExp(receiptFields[field]);
        if (receipt[field] === undefined || !pattern.test(receipt[field])) return false;
    };

    if (receipt.items.length === 0) return false;

    for (const item of receipt.items) {
        for (const field in itemFields) {
            const pattern = new RegExp(receiptFields[field]);
            if (item[field] === undefined || !pattern.test(item[field])) return false;
        }
    }
    return true;
}

module.exports.isValidReceipt = isValidReceipt;

