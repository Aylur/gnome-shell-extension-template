import Adw from "gi://Adw"
import { gettext as _ } from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js"
import { useSettings } from "~schemas"

export default function PreferencesPage() {
  const { stringKey, setStringKey } = useSettings()

  return (
    <Adw.PreferencesPage>
      <Adw.PreferencesGroup title={_("Title")}>
        <Adw.EntryRow
          text={stringKey}
          onNotifyText={({ text }) => setStringKey(text)}
          title={_("String Key")}
        />
      </Adw.PreferencesGroup>
    </Adw.PreferencesPage>
  )
}
