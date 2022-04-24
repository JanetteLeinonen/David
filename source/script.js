var URL = "data.json"

var showAlarm;
var larmtext;
var dysa;
var numOfColumnsAktuell;
var numOfColumnsNasta;

var aktuellSerialNo = [];
var aktuellPosNo = [];
var aktuellArticleNo = [];
var aktuellDescription = [];
var aktuellThickness = [];
var aktuellDensity = [];
var aktuellColors = [];
var aktuellWidth = [];
var aktuellLength = [];
var aktuellNumInLength = [];
var aktuellDelimiters = [];

var nastaSerialNo = [];
var nastaPosNo = [];
var nastaArticleNo = [];
var nastaDescription = [];
var nastaThickness = [];
var nastaDensity = [];
var nastaWidth = [];
var nastaLength = [];

var tableData;

$(document).ready(function () {
    S7Framework.initAuto("#loading_div", $.init);
});

$.init = function () {
    // read Values first time
    S7Framework.readData(URL, "init read data", deployValues);
}

// function to deploy values into Webpage
function deployValues(values) {
    var index = 0;
    numOfColumnsAktuell = values[0];

    for (let i = 0; i < numOfColumnsAktuell; i++) {
        aktuellSerialNo[i] = values[index + 1];
        aktuellPosNo[i] = values[index + 2];
        aktuellArticleNo[i] = values[index + 3];
        aktuellDescription[i] = values[index + 4]
        index += 4;
    }
    for (let i = 0; i < numOfColumnsAktuell; i++) {
        aktuellThickness[i] = values[index + 1];
        aktuellWidth[i] = values[index + 2];
        aktuellLength[i] = values[index + 3];
        aktuellDensity[i] = values[index + 4];
        aktuellColors[i] = values[index + 5];
        aktuellNumInLength[i] = values[index + 6];
        aktuellDelimiters[i] = values[index + 7];
        index += 7;
    }

    index++;
    numOfColumnsNasta = values[index];

    for (let i = 0; i < numOfColumnsNasta; i++) {
        nastaSerialNo[i] = values[index + 1];
        nastaPosNo[i] = values[index + 2];
        nastaArticleNo[i] = values[index + 3];
        nastaDescription[i] = values[index + 4]
        index += 4;
    }
    for (let i = 0; i < numOfColumnsNasta; i++) {
        nastaThickness[i] = values[index + 1];
        nastaWidth[i] = values[index + 2];
        nastaLength[i] = values[index + 3];
        nastaDensity[i] = values[index + 4];
        index += 4;
    }

    index++;
    showAlarm = values[index];

    if (showAlarm) {
        index++;
        larmtext = values[index];

        if (larmtext == 3) {
            index++;
            dysa = values[index];
        }
    }

    tableData = [
        [aktuellArticleNo, aktuellDescription, aktuellDensity, aktuellThickness, aktuellWidth, aktuellLength, aktuellPosNo],
        [nastaArticleNo, nastaDescription, nastaDensity, nastaThickness, nastaWidth, nastaLength, nastaPosNo]
    ];

    loadTable();
    canvas();

    showHideLarmfield(showAlarm);

    // read Values cyclically
    setTimeout(S7Framework.readData(URL, "init read data", deployValues), 2000);
}
function canvas() {
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    var canvasWidth = c.width;
    var canvasHeight = c.height;

    const INVISIBLE = "rgba(198, 198, 198, 0.8)";
    const GREEN_STRIPES = document.getElementById("GREEN_STRIPES"); //OK
    const PINK_STRIPES = document.getElementById("PINK_STRIPES"); //OK
    const YELLOW_STRIPES = document.getElementById("YELLOW_STRIPES"); //OK
    const BLUE_STRIPES = document.getElementById("BLUE_STRIPES"); //OK
    const BLUE_DOTS = document.getElementById("BLUE_DOTS"); //OK
    const BLACK_STRIPES = document.getElementById("BLACK_STRIPES"); //OK
    const LIGHTGREEN_DOTS = document.getElementById("LIGHTGREEN_DOTS"); //OK
    const LIGHTGREEN_STRIPES = document.getElementById("LIGHTGREEN_STRIPES"); //OK
    const ORANGE_DOTS = document.getElementById("ORANGE_DOTS"); //OK
    const ORANGE_STRIPES = document.getElementById("ORANGE_STRIPES"); //OK
    const GRAY_DOTS = document.getElementById("GRAY_DOTS"); //OK
    const GRAY_STRIPES = document.getElementById("GRAY_STRIPES"); //OK

    const Mörkgrön_med_ränder = ctx.createPattern(GREEN_STRIPES, "repeat");
    const Mörkgrön = "rgba(0, 102, 0, 0.8)";
    const Rosa_med_ränder = ctx.createPattern(PINK_STRIPES, "repeat");
    const Rosa = "rgba(255, 128, 128, 0.8)";
    const Gul_med_ränder = ctx.createPattern(YELLOW_STRIPES, "repeat");
    const Gul = "rgba(255, 255, 0, 0.8)";
    const Lila = "rgba(170, 0, 204, 0.8)";
    const Mörkblå_med_ränder = ctx.createPattern(BLUE_STRIPES, "repeat");
    const Mörkblå_med_prickar = ctx.createPattern(BLUE_DOTS, "repeat");
    const Mörkblå = "rgba(0, 0, 128, 0.8)";
    const Ljusgrön = "rgba(128, 255, 128, 0.8)";
    const Ljusblå = "rgba(77, 195, 255, 0.8)";
    const Röd = "rgba(255, 0, 0, 0.8)";
    const Svart = "rgba(0, 0, 0, 0.8)";
    const Svart_med_ränder = ctx.createPattern(BLACK_STRIPES, "repeat");
    const Ljusgrön_med_prickar = ctx.createPattern(LIGHTGREEN_DOTS, "repeat");
    const Ljusgrön_med_ränder = ctx.createPattern(LIGHTGREEN_STRIPES, "repeat");
    const Orange = "rgba(255, 128, 0, 0.8)";
    const Orange_med_prickar = ctx.createPattern(ORANGE_DOTS, "repeat");
    const Orange_med_ränder = ctx.createPattern(ORANGE_STRIPES, "repeat");
    const Vit = "rgba(255, 255, 255, 0.8)";
    const Grå = "rgba(128, 128, 128, 0.8)";
    const Grå_med_prickar = ctx.createPattern(GRAY_DOTS, "repeat");
    const Grå_med_ränder = ctx.createPattern(GRAY_STRIPES, "repeat");

    const colors = [INVISIBLE, //0
        Mörkgrön_med_ränder, //1
        Mörkgrön, //2
        Rosa_med_ränder, //3
        Rosa, //4
        Gul_med_ränder, //5
        Gul, //6
        Lila, //7
        Mörkblå_med_ränder, //8
        Mörkblå_med_prickar, //9
        Mörkblå, //10
        Ljusgrön, //11
        Ljusblå, //12
        Röd, //13
        Svart, //14
        Svart_med_ränder, //15
        Ljusgrön_med_prickar, //16
        Ljusgrön_med_ränder, //17
        Orange, //18
        Orange_med_prickar, //19
        Orange_med_ränder, //20
        Vit, //21
        Grå, //22
        Grå_med_prickar, //23
        Grå_med_ränder]; //24

    ctx.fillStyle = INVISIBLE;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const X_OFFSET = 20;
    const Y_OFFSET = 20;
    const START_POS_X = 5;
    const START_POS_Y = 5;
    const DELIMITER_WIDTH = 2;
    const DELIMITER_COLOR = "#000000";
    const MAXWIDTH = 1600;
    const MAXHEIGHT = 3300;

    var boxPosX = START_POS_X;
    var boxPosY = START_POS_Y;

    if (numOfColumnsAktuell > 0) {
        for (let i = 0; i < numOfColumnsAktuell; i++) {
            //Create boxes
            for (let j = 0; j < aktuellNumInLength[i]; j++) {
                //Paint boxes
                ctx.fillStyle = colors[aktuellColors[i]];
                ctx.fillRect(boxPosX,
                    boxPosY,
                    (aktuellWidth[i] / MAXWIDTH) * canvasWidth,
                    (aktuellLength[i] / MAXHEIGHT) * canvasHeight);

                //Calculate next y position
                boxPosY += ((aktuellLength[i] + Y_OFFSET) * canvasHeight) / MAXHEIGHT;
            }

            // Calculate position for next box/column
            boxPosX += ((aktuellWidth[i] + X_OFFSET) / MAXWIDTH) * canvasWidth;
            boxPosY = START_POS_Y;

            //delimiters
            if (aktuellDelimiters[i]) {
                ctx.fillStyle = DELIMITER_COLOR;
                ctx.fillRect(boxPosX, 0, DELIMITER_WIDTH, MAXHEIGHT);
                boxPosX += ((DELIMITER_WIDTH + X_OFFSET) / MAXWIDTH) * canvasWidth;
            }
        }
    }
}
function loadTable() {
    const rowNames = ["ArtNr", "Beskr", "Densitet", "Tjocklek", "Bredd", "Längd", "Pos"]
    const tableHeader = [document.getElementById("tableHeaderAktuell"), document.getElementById("tableHeaderKommande")];
    const tableBody = [document.getElementById("tableBodyAktuell"), document.getElementById("tableBodyKommande")];
    const header = [document.getElementById("headerAktuell"), document.getElementById("headerKommande")];
    const numOfColumns = [numOfColumnsAktuell, numOfColumnsNasta]

    if (numOfColumns[0] != 0) { header[0].innerHTML = "Aktuell order: serie " + aktuellSerialNo[0]; }
    else { header[0].innerHTML = "Aktuell order"; }

    if (numOfColumns[1] != 0) { header[1].innerHTML = "Nästa order: serie " + nastaSerialNo[0]; }
    else { header[1].innerHTML = "Nästa order"; }

    for (k = 0; k <= 1; k++) {
        tableHeader[k].innerHTML = "";
        tableBody[k].innerHTML = "";


        if (numOfColumns[k] != 0) {
            //Table Header
            let headerRow = tableHeader[k].insertRow();

            if (numOfColumns[k] > 6) {
                tableHeader[k].innerHTML = "Specialfall, se PLC Hmi och .xml-fil.";
            }
            else {
                for (let i = 0; i <= numOfColumns[k]; i++) {
                    let data = headerRow.insertCell(i);
                    if (i == 0) data.innerHTML = '';
                    else data.innerHTML = i;
                }

                //Table body
                for (let i = 0; i < 7; i++) {
                    let row = tableBody[k].insertRow();
                    let name = row.insertCell(0);
                    name.innerHTML = rowNames[i];

                    for (let j = 0; j < numOfColumns[k]; j++) {
                        let data = row.insertCell(j + 1);
                        data.innerHTML = tableData[k][i][j];
                    }
                }
            }
        }
    }
}
function showHideLarmfield(visning) {
    let element = document.getElementById("larmtext");

    if (visning) {
        element.style.visibility = 'visible';

        if (larmtext == 1) {
            element.innerHTML = 'Odefinierat material invalt';
        }
        else if (larmtext == 2) {
            element.innerHTML = 'Inkommandematerial behöver kapas';
        }
        else if (larmtext == 3) {
            element.innerHTML = 'Förväntad dysa: ' + dysa + ' mm';
        }
        else if (larmtext == 4) {
            element.innerHTML = 'Omkörningsorder!';
        }
    }
    else {
        element.style.visibility = 'hidden';
    }
}

