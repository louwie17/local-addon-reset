// https://getflywheel.github.io/local-addon-api/modules/_local_main_.html
import * as LocalMain from '@getflywheel/local/main';
import { EVENTS } from './constants';

export default function (context) {
	const { electron } = context;
	const { ipcMain } = electron;

	ipcMain.on(EVENTS.resetSite, async (event, siteId) => {
		LocalMain.getServiceContainer().cradle.localLogger.log('info', 'Triggering resetSite for site: ' + siteId);
	});
}
