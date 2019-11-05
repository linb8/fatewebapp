import extraction as ex

def main():
    result = ex.extractFromFile("01gfp.txt", 6)
    print(result[3][1][0])


if __name__ == '__main__':
    main()

