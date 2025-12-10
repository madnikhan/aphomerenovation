# GIF Compression Guide

Your chimney removal GIF is currently **16MB**, which is quite large for web use. Here are several ways to compress it:

## Option 1: Online Tools (Easiest - No Installation Required)

### Recommended Online Tools:
1. **EZGIF Optimize** - https://ezgif.com/optimize
   - Upload your GIF
   - Adjust optimization level
   - Download compressed version
   - Usually reduces size by 50-80%

2. **Compressor.io** - https://compressor.io/compress/gif
   - Drag and drop your GIF
   - Automatic compression
   - Good quality retention

3. **ILoveIMG** - https://www.iloveimg.com/compress-image/compress-gif
   - Simple interface
   - Batch compression available

## Option 2: Command Line Tools (If Installed)

### Using gifsicle (Best for GIFs)
```bash
# Install (macOS)
brew install gifsicle

# Compress
gifsicle --optimize=3 --colors=256 --resize-width=800 \
  public/Chimney_removal_professional_202512092026_quu-ezgif.com-video-to-gif-converter.gif \
  > public/Chimney_removal_professional_202512092026_quu-compressed.gif
```

### Using ImageMagick
```bash
# Install (macOS)
brew install imagemagick

# Compress
convert public/Chimney_removal_professional_202512092026_quu-ezgif.com-video-to-gif-converter.gif \
  -resize 800x \
  -layers optimize \
  -colors 256 \
  public/Chimney_removal_professional_202512092026_quu-compressed.gif
```

### Using ffmpeg (Advanced)
```bash
# Install (macOS)
brew install ffmpeg

# Generate palette
ffmpeg -i public/Chimney_removal_professional_202512092026_quu-ezgif.com-video-to-gif-converter.gif \
  -vf "fps=10,scale=800:-1:flags=lanczos,palettegen" palette.png

# Create optimized GIF
ffmpeg -i public/Chimney_removal_professional_202512092026_quu-ezgif.com-video-to-gif-converter.gif \
  -i palette.png \
  -lavfi "fps=10,scale=800:-1:flags=lanczos[x];[x][1:v]paletteuse" \
  public/Chimney_removal_professional_202512092026_quu-compressed.gif

# Clean up
rm palette.png
```

## Option 3: Use the Provided Script

I've created a compression script for you. Run:

```bash
./compress-gif.sh
```

This will automatically detect available tools and compress the GIF.

## Recommended Settings for Web

- **Width**: 600-800px (current might be larger)
- **FPS**: 10-15 frames per second (reduce if original is higher)
- **Colors**: 128-256 colors (reduces file size significantly)
- **Optimization**: Level 3 (gifsicle) or equivalent

## After Compression

1. Replace the original file with the compressed version
2. Update the path in `app/page.tsx` if you renamed it
3. Test the website to ensure the GIF displays correctly

## Expected Results

With proper compression, you should be able to reduce the file size from **16MB** to approximately:
- **2-4MB** (moderate compression, good quality)
- **1-2MB** (aggressive compression, acceptable quality)
- **500KB-1MB** (maximum compression, may lose some quality)

## Alternative: Convert to Video

For even better compression, consider converting the GIF to a short MP4 video:
- MP4 videos are typically 10x smaller than GIFs
- Better quality
- Can still autoplay and loop
- Modern browsers support video well

Would you like me to help convert it to a video format instead?

