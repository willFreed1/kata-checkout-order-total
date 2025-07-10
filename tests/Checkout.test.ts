import { Checkout } from '../src/Checkout';

describe("Checkout - Basic Item Scanning", () => {
  it("adds a per-unit item to the total", () => {
    const checkout = new Checkout();
    checkout.setPrice("soup", 1.89);
    checkout.scan("soup");
    expect(checkout.total()).toBeCloseTo(1.89);
  });
});

describe("Checkout - Weighted Item Scanning", () => {
  it("adds a weighted item to the total", () => {
    const checkout = new Checkout();
    checkout.setPrice("ground beef", 5.99, { perPound: true });
    checkout.scan("ground beef", 2.5);
    expect(checkout.total()).toBeCloseTo(5.99 * 2.5);
  });
});

describe("Checkout - Markdown", () => {
  it("applies a markdown to a per-unit item", () => {
    const checkout = new Checkout();
    checkout.setPrice("soup", 1.89);
    checkout.setMarkdown("soup", 0.20);
    checkout.scan("soup");
    expect(checkout.total()).toBeCloseTo(1.69);
  });
});

describe("Checkout - Special", () => {
  it("applies a buy one get one free special", () => {
    const checkout = new Checkout();
    checkout.setPrice("soup", 1.89);
    checkout.setSpecial("soup", { itemName: "soup", type: "buyNgetM", buy: 1, get: 1, percentOff: 100 });
    checkout.scan("soup");
    checkout.scan("soup");
    expect(checkout.total()).toBeCloseTo(1.89);
  });
}); 