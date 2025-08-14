import Gtk from "gi://Gtk"
import Adw from "gi://Adw"
import { gettext as _ } from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js"
import { useSettings } from "~schemas"

export default function PreferencesPage() {
  const { simpleKey, setSimpleKey, complexKey } = useSettings()

  return (
    <Adw.PreferencesPage>
      <Adw.PreferencesGroup title={_("Simple Group")}>
        <Adw.EntryRow
          text={simpleKey}
          onNotifyText={({ text }) => setSimpleKey(text)}
          title={_("String Key")}
        />
      </Adw.PreferencesGroup>
      <Adw.PreferencesGroup title={_("Complex Group")}>
        <Gtk.Frame>
          <Gtk.TextView css="padding:8px;" editable={false}>
            <Gtk.TextBuffer text={JSON.stringify(complexKey.get(), null, 2)} />
          </Gtk.TextView>
        </Gtk.Frame>
      </Adw.PreferencesGroup>
    </Adw.PreferencesPage>
  )
}
