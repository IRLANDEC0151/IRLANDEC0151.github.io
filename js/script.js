//уровни сложности
let levelSettingContent = document.querySelector(".levelSetting-content");
const levelOfDifficulty = [
    { from: 0, to: 0 },
    { from: 1, to: 10 },
    { from: 5, to: 50 },
    { from: 10, to: 100 },
    { from: 100, to: 1000 },
    { from: 1000, to: 10000 },
];
//порядковый номер точки в range slider
let curVal = 1;
let arifmSign = [];

levelSettingContent.innerHTML =
    "Числа от " +
    levelOfDifficulty[curVal].from +
    " до " +
    levelOfDifficulty[curVal].to;

//получаем наш ввод
let inputAnswer = document.querySelector(".answer-form");
// слагаемые
let firstParam = document.querySelector(".first-fastMatch-param");
let secondParam = document.querySelector(".second-fastMatch-param");
//вывод статистики fastMatch в helperRight
let result = document.querySelector(".helperRight-output");

//переменные для статистики fastMatch в helperRight
let allExаmpleCounter = 0;
let correctExаmpleCounter = 0;
//переменная для ответа
let answer = 0;

//нажимаем enter или пробел в нашем вводе
inputAnswer.onkeypress = function (event) {
    if ((event.which === 32 || event.which === 13) && inputAnswer.value != "") {
        //проверяем  ответ на правильность
        fastMatchInstance.compare(inputAnswer.value);
        inputAnswer.value = "";
        fastMatchInstance.randomExample(
            levelOfDifficulty[curVal].from,
            levelOfDifficulty[curVal].to
        );
    }
};

//допускаем  в input только цифры
document.oninput = function () {
    let input = document.querySelector(".fastMatch-input-group input");
    console.log('инпут 0'+ input)
    let reg=/\.{3,}/g
    input.value = input.value.replace(/[^,.-1234567890]/, "");
};

//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------

// range slider выбор уровня сложности
let sheet = document.createElement("style"),
    $rangeInput = $(".range input"),
    prefs = ["webkit-slider-runnable-track", "moz-range-track", "ms-track"];

document.body.appendChild(sheet);

let getTrackStyle = function (el) {
    //el- это инпут
    (curVal = el.value), // порядковый номер точки
        (val = (curVal - 1) * 24.666666667),
        //  16.666666667,
        (style = "");
    console.log("curval=" + curVal);
    //текст уровня сложности из массива
    levelSettingContent.innerHTML =
        "Числа от " +
        levelOfDifficulty[curVal].from +
        " до " +
        levelOfDifficulty[curVal].to;
    levelSettingContent.classList.add("bounceIn");
    setTimeout(() => {
        levelSettingContent.classList.remove("bounceIn");
    }, 400);

    // Set active label
    $(".range-labels li").removeClass("active selected");

    let curLabel = $(".range-labels").find("li:nth-child(" + curVal + ")");
    curLabel.addClass("active selected");
    curLabel.prevAll().addClass("selected");

    // синяя полоска сзади
    for (let i = 0; i < prefs.length; i++) {
        style +=
            ".range {background: linear-gradient(to right,#03a9f4 0%, #03a9f4 " +
            val +
            "%,  #fff " +
            val +
            "%, #fff 100%)}";

        //тонкая полоска
        style +=
            ".range input::-" +
            prefs[i] +
            "{background: linear-gradient(to right, #03a9f4 0%, #03a9f4 " +
            val +
            "%, gray " +
            val +
            "%, gray 100%)}";
    }
    return style;
};

$rangeInput.on("input", function () {
    sheet.textContent = getTrackStyle(this);
});

// Change input value on label click
$(".range-labels li").on("click", function () {
    let index = $(this).index();

    $rangeInput.val(index + 1).trigger("input");
});

// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------

//выбор арифметических операций
let arifmChoose = document.querySelector(".arifmSetting-choose");
$(document).ready(function () {
    $(".arifmSetting-choose")
        .find("div")
        .on("click", function () {
            let sign = "";
            switch ($(this).data("arifm")) {
                case "сложение":
                    sign = "+";
                    console.log("перед вызоваом ф-и" + sign);
                    fastMatchInstance.addArifmSign(sign);
                    break;
                case "вычитание":
                    sign = "-";
                    console.log("перед вызоваом ф-и" + sign);

                    fastMatchInstance.addArifmSign(sign);

                    break;
                case "умножение":
                    sign = "*";
                    console.log("перед вызоваом ф-и" + sign);

                    fastMatchInstance.addArifmSign(sign);

                    break;
                case "деление":
                    sign = "/";
                    console.log("перед вызоваом ф-и" + sign);

                    fastMatchInstance.addArifmSign(sign);

                    break;
            }
            //console.log(arifmSign);
            //console.log($(this).data("arifm"));
        });
});

//кнопка старт
//убираем по кнопке окно настроек

let matchSetting = document.querySelector(".newFMatch-area");
let fastMatchStartBtn = document.querySelector(".start-btn");
let fastMatch = document.querySelector(".fastMatch");

//анимация всплытия подсказок
let helperBottom = document.querySelector(".helperBottom");
let helperLeft = document.querySelector(".helperLeft");
let helperRight = document.querySelector(".helperRight");

//нажатие на кнопку НАЧАТЬ
fastMatchStartBtn.addEventListener("click", () => {
    // обнуляем все настройки (нужно при возвращении к настройкам)
    returnWindowsSetting();

    //запускаем fastMatch через 400мс
    setTimeout(() => {
        fastMatch.style.visibility = "visible";
        //анимация fastMatch
        fastMatch.classList.add("animate-fastMath");
    }, 400);
});

//анимация helpers после окончания анимации fastMatch
fastMatch.addEventListener("animationend", helper);
function helper() {
    helperBottom.classList.add("animate-helperBottom");
    helperLeft.classList.add("animate-helperLeft");
    helperRight.classList.add("animate-helperRight");
}

//запускаем таймер после окончания анимации хэлперов
helperRight.addEventListener("animationend", startTimetfunc);
function startTimetfunc() {
    startTimer(3, "fastMatch-timer p", startMatch);
}
//переменная для остановки таймера
let stopSetInterval = true;

//таймер
function startTimer(time, tagName, callback) {
    display = document.querySelector(`.${tagName}`);
    display.style.opacity = "1";
    display.innerHTML = time;

    let timer = setInterval(function () {
        if (--time != 0 && stopSetInterval) {
            // обновляем цифру
            display.innerHTML = time;
        } else {
            // прячем текст
            display.style.opacity = "0";
            // удаляем таймер
            clearInterval(timer);
            if (callback) callback();
        }
    }, 1000);
}
//начало матча
function startMatch() {
    //таймер времени на матч (60сек)
    startTimer(60, "helperRight-timer", null);
    //делаем видимыми
    document.querySelector(".fastMatch-example").style.opacity = "1";
    result.style.opacity = "1";
    inputAnswer.readOnly = false;
    inputAnswer.focus();
    //первые рандомные значения
    fastMatchInstance.randomExample(
        levelOfDifficulty[curVal].from,
        levelOfDifficulty[curVal].to
    );
    allExаmpleCounter = 0;
    correctExаmpleCounter = 0;
}

//нажимаем на кнопку ВЕРНУТЬСЯ К НАСТРОЙКАМ
//возвращаемся к окну с настройками
helperBottom.addEventListener("click", backToSetting);
function backToSetting() {
    stopSetInterval = false;
    //скрытие fastMatch
    fastMatch.classList.add("animate-back-fastMath");
    fastMatch.classList.remove("animate-fastMath");
    //появление настроек
    matchSetting.classList.add("animate-back-setting");
    matchSetting.classList.remove("animate-setting");
}

//FIXME: в переменную display не должно записываться это значение

let display = document.querySelector(".fastMatch-timer p");
//возвращаемся настройки окон
function returnWindowsSetting() {
    //анимация скрытия настроек
    matchSetting.classList.add("animate-setting");
    //убрать анимацию возвращения настроек
    matchSetting.classList.remove("animate-back-setting");
    //вернуть fastMatch в исходное положение
    fastMatch.classList.remove("animate-back-fastMath");
    fastMatch.style.visibility = "hidden";

    //убрать анимацию с helpers
    helperBottom.classList.remove("animate-helperBottom");
    helperLeft.classList.remove("animate-helperLeft");
    helperRight.classList.remove("animate-helperRight");

    //для селектора в setInterval
    stopSetInterval = true;

    //для окошка с fastMatch
    document.querySelector(".fastMatch-example").style.opacity = "0";
    result.style.opacity = "0";
    result.innerHTML = "";
    inputAnswer.readOnly = true;
    inputAnswer.value = "";
    inputAnswer.focus();
    allExаmpleCounter = 0;
    correctExаmpleCounter = 0;
}

class FastMatch {
    // считаем ответ

    answerCounter(randomArifmSign) {
        // answer =
        //     Number.parseInt(firstParam.textContent) +
        //     Number.parseInt(secondParam.textContent);
        answer = eval(
            `Number.parseInt(firstParam.textContent) ${randomArifmSign} Number.parseInt(secondParam.textContent)`
        );
        console.log('ответ выражения  '+ answer)
    }

    //проверяет ответ
    compare(inputAnswerValue) {
        let resultAnswer = true;
        if (inputAnswerValue != answer) {
            resultAnswer = false;
        }
        //считаем статистику за матч
        fastMatchInstance.counterResult(resultAnswer);
        resultAnswer = true;
    }

    //новые слагаемые

    randomExample(from, to) {
        //получаем рандомно арифм знак
        let randomArifmSign =
            arifmSign[Math.floor(Math.random() * arifmSign.length)];
        firstParam.innerHTML =
            Math.floor(Math.random() * (to - from) + from) + `${randomArifmSign}`;
        secondParam.innerHTML =
            Math.floor(Math.random() * (to - from) + from) + " = ";
        fastMatchInstance.answerCounter(randomArifmSign);
    }
    //статистика в переменной result
    counterResult(resultAnswer) {
        if (resultAnswer) {
            correctExаmpleCounter++;
        }
        allExаmpleCounter++;

        result.innerHTML = ` ${correctExаmpleCounter} из ${allExаmpleCounter}`;
    }

    addArifmSign(arg) {
        if (arifmSign.includes(arg)) {
            arifmSign.splice(arifmSign.indexOf(arg), 1);
        } else arifmSign.push(arg);
    }
}
let fastMatchInstance = new FastMatch();
