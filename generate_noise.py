
from PIL import Image
import random
import os

width = 512
height = 512
pixels = []

for _ in range(width * height):
    val = random.randint(200, 255)
    pixels.append((val, val, val, 255))

img = Image.new('RGBA', (width, height))
img.putdata(pixels)
img.save('public/noise.png')
print("Noise image generated at public/noise.png")
