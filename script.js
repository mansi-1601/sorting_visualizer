// 




let n = 10;
let array = [];
let speed = 1000;

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('container');
    init();

    function init(){
        n = parseInt(document.getElementById('arraySize').value) || 10;
        speed = parseInt(document.getElementById('speed').value) || 1000;
        generateArray();
        showBars();
    }

    function generateArray() {
        array = Array.from({ length: n }, () => Math.random());
    }

    function play(){
        const copy = [...array];
        const moves = bubbleSort(copy);
        animate(moves);
    }

    function animate(moves){
        if (moves.length === 0) {
            showBars();
            return;
        }
        const move = moves.shift();
        const [i, j] = move.indices;

        if (move.type === 'swap') {
            [array[i], array[j]] = [array[j], array[i]];
        }
        showBars(move);
        setTimeout(function(){
            animate(moves);
        }, speed);
    }

    function bubbleSort(array){
        const moves = [];
        do {
            var swapped = false;
            for (let i = 0; i < n - 1; i++) {
                moves.push({ indices: [i, i + 1], type: 'comp' });
                if (array[i] > array[i + 1]) {
                    moves.push({ indices: [i, i + 1], type: 'swap' });
                    [array[i], array[i + 1]] = [array[i + 1], array[i]];
                    swapped = true;
                }
            }
        } while (swapped);
        return moves;
    }

    function showBars(move){
        container.innerHTML = "";
        for (let i = 0; i < n; i++) {
            const bar = document.createElement('div');
            bar.style.height = (array[i] * 100) + "%";
            bar.classList.add('bar');
            if (move && move.indices.includes(i)) {
                bar.style.backgroundColor = move.type === 'swap' ? 'purple' : 'blue';
            }
            container.appendChild(bar);
        }
    }

    // Attach event listeners to the buttons
    document.getElementById('initBtn').addEventListener('click', init);
    document.getElementById('playBtn').addEventListener('click', play);
});
