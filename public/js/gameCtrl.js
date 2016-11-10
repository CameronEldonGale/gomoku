angular.module('gomoku').controller('gameCtrl', function($scope,$state){
  $scope.test = "game controll thing";
  (function(){
          // var testArray =[];
          var gameboard = Array(19).fill("empty").map(function(row){
            return Array(19).fill(0)
          })
        var player = 1;
        var color = 'radial-gradient(circle at 33% 33%, #777777, #000)';
        var board = document.getElementsByClassName('gameboard')
        var width = board[0].getBoundingClientRect().width
        board[0].style.height = width + 'px';
        window.addEventListener('resize', function(){
          var board = document.getElementsByClassName('gameboard')
          var width = board[0].getBoundingClientRect().width
          board[0].style.height = width + 'px';
        })
        document.getElementById('black').onclick = function(){
          color = 'radial-gradient(circle at 33% 33%, #777777, black)'
          player = 1;
        }
        document.getElementById('white').onclick = function(){
          color = 'radial-gradient(circle at 33% 33%, white, #757575)'
          player = 2
        }
        function checkBoard(gameBoard){
          var lines2check = [];
          var rows = gameBoard.map(function(row){
             return row.join('')
          })
          var columns = gameBoard.map(function(row, index){
            return addColumn(index)
          })

          function addColumn(n){
            var column = ""
            for (var i = 0; i < 19; i++) {
              column += gameBoard[i][n]
            }
            return column
          }
          function addNegDiagonalLine(row, cell){
            var diagonal = ""
            while(row < 19 && cell < 19){
              diagonal += gameBoard[row][cell]
              row++
              cell++
            }
            return diagonal
          }
          function addPosDiagonalLine(row, cell){
            var startingRow = row +1
            var diagonal = ""
            while(cell !== startingRow) {
              diagonal += gameBoard[row][cell]
              row--
              cell++
            }
            return diagonal
          }
          var diagonals = [];
          function addTopNegDiag(){
            for (var i = 14; i >= 1 ; i--) {
              diagonals.push(addNegDiagonalLine(0, i))
            }
          }
          function addBottomNegDiag(){
            for (var i = 0; i < 15; i++) {
              diagonals.push(addNegDiagonalLine(i, 0))
            }
          }
          function addTopPosDiag() {
            for (var i = 4; i < 19; i++) {
              diagonals.push(addPosDiagonalLine(i, 0))
            }
          }
          function addBottomPosDiag() {
            for (var i = 1; i <= 14; i++) {
              diagonals.push(addPosDiagonalLine(18,i))
            }
          }
          addTopNegDiag();
          addBottomNegDiag()
          addTopPosDiag()
          addBottomPosDiag()
          lines2check = lines2check.concat(rows).concat(columns).concat(diagonals)
          var flag= 'none';
          lines2check.forEach(function(line){
            if ((/1{5}/g).test(line)) {
              flag = "1"
            }
            if ((/2{5}/g).test(line)) {
              flag = "2"
            }
          })
          return flag
        }
        var cells = [...document.getElementsByClassName('cell')]
        cells.forEach(function(cell){
          cell.onclick = function(cell){
            var id;
            if (cell.toElement.children.length > 0) {
              id = cell.toElement.children[0].id
            }
            if (cell.toElement.id) {
              id = cell.toElement.id
            }
            var playedCell = id.match(/\d+/g);
            // testArray.push([playedCell[1], playedCell[0]])
            if (gameboard[ playedCell[1] ][ playedCell[0] ] === 0) {
              gameboard[ playedCell[1] ][ playedCell[0] ] = player;
              document.getElementById(id).style.display = 'inherit'
              document.getElementById(id).style.background = color;
              document.getElementById(id).style.border = 'none';
              var win = checkBoard(gameboard)
              if(win === '1' || win === '2'){
                gameboard = gameboard = Array(19).fill("empty").map(function(row){
                  return Array(19).fill(0)
                })
                alert("player "+win+" won")
                $state.go('chat')
                var pieces = [...document.getElementsByClassName('piece')]
                pieces.forEach(function(piece){
                  piece.style.display = 'none'
                })
              }
            }

          }
        })
  })()


})
