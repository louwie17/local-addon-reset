import { Button } from '@getflywheel/local-components';

export function Reset() {

    const onResetSite = () => {
        console.log('resetSite');
    }

    return <div style={{ flex: '1', overflowY: 'auto', margin: '10px' }}>
        <div>
            <Button onClick={onResetSite}>Reset site</Button>
        </div>
    </div>
}
