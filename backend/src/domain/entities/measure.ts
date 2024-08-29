export interface MeasureProps {
  uuid: string;
  date: Date;
  customerCode: string;
  type: MeasureType;
  isConfirmed: boolean;
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

  public get date(): Date {
    return this.props.date;
  }

  public get type(): MeasureType {
    return this.props.type;
  }

  public get isConfirmed(): boolean {
    return this.props.isConfirmed;
  }

  constructor(props: MeasureProps) {
    this.props = props;
  }
}
