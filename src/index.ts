// AutoScene UI Library Styles
import "./styles/library.css"

// Core UI Components
export { Button, type ButtonProps } from "./components/ui/button"
export { Badge } from "./components/ui/badge"
export { Banner } from "./components/ui/banner"
export { Input, Field } from "./components/ui/input"
export { Checkbox } from "./components/ui/checkbox"
export { Switch } from "./components/ui/switch"
export { Slider } from "./components/ui/slider"
export { Segmented } from "./components/ui/segmented"
export { Kbd } from "./components/ui/kbd"
export { Progress, ProgressRing } from "./components/ui/progress"
export { Skeleton, type SkeletonProps } from "./components/ui/skeleton"
export { Tooltip, TooltipProvider } from "./components/ui/tooltip"
export { Toaster } from "./components/ui/toaster"
export { EmptyState } from "./components/ui/empty-state"
export { ErrorState } from "./components/ui/error-state"
export { OpenLogs } from "./lib/open-logs"
export { Hero } from "./components/ui/hero"
export { Artwork } from "./components/ui/artwork"
export { Select } from "./components/ui/select"
export { Sheet } from "./components/ui/sheet"
export { Shelf } from "./components/ui/shelf"
export { Dialog, DialogContent, DialogFooter } from "./components/ui/dialog"
export { FilterBar, type FilterBarProps, type FilterGroup, type FilterOption, type SortOption } from "./components/ui/filter-bar"
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./components/ui/dropdown-menu"
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "./components/ui/context-menu"

// Brand Identity
export { AutoSceneMark } from "./components/brand/AutoSceneMark"

// Icons exports
export * as icons from "./components/icons"
export * from "./components/icons"

// Toast Trigger API
export { toast, notify } from "./components/ui/toaster"

// Utility Functions
export { cn } from "./lib/utils"
