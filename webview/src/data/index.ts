
import type { Store } from 'redux';
import { addListener } from '../vscode';
import * as actions from './actions';

export { reducer } from './reducers';
export * from './state';
export { actions };

export function initStore(store: any) {
  addListener((msg) => (store.dispatch as any)(actions.receivedData(msg.configs, msg.locations)), 'responseData');
}