import { useAppContext } from '../../context/AppContext';

function SettingsTab() {
    const { settings } = useAppContext();
    function onSelectDatabase(event: any) {
        window.api.call('settings:set', { dbPath: event.target.files[0].path });
    }
    function onLoadEngine(event: any) {
        window.api.call('settings:set', { enginePath: event.target.files[0].path });
    }

    return (
        <div className="settings-tab">
            <div className="settings-row">
                <button>
                    <label htmlFor="loadDatabase" className="pgn-upload-button">
                        Load database
                    </label>
                </button>
                {settings.dbPath}
            </div>
            <div className="settings-row">
                <button>
                    <label htmlFor="loadEngine" className="pgn-upload-button">
                        Load engine for analysis
                    </label>
                </button>
                {settings.enginePath}
            </div>

            <input type="file" id="loadDatabase" onChange={onSelectDatabase} />

            <input type="file" id="loadEngine" onChange={onLoadEngine} />
        </div>
    );
}

export default SettingsTab;
