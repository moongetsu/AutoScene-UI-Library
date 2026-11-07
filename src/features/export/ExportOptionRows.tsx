import type { ExportOptions, ExportPreset } from "@/bindings"
import { OptionRow } from "@/components/ui/option-row"

/** What an export dialog starts from before the person has chosen anything. */
export const NO_EXPORT_OPTIONS: ExportOptions = { removeBars: false, matchLoudness: false }

/** What an export changes of its clips. Bit-Perfect keeps the source as it is, so it offers neither. */
export function ExportOptionRows({
  preset,
  options,
  onChange,
}: {
  preset: ExportPreset | undefined
  options: ExportOptions
  onChange: (options: ExportOptions) => void
}) {
  if (!preset || preset.video.codec === "lossless") return null
  return (
    <div className="flex flex-col gap-2">
      <OptionRow
        label="Remove black bars"
        description="Cuts off the bars built into the picture."
        checked={options.removeBars}
        onCheckedChange={(removeBars) => onChange({ ...options, removeBars })}
      />
      <OptionRow
        label="Match loudness"
        description="Brings every clip to the same volume."
        checked={options.matchLoudness}
        onCheckedChange={(matchLoudness) => onChange({ ...options, matchLoudness })}
      />
    </div>
  )
}
