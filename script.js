const n=10;
const array=[];

init();

function init(){
    for(let i=0;i<n;i++){
        array[i]=Math.random();
    }
    showBars();
}

function play(){
    const copy=[...array];
   const moves= bubbleSort(copy);
    animate(moves);
}

function animate(moves){
 if(moves.length==0){
    showBars();
    return;
 }
 const move=moves.shift(); //shift removes the first element from the array & assign it to i,j
 const[i,j]=move.indices; 

 if(move.type=='swap'){
    [array[i],array[j]]=[array[j],array[i]]; //swap the elements
 }
  //
  showBars(move);  //to show emphasis on the bars being swapped
  setTimeout(function(){
    animate(moves);
  },1000);
}
 
function bubbleSort(array){
    const moves=[];  //to keep track of the moves for animation
    do{
        var swapped=false;
        for(let i=0;i<n-1;i++){
            moves.push({indices:[i,i+1],type:'comp'}); //this tells what type of indices are being compared.
            if(array[i]>array[i+1]){
                moves.push({indices:[i,i+1],type:'swap'}); //this tells what type of indices are being swapped.
                const temp=array[i];
                array[i]=array[i+1];
                array[i+1]=temp;
                swapped=true;
            }
        }
    }while(swapped);
    return moves;
}


function showBars(move){
    container.innerHTML="";
    for(let i=0;i<n;i++){
    const bar=document.createElement('div');
    bar.style.height=array[i]*100+"%";
    bar.classList.add('bar');
    if(move && move.indices.includes(i)){
        bar.style.backgroundColor="purple";
        move.type=='swap'?'purple':'blue'; //if move is swap return seaGreen else purple
    }
    container.appendChild(bar);
 }}
