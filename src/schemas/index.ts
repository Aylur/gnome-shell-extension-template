import { createContext, createSettings } from "gnim"

export const schema = Object.freeze({
  "complex-key": "a{sv}",
  "simple-key": "s",
})

type Settings = ReturnType<typeof createSettings<typeof schema>>

export const SettingsContext = createContext<Settings | null>(null)

export function useSettings() {
  const settings = SettingsContext.use()
  if (!settings) throw Error("settings not in scope")
  return settings
}
