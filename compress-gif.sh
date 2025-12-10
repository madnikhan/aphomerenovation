#!/bin/bash

# GIF Compression Script
# This script compresses the chimney removal GIF using various methods

INPUT="public/Chimney_removal_professional_202512092026_quu-ezgif.com-video-to-gif-converter.gif"
OUTPUT="public/Chimney_removal_professional_202512092026_quu-compressed.gif"

echo "Original file size:"
ls -lh "$INPUT"

# Method 1: Using gifsicle (if installed)
if command -v gifsicle &> /dev/null; then
    echo ""
    echo "Compressing with gifsicle..."
    gifsicle --optimize=3 --colors=256 --resize-width=800 "$INPUT" > "$OUTPUT"
    echo "Compressed file size:"
    ls -lh "$OUTPUT"
    echo ""
    echo "Compression complete! Output saved to: $OUTPUT"
    exit 0
fi

# Method 2: Using ImageMagick (if installed)
if command -v convert &> /dev/null; then
    echo ""
    echo "Compressing with ImageMagick..."
    convert "$INPUT" -resize 800x -layers optimize -colors 256 "$OUTPUT"
    echo "Compressed file size:"
    ls -lh "$OUTPUT"
    echo ""
    echo "Compression complete! Output saved to: $OUTPUT"
    exit 0
fi

# Method 3: Using ffmpeg to convert to optimized GIF (if installed)
if command -v ffmpeg &> /dev/null; then
    echo ""
    echo "Converting with ffmpeg (this may take a moment)..."
    # First convert to palette
    ffmpeg -i "$INPUT" -vf "fps=10,scale=800:-1:flags=lanczos,palettegen" /tmp/palette.png -y
    # Then create optimized GIF
    ffmpeg -i "$INPUT" -i /tmp/palette.png -lavfi "fps=10,scale=800:-1:flags=lanczos[x];[x][1:v]paletteuse" "$OUTPUT" -y
    rm /tmp/palette.png
    echo "Compressed file size:"
    ls -lh "$OUTPUT"
    echo ""
    echo "Compression complete! Output saved to: $OUTPUT"
    exit 0
fi

echo ""
echo "No compression tools found. Please install one of the following:"
echo "  - gifsicle: brew install gifsicle (macOS)"
echo "  - ImageMagick: brew install imagemagick (macOS)"
echo "  - ffmpeg: brew install ffmpeg (macOS)"
echo ""
echo "Or use an online tool:"
echo "  - https://ezgif.com/optimize"
echo "  - https://www.iloveimg.com/compress-image/compress-gif"
echo "  - https://compressor.io/compress/gif"

