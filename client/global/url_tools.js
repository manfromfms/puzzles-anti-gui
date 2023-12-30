const query = new URLSearchParams(window.location.search);
const path = window.location.pathname;
const path_array = path.split("/").filter(Boolean);

var puzzleId = -1
if(path_array.length > 0){
    if(path_array[0] === 'puzzle' && path_array.length === 2) {
        puzzleId = path_array[1]
    }
}
