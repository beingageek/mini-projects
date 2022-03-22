"""
Python script to rename movie directories in easy to read standardized format
"""
import re
import sys


def movie_rename(title):
    """Format the directory name to remove unnecessary words"""
    ren_str = re.sub(r'(\[BluRay] )*(\[5.1] )*(\[YTS.MX])*', "", title)
    ren_str = ren_str.replace("[", "").replace("]", "").replace("(", "[").replace(")", "]").strip()
    return ren_str


if len(sys.argv) == 2:
    input_str = sys.argv[1]
    print(movie_rename(input_str))
