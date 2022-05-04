CREATE TABLE IF NOT EXISTS Form(
    "Id"                    INTEGER      NOT NULL UNIQUE, 
    "PokemonId"             INTEGER      NOT NULL,
    "InstanceType"          INTEGER      NOT NULL,
    "RegionId"              INTEGER          NULL,
    "Description"           VARCHAR(255)     NULL,
    PRIMARY KEY("Id" AUTOINCREMENT),
	FOREIGN KEY("PokemonId")            REFERENCES "Pokemon"("Id"),
    FOREIGN KEY("InstanceType")         REFERENCES "FormInstanceType"("Id"),
    FOREIGN KEY("RegionId")             REFERENCES "Region"("Id"));