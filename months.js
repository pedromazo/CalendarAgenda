function monthProperties(mes) {
    const properties = {}
    switch(mes) {
        case(1):
            properties.mes = 'Janeiro';
            properties.dia1= 'Sexta';
            properties.totalDias= '31';
            return properties;
            break;
        case(2):
            mes = 'Fevereiro';
            dia1= 'Segunda';
            totalDias= '28';
            return {mes, totalDias, dia1};
            break;  
        case(3):
            mes = 'Março';
            dia1= 'Segunda';
            totalDias= '31';
            return {mes, totalDias, dia1};
            break;
        case(4):
            mes = 'Abril';
            dia1= 'Quinta';
            totalDias= '30';
            return {mes, totalDias, dia1};
            break;
        case(5):
            mes = 'Maio';
            dia1= 'Sábado';
            totalDias= '31';
            return {mes, totalDias, dia1};
            break;
        case(6):
            mes = 'Junho';
            dia1= 'Terça';
            totalDias= '30';
            return {mes, totalDias, dia1};
            break;
        case(7):
            mes = 'Julho';
            dia1= 'Quinta';
            totalDias= '31';
            return {mes, totalDias, dia1};
            break;
        case(8):
            mes = 'Agosto';
            dia1= 'Domingo';
            totalDias= '31';
            return {mes, totalDias, dia1};
            break;
        case(9):
            mes = 'Setembro';
            dia1= 'Quarta';
            totalDias= '30';
            return {mes, totalDias, dia1};
            break;
        case(10):
            mes = 'Outubro';
            dia1= 'Sexta';
            totalDias= '31';
            return {mes, totalDias, dia1};
            break;
        case(11):
            mes = 'Novembro';
            dia1= 'Segunda';
            totalDias= '30';
            return {mes, totalDias, dia1};
            break;
        case(12):
            mes = 'Dezembro';
            dia1= 'Quarta';
            totalDias= '31';
            return {mes, totalDias, dia1};
            break;
    }
return dia1, totalDias }

// let mes = 9;
// propMon = monthProperties(mes);
// console.log(propMon)
module.exports.monthProperties