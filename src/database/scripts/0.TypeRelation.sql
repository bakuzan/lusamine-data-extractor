CREATE TABLE IF NOT EXISTS TypeRelation(
    "TypeId"        INTEGER NOT NULL, -- foreign key on types
    "RelationType"  INTEGER NOT NULL, -- foreign key on typerelationtype
    "RelatedTypeId" INTEGER NOT NULL -- foreign key on types
    );