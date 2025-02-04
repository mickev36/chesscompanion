import { spawn } from 'node:child_process'

export function importGames(path) {

    return new Promise<void>((resolve, reject) => {
        const pgnExtract = spawn('/home/mickev/dev/chesscompanion/chesscompanion/bin/pgn-extract', [
            '--addhashcode',
            '-R/home/mickev/dev/chesscompanion/chesscompanion/bin/tagsroster',
            path
        ])

        let buffer = "";
        let currentGame = "";

        pgnExtract.stdout.on('data', (data) => {
            buffer += data.toString();
            const separatorPosition = buffer.lastIndexOf('[HashCode "')
            if (separatorPosition > 0) { //Game processable
                currentGame = buffer.substring(0, separatorPosition); //Store the game for processing
                buffer = buffer.substring(separatorPosition); //Remove the game from the buffer
                //TODO Process Game
            }

        })

        pgnExtract.on('close', (code) => {
            console.log("done")
            resolve();
        })
    })

}