//Started the project late so was only able to make it have basic functionality and background image. 

window.onload = main;

//Global Vaiables
var blank = ["300px", "300px"]; // blank coordinates
var start = false; //game start state

//Maze piece Initialization function 
function start_grid() {
    var puzzle_area = document.getElementById("puzzlearea").childNodes;
    var initial = [];
    var x = 0,y = 0,top = 0,left = 0,counter = 1;

    for (let i = 0; i < puzzle_area.length; i++) {
        if (puzzle_area[i].nodeName ==="DIV") {
            initial.push([top.toString() + "px", left.toString() + "px"]);
            puzzle_area[i].className += "puzzlepiece";
            puzzle_area[i].setAttribute("style",`background-position: ${x}px ${y}px; top: ${top}px; left: ${left}px;`);
            x -= 100;
            left += 100;

            if (counter % 4 === 0) {
                y -= 100;
                top += 100;
                left = 0;
            }
            counter += 1;

        }
    }

    return initial;
}

//Checks if puzzle piece is movable
function is_movable(piece) {
    return parseInt(piece.style.top) + 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) - 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) - 100 === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) + 100 === parseInt(blank[1])
}

//Checks if the board is in correct position
function check_for_win(winning_state, pieces) {
    if (start) {
        for (var i = 0; i < pieces.length; i++) {
            if ((winning_state[i][0] !== pieces[i].style.top) | (winning_state[i][1] !== pieces[i].style.left)) {
                return false;
            }
        }
        return true;
    }
    return false;
}

//Switches piece with blank space
function move_piece(piece, animate) {
    blank_top = piece.style.top;
    blank_left = piece.style.left;

    if (animate) {
        var winning_state = arguments[2];
        var pieces = arguments[3];
        $(piece).animate({ "top": blank[0], "left": blank[1] }, "fast", "linear", function () {
            if (check_for_win(winning_state, pieces)) {
                var win_string = 'You Win';
                $(".explanation")[0].innerText = win_string;
                $(".explanation")[0].style.textAlign = "Center";
            }
        });

    } else {
        piece.style.top = blank[0];
        piece.style.left = blank[1];
    }
    blank = [blank_top, blank_left];
}

//Randomizes the maze board
function random_shuffle(pieces) {
    var pieceLength = pieces.length;
    var piece;
    var rand;

    for (var index = 0; index < pieceLength; index++) {
        rand = Math.floor(Math.random() * pieces.length);
        piece = pieces.splice(rand, 1);
        move_piece(piece[0], false);
    }
}

//Returns all maze pieces
function get_pieces() {
    return $(".puzzlepiece");
}

//Choose desired background image.
function background_seletor() {
    var background_form = "<form align='Center'>\
    <p align='Center'>Select a image<p>\
    <input type = 'radio' name = 'bg' value = ''/> Akali\
    <input type = 'radio' name = 'bg' value = '1'/>demacia\
    <input type = 'radio' name = 'bg' value = '2'/>noxus\
    <input type = 'radio' name = 'bg' value = '3'/>runeterra\
    <input type = 'radio' name = 'bg' value = '4'/>targon\
    </form>";
    $("#overall").before(background_form);

}

function change_bg(value) {
    var pieces = get_pieces();

    for (var i = 0; i < pieces.length; i++) {
        pieces[i].style.backgroundImage = `url('backgrounds/background${value}.jpg')`;
    }
}

function shuffle_image() {
    var value = Math.floor(Math.random() * 5);
    if (value === 0) {
        value = "";
    }
    change_bg(value);
}

function main() {
    var winning_state = start_grid();
    var puzzle_pieces = get_pieces();
    background_seletor();
    var bg_form_items = $("form")[0].elements;

    for (var i = 0; i < bg_form_items.length; i++) {
        bg_form_items[i].addEventListener("click", function () {
            change_bg(this.value);
        });
    }

    document.getElementById("shufflebutton").onclick = function () {
        random_shuffle(puzzle_pieces);
        shuffle_image();
        start = true;
        moves = 0;
        puzzle_pieces = get_pieces();
    }

    for (var i = 0; i < puzzle_pieces.length; i++) {
        puzzle_pieces[i].addEventListener("mouseover", function () {
            if (is_movable(this)) {
                this.className = "puzzlepiece movablepiece";
            }
        });

        puzzle_pieces[i].addEventListener("mouseleave", function () {
            this.className = "puzzlepiece";
        });

        puzzle_pieces[i].addEventListener("click", function () {
            if (this.className.includes("movablepiece")) {
                move_piece(this, true, winning_state, puzzle_pieces);
            }
        });
    }

}
