/**
 * Invoked from `.githooks/post-commit`.
 * If the latest commit's first line starts with `feature:`, inserts a bullet into
 * `src/docs/changelog.mdx` and creates `chore(changelog): update`.
 */
import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const changelogPath = path.join(root, "src/docs/changelog.mdx")

const fullMessage = execSync("git log -1 --format=%B", {
    cwd: root,
    encoding: "utf8",
}).trim()

const firstLine = fullMessage.split(/\r?\n/)[0]?.trim() ?? ""

if (!/^feature:/i.test(firstLine)) {
    process.exit(0)
}

if (/^chore\(changelog\):/i.test(firstLine)) {
    process.exit(0)
}

const date = new Date().toISOString().slice(0, 10)
const shortHash = execSync("git rev-parse --short HEAD", {
    cwd: root,
    encoding: "utf8",
}).trim()

const summary = firstLine.replace(/^feature:\s*/i, "").trim() || "(no description)"
const bullet = `- **${date}** — ${summary} (${shortHash})`

let content = fs.readFileSync(changelogPath, "utf8")
const startMarker = "{/* CHANGELOG:START */}"
const endMarker = "{/* CHANGELOG:END */}"

if (!content.includes(startMarker) || !content.includes(endMarker)) {
    console.error("update-changelog: markers missing in changelog.mdx")
    process.exit(1)
}

const insertAt = content.indexOf(startMarker) + startMarker.length
const before = content.slice(0, insertAt)
const after = content.slice(insertAt)
content = `${before}\n\n${bullet}\n${after}`

fs.writeFileSync(changelogPath, content, "utf8")

try {
    execSync(`git add "${changelogPath}"`, {
        cwd: root,
        stdio: "inherit",
    })
    execSync('git commit -m "chore(changelog): update" --no-verify', {
        cwd: root,
        stdio: "inherit",
    })
} catch (err) {
    process.exit(err.status ?? 1)
}
