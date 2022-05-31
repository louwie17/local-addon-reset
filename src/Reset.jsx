import { Button } from '@getflywheel/local-components';
import * as LocalRenderer from '@getflywheel/local/renderer';
import {
    useParams
} from "react-router-dom";
import { useState } from 'react';
import { EVENTS } from './constants';

export function Reset() {
    const { siteID } = useParams();
    const [ resetting, setResetting ] = useState( false );

    const onResetSite = () => {
        setResetting( true )
        LocalRenderer.ipcAsync(EVENTS.resetSite, siteID).then((result) => {
            setResetting(false);
        }, (error) => {
            setResetting(false);
        });

    }

    return <div style={{ flex: '1', overflowY: 'auto', margin: '10px' }}>
        <div>
            <Button onClick={onResetSite} disabled={ resetting }>{ resetting ? 'Resetting' : 'Reset site' }</Button>
        </div>
    </div>
}
