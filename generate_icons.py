#!/usr/bin/env python3
"""Generate PNG icon files for Chrome extension using struct and zlib."""

import struct
import zlib
import os

def create_png(width, height, pixels):
    """Create a PNG file from pixel data.
    
    pixels: list of rows, each row is a list of (R, G, B, A) tuples
    """
    def png_chunk(chunk_type, data):
        """Create a PNG chunk with CRC."""
        chunk = chunk_type + data
        crc = zlib.crc32(chunk) & 0xffffffff
        return struct.pack('>I', len(data)) + chunk + struct.pack('>I', crc)
    
    # PNG signature
    signature = b'\x89PNG\r\n\x1a\n'
    
    # IHDR chunk (image header)
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    ihdr = png_chunk(b'IHDR', ihdr_data)
    
    # IDAT chunk (image data)
    raw_data = b''
    for row in pixels:
        raw_data += b'\x00'  # Filter type: None
        for r, g, b, a in row:
            raw_data += struct.pack('BBBB', r, g, b, a)
    
    compressed = zlib.compress(raw_data, 9)
    idat = png_chunk(b'IDAT', compressed)
    
    # IEND chunk
    iend = png_chunk(b'IEND', b'')
    
    return signature + ihdr + idat + iend

def hex_to_rgba(hex_color, alpha=255):
    """Convert hex color to RGBA tuple."""
    hex_color = hex_color.lstrip('#')
    r = int(hex_color[0:2], 16)
    g = int(hex_color[2:4], 16)
    b = int(hex_color[4:6], 16)
    return (r, g, b, alpha)

def create_note_icon(size):
    """Create a note/paper icon with the given size."""
    # Colors
    paper = hex_to_rgba('#fef3c7')      # Cream/beige paper
    border = hex_to_rgba('#f59e0b')      # Amber border
    lines = hex_to_rgba('#d97706')       # Amber text lines
    transparent = (0, 0, 0, 0)
    
    # Calculate dimensions based on size
    margin = max(1, size // 8)           # Margin from edge
    border_width = max(1, size // 16)    # Border thickness
    line_height = max(1, size // 16)     # Text line height
    line_spacing = max(2, size // 6)     # Space between lines
    line_margin = max(2, size // 6)      # Margin for text lines
    
    # Paper bounds
    paper_left = margin
    paper_right = size - margin - 1
    paper_top = margin
    paper_bottom = size - margin - 1
    
    pixels = []
    
    for y in range(size):
        row = []
        for x in range(size):
            # Check if inside paper bounds
            in_paper = (paper_left <= x <= paper_right and 
                       paper_top <= y <= paper_bottom)
            
            if not in_paper:
                row.append(transparent)
                continue
            
            # Check if on border
            on_left_border = paper_left <= x < paper_left + border_width
            on_right_border = paper_right - border_width < x <= paper_right
            on_top_border = paper_top <= y < paper_top + border_width
            on_bottom_border = paper_bottom - border_width < y <= paper_bottom
            
            if on_left_border or on_right_border or on_top_border or on_bottom_border:
                row.append(border)
                continue
            
            # Check if on a text line
            inner_left = paper_left + line_margin
            inner_right = paper_right - line_margin
            
            # Calculate line positions
            first_line_y = paper_top + line_margin + border_width
            
            on_text_line = False
            for line_num in range(3):  # 3 text lines
                line_y = first_line_y + line_num * line_spacing
                if (line_y <= y < line_y + line_height and 
                    inner_left <= x <= inner_right):
                    # Vary line lengths for visual interest
                    if line_num == 0:
                        line_end = inner_right
                    elif line_num == 1:
                        line_end = inner_left + int((inner_right - inner_left) * 0.75)
                    else:
                        line_end = inner_left + int((inner_right - inner_left) * 0.5)
                    
                    if x <= line_end:
                        on_text_line = True
                        break
            
            if on_text_line:
                row.append(lines)
            else:
                row.append(paper)
        
        pixels.append(row)
    
    return create_png(size, size, pixels)

def main():
    output_dir = '/Users/a20240302/dev/sudoku/public/icons'
    os.makedirs(output_dir, exist_ok=True)
    
    sizes = [16, 48, 128]
    
    for size in sizes:
        filename = f'icon{size}.png'
        filepath = os.path.join(output_dir, filename)
        
        png_data = create_note_icon(size)
        
        with open(filepath, 'wb') as f:
            f.write(png_data)
        
        print(f'Created {filename} ({len(png_data)} bytes)')

if __name__ == '__main__':
    main()
