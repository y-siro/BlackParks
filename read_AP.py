import glob

def check_AP():

    ap_list = []
    files = glob.glob('*.txt')

    for file in files:
        with open(file, 'r') as f:

            line = f.readline()
            line = line.replace("\n","")
            ap_list.append(line)

    if int(float(ap_list[0])) < int(float(ap_list[1])) :
        return False
    else:
        return True
