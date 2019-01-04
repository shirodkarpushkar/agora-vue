import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { IRootState } from '@common/base/store/interfaces/IRootState';
import { Language } from '@common/i18n/store';
import { DynamicComponent } from '@common/events/store';
import { Config } from '@common/config/Config';

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
	modules: { Language, DynamicComponent },
	strict: Config.APP_SETTINGS.STORE_STRICT_MODE
};

export default new Vuex.Store<IRootState>(store);