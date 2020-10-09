from datetime import datetime
import os
import json
import shutil
import glob

def getSortedFileSet(filetype, sourceDir, targetDir, sourceFileList, osDirectoryLimiter):
    outFileName = filetype + 'List.json'
    targetDir = targetDir + osDirectoryLimiter + filetype
    outfileset = getFileSet(sourceFileList, outFileName, osDirectoryLimiter)
    return outfileset

def getFileList(sourceFileDir):
    return glob.glob(sourceFileDir)

def getFileListForType(sourceDir, filetype):
    return getFileList(sourceDir + '/*/*.' + filetype)

def getFileSet(filelist, outfilename, osDirectoryLimiter):
    fileset = {}
    for files in filelist:
        filenameArr = files.split(osDirectoryLimiter)
        foldername = filenameArr[1]
        folderdate = datetime.strptime(foldername, '%m-%d-%Y')
        monthstr = folderdate.strftime('%m')
        yearstr = folderdate.strftime('%Y')
        datestr = folderdate.strftime('%d')
        yearmonthstr = yearstr + '-' + monthstr
        yearmonthdatestr = yearmonthstr + '-' + datestr
        filename = filenameArr[2]
        if yearstr in fileset:
            yearSet = fileset[yearstr]
            if yearmonthstr in yearSet:
                yearmonth = yearSet[yearmonthstr]
                if yearmonthdatestr in yearmonth:
                    yearmonth[yearmonthdatestr].append(filename)
                else:
                    yearmonth[yearmonthdatestr] = [filename]
            else:
                yearSet[yearmonthstr] = {yearmonthdatestr : [filename]}
        else:
            fileset[yearstr] = {yearstr : {}}
            fileset[yearstr] = {yearmonthstr : {}}
            fileset[yearstr][yearmonthstr] = {yearmonthdatestr : [filename]}
    createOutFile(fileset, outfilename)
    return fileset
    
def createOutFile(fileset, outfilename):
    f = open(outfilename, 'w')
    f.write(json.dumps(fileset))
    f.close()

def printSummary(fileset):
    print('Total number of years: ' + str(len(fileset)))
    for year in fileset:
        print('Total number of months in ' + year + ': ' + str(len(fileset[year])))
        for month in fileset[year]:
            print(' Total number of days in ' + str(month) + ': ' + str(len(fileset[year][month])))
            for day in fileset[year][month]:
                print('  Total number of files in ' + str(day) + ': ' + str(len(fileset[year][month][day])))
                
def makeTargetDirs(fileset, targetDir, osDirectoryLimiter, filetype):
    targetDir = targetDir + osDirectoryLimiter + filetype
    if os.path.isdir(targetDir):
        print('Target folder exists')
    else:
        os.mkdir(targetDir)
        print('Target folder created')
    for year in fileset:
        targetFileDir = targetDir + osDirectoryLimiter + str(year)
        if os.path.isdir(targetFileDir):
            print('Year Folder exists')
        else:
            os.mkdir(targetFileDir)
            print('Year Folder created')
        for month in fileset[year]:
            targetFileMonthDir = targetFileDir + osDirectoryLimiter + str(month)
            if not os.path.isdir(targetFileMonthDir):
                os.mkdir(targetFileMonthDir)
            for day in fileset[year][month]:
                targetFileMonthDateDir = targetFileMonthDir + osDirectoryLimiter + str(day)
                if not os.path.isdir(targetFileMonthDateDir):
                    os.mkdir(targetFileMonthDateDir)
                
def copyFiles(filelist, targetDir, osDirectoryLimiter, filetype):
    for files in filelist:
        filenameArr = files.split(osDirectoryLimiter)
        foldername = filenameArr[1]
        folderdate = datetime.strptime(foldername, '%m-%d-%Y')
        monthstr = folderdate.strftime('%m')
        yearstr = folderdate.strftime('%Y')
        datestr = folderdate.strftime('%d')
        yearmonthstr = yearstr + '-' + monthstr
        yearmonthdatestr = yearmonthstr + '-' + datestr
        # filename = filenameArr[2]
        target = targetDir + osDirectoryLimiter + filetype + osDirectoryLimiter + yearstr + osDirectoryLimiter + yearmonthstr + osDirectoryLimiter + yearmonthdatestr + osDirectoryLimiter
        #print(target)
        shutil.copy2(files, target)
        
def getAllFileTypes(sourceDir):
    fileext = []
    filelist = getFileList(sourceDir + '/*/*.*')
    for file in filelist:
        filenamearr = file.split('.')
        fileextension = filenamearr[len(filenamearr)-1]
        if (not fileextension in fileext):
            fileext.append(fileextension)
    return fileext