import os
from PIL import Image, ImageDraw

def replace_background(img_path):
    try:
        img = Image.open(img_path).convert("RGBA")
        
        # We will flood-fill from (0,0)
        # We want to replace near-white with (244, 244, 244, 255)
        # Pillow's ImageDraw.floodfill can do this.
        
        target_color = (244, 244, 244, 255)
        
        # Get color at 0,0
        seed_color = img.getpixel((0, 0))
        
        # Only fill if seed color is bright white or near white
        # Wait, if the image already has transparent background, seed_color[3] would be 0.
        if seed_color[3] == 0:
            # Create a new image with F4F4F4 background
            new_img = Image.new("RGBA", img.size, (244, 244, 244, 255))
            new_img.paste(img, (0, 0), img)
            img = new_img
        else:
            if seed_color[0] > 240 and seed_color[1] > 240 and seed_color[2] > 240:
                ImageDraw.floodfill(img, (0, 0), target_color, thresh=15)
                # also do the other corners just in case the object touches the edge
                width, height = img.size
                ImageDraw.floodfill(img, (width-1, 0), target_color, thresh=15)
                ImageDraw.floodfill(img, (0, height-1), target_color, thresh=15)
                ImageDraw.floodfill(img, (width-1, height-1), target_color, thresh=15)
        
        img.save(img_path)
        print(f"Processed {img_path}")
    except Exception as e:
        print(f"Error processing {img_path}: {e}")

desktop_dir = r"C:\Users\Chetan singh\Desktop\SoleVique Shoe images"
public_dir = r"C:\Users\Chetan singh\Desktop\SoleVique\public\images"

def process_dir(directory):
    for root, dirs, files in os.walk(directory):
        for f in files:
            if f.lower().endswith(".png") or f.lower().endswith(".jpg") or f.lower().endswith(".jpeg"):
                replace_background(os.path.join(root, f))

process_dir(desktop_dir)
process_dir(public_dir)
