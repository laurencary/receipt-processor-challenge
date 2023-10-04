const { describe } = require("mocha");
const chai = require("chai");
const expect = chai.expect;

const scorer = require('../src/utils/scorer');
const receipt1 = {
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


const receipt2 = {
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

describe("Score Receipt", function () {
    it("should count the number of alphanumeric characters in the retailer name", function () {
        expect(scorer.scoreRetailerName(receipt1.retailer)).to.equal(6);
        expect(scorer.scoreRetailerName(receipt2.retailer)).to.equal(14);
    })

    it("should calculate points for total correctly", function() {
        expect(scorer.scoreTotal("9.00")).to.equal(75);
        expect(scorer.scoreTotal("9.20")).to.equal(0);
        expect(scorer.scoreTotal("23.75")).to.equal(25);
    })

    it("should calculate points for items count correctly", function() {
        expect(scorer.scoreItems(receipt1.items)).to.equal(10);
    })

    it("should add 6 points if date is odd", function () {
        expect(scorer.scoreDate(receipt1.purchaseDate)).to.equal(6);
        expect(scorer.scoreDate("2022-05-08")).to.equal(0);
    })

    it("should calculate points of items descriptions correctly", function() {
        expect(scorer.scoreDescriptions(receipt1.items)).to.equal(6)
        expect(scorer.scoreDescriptions(receipt2.items)).to.equal(0)
    })

    it("should calculate points for the entire receipt", function() {
        expect(scorer.calculateReceiptScore(receipt1)).to.equal(28)
        expect(scorer.calculateReceiptScore(receipt2)).to.equal(109)
    })
})