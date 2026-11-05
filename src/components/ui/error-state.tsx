import { use } from "react"
import { ArrowCounterClockwise, FileText, Warning } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { errorMessage, isAppError } from "@/lib/errors"
import { OpenLogs } from "@/lib/open-logs"

/**
 * A view whose data couldn't be loaded: what went wrong in plain words, and a
 * way to try again. Failures of the app itself (its data, its files) also
 * offer the logs, where their technical side is written (given by `OpenLogs`,
 * so the package carries no call to the app).
 */
export function ErrorState({
  error,
  title = "This couldn't be loaded",
  onRetry,
  className,
}: {
  error: unknown
  title?: string
  onRetry?: () => void
  className?: string
}) {
  const openLogs = use(OpenLogs)
  const ownFault = !isAppError(error) || error.code === "internal" || error.code === "io" || error.code === "media"
  return (
    <EmptyState
      tone="danger"
      icon={<Warning />}
      title={title}
      description={isAppError(error) ? error.message : "Something went wrong while showing this."}
      className={className}
      actions={
        <>
          {onRetry && (
            <Button onClick={onRetry}>
              <ArrowCounterClockwise /> Try again
            </Button>
          )}
          {ownFault && openLogs && (
            <Button variant="ghost" onClick={openLogs}>
              <FileText /> Open logs
            </Button>
          )}
        </>
      }
    >
      {/* A bug in the view itself: its own words, small and copyable, for a report. */}
      {!isAppError(error) && (
        <p data-selectable className="timecode mt-6 max-w-lg text-xs break-words text-fg-3">
          {errorMessage(error)}
        </p>
      )}
    </EmptyState>
  )
}
