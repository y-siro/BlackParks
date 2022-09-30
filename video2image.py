import cv2
import os
import numpy as np

# 영상 프레임 별로 자르기


def split_video(videoPath):
    save_imagePath = ""

    for videoName in os.listdir(videoPath):
        # 영상 확장자 체크
        if videoName.endswith(".avi") is False:
            continue

        video = cv2.VideoCapture(videoPath+videoName)
        while video.isOpened():
            imagePath = videoPath + "/" + videoName + " Folder"
            save_imagePath = imagePath
            # 경로 생성
            if not os.path.exists(imagePath):
                os.mkdir(imagePath)

            # 이미지 read
            ret, image = video.read()
            image = image.astype(np.int16)
            image = cv2.resize(image, (640, 360))
            # 이미지 저장
            if int(video.get(cv2.CAP_PROP_POS_FRAMES)) % 30 == 0:
                cv2.imwrite(imagePath+"/imageSample"+"%3d.png" % (int(video.get(cv2.CAP_PROP_POS_FRAMES))/30), image)
            if video.get(cv2.CAP_PROP_POS_FRAMES) == video.get(cv2.CAP_PROP_FRAME_COUNT):
                break

        video.release()

    return save_imagePath
