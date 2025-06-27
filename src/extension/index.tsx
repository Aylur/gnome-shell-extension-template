import { createRoot, createSettings } from "gnim"
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js"
import { settingKeys, SettingsContext } from "~schemas"
import PanelButton from "./PanelButton"

export default class MyExtension extends Extension {
  declare private dispose: () => void

  disable() {
    this.dispose()
  }

  enable() {
    const settings = createSettings(this.getSettings(), settingKeys)

    createRoot((dispose) => {
      this.dispose = dispose

      return (
        <SettingsContext value={settings}>
          {() => <PanelButton uuid={this.uuid} onButtonPressEvent={() => this.openPreferences()} />}
        </SettingsContext>
      )
    })
  }
}
