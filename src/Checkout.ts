import { ItemProps } from './models/Item';
import { SpecialProps } from './models/Special';

export class Checkout {
  constructor() {}
  setPrice(item: string, price: number, options?: { perPound?: boolean }): void {}
  setMarkdown(item: string, amount: number): void {}
  setSpecial(item: string, special: SpecialProps): void {}
  scan(item: string, weight?: number): void {}
  total(): number {
    return 0;
  }
} 