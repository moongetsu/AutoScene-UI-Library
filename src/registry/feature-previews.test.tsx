import { QueryClientProvider } from "@tanstack/react-query"
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { TooltipProvider } from "@/components/ui/tooltip"
import { queryClient } from "@/lib/queries"
import { COMPONENT_DEMO_PREVIEWS } from "./component-previews"

afterEach(cleanup)

const show = (id: string) =>
  render(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>{COMPONENT_DEMO_PREVIEWS[id]()}</TooltipProvider>
    </QueryClientProvider>,
  )

describe("feature previews", () => {
  it("what a preview holds keeps reaching its memory router", async () => {
    show("cast-tab")
    const thom = (await screen.findByText("Thom")).closest("button")!
    expect(thom.className).not.toContain("bg-accent-subtle")
    fireEvent.click(thom)
    await waitFor(() => expect(screen.getByText("Thom").closest("button")!.className).toContain("bg-accent-subtle"))
  })

  it("a card's link stays in the preview", async () => {
    const before = window.location.href
    show("project-card")
    fireEvent.click((await screen.findByText("Tears of Steel")).closest("a")!)
    expect(await screen.findByText("That opens in the app")).toBeTruthy()
    expect(window.location.href).toBe(before)
  })
})
