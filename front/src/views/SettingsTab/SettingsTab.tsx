function SettingsTab() {
    function onSelectDatabase() {}
    function onLoadEngine() {}

    return (
        <div className="settings-tab">
            <button>
                <label htmlFor="loadDatabase" className="pgn-upload-button">
                    Load database
                </label>
            </button>

            <button>
                <label htmlFor="loadEngine" className="pgn-upload-button">
                    Load engine for analysis
                </label>
            </button>

            <input type="file" id="loadDatabase" onChange={onSelectDatabase} />

            <input type="file" id="loadEngine" onChange={onLoadEngine} />
        </div>
    );
}

export default SettingsTab;
