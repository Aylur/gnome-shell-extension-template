import * as PanelMenu from "resource:///org/gnome/shell/ui/panelMenu.js"
import * as Main from "resource:///org/gnome/shell/ui/main.js"
import St from "gi://St"
import Clutter from "gi://Clutter"
import { useSettings } from "~schemas"
import { register } from "gnim/gobject"
import { onCleanup, onMount, This } from "gnim"

interface PanelButtonProps {
  uuid: string
}

@register()
export default class PanelButton extends PanelMenu.Button {
  constructor({ uuid }: PanelButtonProps) {
    super(0.5, uuid)

    const { stringKey } = useSettings()

    onMount(() => {
      Main.panel.addToStatusArea(uuid, this)
    })

    onCleanup(() => {
      setTimeout(() => this.destroy())
    })

    void (
      <This this={this as PanelButton}>
        <St.Label class="my-label" yAlign={Clutter.ActorAlign.CENTER} text={stringKey} />
      </This>
    )
  }
}
