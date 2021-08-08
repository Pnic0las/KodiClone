import * as electron from 'electron';
import * as React from 'react';

import * as Setting from '../../components/Setting/Setting';
import Dropzone from '../../components/SettingDropzone/SettingDropzone';

import * as LibraryActions from '../../actions/LibraryActions';
import * as PlayerActions from '../../actions/PlayerActions';
import { LibraryState } from '../../reducers/library';
import Button from '../../elements/Button/Button';

const { dialog } = electron.remote;

interface Props {
  library: LibraryState;
}

export default class SettingsLibrary extends React.Component<Props> {
  onDrop(e: DragEvent) {
    const files = [];

    if (e.dataTransfer) {
      const eventFiles = e.dataTransfer.files;

      for (let i = 0; i < eventFiles.length; i++) {
        files.push(eventFiles[i].path);
      }

      LibraryActions.add(files).catch((err) => {
        console.warn(err);
      });
    }
  }

  async resetLibrary() {
    PlayerActions.stop();
    await LibraryActions.reset();
  }

  async openFolderSelector() {
    const result = await dialog.showOpenDialog({
      properties: ['multiSelections', 'openDirectory', 'openFile']
    });

    if (result.filePaths) {
      LibraryActions.add(result.filePaths).catch((err) => {
        console.warn(err);
      });
    }
  }

  render() {
    return (
      <div className='setting settings-musicfolder'>
        <Setting.Section>
          <h3 style={{ marginTop: 0 }}>Importer des morceaux</h3>
          <Dropzone
            title='Ajouter des morceaux à la librairie'
            subtitle='Choisir un répertoire'
            onDrop={this.onDrop}
            onClick={this.openFolderSelector}
          />
          {/* <Setting.Description>
            This will also scan for <code>.m3u</code> files and create corresponding playlists.
          </Setting.Description> */}
        </Setting.Section>
        <Setting.Section>
          {/* <h3>Danger zone</h3> */}
          <Button
            relevancy='danger'
            title='Fully reset the library'
            disabled={this.props.library.refreshing}
            onClick={this.resetLibrary}
          >
            Vider répertoire
          </Button>
        </Setting.Section>
      </div>
    );
  }
}
