"""Python Script to randomize background wallpaper.
Find a random jpg or png wallpaper file and copy to a designated file"""
import glob
import platform
import random
import shutil
import sys

WALLPAPER_SOURCE_DIR_WIN = "C:\\Dev\\github-repos-beingageek\\my-projects" \
                           "\\vscode-custom-background-css\\"
WALLPAPER_SOURCE_DIR_WSL = "/mnt/c/Dev/github-repos-beingageek/my-projects" \
                           "/vscode-custom-background-css/"
TARGET_FILE_WIN = "C:\\Rishi\\Wallpaper\\"
TARGET_FILE_WSL = "/mnt/c/Rishi/Wallpaper/"
TARGET_VSCODE_WIN = "C:\\Program Files\\Microsoft VS Code\\resources\\app\\out\\vs\\workbench\\"
TARGET_VSCODE_WSL = "/mnt/c/Program Files/Microsoft VS Code/resources/app/out/vs/workbench/"
WALLPAPER_DEFINED_LIST = {
    "elsa": "wl-wallpaper-engine-elsa.jpg",
    "elsa-kiss": "wl-elsa-kissing.jpg",
    "skirt": "Wallpaper Light - Skirt and stocking (crop).jpg",
    "dark-skirt": "Wallpaper Dark - Skirt and Heels (crop).jpg",
    "alex": "wl-alex-long.jpg",
    "jinx": "wd-jinx.jpg",
    "gwen": "Wallpaper Light - Spider Gwen 2.jpg",
    "jeans": "wl-jeans.jpg",
    "kiss": "wd-kissing-3.jpg",
    "lesbian": "wl-lesbian.jpg",
    "kda": "wd-kda.jpg",
    "gwen-dark": "wd-spider-gwen.jpg"
}

if platform.system() == "Windows":
    SOURCE_DIR = WALLPAPER_SOURCE_DIR_WIN
    TARGET_DIR = TARGET_FILE_WIN + "wallpaper.jpg"
    TARGET_VSCODE = TARGET_VSCODE_WIN + "wallpaper.jpg"
    SPLIT_SEPARATOR = "\\"
elif platform.system() == "Linux":
    SOURCE_DIR = WALLPAPER_SOURCE_DIR_WSL
    TARGET_DIR = TARGET_FILE_WSL + "wallpaper.jpg"
    TARGET_VSCODE = TARGET_VSCODE_WSL + "wallpaper.jpg"
    SPLIT_SEPARATOR = "/"


def add_to_list(filename_part, my_choice):
    """Add to list based on user choice of Dark or Light"""
    if my_choice.lower() == "dark":
        if filename_part.startswith("Wallpaper Dark") or filename_part.startswith("wd-"):
            full_filenames.append(filename)
    elif my_choice.lower() == "light":
        if filename_part.startswith("Wallpaper Light") or filename_part.startswith("wl-"):
            full_filenames.append(filename)
    else:
        if filename_part.__contains__(my_choice):
            full_filenames.append(filename)


CHOICE = "all"
if len(sys.argv) > 1:
    CHOICE = sys.argv[1]
full_filenames = []
if CHOICE in WALLPAPER_DEFINED_LIST:
    shutil.copyfile(SOURCE_DIR + WALLPAPER_DEFINED_LIST.get(CHOICE), TARGET_DIR)
    shutil.copyfile(SOURCE_DIR + WALLPAPER_DEFINED_LIST.get(CHOICE), TARGET_VSCODE)


for filename in glob.iglob(SOURCE_DIR + "*.jpg", recursive=True):
    if CHOICE == "all":
        full_filenames.append(filename)
    else:
        add_to_list(filename.split(SPLIT_SEPARATOR)[-1], CHOICE)
for filename in glob.iglob(SOURCE_DIR + "*.png", recursive=True):
    if CHOICE == "all":
        full_filenames.append(filename)
    else:
        add_to_list(filename.split(SPLIT_SEPARATOR)[-1], CHOICE)
if len(full_filenames) > 0:
    wl = random.choice(full_filenames)
    shutil.copyfile(wl, TARGET_DIR)
    shutil.copyfile(wl, TARGET_VSCODE)
