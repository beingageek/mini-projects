"""
Python script to organize a list of movie directories into
hierarchical structure
"""
import glob
import json

# This is the source directory with all files.
SOURCE_DIR = 'C:\\Rishi\\Movies'

filenames_data = {}
just_filenames = []
full_filenames = []


def add_filename(file_name):
    """Main method to add each directory into organized collection"""
    # Split up file names by the directory separator
    file_parts = file_name.split("\\")
    # data_loc represents the node where the next part goes. It starts from the root directory
    # and keeps going into subdirectories
    data_loc = {}
    for i, part_name in enumerate(file_parts):
        # For root directory, make sure the main dictionary contains the root
        if i == 0:
            # Remove the Windows Drive indicator
            part_name = part_name.replace(":", "")
            if filenames_data.get(part_name) is None:
                filenames_data[part_name] = {}
            # data_log now becomes the root directory
            data_loc = filenames_data.get(part_name)
        # Iterate until we reach the last subdirectory before the filename
        elif i < len(file_parts) - 2:
            if data_loc.get(part_name) is None:
                data_loc[part_name] = {}
            # data_log now becomes the subdirectory
            data_loc = data_loc.get(part_name)
        # If we are at last subdirectory, change data_log to be a list
        elif i == len(file_parts) - 2:
            data_loc[part_name] = []
            data_loc = data_loc[part_name]
        # Add the actual filename as list item, and add to the list of just filenames
        else:
            data_loc.append(part_name)
            just_filenames.append(part_name.replace(".", " "))


for filename in glob.iglob(SOURCE_DIR + "\\**\\*.mp4", recursive=True):
    full_filenames.append(filename)
for filename in glob.iglob(SOURCE_DIR + "\\**\\*.mkv", recursive=True):
    full_filenames.append(filename)

for files in full_filenames:
    add_filename(files)

print('Completed')
# Print as Json format
print(json.dumps(filenames_data))
just_filenames.sort(reverse=False)
print(*just_filenames, sep="\n")
