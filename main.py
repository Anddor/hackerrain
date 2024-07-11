rows = 5
cols = 5
board = []

def init_board():
    board  = [[128 for x in range rows] for y in range cols ]
    return board    

def update_state(board):
    for x, col in enumerate(board):
        for y, row in enumerate(col):
            led.plot_brightness(x, y, board[x][y])

def on_forever():
    pass

def on_start():
    global board = init_board()
    update_state(board)
    

on_start()
