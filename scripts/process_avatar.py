from PIL import Image

src_path = r"C:\Users\VICTUS\.gemini\antigravity\brain\63191c7c-b5d2-4d4a-b298-2607b6649931\krishal_profile_raw_1789035973883.jpg"
dst_path = r"c:\Users\VICTUS\Desktop\Krishal_MainPortfolio\public\images\krishal-profile.png"

img = Image.open(src_path).convert("RGBA")
width, height = img.size
pixels = img.load()

# Background is white around edges.
# We flood-fill or BFS from the 4 corners so only external white is made transparent.
from collections import deque

visited = set()
queue = deque([(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)])

for pt in list(queue):
    visited.add(pt)

def is_bg(r, g, b):
    # Pure or near pure white
    return r > 235 and g > 235 and b > 235

while queue:
    x, y = queue.popleft()
    r, g, b, a = pixels[x, y]
    if is_bg(r, g, b):
        pixels[x, y] = (r, g, b, 0)
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                visited.add((nx, ny))
                nr, ng, nb, _ = pixels[nx, ny]
                if is_bg(nr, ng, nb):
                    queue.append((nx, ny))

# Soft edge feathering: for pixels near transparent pixels with whiteness > 215, soften alpha
for y in range(1, height - 1):
    for x in range(1, width - 1):
        r, g, b, a = pixels[x, y]
        if a > 0:
            # Check neighbors
            has_trans = any(pixels[x+dx, y+dy][3] == 0 for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)])
            if has_trans and r > 215 and g > 215 and b > 215:
                whiteness = min(r, g, b)
                new_a = int(max(0, min(255, (245 - whiteness) / 30.0 * 255)))
                pixels[x, y] = (r, g, b, new_a)

img.save(dst_path, "PNG")
print("SUCCESS: saved transparent profile image to", dst_path)
