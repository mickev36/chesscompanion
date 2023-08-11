import { useAppContext } from '../../context/AppContext';
import './SettingsTab.css';

function SettingsTab() {
    const { config } = useAppContext();
    function onSelectDatabase(event: any) {
        window.api.call('config:set', { dbPath: event.target.files[0].path });
    }
    function onLoadEngine(event: any) {
        window.api.call('engine:updatePath', event.target.files[0].path);
    }

    return (
        <div className="settings-tab">
            <div className="settings-row">
                <h1>Chesscompanion Database</h1>
                <button>
                    <label htmlFor="loadDatabase" className="pgn-upload-button">
                        Load database
                    </label>
                </button>
                <b>Database path</b>
                {config.dbPath}
            </div>
            <div className="settings-row">
                <h1>Analysis engine configuration</h1>
                <button>
                    <label htmlFor="loadEngine" className="pgn-upload-button">
                        Load engine
                    </label>
                </button>
                <b>Name</b>
                {config.engine.name}
                <b>Status</b>
                {config.engine.status ? 'Ready' : 'Not ready'}
                <b>Path</b>
                {config.engine.path}
            </div>

            <input type="file" id="loadDatabase" onChange={onSelectDatabase} />

            <input type="file" id="loadEngine" onChange={onLoadEngine} />
        </div>
    );
}

export default SettingsTab;
