function GameSimulation(_MAIN) {

  this.main = _MAIN;

  this.framePage = 0;

  this.playRecord = function (speed, loop) {

    if(this.framePage < this.main.Control.frameStorage.length) {

      this.projection();
      _('.Projection-Page').html(this.framePage+'/'+this.main.Control.frameStorage.length-1);
      ++this.framePage;

      setTimeout('app.Simulation.playRecord('+speed+','+loop+');', 500);
    } else {
      if(true === loop){
        this.framePage = 0;
      }
    }

  }

  this.projection = function () {

    var config = {
      x : this.main.Board.x,
      y : this.main.Board.y,
      itemList : this.main.Control.frameStorage[this.framePage],
      target : '.Projection-Board',
      item : {
        width : 20,
        height : 20
      }
    }

    var projection = document.createElement('div');

    projection.id = "projection"+0;
    projection.style.width = config.x * config.item.width;
    projection.style.height = config.y * config.item.height;
    document.querySelector(config.target).appendChild(projection);


    for (var i = 0; i < (config.x * config.y); i++) {

        var slot = document.createElement('div');
        slot.id = "projection-slot" + i;
        slot.className = "slot";
        slot.style.width = config.item.width;
        slot.style.height = config.item.height;
        document.querySelector("#"+projection.id).appendChild(slot);

    }


    for (var i = 0; i < (config.x * config.y); i++) {

        var itemName = config.itemList[i];
        var itemTemplate = "<div class='item " + itemName + "' id='item" + i + "'>.</div>";
        document.querySelector("#"+projection.id+" #projection-slot" + i).innerHTML = itemTemplate;

    }


  }


}
