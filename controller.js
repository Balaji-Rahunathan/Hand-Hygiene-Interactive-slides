var slideIndex = 10;
showDivs(slideIndex);

function plusDivs(n) {  
    var resetdiv = document.getElementById("rightImage"+slideIndex);
    if(resetdiv){
        resetdiv.appendChild(document.getElementById("draggable"+slideIndex));
        target = document.getElementById("draggable"+slideIndex);
        target.style.top = 0
        target.style.left = 0
        target.style.right = 0
        target.style.bottom = 0
        target.style.opacity=1
    }
    showDivs(slideIndex += n);
    $("html, body").animate({ scrollTop: 0 },100);
    reset()
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("slideContainer");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "flex";  


$("#draggable"+slideIndex).draggable({
    stop: function (event, ui) {
        var target = document.getElementById("draggable"+slideIndex);
        target.style.top = 0
        target.style.left = 0
        target.style.right = 0
        target.style.bottom = 0
        target.style.opacity=1
    },
    drag: function (event, ui) {
        var target = document.getElementById("draggable"+slideIndex);
        target.style.opacity=1;
    }
});


$("#drop-target"+slideIndex).droppable({
    drop: function (event, ui) {
        var target = document.getElementById("draggable"+slideIndex);
        event.target.appendChild(document.getElementById("draggable"+slideIndex));
        // target.style.top = 0
        // target.style.left = 0
        // target.style.right = 0
        // target.style.bottom = 0
        target.style.display="none"
        // document.getElementById("next"+slideIndex).style.display = "block";
        document.getElementById("video"+slideIndex).style.display = "block";
        document.getElementById("drag-container"+slideIndex).style.display ="none"
        document.getElementById("player"+slideIndex).play()
        document.getElementById("next"+slideIndex).style.display = "block"

    }
});

$("#drag-target"+slideIndex).droppable({
    drop: function (event, ui) {
        var target = document.getElementById("draggable"+slideIndex)
        event.target.appendChild(document.getElementById("draggable"+slideIndex))
        target.style.top = 0
        target.style.left = 0
        target.style.right = 0
        target.style.bottom = 0
        target.style.opacity=1
        document.getElementById("video"+slideIndex).style.display = "none";

        // document.getElementById("next"+slideIndex).style.display = "none";
    }
});

}

function reset() {
    if(document.getElementById("next"+slideIndex))
    {
        document.getElementById("next"+slideIndex).style.display = "none";
    }
}

function toggle(event){
    var str 

    if(event.target.id.includes("f"))
    {
         document.getElementById(event.target.id).className = "true" 
         str = event.target.id;
         var value = str.replace("f","t");
         document.getElementById(value).className = "false" 
    }
    else{
        document.getElementById(event.target.id).className = "true" 
        str = event.target.id;
        var value = str.replace("t","f");
        document.getElementById(value).className = "false" 

    }

    var q1 = document.getElementById("q1t").className
    var q2 = document.getElementById("q2t").className
    var q3 = document.getElementById("q3f").className

    if(q1=="true"&&q2=="true"&&q3=="true")
    {
        document.getElementById("answer").innerHTML = "Complete "
        // answer()
        // loop();
    }
    else{
        document.getElementById("answer").innerHTML = "Not Sure Go back and check again"
    }
}

function answer(){
    var q1 = document.getElementById("q1t").className
    var q2 = document.getElementById("q2t").className
    var q3 = document.getElementById("q3f").className

    if(q1=="true"&&q2=="true"&&q3=="true")
    {
        document.getElementById("answer").onclick = Complete()
    }
    else{
        document.getElementById("answer").onclick = ResetAnswer()
    }

    // if()
    // plusDivs(-10)
}

function Complete() {
    loop();
    plusDivs(1);
}

function ResetAnswer() {
  plusDivs(-13)
  document.getElementById("q1t").className = false
  document.getElementById("q2t").className = false
  document.getElementById("q3t").className = false
  document.getElementById("q1f").className = false
  document.getElementById("q2f").className = false
  document.getElementById("q3f").className = false
  document.getElementById("answer").onclick = answer()
  
}


///Loading Animation
// document.onreadystatechange = function () {
//   var state = document.readyState
//   if (state == 'interactive') {
//        document.getElementById('mainContainer').style.visibility="hidden";
//   } else if (state == 'complete') {
//       setTimeout(function(){
//          document.getElementById('interactive');
//          document.getElementById('load').style.visibility="hidden";
//          document.getElementById('mainContainer').style.visibility="visible";
//       },1000);
//   }
// }

////confetti animation

const canvasEl = document.querySelector('#canvas');

const w = canvasEl.width = window.innerWidth;
const h = canvasEl.height = window.innerHeight * 2;

function loop() {
  requestAnimationFrame(loop);
	ctx.clearRect(0,0,w,h);
  
  confs.forEach((conf) => {
    conf.update();
    conf.draw();
  })
}

function Confetti () {
  //construct confetti
  const colours = ['#fde132', '#009bde', '#ff6b00',"#0bda8f"];
  
  this.x = Math.round(Math.random() * w);
  this.y = Math.round(Math.random() * h)-(h/2);
  this.rotation = Math.random()*360;

  const size = Math.random()*(w/60);
  this.size = size < 15 ? 15 : size;

  this.color = colours[Math.floor(colours.length * Math.random())];

  this.speed = this.size/7;
  
  this.opacity = Math.random();

  this.shiftDirection = Math.random() > 0.5 ? 1 : -1;
}

Confetti.prototype.border = function() {
  if (this.y >= h) {
    this.y = h;
  }
}

Confetti.prototype.update = function() {
  this.y += this.speed;
  
  if (this.y <= h) {
    this.x += this.shiftDirection/3;
    this.rotation += this.shiftDirection*this.speed/100;
  }

  if (this.y > h) this.border();
};

Confetti.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, this.rotation, this.rotation+(Math.PI/2));
  ctx.lineTo(this.x, this.y);
  ctx.closePath();
  ctx.globalAlpha = this.opacity;
  ctx.fillStyle = this.color;
  ctx.fill();
};

const ctx = canvasEl.getContext('2d');
const confNum = Math.floor(w / 4);
const confs = new Array(confNum).fill().map(_ => new Confetti());

// loop();


console.log(navigator);
