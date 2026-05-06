#!/usr/bin/env python3
"""Write a new .pptx that contains the given gridd JSON under the GRIDD tag.

The bundled `gridd.pptx` is a one-slide template whose slide has two
tag files: `ppt/tags/tag1.xml` (stylesheet) and `ppt/tags/tag2.xml`
(GRIDD payload). This script copies the template, locates the
`<p:tag name="GRIDD" val="..."/>` element in whichever tag file holds
it, and replaces the `val` attribute with the user-supplied JSON —
XML-escaped so it survives as an attribute value.

Usage:
    python3 write_pptx.py --gridd <filled.json> --out <output.pptx>
    python3 write_pptx.py --gridd <filled.json> --out <output.pptx> --source <custom_template.pptx>
"""
import argparse
import json
import os
import pathlib
import re
import shutil
import sys
import zipfile
from xml.sax.saxutils import escape

SKILL_DIR = pathlib.Path(__file__).resolve().parent.parent
DEFAULT_SOURCE = SKILL_DIR / "gridd.pptx"
# Matches one GRIDD tag, tolerating any attribute order and whitespace.
GRIDD_TAG_RE = re.compile(
    r'(<p:tag\b[^/>]*\bname="GRIDD"[^/>]*\bval=")([^"]*)(")',
)


def replace_gridd_tag(xml_text, new_val_escaped):
    """Return the XML with the GRIDD tag's val replaced, or None if not found."""
    match = GRIDD_TAG_RE.search(xml_text)
    if not match:
        return None
    return xml_text[: match.start(2)] + new_val_escaped + xml_text[match.end(2) :]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--gridd", required=True, help="Path to the filled gridd JSON")
    parser.add_argument("--out", required=True, help="Output .pptx path")
    parser.add_argument("--source", default=str(DEFAULT_SOURCE), help="Source template pptx (defaults to bundled gridd.pptx)")
    args = parser.parse_args()

    with open(args.gridd, encoding="utf-8") as f:
        gridd = json.load(f)

    # Compact JSON keeps the attribute short; ensure_ascii=False preserves unicode.
    payload = json.dumps(gridd, separators=(",", ":"), ensure_ascii=False)
    # Attribute context needs &quot; as well as the defaults.
    escaped_val = escape(payload, {'"': "&quot;"})

    src = pathlib.Path(args.source)
    if not src.exists():
        print(f"Source template not found: {src}", file=sys.stderr)
        return 1

    # Copy first, then rewrite the zip — modifying inside zip requires full rewrite.
    shutil.copyfile(src, args.out)
    tmp_out = args.out + ".tmp"

    with zipfile.ZipFile(args.out, "r") as zin:
        tag_path = None
        for name in zin.namelist():
            if name.startswith("ppt/tags/") and name.endswith(".xml"):
                content = zin.read(name).decode("utf-8")
                if GRIDD_TAG_RE.search(content):
                    tag_path = name
                    break
        if tag_path is None:
            print("No <p:tag name=\"GRIDD\" ...> found in any ppt/tags/*.xml", file=sys.stderr)
            return 1

        with zipfile.ZipFile(tmp_out, "w", zipfile.ZIP_DEFLATED) as zout:
            for item in zin.infolist():
                data = zin.read(item.filename)
                if item.filename == tag_path:
                    new_xml = replace_gridd_tag(data.decode("utf-8"), escaped_val)
                    if new_xml is None:  # defensive; we already matched above
                        print("GRIDD tag disappeared on re-read", file=sys.stderr)
                        return 1
                    data = new_xml.encode("utf-8")
                zout.writestr(item, data)

    os.replace(tmp_out, args.out)
    print(f"Wrote {args.out} (GRIDD updated in {tag_path})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
