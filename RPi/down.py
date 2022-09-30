import pysftp
import time
import copy
import cv2

host = '43.200.248.80'
port = 22
username = 'ubuntu'
pwd = '6112'

cnopt = pysftp.CnOpts()
cnopt.hostkeys = None
path = 'C:\\coding\\aws\\123.pem'

filelist = []
comparelist = []

with pysftp.Connection(host, username=username, private_key=path, cnopts=cnopt) as sftp:
    sftp.chdir(remotepath='./node-project/ftp')
    filelist = sftp.listdir('./')
    sftp.cd("C:\\coding\\aws\\down")
    while True:
        comparelist = sftp.listdir('./')
        time.sleep(1)
        difference = list(set(comparelist) - set(filelist))
        print(difference)
        checklist = copy.deepcopy(difference)

        while len(checklist) > 0:
            for i in range(len(checklist)):
                bef = sftp.stat(checklist[i]).st_size
                time.sleep(2)
                if sftp.stat(difference[i]).st_size == bef:
                    sftp.get(checklist[i])
                            
                    del checklist[i]
                else:
                    continue
            filelist = sftp.listdir('./')





sftp.close()