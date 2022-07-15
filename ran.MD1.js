let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//tạo lớp để làm fun kiểm tra độ dài của rắn
class SnakeChieuDai {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;
let buocDi = 20;
let dauRanX = 10;
let dauranY = 10;
let tileSize = canvas.width / buocDi - 2;
let thanRan = [];
let doDaiThan = 0;

/*biến vận tốc dùng để ghép với  fun di chuyển keycode*/
let speedX = 0;
let speedY = 0;

//biến mồi////////////////////////////////////////////////////////
let moiX = 5;
let moiY = 5;

//Biến tính điểm//////////////////////////////////////////////////
let score = 0;
let amthanh = new Audio("audio/oigoioi.mp3")
let amThanh2 = new Audio("audio/Xin là xin vĩnh biệt cụ.mp3")

// fun bat dau game///////////////////////////////////////////////
function starGame() {
    dauRan();
    let ketQua = gameOver();
    if (ketQua) {
        return;
    }
    xoaManHinh();
    checkVaCham();
    veMoi();
    veSnake();
    tinhDiem();
    if (score > 3) {
        speed = 10;
    }
    if (score > 6) {
        speed = 15
    }
    setTimeout(starGame, 1000 / speed)
}

starGame();

/////fun ket thuc game
function gameOver() {
    let ketThuc = false;

    //nếu vận tốc của x y bằng 0 tức là chưa bắt đầu game
    if (speedX === 0 && speedY === 0) {
        return false;
    }
    ///kiểm tra các điểm va chạm bên tường
    if (dauRanX < 0) {
        ketThuc = true;
    } else if (dauRanX >= buocDi) {
        ketThuc = true;
    } else if (dauranY < 0) {
        ketThuc = true
    } else if (dauranY >= buocDi) {
        ketThuc = true;
    }
    ////kiểm tra cắt đuôi để kết thúc
    for (let i = 0; i < thanRan.length; i++) {
        let diemCat = thanRan[i];
        if (diemCat.x === dauRanX && diemCat.y === dauranY) {
            ketThuc = true;
            break;
        }
    }
    ////////Nếu kết thúc thì retun chữ game over
    if (ketThuc) {
        amThanh2.play();
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over! ", canvas.width / 8, canvas.height / 2);

    }
    return ketThuc;
}

function tinhDiem() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width - 50, 10);
}

////////////////////////////////////////////////////////////////////////////
function xoaManHinh() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//tao fun ve ran
function veSnake() {
    ctx.fillStyle = "orange";
    ctx.fillRect(dauRanX * buocDi, dauranY * buocDi, tileSize, tileSize);

    //lệnh vẽ thân rắn sau khi ăn mồi
    ctx.fillStyle = "green";
    for (let i = 0; i < thanRan.length; i++) {
        let ve = thanRan[i];
        ctx.fillRect(ve.x * buocDi, ve.y * buocDi, tileSize, tileSize)
    }

    //vẽ thêm thân rắn và nếu thân rắn dài hơn độ dài thân cũ  thì sẽ xóa cái cũ đi và hiểm thị cái mới nhất
    thanRan.push(new SnakeChieuDai(dauRanX, dauranY));
    if (thanRan.length > doDaiThan) {
        thanRan.shift();
    }
    ctx.fillStyle = "orange";
    ctx.fillRect(dauRanX * buocDi, dauranY * buocDi, tileSize, tileSize);
}

// tạo fun về đầu rắn
function dauRan() {
    dauRanX = dauRanX + speedX;
    dauranY = dauranY + speedY;
}

// tạo fun vẽ mồi to bằng kích thước các bước di chuyển
function veMoi() {
    ctx.fillStyle = "red";
    ctx.fillRect(moiX * buocDi, moiY * buocDi, tileSize, tileSize)
}

////// tạo fun check va chạm mồi/////////////////////////////
function checkVaCham() {
    if (moiX === dauRanX && moiY === dauranY) {
        moiX = Math.floor(Math.random() * buocDi);
        moiY = Math.floor(Math.random() * buocDi);
        doDaiThan++;
        score++;
        amthanh.play();
    }
}

const delay = debounce((e) => keyDown(e),100)

//tao fun di chuyen sẽ kết hợp với biến vận tốc //
document.body.addEventListener("keydown", delay);

function keyDown(event) {
    switch (event.keyCode) {
        case 38:
            if (speedY === 1)
                return;
            speedY = -1;
            speedX = 0;
            break;
        case 40:
            if (speedY === -1)
                return;
            speedY = 1;
            speedX = 0;
            break;
        case 37:
            if (speedX === 1)
                return;
            speedY = 0;
            speedX = -1;
            break;
        case 39:
            if (speedX === -1)
                return;
            speedY = 0;
            speedX = 1;
            break;
    }
}

function loadLai() {
    window.location.reload();
}


function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        if (!timer) {
            func.apply(this, args);
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = undefined;
        }, timeout);
    };
}


// function keyDown(event) {
// // di chuyển lên
//     if (event.keyCode == 38) {
//         if (speedY == 1)
//             return;
//         speedY = -1;
//         speedX = 0;
//     }
//     // di chuyển xuong
//     if (event.keyCode == 40) {
//         if (speedY == -1)
//             return;
//         speedY = 1;
//         speedX = 0;
//     }
//     // di chuyển trai
//     if (event.keyCode == 37) {
//         if (speedX == 1)
//             return;
//         speedY = 0;
//         speedX = -1;
//     }
//     // di chuyển phai
//     if (event.keyCode == 39) {
//         if (speedX == -1)
//             return;
//         speedY = 0;
//         speedX = 1;
//     }
// }

