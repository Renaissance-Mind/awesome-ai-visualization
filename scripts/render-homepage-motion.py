"""Render an animated collage from imagegen artboards and official tool previews."""
import argparse
import json
import math
import subprocess
from pathlib import Path

import cv2
import numpy as np


def cover(image, width, height):
    scale = max(width / image.shape[1], height / image.shape[0])
    resized = cv2.resize(image, None, fx=scale, fy=scale, interpolation=cv2.INTER_AREA)
    y = (resized.shape[0] - height) // 2
    x = (resized.shape[1] - width) // 2
    return resized[y:y + height, x:x + width]


def style_texture(image, mode):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    if mode == "texture":
        return np.repeat(np.where(gray > 64, 238, 20).astype(np.uint8)[:, :, None], 3, axis=2)
    edges = cv2.Canny(gray, 60, 150) > 0
    color = (45, 255, 207) if mode == "lime" else (255, 48, 6)
    ink = (22, 35, 22) if mode == "lime" else (255, 98, 65)
    result = np.empty_like(image)
    result[:] = color
    result[edges] = ink
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--artboards", type=Path, required=True)
    parser.add_argument("--previews", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--seconds", type=int, default=16)
    parser.add_argument("--fps", type=int, default=30)
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    width, height = 1536, 1024
    artboards = [cv2.imread(str(args.artboards / name)) for name in
                 ("graphify.png", "paperbanana.png", "open-design.png")]
    if any(image is None for image in artboards):
        raise FileNotFoundError("Three generated artboards are required.")
    base = artboards[0]
    official = [cv2.imread(str(args.previews / name)) for name in
                ("graphify.png", "paperbanana.jpg")]
    if any(image is None for image in official):
        raise FileNotFoundError("Official graph and paper previews are required.")
    promos = [image[278:820, 770:1536] for image in artboards]
    sources = [official[0], official[1][85:900, :1900], promos[2]]
    # All polygons have independently animated vertices and an affine transform.
    layers = [
        {"name": "lower-texture", "points": [[-80, 350], [430, 435], [1090, 1080], [-80, 1080]], "mode": "texture", "source": 0, "dx": 45, "dy": 28, "angle": 3, "morph": 32},
        {"name": "lower-blue", "points": [[870, 1080], [1060, 770], [1600, 655], [1600, 1080]], "mode": "blue", "source": 2, "dx": 65, "dy": 30, "angle": 5, "morph": 55},
        {"name": "left-blue", "points": [[-100, 440], [805, 300], [739, 628], [475, 743], [-100, 845]], "mode": "blue", "source": 3, "dx": 35, "dy": 42, "angle": 3, "morph": 40},
        {"name": "upper-research", "points": [[410, 45], [1090, 30], [963, 288], [777, 356], [372, 416]], "mode": "page", "source": 1, "dx": 30, "dy": 27, "angle": 4, "morph": 36},
        {"name": "upper-lime", "points": [[995, 24], [1460, 17], [1600, 219], [1350, 356], [911, 302]], "mode": "lime", "source": 0, "dx": 48, "dy": 24, "angle": 5, "morph": 42},
        {"name": "left-tool-page", "points": [[20, 453], [670, 372], [738, 591], [179, 706], [38, 668]], "mode": "page", "source": 2, "dx": 31, "dy": 36, "angle": 5, "morph": 28},
        {"name": "lower-code-page", "points": [[126, 720], [546, 620], [656, 791], [429, 1020], [26, 940]], "mode": "page", "source": 0, "dx": 35, "dy": 29, "angle": 6, "morph": 43},
        {"name": "lower-research-page", "points": [[551, 744], [772, 663], [846, 676], [1168, 861], [1005, 1040], [635, 967]], "mode": "page", "source": 1, "dx": 43, "dy": 34, "angle": 5, "morph": 38},
        {"name": "main-tool-page", "points": [[799, 317], [1090, 267], [1600, 390], [1600, 690], [1171, 836], [851, 691], [738, 471]], "mode": "promo", "source": 0, "dx": 34, "dy": 28, "angle": 3, "morph": 38},
    ]
    overscan = 110
    padding = 400
    padded_artboards = [cv2.copyMakeBorder(image, padding, padding, padding, padding,
                                         cv2.BORDER_REFLECT_101) for image in artboards]
    for index, layer in enumerate(layers):
        points = np.asarray(layer["points"], dtype=np.float32)
        lower = points.min(axis=0).astype(int) - overscan
        upper = points.max(axis=0).astype(int) + overscan
        layer.update(points=points, origin=lower, center=points.mean(axis=0),
                     size=upper - lower, phase=index * .81)
        w, h = layer["size"]
        x, y = lower + padding
        original_crops = [image[y:y + h, x:x + w].copy() for image in padded_artboards]
        if layer["mode"] == "promo":
            layer["images"] = original_crops
        elif layer["mode"] in ("texture", "lime", "blue"):
            layer["images"] = [original_crops[0]] + [cover(image, int(w), int(h)) for image in sources]
        else:
            layer["images"] = [original_crops[0]] + [cover(image, int(w), int(h)) for image in promos]
        if layer["mode"] in ("texture", "lime", "blue"):
            layer["images"] = [layer["images"][0]] + [style_texture(image, layer["mode"])
                                                       for image in layer["images"][1:]]
    snapshots = {0: "frame-start.jpg", args.fps * 5: "frame-middle.jpg", args.fps * 10: "frame-later.jpg"}
    metrics = {layer["name"]: {"position_range": [], "corner_range": []} for layer in layers}
    command = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-f", "rawvideo",
               "-pixel_format", "bgr24", "-video_size", f"{width}x{height}", "-framerate", str(args.fps),
               "-i", "-", "-an", "-c:v", "libx264", "-preset", "fast", "-crf", "20", "-pix_fmt", "yuv420p",
               "-movflags", "+faststart", str(args.output / "all-fragments-motion.mp4")]
    encoder = subprocess.Popen(command, stdin=subprocess.PIPE)
    foreground_mask = np.zeros((height, width), np.uint8)
    cv2.fillPoly(foreground_mask, [np.array([[0, 54], [575, 54], [435, 250], [357, 344], [0, 320]])], 255)
    foreground_mask[:55] = 255
    fixed = foreground_mask > 0
    for frame in range(args.seconds * args.fps):
        time = frame / args.fps
        theta = 2 * math.pi * time / args.seconds
        canvas = np.full((height, width, 3), (237, 243, 246), np.uint8)
        for index, layer in enumerate(layers):
            phase = layer["phase"]
            dx = layer["dx"] * math.sin(theta + phase)
            dy = layer["dy"] * math.sin(theta * 2 + phase * .7)
            angle = layer["angle"] * math.sin(theta + phase * 1.2)
            scale = 1 + .025 * math.sin(theta * 2 + phase)
            matrix = cv2.getRotationMatrix2D(tuple(float(v) for v in layer["center"]), angle, scale)
            matrix[:, 2] += (dx, dy)
            points = layer["points"].copy()
            morph_offsets = []
            for vertex in range(len(points)):
                shift = layer["morph"] * np.array([math.sin(theta * 2 + phase + vertex * 1.1),
                                                      math.cos(theta + phase + vertex * 1.7)])
                points[vertex] += shift
                morph_offsets.append(shift)
            moving = points @ matrix[:, :2].T + matrix[:, 2]
            left, top = np.maximum(np.floor(moving.min(axis=0)).astype(int) - 2, (0, 55))
            right, bottom = np.minimum(np.ceil(moving.max(axis=0)).astype(int) + 3, (width, height))
            if right <= left or bottom <= top:
                raise ValueError(f"Polygon left the frame: {layer['name']}")
            cycle = (time / args.seconds * len(layer["images"]) + (index % 3) * .23) % len(layer["images"])
            selected = int(cycle)
            blend = max(0, (cycle % 1 - .78) / .22)
            source = layer["images"][selected]
            if blend:
                source = cv2.addWeighted(source, 1 - blend, layer["images"][(selected + 1) % len(layer["images"])], blend, 0)
            # Each source pans independently inside its deforming display surface.
            pan = np.array([14 * math.sin(theta * 2 + phase), 12 * math.cos(theta + phase)])
            local_matrix = matrix.copy()
            local_matrix[:, 2] += matrix[:, :2] @ (layer["origin"] + pan) - (left, top)
            rendered = cv2.warpAffine(source, local_matrix, (int(right - left), int(bottom - top)),
                                      flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT_101)
            mask = np.zeros((int(bottom - top), int(right - left)), np.uint8)
            cv2.fillPoly(mask, [np.rint(moving - (left, top)).astype(np.int32)], 255)
            roi = canvas[top:bottom, left:right]
            cv2.copyTo(rendered, mask, roi)
            if frame % args.fps == 0:
                metrics[layer["name"]]["position_range"].append([float(dx), float(dy), float(angle)])
                metrics[layer["name"]]["corner_range"].append(np.asarray(morph_offsets).tolist())
        # Lock the original navigation and factual introduction as readable foreground.
        canvas[fixed] = base[fixed]
        if frame in snapshots:
            cv2.imwrite(str(args.output / snapshots[frame]), canvas)
        encoder.stdin.write(canvas.tobytes())
        if frame % (args.fps * 4) == 0:
            print(f"Rendered {frame // args.fps}s / {args.seconds}s", flush=True)
    encoder.stdin.close()
    if encoder.wait() != 0:
        raise RuntimeError("Video encoding failed")
    for name, values in metrics.items():
        positions = np.asarray(values["position_range"])
        corners = np.asarray(values["corner_range"])
        values.clear()
        values["translation_and_rotation_span"] = np.ptp(positions, axis=0).tolist()
        values["vertex_deformation_span_px"] = float(np.ptp(corners, axis=0).max())
        if min(values["translation_and_rotation_span"]) <= 0 or values["vertex_deformation_span_px"] <= 0:
            raise AssertionError(f"Static fragment found: {name}")
    (args.output / "motion-verification.json").write_text(json.dumps(metrics, indent=2))
    print(f"Verified {len(layers)} independently moving, rotating and morphing fragments.", flush=True)


if __name__ == "__main__":
    main()
