const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 120;
const currentFrame = index => (
  `http://127.0.0.1:5500/videoimg/${index.toString().padStart(4, '0')}.jpg`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=1920;
canvas.height=1080;
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()

/* $(window).scroll(function(){ 

var a = 2000;
var pos = $(window).scrollTop();
if(pos > a) {
    $("#hero-lightpass").css({
                position: 'static'
            });
}
else {
    $("#hero-lightpass").css({
                position: 'fixed',
            });
}
}); */

$(window).scroll(function(){ 

  var a = 1000;
  var pos = $(window).scrollTop();
  if(pos > a) {
      $("header").css({
                  position: 'static'
              });
  }
  else {
      $("header").css({
                  position: 'fixed',
              });
  }
  });

$(window).scroll(function(){
  $(".icon-scroll").css("opacity", 1 - $(window).scrollTop() / 10);
});

$(window).scroll(function(){
  $("#brandname").css("opacity", 1 - $(window).scrollTop() / 100);
});

$(window).scroll(function(){
  $(".sticky").css("opacity", 0 + $(window).scrollTop() / 100);
});

$(window).scroll(function(){
  $("#brandname").css("font-size", 100 - $(window).scrollTop() / 10);
});