import db from '../database';

import { JsonFiles } from '../constants/JsonFiles';
import { TypeData, TypeRelation } from '../types/Type';

import { capitalise } from '../utils';
import { readJsonFromFile } from '../utils/file';
import { debug } from '../utils/logger';
import { TypeRelationType } from '../constants/TypeRelationType';

export default async function processor() {
  let data: TypeData[] = db.prepare(`SELECT * FROM Type`).all();
  const hasTypesAlready = data.length > 0;

  // Check and insert types
  if (hasTypesAlready) {
    debug(`Database already contains pokemon types. Skipping Type inserts...`);
  } else {
    data = await readJsonFromFile<TypeData[]>(JsonFiles.Types);

    const insertType = db.prepare(
      `INSERT INTO Type(Id, Name) VALUES(@id, @name)`
    );

    const insertTypes = db.transaction((types: TypeData[]) => {
      for (const type of types) {
        insertType.run({
          id: type.id,
          name: capitalise(type.name.trim())
        });
      }
    });

    insertTypes(data);
  }

  // Check and insert type relations
  const relations: TypeRelation[] = [];

  for (const type of data) {
    type.resists.forEach((RelatedTypeId) =>
      relations.push({
        TypeId: type.id,
        RelationType: TypeRelationType.Resists,
        RelatedTypeId
      })
    );
    type.unaffectedBy.forEach((RelatedTypeId) =>
      relations.push({
        TypeId: type.id,
        RelationType: TypeRelationType.UnaffectedBy,
        RelatedTypeId
      })
    );
    type.weakTo.forEach((RelatedTypeId) =>
      relations.push({
        TypeId: type.id,
        RelationType: TypeRelationType.WeakTo,
        RelatedTypeId
      })
    );
  }

  const existingRelations: TypeRelation[] = db
    .prepare(`SELECT * FROM TypeRelation`)
    .all();

  const newRelations = relations.filter(
    (x) =>
      !existingRelations.some(
        (y) =>
          x.TypeId === y.TypeId &&
          x.RelationType === y.RelationType &&
          x.RelatedTypeId === y.RelatedTypeId
      )
  );

  if (existingRelations.length) {
    debug(`Database already contains types relations.`);
  }

  if (newRelations.length) {
    debug(`${newRelations.length} new relations will be added.`);

    const insertRelation = db.prepare(
      `INSERT INTO TypeRelation(TypeId, RelationType, RelatedTypeId) VALUES(@TypeId, @RelationType, @RelatedTypeId)`
    );

    const insertRelations = db.transaction((relationList: TypeRelation[]) => {
      for (const relation of relationList) {
        insertRelation.run(relation);
      }
    });

    insertRelations(newRelations);
  } else {
    debug(`No new relations will be added.`);
  }
}
