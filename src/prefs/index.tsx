import Adw from "gi://Adw"
import PreferencesPage from "./PreferencesPage"
import { ExtensionPreferences } from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js"
import { createSettings, createRoot, This } from "gnim"
import { schema, SettingsContext } from "~schemas"

export default class MyExtensionPreferences extends ExtensionPreferences {
  async fillPreferencesWindow(window: Adw.PreferencesWindow): Promise<void> {
    const settings = createSettings(this.getSettings(), schema)

    createRoot((dispose) => (
      <This this={window} onCloseRequest={dispose}>
        <SettingsContext value={settings}>{() => <PreferencesPage />}</SettingsContext>
      </This>
    ))
  }
}
