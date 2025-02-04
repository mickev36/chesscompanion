import { spawn } from 'node:child_process'
import { Stream, Transform } from 'node:stream';
import { addGameFromPgn } from './games';

export function importGames(path) {

    const pgnExtract = spawn('/home/mickev/dev/chesscompanion/chesscompanion/bin/pgn-extract', [
        '--addhashcode',
        '-R/home/mickev/dev/chesscompanion/chesscompanion/bin/tagsroster',
        path
    ])

    let buffer = "";

    const splitDistinctGames = new Transform({
        transform(chunk, encoding, callback) {
            buffer += chunk.toString();
            const separatorPosition = buffer.indexOf('[HashCode "', 1)
            if (separatorPosition > 0) { //Game processable
                const currentGame = buffer.substring(0, separatorPosition); //Store the game for processing
                buffer = buffer.substring(separatorPosition); //Remove the game from the buffer
                callback(null, currentGame)
            }
            else callback(null, null)
        }
    })



    const processImportGame = new Stream.Writable();
    processImportGame._write = (chunk, encoding, next) => {
        addGameFromPgn(chunk.toString());
        next()
    }

    pgnExtract.stdout.pipe(splitDistinctGames).pipe(processImportGame)

    pgnExtract.on('close', (code) => {
        //TODO : Load Last Game still in buffer
        console.log("Done Importing games")
    })

}