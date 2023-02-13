import { Chess } from 'chess.js';
import { GameData } from '../../../common/types/types';
import { getVariantFlatList } from './gameDataMoves';

export function gameDataToPgn(gameData: GameData) {
    let outPgn = [];
    outPgn.push(`[Event "${gameData.event || '???'}"]`);
    outPgn.push(`[Site "${gameData.site || '???'}"]`);
    outPgn.push(`[Date "${gameData.date || '???'}"]`);
    outPgn.push(`[Round "${gameData.round || '???'}"]`);
    outPgn.push(`[White "${gameData.whitePlayer.name || '???'}"]`);
    outPgn.push(`[Black "${gameData.blackPlayer.name || '???'}"]`);
    outPgn.push(`[Result "${gameData.result || '???'}"]`);
    outPgn.push('');
    let SAN = '';

    const moveList = getVariantFlatList(gameData.moves, gameData.selectedMove);

    moveList.forEach((move, index) => {
        if (index % 2 === 0) SAN += index + 1 + '. ';
        SAN += move.san + ' ';
    });

    outPgn.push(SAN);

    return outPgn.join('\n');
}

export function pgnToGameData(pgn: string) {
    const chessjs = new Chess();
    chessjs.load_pgn(pgn);
    const headers = chessjs.header();
    const moves = chessjs.history({ verbose: true });
    return {
        whitePlayer: {
            title: '' as any,
            name: headers.White || 'White',
        },
        blackPlayer: {
            title: '' as any,
            name: headers.Black || 'Black',
        },
        moves,
        event: headers.Event || '???',
        date: headers.Date || '???',
        site: headers.Site || '???',
        round: headers.Round || '???',
        selectedMove: [moves.length],
        id: '',
        pgn,
        result: headers.Result || '???',
    };
}
