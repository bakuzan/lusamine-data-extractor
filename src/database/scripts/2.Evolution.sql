CREATE TABLE IF NOT EXISTS Form(
    "Id"                    INTEGER      NOT NULL UNIQUE, 
    "PokemonId"             INTEGER      NOT NULL, 
    "EvolvesToPokemonId"    INTEGER      NOT NULL, 
    "Mechanism"             INTEGER      NOT NULL, 
    "Note"                  VARCHAR(255)     NULL,
    PRIMARY KEY("Id" AUTOINCREMENT),
	FOREIGN KEY("PokemonId")            REFERENCES "Pokemon"("Id"),
    FOREIGN KEY("EvolvesToPokemonId")   REFERENCES "Pokemon"("Id"),
    FOREIGN KEY("Mechanism")            REFERENCES "EvolutionType"("Id"));