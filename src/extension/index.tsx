import { createRoot, createSettings } from "gnim"
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js"
import { schema, SettingsContext } from "~schemas"
import PanelButton from "./PanelButton"

export default class MyExtension extends Extension {
  declare disable: () => void

  enable() {
    const settings = createSettings(this.getSettings(), schema)

    createRoot((dispose) => {
      this.disable = dispose

      return (
        <SettingsContext value={settings}>{() => <PanelButton extension={this} />}</SettingsContext>
      )
    })
  }
}
