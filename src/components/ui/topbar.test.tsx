import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"
import { TopBarRail } from "@/lib/top-bar-rail"
import { TooltipProvider } from "./tooltip"
import { TopBar } from "./topbar"

vi.mock("@tanstack/react-router", () => ({ Link: () => null, useNavigate: () => () => {} }))

afterEach(cleanup)

const bar = (rail?: React.ContextType<typeof TopBarRail>) =>
  render(
    <TooltipProvider>
      <TopBarRail value={rail ?? null}>
        <TopBar title="Library" />
      </TopBarRail>
    </TooltipProvider>,
  )

describe("TopBar", () => {
  it("asks nothing of the app: without a rail it has no Show the rail", () => {
    bar()
    expect(screen.getByRole("heading", { name: "Library" })).toBeTruthy()
    expect(screen.queryByRole("button", { name: "Show the rail" })).toBeNull()
  })

  it("offers the rail its shell says is hidden, and shows it", async () => {
    const show = vi.fn()
    bar({ hidden: true, show })
    await userEvent.setup().click(screen.getByRole("button", { name: "Show the rail" }))
    expect(show).toHaveBeenCalledOnce()
  })

  it("says nothing of a rail that shows", () => {
    bar({ hidden: false, show: () => {} })
    expect(screen.queryByRole("button", { name: "Show the rail" })).toBeNull()
  })
})
