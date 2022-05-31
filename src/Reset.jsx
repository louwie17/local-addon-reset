import { Button } from '@getflywheel/local-components';
import { ipcRenderer } from 'electron';
import {
    useParams
} from "react-router-dom";
import { EVENTS } from './constants';

export function Reset() {
    const { siteID } = useParams();

    const onResetSite = () => {
        ipcRenderer.send(
            EVENTS.resetSite,
            siteID,
        );
    }

    return <div style={{ flex: '1', overflowY: 'auto', margin: '10px' }}>
        <div>
            <Button onClick={onResetSite}>Reset site</Button>
        </div>
    </div>
}
