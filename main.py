import video2image as vi
from yolov5 import detect
import calc_curb
import py2fire as pf
import record
import read_AP
import os

# 파일 받기
record.record_vd()

# 영상 분할
videoPath = os.getcwd().replace("\\", "/")+"/"
imagePath = vi.split_video(videoPath)

# curb detecting
curb_list = detect.run(
    weights=detect.ROOT/"runs/train/curb/weights/best.pt",
    source=imagePath,
    conf_thres=0.5,
    nosave=False,
    exist_ok=False
)

# layer 계산
layer = calc_curb.calc(curb_list) + 1
layer_up = True
layer_up = read_AP.check_AP()

if layer_up is False and layer > 1:
    layer -= 1
    layer = str("B"+str(layer))

# 정보 보내기
pf.send2db(layer)
