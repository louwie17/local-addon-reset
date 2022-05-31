import { Button } from '@getflywheel/local-components';
import { useState } from 'react';
import { ipcRenderer } from 'electron';
// https://getflywheel.github.io/local-addon-api/modules/_local_renderer_.html
import * as LocalRenderer from '@getflywheel/local/renderer';
import {
    useParams
  } from "react-router-dom";
import { EVENTS } from './constants';

export function Reset() {
    const { siteID } = useParams();
    const [ resetting, setResetting ] = useState( false );

    const onResetSite = () => {
        // ipcRenderer.send(
		// 	EVENTS.resetSite,
		// 	siteID,
		// );
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