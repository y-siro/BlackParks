import cv2
import os
import pysftp
import time
import copy
import datetime

now = datetime.datetime.now().strftime("%Y_%m_%d_%H-%M-%S")
na = str(now)
cap = cv2.VideoCapture(0)
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter(na+".avi", fourcc, 30.0, (640,480))
while(cap.isOpened()):
    ret, frame = cap.read()
    out.write(frame)
    cv2.imshow('frame', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'): break
    
cap.release()
out.release()
cv2.destroyAllWindows()

#os.rename("now.avi", "now2.avi")

host = '43.200.248.80'
port = 22
username = 'ubuntu'
pwd = '6112'

cnopt = pysftp.CnOpts()
cnopt.hostkeys = None
path = '/home/siro/code/123.pem'

file_name = na + '.avi'

local_path = '/home/siro/code/' + na+ '.avi'
remont_path = '/home/ubuntu/node-project/ftp/' + na + '.avi'

with pysftp.Connection(host, username=username, private_key=path, cnopts=cnopt) as sftp:
    sftp.put('/home/siro/code/' + na + '.avi', '/home/ubuntu/node-project/ftp/' + na + '.avi')

sftp.close()
