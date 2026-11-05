import type { Character, MediaItem, PluginInfo, ProjectSummary, Rational, Segment, ThisComputer } from "@/bindings"
import { FrameStore } from "@/features/player/frame-store"
import { footageStill } from "@/lib/footage"
import type { Lane } from "@/lib/presence"
import { timecode } from "@/lib/timecode"

export const still = footageStill

/** What the stills below are, for wherever they show. */
export const STILL_CREDIT = "Tears of Steel · Blender Foundation · CC BY 3.0"

/** Everything here is made up for the previews: a project of the open film Tears of Steel. */
export const DEMO_PROJECT: ProjectSummary = {
  id: "demo",
  title: "Tears of Steel",
  kind: "movie",
  content: "live",
  dir: String.raw`C:\Users\you\Videos\Tears of Steel.autoscene`,
  createdAt: 1_760_000_000_000,
  updatedAt: 1_760_500_000_000,
  mediaCount: 1,
  readyCount: 1,
  durationSec: 734,
  poster: still("live-1.webp"),
  posterSmall: still("live-1.webp"),
}

const person = (id: string, name: string, picture: string | null, shots: number, screenSec: number): Character => ({
  id,
  name,
  label: name,
  hidden: false,
  tracks: shots * 2,
  shots,
  media: 1,
  screenSec,
  cover: picture && still(picture),
  coverSmall: picture && still(picture),
  unsure: 0,
  waiting: 0,
})

export const DEMO_CHARACTERS: Character[] = [
  person("demo-thom", "Thom", "live-2.webp", 48, 212),
  person("demo-celia", "Celia", "live-3.webp", 31, 164),
  person("demo-barley", "Barley", null, 12, 58),
]

export const DEMO_FPS: Rational = { num: 24, den: 1 }
export const DEMO_FRAMES = 17_616

export const DEMO_SEGMENTS: Segment[] = [
  { start: 0, end: 96, kind: "shot", tiny: false },
  { start: 96, end: 108, kind: "dissolve", tiny: false },
  { start: 108, end: 260, kind: "shot", tiny: false },
  { start: 260, end: 400, kind: "shot", tiny: false },
]

/** Who is on screen when: Thom and Celia in the second shot, Barley later. */
export const DEMO_LANES: Lane[] = [
  { character: DEMO_CHARACTERS[0], spans: [{ characterId: "demo-thom", trackId: 1, start: 0, end: 260 }], frames: 260 },
  { character: DEMO_CHARACTERS[1], spans: [{ characterId: "demo-celia", trackId: 2, start: 108, end: 400 }], frames: 292 },
  { character: DEMO_CHARACTERS[2], spans: [{ characterId: "demo-barley", trackId: 3, start: 260, end: 400 }], frames: 140 },
]

export const demoTimecode = (f: number) => timecode(f, DEMO_FPS, false)

/** The playhead, in the second shot. */
export function demoFrameStore() {
  const store = new FrameStore()
  store.set(140)
  return store
}

const rate = { num: 24, den: 1 }

export const DEMO_MEDIA: MediaItem = {
  id: "demo-media",
  path: String.raw`C:\Users\you\Videos\Tears.of.Steel.2012.1080p.WEB-DL.mkv`,
  fileName: "Tears.of.Steel.2012.1080p.WEB-DL.mkv",
  season: null,
  episode: null,
  label: "",
  position: 0,
  sizeBytes: 1_250_000_000,
  status: "ready",
  error: null,
  info: {
    container: "matroska",
    durationSec: 734,
    startSec: 0,
    sizeBytes: 1_250_000_000,
    bitRate: 13_600_000,
    video: {
      index: 0,
      codec: "h264",
      profile: "High",
      pixFmt: "yuv420p",
      bitDepth: 8,
      width: 1920,
      height: 800,
      sar: { num: 1, den: 1 },
      rFrameRate: rate,
      avgFrameRate: rate,
      timeBase: { num: 1, den: 1000 },
      colorPrimaries: "bt709",
      colorTransfer: "bt709",
      colorSpace: "bt709",
      colorRange: "tv",
      fieldOrder: "progressive",
      rotation: 0,
      hdr: "none",
    },
    audio: [
      {
        index: 1,
        ordinal: 0,
        codec: "aac",
        profile: "LC",
        channels: 2,
        channelLayout: "stereo",
        sampleRate: 48_000,
        language: "eng",
        title: null,
        default: true,
        commentary: false,
      },
    ],
    subtitles: [],
  },
  frames: DEMO_FRAMES,
  durationSec: 734,
  fps: DEMO_FPS,
  vfr: false,
  interlaced: false,
  audioOrdinal: 0,
  proxy: "not_needed",
  poster: still("live-1.webp"),
  posterSmall: still("live-1.webp"),
  addedAt: 1_760_000_000_000,
  shots: "ready",
  shotsError: null,
  shotCount: 3,
  faces: "ready",
  facesError: null,
  faceCount: 92,
}

/** A picture as a plugin's package gives it: only checked `data:` URLs draw. */
const svg = (body: string) => `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" ${body}</svg>`)}`

export const DEMO_ICON = svg(
  `viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="#e0b45c"/><circle cx="12" cy="12" r="4" fill="#0b0b0c"/>`,
)

export const DEMO_BANNER = svg(
  `viewBox="0 0 1200 600"><defs><radialGradient id="g" cx="74%" cy="26%" r="90%"><stop offset="0" stop-color="#e0b45c"/><stop offset=".45" stop-color="#3b2a10"/><stop offset="1" stop-color="#0b0b0c"/></radialGradient></defs><rect width="1200" height="600" fill="url(#g)"/>`,
)

/** A plugin AutoScene took back. Only what its banner reads is filled in. */
export const DEMO_WITHDRAWN = {
  id: "dev.example.leaky",
  name: "Leaky Export",
  withdrawn: "It sent file names to a server of its own.",
} as PluginInfo

/** A graphics card Fast Scan's first-start notice speaks of. */
export const DEMO_COMPUTER: ThisComputer = { class: "notForAi", name: "NVIDIA GeForce GTX 1060 6GB" }
