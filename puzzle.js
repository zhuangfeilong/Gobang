var time = 0;
var pause = true;
var set_timer;
var v = new Array(10);
var v_XY = new Array(
  [0],
  [0, 0],
  [150, 0],
  [300, 0],
  [0, 150],
  [150, 150],
  [300, 150],
  [0, 300],
  [150, 300],
  [300, 300]
);
var v_Direct = new Array(
  [0],
  [2, 4],
  [1, 3, 5],
  [2, 6],
  [1, 5, 7],
  [2, 4, 6, 8],
  [3, 5, 9],
  [4, 8],
  [5, 7, 9],
  [6, 8]
);
v[1]=01;v[2]=02;v[3]=03;v[4]=04;v[5]=05;v[6]=06;v[7]=07;v[8]=08;v[9]=0;
function move(id) {
  for(var i=0; i < 9; i++) {
    if(v[i] == id)
      break;
  }
  var blank_target = 0;
  blank_target = whereGo(i);
  if (blank_target != 0) {
    v[i] = 0;
    v[blank_target] = id;
    document.getElementById("d"+id).style.left = v_XY[blank_target][0] + "px";
    document.getElementById("d"+id).style.top = v_XY[blank_target][1] + "px";
  }
  var gameover = true;
  for(var j=1; j<9; j++) {
    if(v[j] != j) {
      gameover = false;
      break;
    }
  }
  if(gameover = true) {
    if(!pause) {
      start();
      alert("Congratulation,Good Job!");
    }
  }
}
function whereGo(cur_div) {
  var k=0;
  var moveChange = false;
  for(k=0; k<v_Direct[cur_div].length; k++) {
    if(v[v_Direct[cur_div][k]] == 0) {
      moveChange = true;
      break;
    }
  }
  if(moveChange == true) {
    return v_Direct[cur_div][k];
  } else {
    return 0;
  }
}
function alltime() {
  time += 1;
  var min = parseInt(time/60);
  var sec = time%60;
  document.getElementById("alltime").innerHTML = min + "分" + sec +"秒";
}
function start() {
  if(pause) {
    document.getElementById("start").innerHTML = "暂停";
    pause = false;
    set_timer = setInterval(time, 1000);
  } else {
    document.getElementById("start").innerHTML = "开始";
    pause = true;
    clearInterval(set_timer);
  }
}
function reset() {
  time = 0;
  random_v();
  if(pause) {
    start();
  }
}
function random_v() {
  for(var i=1; i<9; i++) {
    var go = parseInt(Math.random()*(i-1) + 1);
    if(v[i] != 0) {
      document.getElementById("d" + v[i]).style.left = v_XY[go][0] + "px";
      document.getElementById("d" + v[i]).style.top = v_XY[go][1] + "px";      
    }
    if(v[go] != 0) {
      document.getElementById("d" + v[go]).style.left = v_XY[i][0] + "px";
      document.getElementById("d" + v[go]).style.top = v_XY[i][1] + "px";      
    }
    var temp = v[go];
    v[go] = v[i];
    v[i] = temp;
  }
}
window.onload = function() {
  reset();
}