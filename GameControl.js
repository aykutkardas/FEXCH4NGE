var GameControl = function (_MAIN) {

    // Ana class a erişim için, diğer class lar arasında iletkenlik sağlayacak.
    this.main = _MAIN;

    // Verilen indexin yatay ve dikey de hangi ızgaralarda olduğunu obje olarak döner.
    this.inGrid = function (index) {

        var inGrid = {}

        for (var i = 0; i < this.main.Board.gridsIndex.horizon.length; i++) {

            var result = this.main.Board.gridsIndex.horizon[i].indexOf(index);
            if (result > -1) {
                inGrid.horizon = this.main.Board.gridsIndex.horizon[i];
            }

        }

        for (var i = 0; i < this.main.Board.gridsIndex.vertical.length; i++) {

            var result = this.main.Board.gridsIndex.vertical[i].indexOf(index);
            if (result > -1) {
                inGrid.vertical = this.main.Board.gridsIndex.vertical[i];
            }

        }

        return inGrid;

    }

    // Verilen indexin 3 lü kombinasyonlarını getirir.
    this.getTriple = function (index) {

        // Verilen indexin kesinşen ızgaralarda kaçıncı sırada olduğunu verir.
        var indexHorizon = this.inGrid(index).horizon.indexOf(index);
        var indexVertical = this.inGrid(index).vertical.indexOf(index);


        var tripleList = [[], [], [], [], [], []];

        for (var i = indexHorizon; i > indexHorizon - 3; i--) {
            tripleList[0].push(this.inGrid(index).horizon[i]);
        }

        for (var i = indexHorizon; i < indexHorizon + 3; i++) {
            tripleList[1].push(this.inGrid(index).horizon[i]);
        }

        for (var i = indexVertical; i > indexVertical - 3; i--) {
            tripleList[2].push(this.inGrid(index).vertical[i]);
        }

        for (var i = indexVertical; i < indexVertical + 3; i++) {
            tripleList[3].push(this.inGrid(index).vertical[i]);
        }

        for (var i = indexHorizon - 1; i < indexHorizon + 2; i++) {
            tripleList[4].push(this.inGrid(index).horizon[i]);
        }

        for (var i = indexVertical - 1; i < indexVertical + 2; i++) {
            tripleList[5].push(this.inGrid(index).vertical[i]);
        }

        return tripleList;
    }

    // Başarılı bir hamle yapılıp yapılmadığını kontrol eder.
    this.isItDone = function (index) {

        // Hedef classı target değişkenine atar.
        var target = this.main.Board.virtualBoard[index];

        // 3 lü kombinasyonları
        var triple = this.getTriple(index);


        for (var i = 0; i < triple.length; i++) {

            // Kontrol hafızası
            var controlMemory = [];

            for (var j = 0; j < triple[i].length; j++) {

                // Kombinasyonda sıradaki eleman duvara denk gelmiyorsa
                if (undefined !== triple[i][j]) {

                    // Aldığı item classlarını kontrol hafızasına kaydeder.
                    // Hafıza genelde 1 ile 3 arasında item barındırır.
                    if (triple[i][j] === index) {
                        var tempItem = this.main.Board.virtualBoard[index];
                    } else {
                        var tempItem = this.main.Board.virtualBoard[triple[i][j]];
                    }
                    controlMemory.push(tempItem);

                }


            }

            // Hafızada ki elemanların sayılarını obje olarak döner.
            var result = controlMemory.count();
            // Hedef class, dönen obje de 3 adet varsa fonksiyon true döner ve döngüden çıkar.
            if (result[target] === 3) {
                return true;
                break;
            }

        }

        // Eğer hiç 3 lü eşleşme yoksa false döner.
        return false;

    }

    this.boardAnalyze = function () {

        this.main.Board.updateGrids();

        var a = this.main.Board.grids.horizon;
        var aIndex = this.main.Board.gridsIndex.horizon;


        // [NOTE: DONGULER DEĞİŞTİRİLECEK!].

        var boardStatus = false;

        for (var i = 0; i < a.length; i++) {
            for (j = 0; j < a[i].length; j++) {

                if (a[i][j] == a[i][j + 1] && a[i][j + 1] == a[i][j + 2]) {


                    boardStatus = true;
                    this.main.Board.virtualBoard[aIndex[i][j]] = undefined;
                    this.main.Board.virtualBoard[aIndex[i][j + 1]] = undefined;
                    this.main.Board.virtualBoard[aIndex[i][j + 2]] = undefined;
                }


            }
        }

        var b = this.main.Board.grids.vertical;
        var bIndex = this.main.Board.gridsIndex.vertical;


        for (var i = 0; i < b.length; i++) {

            for (var j = 0; j < b[i].length; j++) {


                if (b[i][j] == b[i][j + 1] && b[i][j + 1] == b[i][j + 2]) {
                    boardStatus = true;


                    this.main.Board.virtualBoard[bIndex[i][j]] = undefined;
                    this.main.Board.virtualBoard[bIndex[i][j + 1]] = undefined;
                    this.main.Board.virtualBoard[bIndex[i][j + 2]] = undefined;
                }

            }
        }




        this.main.Board.syncRealBoard();

        if(boardStatus) {
          this.frameStorage.push(this.main.Board.virtualBoard);
        }

        return boardStatus;



    }

    this.frameStorage = [];

    this.isThereEmpty = function () {

        this.main.Board.updateGrids();
        //        var tempGrid = [];
        var emptySlot = 0;



        do {

            for (var i = 0; i < this.main.Board.y; i++) {

                for (var k = 0; k < this.main.Board.x; k++) {
                    if (this.main.Board.grids.horizon[i][k] == undefined) {
                        if (i == 0) {

                            var yeni = this.main.Board.itemList.getRand();
                            this.main.Board.grids.horizon[i][k] = yeni;

                            // this.main.Board.updateVirtualBoard();




                        } else {
                            this.main.Board.grids.horizon[i][k] = this.main.Board.grids.horizon[i - 1][k];
                            this.main.Board.grids.horizon[i - 1][k] = undefined;

                            // this.main.Board.updateVirtualBoard();


                        }

                        this.main.Board.updateVirtualBoard();
                        this.frameStorage.push(this.main.Board.virtualBoard);

                    }
                }

                //				for (var x = 0; x < this.main.Board.grids.horizon.length; x++) {
                //					temmpGrid = tempGrid.concat(this.main.Board.grids.horizon[x]);
                //				}
                //				this.main.Board.virtualBoard = tempGrid;
            }


            for (var q = 0; q < this.main.Board.grids.horizon.length; q++) {


                if (this.main.Board.grids.horizon[q].count()[undefined] > 0) {
                    emptySlot = 1;
                    break;
                } else {

                    var horizonRow = this.main.Board.grids.horizon;
                    var tempHorizon = [];
                    for (var l = 0; l < horizonRow.length; l++) {
                        tempHorizon = tempHorizon.concat(horizonRow[l]);
                    }

                    this.main.Board.virtualBoard = tempHorizon;


                    // this.main.Board.updateVirtualBoard();
                    this.main.Board.virtualBoardBackUp = this.main.Board.virtualBoard.concat();
                    emptySlot = 0;


                }

            }


        } while (emptySlot != 0);

        this.main.Board.syncRealBoard();
    }

    this.cleanUndefined = function () {
        this.frameStorage.push(this.main.Board.virtualBoard);

        while (this.boardAnalyze() === true) {
            this.isThereEmpty();
        };

        for(var i = 0; i < this.frameStorage.length; i++){

          if(this.frameStorage[i] === this.frameStorage[i+1]){
          	this.frameStorage.splice(i,1);
          }

        }


    }
}
