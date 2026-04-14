
import type { Store } from 'redux';
import { addListener } from '../vscode';
import * as actions from './actions';

export { reducer } from './reducers';
export * from './state';
export { actions };

export function initStore(store: any) {
    addListener((msg) => (store.dispatch as any)(actions.openNewConfig(msg.config, msg.locator)), 'openNewConfig');
    addListener((msg) => (store.dispatch as any)(actions.openConfigLocator(msg.locator)), 'openConfigLocator');
    addListener((msg) => (store.dispatch as any)(actions.openConfigEditor(msg.config, msg.locator)), 'openConfigEditor');
}
