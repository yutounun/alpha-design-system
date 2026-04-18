#!/usr/bin/env python3
"""Generate .agents/skills/design-tokens/references/tokens.json from theme.css token names + curated descriptions."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
THEME = ROOT / "src/styles/theme.css"
OUT = ROOT / ".agents/skills/design-tokens/references/tokens.json"

# token_name -> description (English). Keys must match CSS custom property names including leading --.
DESCRIPTIONS: dict[str, str] = {
    "--font-*": "Resets Tailwind font-size variable primitives; use font-display, font-heading, font-body, or font-mono for real stacks.",
    "--font-display": "Display and large hero headline stack (sohne-var family).",
    "--font-heading": "Heading stack for section titles and card titles.",
    "--font-body": "Default UI and body copy stack; already applied on body.",
    "--font-mono": "Monospace stack for code and technical labels (Source Code Pro).",
    "--text-3xs": "~8px (Nano). Smallest labels and axis ticks.",
    "--text-3xs--line-height": "Line height paired with text-3xs (tight).",
    "--text-2xs": "~10px (Micro). Tiny labels and small numeric labels.",
    "--text-2xs--line-height": "Line height paired with text-2xs.",
    "--text-xs": "~12px. Captions and inline code body.",
    "--text-sm": "~14px. Captions, links, and compact buttons.",
    "--text-md": "~16px. Body copy and default buttons.",
    "--text-lg": "~18px. Intro and emphasized body.",
    "--text-xl": "~22px. Sub-headings.",
    "--text-2xl": "~26px. Larger sub-headings and card headings.",
    "--text-3xl": "~32px. Section headings.",
    "--text-4xl": "~48px. Large display headlines.",
    "--text-5xl": "~56px. Hero display headlines.",
    "--text-6xl": "Legacy mid step; prefer text-4xl / text-5xl for new work.",
    "--text-7xl": "Legacy mid step; prefer text-4xl / text-5xl for new work.",
    "--radius-full": "Full pill radius for badges and chips; avoid as the main radius on primary CTAs per DESIGN.md.",
    "--radius-action-1": "4px. Default for buttons, inputs, badges, and cards.",
    "--radius-action-2": "6px. Navigation and larger interactive surfaces.",
    "--color-background": "Default page canvas (white in light theme).",
    "--color-background-1": "Primary surface background; white in light, brand dark in dark sections.",
    "--color-background-2": "Secondary surface; off-white in light, deep surface in dark.",
    "--color-card-1": "Primary card surface.",
    "--color-card-2": "Secondary card or subtle panel surface.",
    "--color-chart-1": "Primary series color for charts (Stripe purple).",
    "--color-chart-2": "Secondary series color for charts (violet).",
    "--color-chart-3": "Tertiary series color for charts (magenta).",
    "--color-chart-4": "Quaternary series color for charts (ruby).",
    "--color-chart-5": "Quinary series color for charts (success green).",
    "--color-brand": "Brand dark indigo for footers and immersive sections; may shift to purple accent on dark UI.",
    "--color-foreground-high": "Highest-contrast text (deep navy) for primary headings and strong labels.",
    "--color-foreground-medium": "Labels and secondary headings (dark slate).",
    "--color-foreground-low": "Body, descriptions, and helper text (slate).",
    "--color-inv-foreground-high": "Primary text on dark brand backgrounds (white).",
    "--color-inv-foreground-medium": "Secondary text on dark backgrounds (~70% white).",
    "--color-inv-foreground-low": "Tertiary text on dark backgrounds (~50% white).",
    "--color-border-high": "High-contrast borders and strong outlines.",
    "--color-border-medium": "Soft purple-tinted borders for ghost and secondary controls.",
    "--color-border-low": "Default dividers and standard input borders.",
    "--color-border-danger": "Destructive outline border (ruby tint); pairs with border-high / border-medium / border-low naming.",
    "--color-border-danger-hover": "Destructive border on hover.",
    "--color-border-danger-focus": "Destructive control focus border.",
    "--color-border-invalid": "Strong border for invalid fields (matches danger ruby).",
    "--color-border-invalid-muted": "Softer invalid border on dark or low-contrast UI.",
    "--color-fill-high": "Strong purple-tint fill (purple light).",
    "--color-fill-medium": "Light purple tint for hover and selection bases.",
    "--color-fill-low": "Near-white subtle fill for quiet surfaces.",
    "--color-fill-danger-hover": "Translucent destructive hover fill for outline / ghost destructive buttons.",
    "--color-focus": "Focus ring color (Stripe purple; lighter purple on dark UI).",
    "--color-focus-ring": "Default focus ring wash for buttons (explicit rgba, no color-mix).",
    "--color-focus-ring-soft": "Softer focus ring for inputs and dense UI.",
    "--color-primary": "Stripe purple for primary CTAs, links, and emphasis fills.",
    "--color-primary-foreground": "Text and icons on primary backgrounds (usually white).",
    "--color-primary-muted": "Ghost and soft primary-tint backgrounds before hover.",
    "--color-primary-text": "Primary-colored text and inline link styling on light surfaces.",
    "--color-accent": "Near-black in light theme / near-white in dark theme, hand-tuned toward the primary hue for high-contrast accents.",
    "--color-accent-foreground": "Text and icons on accent-filled surfaces (light on dark accent in light theme; deep surface on light accent in dark theme).",
    "--color-secondary": "Magenta accent for secondary actions, decoration, and gradients.",
    "--color-secondary-foreground": "Text on secondary fills (navy for contrast).",
    "--color-secondary-muted": "Muted magenta surface (magenta light).",
    "--color-secondary-text": "Magenta text and outline accents.",
    "--color-secondary-hover": "Secondary fill hover (solid hand-tuned from magenta + black).",
    "--color-secondary-active": "Secondary fill active (solid hand-tuned from magenta + black).",
    "--color-danger": "Ruby for errors, destructive actions, and alerts.",
    "--color-danger-foreground": "Text on danger-filled surfaces.",
    "--color-danger-muted": "Soft error backgrounds and badge bases.",
    "--color-danger-text": "Error copy and danger-tinted text.",
    "--color-danger-ring": "Focus ring color for destructive controls (explicit rgba).",
    "--color-invalid-ring": "Form validation error focus ring.",
    "--color-border-invalid-focus": "Border on invalid fields while focused (ruby; overrides default purple focus border).",
    "--color-invalid-focus-ring": "Focus ring on invalid fields while focused (stronger than resting invalid ring).",
    "--color-success": "Success green for positive states and badges.",
    "--color-success-foreground": "Text on solid success backgrounds.",
    "--color-success-muted": "Soft success backgrounds for toasts and badges.",
    "--color-success-text": "Success message and badge label color.",
    "--color-warning": "Lemon / brown warning for cautions and highlights.",
    "--color-warning-foreground": "Text on solid warning backgrounds.",
    "--color-warning-muted": "Soft warning backgrounds.",
    "--color-warning-text": "Warning copy color.",
    "--color-informative": "Info blue for tertiary info actions and notes.",
    "--color-informative-foreground": "Text on solid informative backgrounds.",
    "--color-informative-muted": "Soft informative backgrounds.",
    "--color-link": "Default inline link color (Stripe purple).",
    "--color-visited": "Visited link color (purple hover tone).",
    "--color-cta-1": "Ruby CTA accent distinct from primary purple.",
    "--color-cta-1-foreground": "Text on CTA-1 surfaces.",
    "--color-cancel": "Neutral cancel and low-emphasis actions.",
    "--color-cancel-foreground": "Text on cancel buttons and chips.",
    "--color-badge-blue": "Badge accent in blue / purple family.",
    "--color-badge-navy": "Badge text or fill in deep navy.",
    "--color-badge-purple": "Badge accent in purple family.",
    "--color-skeleton": "Skeleton loading placeholder wash.",
    "--color-primary-hover": "Primary solid hover (purple hover).",
    "--color-primary-active": "Primary solid active (purple deep).",
    "--color-success-muted-hover": "Muted success surface hover.",
    "--color-success-muted-active": "Muted success surface active.",
    "--color-warning-muted-hover": "Muted warning surface hover.",
    "--color-warning-muted-active": "Muted warning surface active.",
    "--color-inv-primary-hover": "Translucent white hover overlay on dark brand sections.",
    "--color-inv-primary-active": "Translucent white active overlay on dark brand sections.",
    "--color-link-hover": "Link hover on light surfaces.",
    "--color-link-active": "Link active on light surfaces.",
    "--color-inv-link-hover": "Link hover on dark / inverse surfaces.",
    "--color-inv-link-active": "Link active on dark / inverse surfaces.",
    "--color-fill-medium-hover": "fill-medium hover state.",
    "--color-fill-medium-active": "fill-medium active state.",
    "--color-inv-fill-medium-hover": "fill-medium hover on dark backgrounds.",
    "--color-inv-fill-medium-active": "fill-medium active on dark backgrounds.",
    "--color-transparent-hover": "Translucent hover wash on light UI.",
    "--color-transparent-active": "Translucent active wash on light UI.",
    "--color-inv-transparent-hover": "Translucent hover wash on dark / inverse UI.",
    "--color-inv-transparent-active": "Translucent active wash on dark / inverse UI.",
    "--color-fill-low-hover": "fill-low hover state.",
    "--color-fill-low-active": "fill-low active state.",
    "--color-inv-fill-low-hover": "fill-low hover on dark backgrounds.",
    "--color-inv-fill-low-active": "fill-low active on dark backgrounds.",
    "--color-primary-muted-hover": "primary-muted hover state.",
    "--color-primary-muted-active": "primary-muted active state.",
    "--color-inv-primary-muted-hover": "primary-muted hover on inverse / dark UI.",
    "--color-inv-primary-muted-active": "primary-muted active on inverse / dark UI.",
    "--color-foreground-high-hover": "foreground-high text hover.",
    "--color-foreground-high-active": "foreground-high text active.",
    "--color-inv-foreground-high-hover": "Inverse high-contrast text hover.",
    "--color-inv-foreground-high-active": "Inverse high-contrast text active.",
    "--color-surface-deep": "Deepest dark navy surface for maximum depth.",
    "--color-overlay-scrim": "Translucent black backdrop scrim for drawers and overlays.",
    "--shadow-sm-top": "Top-edge shadow for sticky headers and toolbars.",
    "--color-inv-fill-high": "Strong inverse fill for cards on brand-dark sections.",
    "--color-inv-fill-low": "Subtle inverse fill on dark sections.",
    "--color-inv-fill-medium": "Mid inverse fill on dark sections.",
    "--color-inv-focus": "Focus color on inverse / dark UI.",
    "--color-primary-text-hover": "Primary text link hover (often dark theme).",
    "--color-primary-text-active": "Primary text link active (often dark theme).",
    "--color-warning-hover": "Solid warning control hover (dark-tuned).",
    "--color-warning-active": "Solid warning control active (dark-tuned).",
    "--color-success-text-hover": "Success text hover state.",
    "--color-success-text-active": "Success text active state.",
    "--color-warning-text-hover": "Warning text hover state.",
    "--color-warning-text-active": "Warning text active state.",
}


def category_for(name: str) -> tuple[str, str]:
    """Return (category_id, category_description)."""
    if name.startswith("--font"):
        return "font", "Font family tokens (@theme)"
    if name.startswith("--text-"):
        return "typography", "Type scale and line heights"
    if name.startswith("--radius-"):
        return "radius", "Border radius tokens"
    if name == "--shadow-sm-top":
        return "shadow", "Shadow tokens"
    if name.startswith("--color-background"):
        return "background", "Background colors"
    if name.startswith("--color-card"):
        return "card", "Card surfaces"
    if name == "--color-brand":
        return "brand", "Brand"
    if name.startswith("--color-foreground") or name.startswith("--color-inv-foreground"):
        return "foreground", "Text and foreground on surfaces"
    if name.startswith("--color-border"):
        return "border", "Borders"
    if name.startswith("--color-fill") or name.startswith("--color-inv-fill"):
        return "fill", "Fills and tinted surfaces"
    if name.startswith("--color-focus") or name == "--color-inv-focus":
        return "focus", "Focus states"
    if name.startswith("--color-primary"):
        return "primary", "Primary (Stripe purple)"
    if name.startswith("--color-secondary"):
        return "secondary", "Secondary (magenta)"
    if name.startswith("--color-danger") or name.startswith("--color-invalid"):
        return "danger", "Danger and validation error"
    if name.startswith("--color-success"):
        return "success", "Success"
    if name.startswith("--color-warning"):
        return "warning", "Warning"
    if name.startswith("--color-informative"):
        return "informative", "Informative"
    if name in ("--color-link", "--color-visited", "--color-inv-link-hover", "--color-inv-link-active"):
        return "link", "Links"
    if name.startswith("--color-cta"):
        return "cta", "CTA accent"
    if name.startswith("--color-cancel"):
        return "cancel", "Cancel and neutral"
    if name.startswith("--color-badge"):
        return "badge", "Badges"
    if name.startswith("--color-chart"):
        return "chart", "Chart and data visualization"
    if name == "--color-skeleton":
        return "skeleton", "Skeleton loading"
    if name in ("--color-surface-deep", "--color-overlay-scrim"):
        return "surface", "Surface depth"
    if name.startswith("--color-transparent") or name.startswith("--color-inv-transparent"):
        return "interaction", "Interaction (transparent hover washes)"
    if name.startswith("--color-inv-primary") and "muted" not in name:
        return "interaction", "Interaction (inverse primary overlays)"
    if name.startswith("--color-inv-primary-muted"):
        return "interaction", "Interaction (inverse primary-muted)"
    if name.startswith("--color-"):
        return "interaction", "Interaction (hover and active)"
    return "other", "Other"


def extract_token_names(css: str) -> list[str]:
    # Hyphen and * are allowed so `--font-*` and `--text-3xs--line-height` match.
    pattern = re.compile(r"^\s+(--[a-z0-9*-]+)\s*:", re.MULTILINE)
    return sorted(set(pattern.findall(css)))


def main() -> None:
    css = THEME.read_text(encoding="utf-8")
    names = extract_token_names(css)
    missing = [n for n in names if n not in DESCRIPTIONS]
    if missing:
        raise SystemExit(f"Missing descriptions for: {missing}")

    buckets: dict[str, dict] = {}
    for name in names:
        cat_id, cat_desc = category_for(name)
        if cat_id not in buckets:
            buckets[cat_id] = {"name": cat_id, "description": cat_desc, "tokens": []}
        buckets[cat_id]["tokens"].append({"token_name": name, "description": DESCRIPTIONS[name]})

    for b in buckets.values():
        b["tokens"].sort(key=lambda t: t["token_name"])

    order = [
        "font",
        "typography",
        "radius",
        "shadow",
        "background",
        "card",
        "brand",
        "foreground",
        "border",
        "fill",
        "focus",
        "primary",
        "secondary",
        "danger",
        "success",
        "warning",
        "informative",
        "link",
        "cta",
        "cancel",
        "badge",
        "chart",
        "skeleton",
        "surface",
        "interaction",
        "other",
    ]
    categories = [buckets[k] for k in order if k in buckets]

    doc = {
        "version": "1.0.0",
        "source": "src/styles/theme.css",
        "token_count": len(names),
        "categories": categories,
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUT} ({len(names)} tokens)")


if __name__ == "__main__":
    main()
