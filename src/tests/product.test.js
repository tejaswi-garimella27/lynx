const { getConversionRate } = require("../model/product");

// Mocking currency details
jest.mock("../datasource/currency.json", () => ({
  quotes: {
    USDCAD: 1.35,
  },
}));

describe("Product Functions", () => {
  describe("getConversionRate", () => {
    it("should return conversion rate for given currency", () => {
      const usdToCadRate = 1.35;

      const result = getConversionRate("CAD");

      expect(result).toEqual(usdToCadRate);
    });

    it("should return 1 for USD currency", () => {
      const result = getConversionRate("USD");

      expect(result).toEqual(1);
    });
  });
});
