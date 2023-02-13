import { Move } from 'chess.js';

interface Player {
    name: string;
    title: 'IM' | 'GM' | 'NM' | 'CM' | '';
}

export interface GameData {
    id: string;
    whitePlayer: Player;
    blackPlayer: Player;
    moves: Move[];
    selectedMove: number;
    pgn: string;
    site: string;
    date: string;
    event: string;
    round: string;
    result: string;
}
