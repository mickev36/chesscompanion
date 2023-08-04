import { useAppContext } from '../../context/AppContext';

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
                <button>
                    <label htmlFor="loadDatabase" className="pgn-upload-button">
                        Load database
                    </label>
                </button>
                {config.dbPath}
            </div>
            <div className="settings-row">
                <button>
                    <label htmlFor="loadEngine" className="pgn-upload-button">
                        Load engine for analysis
                    </label>
                </button>
                {config.enginePath}
                {config.engineStatus ? 'Ready' : 'Not ready'}
            </div>

            <input type="file" id="loadDatabase" onChange={onSelectDatabase} />

            <input type="file" id="loadEngine" onChange={onLoadEngine} />
        </div>
    );
}

export default SettingsTab;
