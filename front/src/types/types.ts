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
    result: GameResult;
    termination?: GameTermination;
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
        analysisLineCount: number;
    };
}

export interface SettingsOverride {
    dbPath?: string;
    engine?: {
        path?: string;
        analysisLineCount?: number;
    };
}

export type AppConfig = Settings & {
    engine: {
        status: boolean;
        name?: string;
        isPondering: boolean;
    };
};

export type RuntimeSettings = {
    analysisEnabled: boolean;
    boardOrientation: boolean;
};

export type GameResult = '1-0' | '0-1' | '*' | '1/2-1/2'

export type GameTermination = 'Abandoned'
    | 'Abjudication'
    | 'Emergency'
    | 'Normal'
    | 'Rules infraction'
    | 'Time forfeit'
    | 'Unterminated';

// export type GameTermination = 'checkmate'
// | 'stalemate'
// | 'threeFoldRepetition'
// | 'insufficientMaterial'
// // Below : TODO
// | 'timeout'
// | 'resignation'
// | 'fiftyMoveRule'
// | 'agreement';

// case 'checkmate':
//     return 'Checkmate';
// case 'agreement':
//     return 'By agreement';
// case 'fiftyMoveRule':
//     return '50 move rule';
// case 'insufficientMaterial':
//     return 'Insufficient Material';
// case 'resignation':
//     return 'By resignation';
// case 'stalemate':
//     return 'Stalemate';
// case 'threeFoldRepetition':
//     return 'Three-fold repetition';
// case 'timeout':
//     return 'Timeout';