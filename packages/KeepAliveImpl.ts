import { ActionsStatus } from './constants';

export default class keepAliveImpl {
  public cacheStore: any[];
  updater: any;
  constructor(updater) {
    this.cacheStore = [];
    this.updater = updater;
  }

  public cacheHandle(action, payload) {
    if (!this[`_${action}`]) return;
    this[`_${action}`](payload);
    action !== ActionsStatus.CREATE && this.updater({});
  }

  public hasCacheNode = (cacheId) => {
    if (this.cacheStore.find((item) => item.cacheId === cacheId)) return true;
    return false;
  };

  private [`_${ActionsStatus.CREATE}`]({ cacheId, loader, children }) {
    const newComponent = {
      cacheId,
      status: ActionsStatus.CREATE,
      loader,
      children,
      updater: this.updater,
    };
    this.cacheStore.push(newComponent);
  }

  private [`_${ActionsStatus.UPDATE}`]({ cacheId, children }) {
    for (const item of this.cacheStore) {
      if (item.cacheId === cacheId) {
        item.children = children;
      }
    }
  }

  private [`_${ActionsStatus.ACTIVE}`]({ cacheId, loader }) {
    for (const item of this.cacheStore) {
      if (item.cacheId === cacheId) {
        item.status = ActionsStatus.ACTIVE;
        item.loader = loader;
      }
    }
  }

  private [`_${ActionsStatus.INACTIVE}`]({ cacheId }) {
    for (const item of this.cacheStore) {
      if (item.cacheId === cacheId) {
        item.status = ActionsStatus.INACTIVE;
      }
    }
  }
}
