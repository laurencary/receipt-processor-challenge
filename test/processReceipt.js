const { describe } = require("mocha");
const chai = require("chai");
const expect = chai.expect;

const scorer = require('../src/utils/scorer');

describe("Score Receipt", function () {
    it("should return a number", function () {
        expect(scorer.calculateScore()).to.equal(0)
    })
})