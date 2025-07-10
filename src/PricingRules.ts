import { Item } from './models/Item';
import { Markdown } from './models/Markdown';
import { Special } from './models/Special';

export class PricingRules {
  items: Map<string, Item> = new Map();
  markdowns: Map<string, Markdown> = new Map();
  specials: Map<string, Special> = new Map();

  setItem(item: Item) {
    this.items.set(item.name, item);
  }

  setMarkdown(markdown: Markdown) {
    this.markdowns.set(markdown.itemName, markdown);
  }

  setSpecial(special: Special) {
    this.specials.set(special.itemName, special);
  }

  getPrice(itemName: string, weight?: number): number {
    const item = this.items.get(itemName);
    if (!item) return 0;
    let price = item.price;
    const markdown = this.markdowns.get(itemName);
    if (markdown) price -= markdown.amount;
    if (item.perPound && weight) return price * weight;
    return price;
  }

  calculateTotal(scanned: { item: string; weight?: number }[]): number {
    const itemCounts: Record<string, number> = {};
    const itemWeights: Record<string, number> = {};
    for (const s of scanned) {
      if (s.weight) {
        itemWeights[s.item] = (itemWeights[s.item] || 0) + s.weight;
      } else {
        itemCounts[s.item] = (itemCounts[s.item] || 0) + 1;
      }
    }
    let total = 0;
    for (const item in itemCounts) {
      const special = this.specials.get(item);
      if (special && special.type === 'buyNgetM') {
        const n = special.buy || 0;
        const m = special.get || 0;
        const percent = special.percentOff || 0;
        const count = itemCounts[item];
        const group = n + m;
        const price = this.getPrice(item);
        const eligibleGroups = Math.floor(count / group);
        const remainder = count % group;
        total += eligibleGroups * (n * price + m * price * (1 - percent / 100));
        total += remainder * price;
      } else {
        total += this.getPrice(item) * itemCounts[item];
      }
    }
    for (const item in itemWeights) {
      total += this.getPrice(item, itemWeights[item]);
    }
    return total;
  }
} 