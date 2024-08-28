export interface MeasureProps {
  uuid: string
  date: Date
  customerCode: string
  imageUrl: string
  type: MeasureType
}

export enum MeasureType {
  WATER = "WATER", GAS = "GAS"
}

export class Measure {
  private props: MeasureProps
 
  
  public get uuid() : string {
    return this.props.uuid
  }
  
  public get date() : Date {
    return this.props.date
  }

  public get imageUrl() : string {
    return this.props.imageUrl
  }

  public get type() : MeasureType {
    return this.props.type
  }

  constructor(props: MeasureProps){
    this.props = props
  }
}