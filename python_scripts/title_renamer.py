"""
Python script to convert book name into title case separated with dashes
"""
import sys


def title_rename(input_str_title):
    """Format given string into title case"""
    str_array = input_str_title.split(" ")
    renamed_array = []
    for string in str_array:
        renamed_array.append(string.title())
    return "-".join(renamed_array)


if len(sys.argv) == 2:
    input_str = sys.argv[1]
    print(title_rename(input_str))
