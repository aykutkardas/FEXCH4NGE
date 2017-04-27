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


}
