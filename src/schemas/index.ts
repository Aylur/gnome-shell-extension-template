import { createContext, createSettings } from "gnim"

export const settingKeys = Object.freeze({
  "string-key": "s",
})

type Settings = ReturnType<typeof createSettings<typeof settingKeys>>

export const SettingsContext = createContext<Settings | null>(null)

export function useSettings() {
  const settings = SettingsContext.use()
  if (!settings) throw Error("settings not in scope")
  return settings
}
