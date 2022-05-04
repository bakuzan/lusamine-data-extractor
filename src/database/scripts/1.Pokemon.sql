CREATE TABLE IF NOT EXISTS Pokemon(
    "Id"                    INTEGER      NOT NULL UNIQUE, 
    "NationalPokedexNumber" INTEGER      NOT NULL UNIQUE,
    "Name"                  VARCHAR(255) NOT NULL UNIQUE,
    "GenerationId"          INTEGER      NOT NULL,
    PRIMARY KEY("Id" AUTOINCREMENT),
	FOREIGN KEY("GenerationId")          REFERENCES "Generation"("Id"));