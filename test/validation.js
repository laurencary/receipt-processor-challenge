const { describe } = require("mocha");
const chai = require("chai");
const expect = chai.expect;

const validation = require('../utils/validation');
let receipt1 = {
    "retailer": "Target",
    "purchaseDate": "2022-01-01",
    "purchaseTime": "13:01",
    "items": [
        {
            "shortDescription": "Mountain Dew 12PK",
            "price": "6.49"
        }, {
            "shortDescription": "Emils Cheese Pizza",
            "price": "12.25"
        }, {
            "shortDescription": "Knorr Creamy Chicken",
            "price": "1.26"
        }, {
            "shortDescription": "Doritos Nacho Cheese",
            "price": "3.35"
        }, {
            "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
            "price": "12.00"
        }
    ],
    "total": "35.35"
}


let receipt2 = {
    "retailer": "M&M Corner Market",
    "purchaseDate": "2022-03-20",
    "purchaseTime": "14:33",
    "items": [
        {
            "shortDescription": "Gatorade",
            "price": "2.25"
        }, {
            "shortDescription": "Gatorade",
            "price": "2.25"
        }, {
            "shortDescription": "Gatorade",
            "price": "2.25"
        }, {
            "shortDescription": "Gatorade",
            "price": "2.25"
        }
    ],
    "total": "9.00"
}

describe("Receipt Validations", function () {
    it("should return true when the receipt is valid", function () {
        expect(validation.isValidReceipt(receipt1)).to.equal(true);
        expect(validation.isValidReceipt(receipt2)).to.equal(true);
    })

    it("should return false when the receipt is invalid", function () {
        delete receipt1.purchaseDate;
        receipt2.purchaseTime = "4:00 PM";
        let receipt3 = { ...receipt2 };
        delete receipt3.items;

        expect(validation.isValidReceipt(receipt1)).to.equal(false);
        expect(validation.isValidReceipt(receipt2)).to.equal(false);
        expect(validation.isValidReceipt(receipt3)).to.equal(false);
    })
})