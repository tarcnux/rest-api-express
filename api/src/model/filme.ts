import {Genero, Diretor, Ator} from "./index.ts";

export interface Filme{
    id: string;
    titulo: string;
    ano: number;
    genero: Genero[];
    diretor: Diretor;
    elenco: Ator[];
    sinopse: string;
}