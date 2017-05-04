var GameBoard = function (_MAIN) {

    // Ana class a erişim için, diğer class lar arasında iletkenlik sağlayacak.
    this.main = _MAIN;

    // Oyunda bulunan benzersiz itemlerin listesi.
    this.itemList = [];

    // Sanal tahta ve sanal tahta yedeği.
    this.virtualBoard = [];
    this.virtualBoardBackUp = [];

    // Tahtayı -classlarıyla- ızgara halinde alır.
    this.grids = {
        horizon: [],
        vertical: []
    }

    // Tahtayı -indexleriyle- ızgara halinde alır.
    this.gridsIndex = {
        horizon: [],
        vertical: []
    }

    // Izgaraları günceller. Kaynak olarak o an ki sanal tahtayı kullanır.
    this.updateGrids = function () {

        var x = this.main.Board.x;
        var y = this.main.Board.y;

        //        for (var i = 0; i < y; i++) {
        //            this.grids.horizon[i] = [];
        //            this.gridsIndex.horizon[i] = [];
        //            for (var k = (i * x); k < ((i * x) + x); k++) {
        //                this.grids.horizon[i].push(this.virtualBoard[k]);
        //                this.gridsIndex.horizon[i].push(k);
        //            }
        //        }

        for (var i = 0; i < x; i++) {
            this.grids.vertical[i] = [];
            this.gridsIndex.vertical[i] = [];
            for (var k = i; k < (x * y) + i; k += x) {
                this.grids.vertical[i].push(this.virtualBoard[k]);
                this.gridsIndex.vertical[i].push(k);
            }
        }


        for (var i = 0; i < x; i++) {
            this.grids.horizon[i] = [];
            this.gridsIndex.horizon[i] = [];
            for (var j = 0; j < y; j++) {
                this.grids.horizon[i][j] = this.grids.vertical[j][i];
                this.gridsIndex.horizon[i][j] = this.gridsIndex.vertical[j][i];
            }
        }
    }

    // Hareket hafızası, tahtadaki hamleleri anlık olarak tutar.
    this.motionMemory = {}

    // Hareket başlangıcı.
    this.drag = function (e) {

        var targetPos = parseInt(e.target.parentElement.id.slice(1, 100));

        this.motionMemory['FIRST_STEP'] = targetPos;
        this.motionMemory['NEXT_STEP'] = this.main.Positioner.whereCanIGo(targetPos);

        e.dataTransfer.setData("TARGET_ID", e.target.id);


    }

    // Hareket esnası.
    this.sweep = function (e) {

        e.preventDefault();

    }

    // Hareket sonu.
    this.drop = function (e) {

        e.preventDefault();

        // İtemi koyacağım slotun id sini integer olarak tutar.
        var targetPos = parseInt(e.target.parentElement.id.slice(1, 100));

        // İtemi koyacağım slotun idsini adım 2 ye yazar.
        this.motionMemory['SECOND_STEP'] = targetPos;



        // [ HATA: 1 (Aşağı taşınacak.)]

        // Sanal tahtadaki 2. adımın yerindeki classa 1. adımdaki classı yazar.
        this.virtualBoard[this.motionMemory['SECOND_STEP']] = this.virtualBoardBackUp[this.motionMemory['FIRST_STEP']];

        // Sanal tahtadaki 1. adımın motionMemory classa 2. adımdaki classı yazar.
        this.virtualBoard[this.motionMemory['FIRST_STEP']] = this.virtualBoardBackUp[this.motionMemory['SECOND_STEP']];


        // Eğer yapılan hamle, gidilebilecek bir yere yapıldıysa.
        if (this.motionMemory['NEXT_STEP'].indexOf(targetPos) > -1) {

            // 2. adım ve 1. adımı kontrol eder. Herhangi biri kombo sağlıyorsa. İtemlerin yerlerini değiştirir.
            if (
                this.main.Control.isItDone(this.motionMemory['SECOND_STEP']) ||
                this.main.Control.isItDone(this.motionMemory['FIRST_STEP'])
            ) {

                // Yer değiştirme işlemini yap.
                var targetItemID = e.dataTransfer.getData("TARGET_ID");
                e.target.parentElement.appendChild(document.querySelector("#" + targetItemID));

                document.querySelector("#s" + this.motionMemory['FIRST_STEP']).appendChild(e.target);




                this.main.Control.cleanUndefined();

                this.virtualBoardBackUp = this.virtualBoard.concat();

                // Değilse
            } else {

                // Sanal tahtayı eski haline getir.
                this.virtualBoard = this.virtualBoardBackUp.concat();

            }

        }

    }

    // Sanal tahtayı, gerçek tahtayla eşitle.
    this.syncVirtualBoard = function () {

        var items = document.querySelectorAll('.item');
        for (var i = 0; i < items.length; i++) {
            this.virtualBoard.push(items[i].getAttribute('class').split(' ')[1]);
        }
        this.virtualBoardBackUp = this.virtualBoard.concat();

    }

    // Gerçek tahtayı, sanal tahtayla eşitle.
    this.syncRealBoard = function () {

        var items = document.querySelectorAll('.item');
        for (var i = 0; i < items.length; i++) {
            items[i].setAttribute('class', 'item ' + this.virtualBoard[i]);
        }

    }

    // Oyun tahtası oluşturma fonksiyonu.
    this.createBoard = function (_CONF) {


        var conf = {
            x: _CONF.x || 5,
            y: _CONF.y || 5,
            typeSize: _CONF.typeSize || 5,
            target: _CONF.target || "body",
            item: {
                width: _CONF.item.width,
                height: _CONF.item.height
            }
        }

        this.x = _CONF.x;
        this.y = _CONF.y;


        for (var i = 0; i < _CONF.typeSize; i++) {
            this.itemList.push('g-item' + i);
        }

        var board = document.createElement('div');

        board.id = "board";
        board.style.width = _CONF.x * _CONF.item.width;
        board.style.height = _CONF.y * _CONF.item.height;
        document.querySelector(_CONF.target).appendChild(board);


        for (var i = 0; i < (_CONF.x * _CONF.y); i++) {

            var slot = document.createElement('div');
            slot.id = "s" + i;
            slot.className = "slot";
            slot.style.width = _CONF.item.width;
            slot.style.height = _CONF.item.height;
            document.querySelector("#board").appendChild(slot);

        }


        for (var i = 0; i < (_CONF.x * _CONF.y); i++) {

            var randomClassName = this.itemList[random(0, this.itemList.length)];
            var itemTemplate = "<div class='item " + randomClassName + "' id='item" + i + "'>.</div>";
            document.querySelector("#s" + i).innerHTML = itemTemplate;
        }

        _('.item')
            .css({
                width: _CONF.item.width,
                height: _CONF.item.height
            })
            .attr("draggable", "true")
            .attr("ondragstart", this.main.name + ".Board.drag(event)");

        _('.slot')
            .attr('ondrop', this.main.name + '.Board.drop(event)')
            .attr('ondragover', this.main.name + '.Board.sweep(event)');

        this.main.Positioner.x = _CONF.x;
        this.main.Positioner.y = _CONF.y;
        this.main.Positioner.createPosition();
        this.syncVirtualBoard();
        this.updateGrids();

        this.main.Control.cleanUndefined();


    }


    this.updateVirtualBoard = function () {
        var a = this.gridsIndex['horizon'];

        for (var i = 0; i < a.length; i++) {
            for (j = 0; j < a[i].length; j++) {

                this.main.Board.virtualBoard[a[i][j]] = this.grids['horizon'][i][j];



            }
        }

        this.virtualBoardBackUp = this.virtualBoard.concat();
    }

}
