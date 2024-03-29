import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"

// For `vite preview` to get around "Buffer undefined"
import { Buffer as BufferPolyfill } from "buffer"
declare var Buffer: typeof BufferPolyfill
globalThis.Buffer = BufferPolyfill

if (import.meta.env.DEV) {
  // In dev, let console.log go to terminal and console output. `console` arg
  // doesn't work with vite-plugin-terminal plugin. See this issue.
  // https://github.com/patak-dev/vite-plugin-terminal/issues/23
  // The following code works around it.
  const { terminal } = await import("virtual:terminal")
  // @ts-ignore
  globalThis.console = terminal
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
