import FileInput from '../../components/FileInput/FileInput';
import Tooltip from '../../components/Tooltip/Tooltip';
import { useAppContext } from '../../context/AppContext';
import './SettingsTab.css';

function SettingsTab() {
    const { config } = useAppContext();
    function onSelectDatabase(event: any) {
        window.api.call('config:set', { dbPath: event.target.files[0].path });
    }
    function onSelectEngine(event: any) {
        window.api.call('engine:updatePath', event.target.files[0].path);
    }

    return (
        <div className="settings-tab">
            <div className="settings-row">
                <h1>Chesscompanion Database</h1>
                <FileInput onSelect={onSelectDatabase} label="Load Database" />
                <b>Database path</b>
                {config.dbPath}
            </div>
            <div className="settings-row">
                <h1>
                    Analysis engine configuration{' '}
                    <Tooltip content="Download an analysis engine binary (Stockfish, Lc0, ...) and load it here" />
                </h1>
                <FileInput onSelect={onSelectEngine} label="Load Engine" />
                <b>Name</b>
                {config.engine.name}
                <b>Status</b>
                {config.engine.status ? 'Ready' : 'Not ready'}
                <b>Path</b>
                {config.engine.path}
            </div>
        </div>
    );
}

export default SettingsTab;
