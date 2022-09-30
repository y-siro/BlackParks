import pysftp
import time
import copy
import cv2
import os

host = '43.200.248.80'
port = 22
username = 'ubuntu'
pwd = '6112'

cnopt = pysftp.CnOpts()
cnopt.hostkeys = None
path = 'C:\\Users\\leebj\\Desktop\\video\\asd\\123.pem'

filelist = []
comparelist = []


def record_vd():
    file_cnt = 0
    with pysftp.Connection(host,
                           username=username,
                           private_key=path,
                           cnopts=cnopt)\
            as sftp:
        sftp.chdir(remotepath='./node-project/ftp')
        filelist = sftp.listdir('./')
        while True:
            comparelist = sftp.listdir('./')
            time.sleep(1)
            difference = list(set(comparelist) - set(filelist))
            print(difference)
            checklist = copy.deepcopy(difference)

            while len(checklist) > 0:
                for i in range(len(checklist)):
                    bef = sftp.stat(checklist[i]).st_size
                    time.sleep(10)
                    if sftp.stat(difference[i]).st_size == bef:
                        sftp.get(checklist[i])
                        file_cnt += 1

                        checklist.reverse()
                        checklist.pop()

                    else:
                        continue

                filelist = sftp.listdir('./')

                if file_cnt == 3:
                    break
            if file_cnt == 3:
                break

    sftp.close()