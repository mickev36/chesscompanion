import { ChessInstance, Move } from 'chess.js';

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
    boardOrientation: boolean;
}

export interface GameDataState extends GameData {
    currentPosition: ChessInstance;
}

export interface EngineData {
    depth: number;
    seldepth: number;
    time: number;
    nodes: number;
    hashfull: number;
    nps: number;
    tbhits: number;
    score: {
        unit: string;
        value: number;
    };
    multipv: number;
    pv: string;
}

export interface Settings {
    dbPath?: string;
    engine: {
        path?: string;
    };
}

export type AppConfig = Settings & {
    engine: {
        status: boolean;
        name?: string;
    };
};
