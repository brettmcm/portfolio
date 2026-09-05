"""Generate committed responsive assets. Requires Pillow with WebP support."""
import hashlib
import json
from pathlib import Path
import subprocess
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageOps, ImageSequence

ROOT = Path(__file__).resolve().parent.parent
WIDTHS = (240, 320, 480, 640, 960, 1280, 1600, 1920, 2400)
# Bump when encoding settings change to invalidate generated files.
RECIPE = b'webp-q82-method6-v1'
sources = json.loads(subprocess.check_output(['node', str(ROOT / 'scripts/image-sources.mjs')]))

def generate(src):
    original = ROOT / src.lstrip('/')
    digest = hashlib.sha256(original.read_bytes() + RECIPE).hexdigest()[:10]
    with Image.open(original) as image:
        animated = getattr(image, 'n_frames', 1) > 1
        frames = [ImageOps.exif_transpose(f).convert('RGBA') for f in ImageSequence.Iterator(image)]
        durations = []
        if animated:
            for f in ImageSequence.Iterator(image):
                durations.append(f.info.get('duration', 100))
        width, height = frames[0].size
        maximum = min(width, WIDTHS[-1])
        variants = []
        for target in sorted({w for w in WIDTHS if w < maximum} | {maximum}):
            relative = Path('images/responsive') / Path(src).relative_to('/images').parent / f'{original.stem}-{digest}-{target}.webp'
            output = ROOT / relative
            output.parent.mkdir(parents=True, exist_ok=True)
            if not output.exists():
                resized = [f.resize((target, round(height * target / width)), Image.Resampling.LANCZOS) for f in frames]
                options = dict(format='WEBP', quality=82, method=6)
                if animated:
                    options.update(save_all=True, append_images=resized[1:], duration=durations, loop=image.info.get('loop', 0))
                resized[0].save(output, **options)
            variants.append({'src': '/' + relative.as_posix(), 'width': target, 'bytes': output.stat().st_size})
    return src, {'width': width, 'height': height, 'animated': animated, 'originalBytes': original.stat().st_size, 'variants': variants}

with ThreadPoolExecutor(max_workers=4) as pool:
    manifest = dict(pool.map(generate, sources))
(ROOT / 'images/responsive-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(f'Generated responsive WebP variants for {len(manifest)} images')
