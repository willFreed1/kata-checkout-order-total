export type ItemProps = {
  name: string;
  price: number;
  perPound?: boolean;
};

export class Item {
  name: string;
  price: number;
  perPound: boolean;

  constructor({ name, price, perPound = false }: ItemProps) {
    this.name = name;
    this.price = price;
    this.perPound = perPound;
  }
} 