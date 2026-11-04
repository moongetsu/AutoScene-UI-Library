import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { Keyboard, Trash } from "@/components/icons"
import { Kbd } from "./kbd"
import { Button } from "./button"

const spinners = (b: HTMLElement) => b.querySelectorAll(".animate-spin").length
const pictures = (b: HTMLElement) => b.querySelectorAll("svg").length

afterEach(cleanup)

describe("Button busy", () => {
  it("puts the spinner in place of the first icon", () => {
    render(
      <Button busy>
        <Trash /> Uninstall
      </Button>,
    )
    const b = screen.getByRole("button", { name: "Uninstall" })
    expect(spinners(b)).toBe(1)
    expect(pictures(b)).toBe(1)
  })

  it("puts the spinner in front of a label with no icon", () => {
    render(<Button busy>Remove</Button>)
    const b = screen.getByRole("button", { name: "Remove" })
    expect(spinners(b)).toBe(1)
    expect(b.firstElementChild?.tagName.toLowerCase()).toBe("svg")
  })

  it("replaces only the first of two icons", () => {
    render(
      <Button busy>
        <Trash /> Move <Keyboard />
      </Button>,
    )
    const b = screen.getByRole("button", { name: "Move" })
    expect(spinners(b)).toBe(1)
    expect(pictures(b)).toBe(2)
  })

  it("leaves what isn't an icon alone", () => {
    render(
      <Button busy>
        Mark shot <Kbd keys={["M"]} />
      </Button>,
    )
    const b = screen.getByRole("button", { name: /Mark shot/ })
    expect(spinners(b)).toBe(1)
    expect(b.textContent).toContain("M")
    expect(b.firstElementChild?.tagName.toLowerCase()).toBe("svg")
  })

  it("can't be pressed, and says so", () => {
    render(<Button busy>Save</Button>)
    const b = screen.getByRole("button", { name: "Save" })
    expect(b).toHaveProperty("disabled", true)
    expect(b.getAttribute("aria-busy")).toBe("true")
  })

  it("shows the icon again when it is done", () => {
    render(
      <Button>
        <Trash /> Uninstall
      </Button>,
    )
    const b = screen.getByRole("button", { name: "Uninstall" })
    expect(spinners(b)).toBe(0)
    expect(pictures(b)).toBe(1)
    expect(b.getAttribute("aria-busy")).toBeNull()
  })
})
