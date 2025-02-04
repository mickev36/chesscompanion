import { spawn } from 'node:child_process'
import { Stream, Transform } from 'node:stream';
import { addGameFromPgn } from './games';

export function importGames(path) {

    const pgnExtract = spawn('/home/mickev/dev/chesscompanion/chesscompanion/bin/pgn-extract', [
        '--addhashcode',
        '-R/home/mickev/dev/chesscompanion/chesscompanion/bin/tagsroster',
        path
    ], {
        stdio: ['pipe', 'pipe', 'ignore']
    })

    let buffer = "";
    let importedGamesCounter = 0;

    const splitDistinctGames = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            buffer += chunk.toString();
            let separatorPosition = buffer.indexOf('[HashCode "', 1)
            let distinctGames = []
            while (separatorPosition > 0) { //At least 1 game processable
                const currentGame = buffer.substring(0, separatorPosition); //Store the game for processing
                buffer = buffer.substring(separatorPosition); //Remove the game from the buffer
                separatorPosition = buffer.indexOf('[HashCode "', 1) //Seek the next game
                distinctGames.push(currentGame)
            }
            callback(null, distinctGames)
        }
    })



    const processImportGame = new Stream.Writable({
        objectMode: true
    });

    //TODO : Bulk write to DB
    processImportGame._write = (chunk, encoding, next) => {
        chunk.forEach(element => {
            addGameFromPgn(element);
        });
        importedGamesCounter += chunk.length;
        next()

    }

    pgnExtract.on('close', () => {
        console.log("pgn extract ended")
    })

    processImportGame.on('finish', () => {
        //TODO : Load Last Game still in buffer
        console.log(`Done importing ${importedGamesCounter} games.`)
    })


    pgnExtract.stdout.pipe(splitDistinctGames).pipe(processImportGame)

}