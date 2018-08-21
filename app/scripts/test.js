/*
 se X = 2 e Y =3
 [] : 0,0,0
 [1] : 0,0,1
 [1,2] : 1,0,1
 [1,2,3,4] : 2,1,1
*/

let x=2;
let y=3;
let array=[1,2,3,4];
let countX = 0;
let countY = 0;
let countXnorY = 0;

for(let i=0;i<array.length;i++){
    //verifica se a sobra da divisao o valor por x é igual a 0 (item mod x)
    if(array[i]%x === 0){
        countX++;
    }
    //verifica se a sobra da divisao o valor por y é igual a 0 (item mod y)
    else if(array[i]%y === 0){
        countY++;
    }
    //se nao for divisivel por nenhum numero listado, incrementa o contador
    else{
        countXnorY++;
    }
}

console.log('Quantidade de numeros divisiveis por' +x+': '+countX);
console.log('Quantidade de numeros divisiveis por' +y+': '+countY);
console.log('Quantidade de numeros divisiveis nem por' +x+' ou por '+y+': '+countXnorY);