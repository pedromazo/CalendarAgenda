function monthProperties(mes) {
    const properties = {}
    switch(mes) {
        case(1):
            properties.mes = 'Janeiro';
            properties.blankSpaces = 5
            properties.totalDias= 31;
            return properties;
            break;
        case(2):
            properties.mes = 'Fevereiro';
            properties.blankSpaces = 1
            properties.totalDias= 28;
            return properties;
            break;  
        case(3):
            properties.mes = 'Março';
            properties.blankSpaces = 1
            properties.totalDias= 31;
            return properties;
            break;
        case(4):
            properties.mes = 'Abril';
            properties.blankSpaces = 4;
            properties.totalDias= 30;
            return properties;
            break;
        case(5):
            properties.mes = 'Maio';
            properties.blankSpaces = 6;
            properties.totalDias= 31;
            return properties;
            break;
        case(6):
            properties.mes = 'Junho';
            properties.blankSpaces = 2;
            properties.totalDias= 30;
            return properties;
            break;
        case(7):
            properties.mes = 'Julho';
            properties.blankSpaces = 4;
            properties.totalDias= 31;
            return properties;
            break;
        case(8):
            properties.mes = 'Agosto';
            properties.blankSpaces = 0;
            properties.totalDias= 31;
            return properties;
            break;
        case(9):
            properties.mes = 'Setembro';
            properties.blankSpaces = 3;
            properties.totalDias= 30;
            return properties;
            break;
        case(10):
            properties.mes = 'Outubro';
            properties.blankSpaces = 5;
            properties.totalDias= 31;
            return properties;
            break;
        case(11):
            properties.mes = 'Novembro';
            properties.blankSpaces = 1;
            properties.totalDias= 30;
            return properties;
            break;
        case(12):
            properties.mes = 'Dezembro';
            properties.blankSpaces = 3;
            properties.totalDias= 31;
            return properties;
            break;
    }
}

const dias = document.querySelectorAll('#dia');
const blankDays = document.querySelectorAll('.blankSpace')
let now = new Date(Date.now());
let year = now.getFullYear();
let month = now.getMonth()+1; //getMonth começa no zero
const minus = document.querySelector('#minusMonth');
const plus = document.querySelector('#plusMonth');
const selectedMonth = document.querySelector('#selectedMonth');
const selectedYear = document.querySelector('#selectedYear');
let properties = monthProperties(month)

minus.onclick = () => {
    month-=1;
    if(month === 0) {
        month = 12;
        year -= 1;
    };
    properties = monthProperties(month);
    selectedMonth.innerText = properties.mes;
    selectedYear.innerText = year;

    for (let blank of blankDays){blank.id= 'diaVazio'};
    for(let j=0;j<properties.blankSpaces;j++) {blankDays[j].id='blankSpace'};

    for (let dia of dias) {
        if(dia.innerText == now.getDate()) {dia.className="hoje"};
        for(let j = 29; j<=properties.totalDias; j++){
            if(dia.innerText==j){dia.id="dia"}}
        for (let j = 31; j>properties.totalDias;j--){
            if(dia.innerText==j){dia.id="diaVazio"}
        }

        //     if(dia.innerText==j){dia.id="diaVazio"} else if(dia.innerText!=j){dia.id="dia"}
        }
}

plus.onclick = () => {
    month+=1;
    if(month === 13) {
        month = 1;
        year += 1;
    };
    properties = monthProperties(month);
    selectedMonth.innerText = properties.mes
    selectedYear.innerText = year;

    diaMax = properties.totalDias;

    for (let blank of blankDays){blank.id= 'diaVazio'};
    for(let j=0;j<properties.blankSpaces;j++) {blankDays[j].id='blankSpace'};

    for (let dia of dias) {
        if(dia.innerText == now.getDate()) {dia.className="hoje"};
        for(let j = 29; j <= diaMax; j++){
            if(dia.innerText==j){dia.id="dia"}}
        for (let j = 31; j > diaMax;j--){
            if(dia.innerText==j){dia.id="diaVazio"}
        }}
}


for (let dia of dias) {
    if(dia.innerText == now.getDate()) {dia.className="hoje"};
    // for(let j = 31; j>=properties.totalDias; j--){
    //     if(dia.innerText==j){dia.id="diaVazio"} else {dia.id="dia"}
    // }

    dia.onclick = function () {
            let searchParams = new URLSearchParams(window.location.search);
            searchParams.set("day", dia.innerText);
            searchParams.set("month", month);
            searchParams.set("year", year);
            window.location.search = searchParams.toString();
            console.log(dia)
    }
};



