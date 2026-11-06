const ua = typeof navigator !== "undefined" ? navigator.userAgent : ""
export const isMac = /Mac OS X|Macintosh/.test(ua)
export const isWindows = /Windows/.test(ua)
