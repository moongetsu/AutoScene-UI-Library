import * as React from "react"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { Field, Input } from "@/components/ui/input"
import { SearchField } from "@/components/ui/search-field"
import { FilterBar } from "@/components/ui/filter-bar"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { ShowcaseSectionStage } from "../ShowcaseSectionStage"

export function InputsShowcase() {
  const [val, setVal] = React.useState("The Mentalist")

  // FilterBar interactive state
  const [filterSearch, setFilterSearch] = React.useState("")
  const [selectedFormat, setSelectedFormat] = React.useState("all")
  const [selectedResolution, setSelectedResolution] = React.useState("all")
  const [selectedSort, setSelectedSort] = React.useState("name-asc")
  const [find, setFind] = React.useState("")

  return (
    <div className="flex flex-col gap-8">
      <ShowcasePageHeader
        title="Inputs & Search"
        description="Text inputs, search fields, and composite desktop filter & sorting bars."
        importPath='import { Input, FilterBar } from "@moongetsu/autoscene-ui"'
      />

      {/* 1. FilterBar Command Toolbar */}
      <ShowcaseSectionStage
        title="Filter & Sorting Bar"
        description="Composite desktop toolbar with keyboard shortcut (/), multi-group filters, sorting, and animated active filter chips."
        code={`import { FilterBar } from "@moongetsu/autoscene-ui"

<FilterBar
  search={search}
  onSearchChange={setSearch}
  searchPlaceholder="Search footage clips... (press /)"
  filterGroups={[
    {
      id: "format",
      label: "Format",
      options: [
        { value: "all", label: "All Formats" },
        { value: "prores", label: "Apple ProRes", count: 24 },
        { value: "h265", label: "HEVC / H.265", count: 18 },
      ],
    },
  ]}
  selectedFilters={{ format: selectedFormat }}
  onFilterChange={(group, val) => setSelectedFormat(val)}
  sortOptions={[
    { value: "name-asc", label: "Name: A to Z" },
    { value: "date-desc", label: "Date Added: Newest" },
  ]}
  selectedSort={selectedSort}
  onSortChange={setSelectedSort}
  onResetFilters={() => setSelectedFormat("all")}
/>`}
      >
        <div className="w-full max-w-2xl">
          <FilterBar
            search={filterSearch}
            onSearchChange={setFilterSearch}
            searchPlaceholder="Search footage clips... (press / to focus)"
            filterGroups={[
              {
                id: "format",
                label: "Codec",
                options: [
                  { value: "all", label: "All Codecs" },
                  { value: "prores", label: "Apple ProRes 422", count: 24 },
                  { value: "h265", label: "HEVC / H.265", count: 18 },
                  { value: "dnxhr", label: "Avid DNxHR", count: 7 },
                ],
              },
              {
                id: "resolution",
                label: "Resolution",
                options: [
                  { value: "all", label: "All Resolutions" },
                  { value: "4k", label: "4K UHD (3840×2160)", count: 32 },
                  { value: "1080p", label: "1080p HD", count: 17 },
                ],
              },
            ]}
            selectedFilters={{
              format: selectedFormat,
              resolution: selectedResolution,
            }}
            onFilterChange={(groupId, val) => {
              if (groupId === "format") setSelectedFormat(val)
              if (groupId === "resolution") setSelectedResolution(val)
            }}
            sortOptions={[
              { value: "name-asc", label: "Name: A to Z" },
              { value: "name-desc", label: "Name: Z to A" },
              { value: "size-desc", label: "File Size: Largest" },
              { value: "date-desc", label: "Date Added: Newest" },
            ]}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
            onResetFilters={() => {
              setSelectedFormat("all")
              setSelectedResolution("all")
              setFilterSearch("")
            }}
          />
        </div>
      </ShowcaseSectionStage>

      {/* 2. Standard Fields */}
      <ShowcaseSectionStage
        title="Standard Text Inputs"
        description="Controlled text fields with labels and active states."
        code={`import { Input } from "@moongetsu/autoscene-ui"

<div className="flex flex-col gap-1.5">
  <label className="text-xs font-medium text-fg-2">Project Name</label>
  <Input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Enter project name..." />
</div>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-fg-2">Project Name</label>
            <Input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Enter project name..." />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-fg-2">Empty with Placeholder</label>
            <Input placeholder="Type something here…" />
          </div>
        </div>
      </ShowcaseSectionStage>

      {/* 2. States & Variants */}
      <ShowcaseSectionStage
        title="Search & Disabled States"
        description="Search inputs with integrated icons and non-editable read-only views."
        code={`import { MagnifyingGlass } from "@phosphor-icons/react"

{/* Search with icon */}
<div className="relative">
  <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-fg-3" />
  <Input className="pl-10" placeholder="Search cast or episodes…" />
</div>

{/* Disabled field */}
<Input disabled value="Read-only system path" />`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-fg-2">Search Input with Icon</label>
            <div className="relative">
              <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-fg-3" />
              <Input className="pl-10" placeholder="Search cast or episodes…" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-fg-2">Disabled Input</label>
            <Input disabled value="/Volumes/Archive/AutoScene/Projects" />
          </div>
        </div>
      </ShowcaseSectionStage>

      {/* Search field */}
      <ShowcaseSectionStage
        title="Search Field"
        description="The pill that finds things in a list. Its label is its placeholder and its name for screen readers. Escape clears it, as the cross does."
        code={`<SearchField value={find} onChange={setFind} label="Find a character" />`}
      >
        <SearchField value={find} onChange={setFind} label="Find a character" />
      </ShowcaseSectionStage>

      {/* Field without a visible label */}
      <ShowcaseSectionStage
        title="Field, Label Hidden"
        description="hideLabel keeps the label for a screen reader only, where a title above already names the control."
        code={`<Field label="API key" hideLabel htmlFor="key">
  <Input id="key" placeholder="Paste the key" />
</Field>`}
      >
        <div className="w-full max-w-sm">
          <Field label="API key" hideLabel htmlFor="showcase-key">
            <Input id="showcase-key" placeholder="Paste the key" />
          </Field>
        </div>
      </ShowcaseSectionStage>
    </div>
  )
}
