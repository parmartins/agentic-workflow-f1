#!/usr/bin/env node
// PostToolUse hook: run Prettier on the file that Edit/Write/MultiEdit just changed.
// Reads the hook payload (JSON) from stdin; never blocks the tool call.
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

let input = ''
process.stdin.setEncoding('utf8')
for await (const chunk of process.stdin) input += chunk

let filePath
try {
  filePath = JSON.parse(input)?.tool_input?.file_path
} catch {
  process.exit(0)
}
if (typeof filePath !== 'string' || !existsSync(filePath)) process.exit(0)

const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd()
// Only format files inside the project.
if (!resolve(filePath).startsWith(resolve(root))) process.exit(0)

const bin = resolve(root, 'node_modules/.bin/prettier')
const res = spawnSync(bin, ['--write', '--ignore-unknown', '--log-level', 'warn', filePath], { cwd: root, encoding: 'utf8' })
if (res.status !== 0) {
  // Exit 0 so a formatting problem never blocks the edit; surface it to the log.
  process.stderr.write(res.stderr || res.stdout || `prettier exited with ${res.status}\n`)
}
process.exit(0)
