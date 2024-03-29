# <img src="https://github.com/mickev36/chesscompanion/blob/main/assets/logo.png?raw=true" width="100" height="100"/> Chess Companion

## Features

<img src="https://github.com/mickev36/chesscompanion/blob/main/assets/screenshot.png?raw=true" width="100%" />

-   Manage game database (Load, Edit, Save)
-   Store metadata (Event, Round, Date, Site, Player's names)
-   Load game from pgn
-   Engine analysis using external executable (Stockfish, Leela, ...)

** WARNING : This project is still in a very early stage and under heavy development. Do NOT use it for critical data ! Things will change and break frequently, and bugs are still a common occurence. **

## Development

Roadmap for feature implementation, known bugs... can be found here : https://trello.com/b/mCsVXtsU/chesscompanion

A discord is setup to talk directly with the community and report bugs : https://discord.gg/gWVVCV6W

### Dependencies

-   NodeJS v18 + npm

Tested on Ubuntu. Should work on Windows through WSL, but additional setup for the GUI to show up is required.

### Installation

-   Clone the repository
-   Install the js dependencies : at the project's root, run `npm install`

### Run

`npm start` runs the app in the development mode.

Known issues :

-   On first startup, a race condition causes the app not to be able to start properly (app entrypoint not found). Restarting the app fixes it.
-   Another race condition causes the front-end to not be ready when the window appears. Fixed by reloading the view through the top menu (View > Reload)

### Build

`npm run build` builds the app for "production" to the `dist/electron` folder. Still very unstable and untested.
