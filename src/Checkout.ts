import { Item, ItemProps } from './models/Item';
import { Markdown } from './models/Markdown';
import { Special, SpecialProps } from './models/Special';
import { PricingRules } from './PricingRules';

export class Checkout {
  private pricing: PricingRules;
  private scanned: { item: string; weight?: number }[] = [];

  constructor() {
    this.pricing = new PricingRules();
  }

  setPrice(item: string, price: number, options?: { perPound?: boolean }): void {
    this.pricing.setItem(new Item({ name: item, price, perPound: options?.perPound }));
  }

  setMarkdown(item: string, amount: number): void {
    this.pricing.setMarkdown(new Markdown(item, amount));
  }

  setSpecial(item: string, special: SpecialProps): void {
    this.pricing.setSpecial(new Special({ ...special, itemName: item }));
  }

  scan(item: string, weight?: number): void {
    this.scanned.push({ item, weight });
  }

  total(): number {
    return this.pricing.calculateTotal(this.scanned);
  }
} 