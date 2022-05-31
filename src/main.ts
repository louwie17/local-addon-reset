// https://getflywheel.github.io/local-addon-api/modules/_local_main_.html
import * as LocalMain from '@getflywheel/local/main';
import { EVENTS } from './constants';

export default function (context) {
	const { electron } = context;
	const { ipcMain } = electron;

	ipcMain.on(EVENTS.resetSite, async (event, siteId) => {
		LocalMain.getServiceContainer().cradle.localLogger.log('info', 'Triggering resetSite for site: ' + siteId);

		const site = LocalMain.getServiceContainer().cradle.siteData.getSite(siteId);

		let adminUsers = await LocalMain.getServiceContainer().cradle.wpCli.run(site, ['user',
			'list',
			'--role=administrator',
			'--format=json'
		]);
		adminUsers = adminUsers ? JSON.parse(adminUsers) : [];
		const adminUser = adminUsers.length > 0 ? adminUsers[0] : {};

		try {
			await LocalMain.getServiceContainer().cradle.wpCli.run(site, [
				'db',
				'reset',
				'--yes',
				'--defaults',
			]);
		} catch (error) {

		}
		LocalMain.getServiceContainer().cradle.localLogger.log('info', 'Command "wp db reset" finished.');

		// Run WP-CLI command.
		try {
			await LocalMain.getServiceContainer().cradle.wpCli.run(site, [
				'core',
				'install',
				'--url=' + site.url,
				'--title=' + site.domain,
				'--admin_user=' + adminUser['user_login'] || 'admin',
				'--admin_password=password',
				'--admin_email=' + adminUser['user_email'] || 'dev-email@flywheel.local',
				'--skip-email',
			]);
		} catch (error) {

		}
		LocalMain.getServiceContainer().cradle.localLogger.log('info', 'Command "wp core install" finished.');
	});
}
