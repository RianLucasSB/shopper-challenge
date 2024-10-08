export interface MeasureProps {
  uuid: string;
  date: Date;
  customerCode: string;
  type: MeasureType;
  isConfirmed: boolean;
  imageUrl: string;
  value: number | null;
}

export enum MeasureType {
  WATER = 'WATER',
  GAS = 'GAS',
}

export class Measure {
  private props: MeasureProps;

  public get uuid(): string {
    return this.props.uuid;
  }

  public get customerCode(): string {
    return this.props.customerCode;
  }

  public get date(): Date {
    return this.props.date;
  }

  public get type(): MeasureType {
    return this.props.type;
  }

  public get value(): number | null {
    return this.props.value;
  }

  public set value(value: number) {
    this.props.value = value;
  }

  public get isConfirmed(): boolean {
    return this.props.isConfirmed;
  }

  public set isConfirmed(state: boolean) {
    this.props.isConfirmed = state;
  }

  constructor(props: MeasureProps) {
    this.props = props;
  }
}
