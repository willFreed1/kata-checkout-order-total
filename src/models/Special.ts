export type SpecialType =
  | 'buyNgetM'
  | 'nForX'
  | 'weightedBuyNgetM';

export type SpecialProps = {
  itemName: string;
  type: SpecialType;
  buy?: number;
  get?: number;
  percentOff?: number;
  n?: number;
  x?: number;
  limit?: number;
};

export class Special {
  itemName: string;
  type: SpecialType;
  buy?: number;
  get?: number;
  percentOff?: number;
  n?: number;
  x?: number;
  limit?: number;

  constructor(props: SpecialProps) {
    this.itemName = props.itemName;
    this.type = props.type;
    this.buy = props.buy;
    this.get = props.get;
    this.percentOff = props.percentOff;
    this.n = props.n;
    this.x = props.x;
    this.limit = props.limit;
  }
} 