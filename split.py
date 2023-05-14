from PIL import Image
import sys

def split_image(image_path, output_folder, rows, columns):
    original_image = Image.open(image_path)
    width, height = original_image.size
    piece_width = width // columns
    piece_height = height // rows

    for y in range(rows):
        for x in range(columns):
            box = (
                x * piece_width,
                y * piece_height,
                (x + 1) * piece_width,
                (y + 1) * piece_height,
            )
            piece = original_image.crop(box)
            piece_name = f"{output_folder}/{y * columns + x + 1}.png"
            #touch the file
            open(piece_name, 'a').close()
            piece.save(piece_name)

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: python split.py <image_path> <output_folder> <rows> <columns>")
        sys.exit(1)

    image_path = sys.argv[1]
    output_folder = sys.argv[2]
    rows = int(sys.argv[3])
    columns = int(sys.argv[4])

    split_image(image_path, output_folder, rows, columns)