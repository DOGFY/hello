'use babel';

import CobaView from './coba-view';
import { CompositeDisposable } from 'atom';

export default {

  cobaView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.cobaView = new CobaView(state.cobaViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.cobaView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'coba:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.cobaView.destroy();
  },

  serialize() {
    return {
      cobaViewState: this.cobaView.serialize()
    };
  },

  toggle() {
    console.log('Coba was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
