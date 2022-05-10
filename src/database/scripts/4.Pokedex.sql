CREATE TABLE IF NOT EXISTS Pokedex(
    "Id"        INTEGER        NOT NULL UNIQUE, 
    "Code"      VARCHAR(16)    NOT NULL UNIQUE,
    "Name"      VARCHAR(255)   NOT NULL,
    "RegionId"  INTEGER            NULL,
    PRIMARY KEY("Id" AUTOINCREMENT),
    FOREIGN KEY("RegionId")    REFERENCES "Region"("Id"));