import functions

# This is the source directory with all imported files.
sourceDir = 'Sony a6000'

# This is the target directory where sorted files will be copied.
targetDir = 'Sorted'

# This will print out the summary with number of files being sorted.
# Set value as N to skip the summary.
printSummaryOut = 'Y'

# This will control if the files will be actually copied.
# Set value as N to skip the copy and if the intention is to display only the summary of files.
copyFilesOut = 'Y'


osDirectoryLimiter = '\\'
filetypes = functions.getAllFileTypes(sourceDir)
print('Available file types: ' + str(filetypes))

for filetype in filetypes:
        print('Sorting files of type: ' + filetype)
        sourceFileList = functions.getFileListForType(sourceDir, filetype)
        print('Total ' + filetype + ' files: ' + str(len(sourceFileList)))
        outfileset = functions.getSortedFileSet(filetype, sourceDir, targetDir, sourceFileList, osDirectoryLimiter)
        print('**********************')
        if printSummaryOut == 'Y':
                functions.printSummary(outfileset)
        functions.makeTargetDirs(outfileset, targetDir, osDirectoryLimiter, filetype)
        if copyFilesOut == 'Y':
                functions.copyFiles(sourceFileList, targetDir, osDirectoryLimiter, filetype)

print('Completed')