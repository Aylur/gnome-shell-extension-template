import * as PanelMenu from "resource:///org/gnome/shell/ui/panelMenu.js"
import * as Main from "resource:///org/gnome/shell/ui/main.js"
import type { Extension } from "resource:///org/gnome/shell/extensions/extension.js"
import St from "gi://St"
import Clutter from "gi://Clutter"
import { useSettings } from "~schemas"
import { register } from "gnim/gobject"
import { onCleanup, onMount, This } from "gnim"

interface PanelButtonProps {
  extension: Extension
}

@register()
export default class PanelButton extends PanelMenu.Button {
  constructor({ extension }: PanelButtonProps) {
    super(0.5, extension.uuid)

    const { simpleKey } = useSettings()

    onMount(() => {
      Main.panel.addToStatusArea(extension.uuid, this)
    })

    onCleanup(() => {
      setTimeout(() => this.destroy())
    })

    void (
      <This this={this as PanelButton} onButtonPressEvent={() => extension.openPreferences()}>
        <St.Label class="my-label" yAlign={Clutter.ActorAlign.CENTER} text={simpleKey} />
      </This>
    )
  }
}
