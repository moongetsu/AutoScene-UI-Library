import type * as React from "react"
import { FeatureFrame } from "@/components/showcase/FeatureFrame"
import { CharacterCard } from "@/features/cast/CharacterCard"
import { ProjectCard } from "@/features/library/ProjectCard"
import { DEMO_CHARACTERS, DEMO_PROJECT, STILL_CREDIT } from "./demo-data"

const nothing = () => {}

/** Previews of the feature components (the `Features` entries of the catalog). */
export const FEATURE_PREVIEWS: Record<string, (handlers?: any) => React.ReactNode> = {
  "project-card": () => (
    <FeatureFrame id="project-card" width={420} credit={STILL_CREDIT}>
      <ProjectCard project={DEMO_PROJECT} onRename={nothing} onDelete={nothing} />
    </FeatureFrame>
  ),
  "character-card": () => (
    <FeatureFrame id="character-card" width={220} credit={STILL_CREDIT}>
      <CharacterCard pid={DEMO_PROJECT.id} character={DEMO_CHARACTERS[0]} />
    </FeatureFrame>
  ),
}
