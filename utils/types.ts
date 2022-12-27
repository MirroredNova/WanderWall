export type ResponseFuncs = {
  GET?: Function
  POST?: Function
  PUT?: Function
  DELETE?: Function
}

type MongoDefaults = {
  __v?: number
  _id?: string
}

export interface ISection {
  name: string
  rating: number
  description: string
}

export interface IImgFolder {
  id: string,
  images: string[]
}

export interface IGym extends MongoDefaults {
  name: string
  overallRating: number
  description: string
  location: string
  sections: ISection[]
}
