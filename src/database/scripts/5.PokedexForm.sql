CREATE TABLE IF NOT EXISTS PokedexForm(
    "Id"                    INTEGER       NOT NULL UNIQUE, 
    "PokedexId"             INTEGER       NOT NULL,
    "PokemonFormId"         INTEGER       NOT NULL,
    "RegionalPokedexNumber" INTEGER       NOT NULL,
    PRIMARY KEY("Id" AUTOINCREMENT),
    FOREIGN KEY("PokedexId")    REFERENCES "Pokedex"("Id"),
    FOREIGN KEY("PokemonFormId")    REFERENCES "Form"("Id"));