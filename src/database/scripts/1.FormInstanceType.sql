CREATE TABLE IF NOT EXISTS FormInstanceType(
    "Id"    INTEGER      NOT NULL UNIQUE, 
    "Name"  VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY("Id" AUTOINCREMENT));