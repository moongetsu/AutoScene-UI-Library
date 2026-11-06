import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { ContextArea } from "@/components/ui/context-area"
import { ContextMenuItem } from "@/components/ui/context-menu"
import { AppMenu } from "./AppMenu"

afterEach(cleanup)

describe("AppMenu without the app's entries", () => {
  it("offers only what the area offers", async () => {
    render(
      <AppMenu appEntries={false}>
        <div>
          <ContextArea menu={<ContextMenuItem>Copy its id</ContextMenuItem>}>
            <p>Card</p>
          </ContextArea>
          <p>Empty space</p>
        </div>
      </AppMenu>,
    )
    fireEvent.contextMenu(screen.getByText("Card"))
    expect((await screen.findAllByRole("menuitem")).map((i) => i.textContent)).toEqual(["Copy its id"])
  })

  it("opens nothing where nothing is offered", () => {
    render(
      <AppMenu appEntries={false}>
        <p>Empty space</p>
      </AppMenu>,
    )
    fireEvent.contextMenu(screen.getByText("Empty space"))
    expect(screen.queryByRole("menu")).toBeNull()
  })
})
