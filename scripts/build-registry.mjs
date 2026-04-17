/**
 * Scans src/components/* and generates:
 * - registry.json for `shadcn build`
 * - package.json "exports" for npm subpath imports
 * - src/index.ts barrel (sorted component folders)
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const componentsDir = path.join(root, "src", "components")
const packageJsonPath = path.join(root, "package.json")
const registryPath = path.join(root, "registry.json")
const indexTsPath = path.join(root, "src", "index.ts")

const REGISTRY_HOMEPAGE =
    process.env.REGISTRY_HOMEPAGE ?? "https://alpha-design-system-five.vercel.app"

/**
 * @param {string} filePath
 * @returns {string}
 */
function readFileUtf8(filePath) {
    return fs.readFileSync(filePath, "utf8")
}

/**
 * @param {string} content
 * @returns {Set<string>}
 */
function detectNpmDependencies(content) {
    const deps = new Set()
    const importRe = /(?:import|export)\s+[^;]*?\s+from\s+["']([^"']+)["']/g
    let m
    while ((m = importRe.exec(content)) !== null) {
        const spec = m[1]
        if (
            spec.startsWith(".") ||
            spec.startsWith("@/") ||
            spec.startsWith("virtual:") ||
            spec.includes("?raw")
        ) {
            continue
        }
        const pkg = spec.startsWith("@")
            ? spec.split("/").slice(0, 2).join("/")
            : spec.split("/")[0]
        if (pkg) deps.add(pkg)
    }
    return deps
}

/**
 * @param {string} content
 * @returns {Set<string>}
 */
function detectRegistryDependencies(content) {
    const reg = new Set()
    if (/from\s+["']@\/lib\/utils["']/.test(content)) {
        reg.add("utils")
    }
    const compRe = /from\s+["']@\/components\/([^"']+)["']/g
    let m
    while ((m = compRe.exec(content)) !== null) {
        const segment = m[1]
        const name = segment.split("/")[0]
        if (name) reg.add(name)
    }
    return reg
}

/**
 * @returns {string[]}
 */
function listComponentFolders() {
    if (!fs.existsSync(componentsDir)) return []
    const names = fs
        .readdirSync(componentsDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .filter((name) => {
            const tsx = path.join(componentsDir, name, `${name}.tsx`)
            return fs.existsSync(tsx)
        })
    return names.sort((a, b) => a.localeCompare(b))
}

function writeIndexTs(componentNames) {
    const lines = [
        ...componentNames.map((n) => `export * from "./components/${n}"`),
        `export { cn } from "./lib/utils"`,
        "",
    ]
    fs.writeFileSync(indexTsPath, lines.join("\n"), "utf8")
}

function writePackageExports(componentNames) {
    const raw = readFileUtf8(packageJsonPath)
    const pkg = JSON.parse(raw)

    /** @type {Record<string, string | Record<string, string>>} */
    const exports = {
        ".": {
            types: "./dist/index.d.ts",
            import: "./dist/index.js",
        },
        "./styles.css": "./src/styles/theme.css",
        "./package.json": "./package.json",
    }

    for (const name of componentNames) {
        exports[`./${name}`] = {
            types: `./dist/components/${name}/index.d.ts`,
            import: `./dist/components/${name}/${name}.js`,
        }
    }

    pkg.exports = exports
    fs.writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 4)}\n`, "utf8")
}

function writeRegistryJson(componentNames) {
    /** @type {unknown[]} */
    const items = []

    items.push({
        name: "utils",
        type: "registry:lib",
        dependencies: ["clsx", "tailwind-merge"],
        registryDependencies: [],
        files: [{ path: "src/lib/utils.ts", type: "registry:lib" }],
    })

    for (const name of componentNames) {
        const tsxRel = `src/components/${name}/${name}.tsx`
        const tsxPath = path.join(root, tsxRel)
        const content = readFileUtf8(tsxPath)
        const npmDeps = detectNpmDependencies(content)
        npmDeps.delete("react")
        npmDeps.delete("react-dom")
        const registryDependencies = [...detectRegistryDependencies(content)].sort(
            (a, b) => a.localeCompare(b),
        )

        items.push({
            name,
            type: "registry:ui",
            dependencies: [...npmDeps].sort((a, b) => a.localeCompare(b)),
            registryDependencies,
            files: [{ path: tsxRel, type: "registry:ui" }],
        })
    }

    const registry = {
        $schema: "https://ui.shadcn.com/schema/registry.json",
        name: "alpha-design-system",
        homepage: REGISTRY_HOMEPAGE,
        items,
    }

    fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`, "utf8")
}

const componentNames = listComponentFolders()
writeIndexTs(componentNames)
writePackageExports(componentNames)
writeRegistryJson(componentNames)

console.log(
    `build-registry: ${componentNames.length} components, registry + exports + src/index.ts updated.`,
)
