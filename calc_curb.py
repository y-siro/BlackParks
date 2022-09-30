def calc(curb_list):

    is_curb = 0
    no_curb = 0
    layer_cnt = 0
    pre_list = None
    detect_time = 3
    no_detect_time = 2

    for b in curb_list:
        print("is = {}, no = {}".format(is_curb,no_curb))
        if b is True:
            is_curb += 1
        else:
            no_curb += 1

        if b != pre_list:
            if no_curb >= no_detect_time:
                no_curb = 0
                if is_curb >= detect_time:
                    layer_cnt += 1
                    is_curb = 0

        pre_list = b

    if curb_list[-1] == True and is_curb >= detect_time:
        layer_cnt += 1

    return layer_cnt




