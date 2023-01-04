type MongoDefaults = {
  __v?: number
  _id?: string
}

export interface ISection {
  name: string
  rating: number
  description: string
}

export interface IGym extends MongoDefaults {
  name: string
  overallRating: number
  description: string
  location: string
  sections: ISection[]
}

export interface IApiResGym extends IGym {
  imagePaths: string[]
}
