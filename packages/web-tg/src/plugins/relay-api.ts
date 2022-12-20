import { defineRelayApi } from '@us/relay-api';
import { useDialogs } from '../stores/dialogs';
import { useSession } from '@us/web-tg/stores/session';
import { usePlatform } from '@us/web-tg/stores/platform';
import { useEnv, useSettings } from '@us/utils';
import { useI18n } from '@us/locales/tg';

const relayApi = defineRelayApi({
	getBaseUrl: () => useEnv().VITE_TG_BET_RELAY_API_URL,
	getHeaders: () => {
		const platform = usePlatform();
		const session = useSession();
		const settings = useSettings();
		return {
			Platform: 'Web_1.0',
			Ticket: session.user?.ticket,
			username: session.user?.username,
			vga: platform.vga,
			deviceInfo: platform.deviceInfo,
			domain: platform.domain,
			uuid: platform.uuid,
			Lang: settings.language,
		}
	},
	getEncryptUserId: () => {
		const platform = usePlatform();
		if (platform.encrypt) {
			const session = useSession();
			return session.userId;
		}
	},
	onSessionInvalid: () => {
		sessionStorage.clear();
	},
	onOperateInvalid: () => {
		const dialogs = useDialogs();
		const platform = usePlatform();
		const t = useI18n();
		dialogs.pop(t.web_tg_c.txt_11, t.web_tg.txt_102);
		dialogs.setCloseHandle(platform.backToBackUrl);
	},
	// 維修跟ws監聽重複，先註解掉不處理
	onMaintainInvalid: () => {
		const platform = usePlatform();
		platform.serverMaintainHandle('');
	},
	onErrorDialog: (errorCode) => {
		const dialogs = useDialogs();
		const t = useI18n();
		const title = t.web_tg_c.txt_11;
		const message = t.web_tg.code_message?.[errorCode] || t.web_tg.txt_102;
		dialogs.pop(title, message);
	}
});

export const useRelayApi = () => relayApi;
