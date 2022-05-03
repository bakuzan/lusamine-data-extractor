export interface TypeData {
  id: number;
  name: string;
  unaffectedBy: number[];
  resists: number[];
  weakTo: number[];
}

export interface TypeRelation {
  TypeId: number;
  RelationType: number;
  RelatedTypeId: number;
}
