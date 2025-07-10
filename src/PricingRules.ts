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
} 