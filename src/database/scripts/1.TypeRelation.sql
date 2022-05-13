CREATE TABLE IF NOT EXISTS TypeRelation(
    "TypeId"        INTEGER NOT NULL, 
    "RelationType"  INTEGER NOT NULL, 
    "RelatedTypeId" INTEGER NOT NULL, 
    FOREIGN KEY("TypeId")           REFERENCES "Type"("Id"),
    FOREIGN KEY("RelationType")     REFERENCES "TypeRelationType"("Id"),
    FOREIGN KEY("RelatedTypeId")    REFERENCES "Type"("Id"));