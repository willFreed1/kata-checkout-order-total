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
    const itemCounts: Record<string, number> = {};
    const itemWeights: Record<string, number> = {};
    for (const s of this.scanned) {
      if (s.weight) {
        itemWeights[s.item] = (itemWeights[s.item] || 0) + s.weight;
      } else {
        itemCounts[s.item] = (itemCounts[s.item] || 0) + 1;
      }
    }
    let total = 0;
    for (const item in itemCounts) {
      const special = this.pricing.specials.get(item);
      if (special && special.type === 'buyNgetM') {
        const n = special.buy || 0;
        const m = special.get || 0;
        const percent = special.percentOff || 0;
        const count = itemCounts[item];
        const group = n + m;
        const price = this.pricing.getPrice(item);
        const eligibleGroups = Math.floor(count / group);
        const remainder = count % group;
        total += eligibleGroups * (n * price + m * price * (1 - percent / 100));
        total += remainder * price;
      } else {
        total += this.pricing.getPrice(item) * itemCounts[item];
      }
    }
    for (const item in itemWeights) {
      total += this.pricing.getPrice(item, itemWeights[item]);
    }
    return total;
  }
} 