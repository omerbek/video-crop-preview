"""Export a centered crop of a local video as an H.264 MP4."""
import argparse
import subprocess
from pathlib import Path

RATIOS = {"16:9": (16, 9), "1:1": (1, 1), "9:16": (9, 16)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("video", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--ratio", choices=RATIOS, default="9:16")
    args = parser.parse_args()
    if not args.video.is_file() or args.output.suffix.lower() != ".mp4":
        parser.error("Provide an existing input and an .mp4 output.")
    width, height = RATIOS[args.ratio]
    scale = f"2*trunc(min(iw/{width}\\,ih/{height})/2)"
    crop = f"crop={width}*{scale}:{height}*{scale},setsar=1"
    try:
        subprocess.run(["ffmpeg", "-nostdin", "-n", "-i", str(args.video.resolve()),
                        "-map", "0:v:0", "-map", "0:a:0?", "-vf", crop,
                        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac",
                        "-movflags", "+faststart", str(args.output.resolve())], check=True)
    except FileNotFoundError:
        parser.exit(1, "Install FFmpeg with libx264 support.\n")
    except subprocess.CalledProcessError as error:
        parser.exit(error.returncode)


if __name__ == "__main__":
    main()
