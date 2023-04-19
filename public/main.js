const html = document.documentElement;
// const canvas = document.getElementById("hero-lightpass");
// const context = canvas.getContext("2d");
const fakeScroll = document.getElementById("hero-fake-scroll");
const fakeScrollHeight = fakeScroll.getBoundingClientRect().height;
console.log(fakeScrollHeight);

const frameCount = 120;

const preloadImages = () => {
  const images = [];

  for (let i = 1; i <= frameCount; i++) {
    const src = `/public/videoimg/${i.toString().padStart(4, "0")}.jpg`;
    const img = new Image();
    img.src = src;
    images.push(img);
  }

  return images;
};

let images = preloadImages();

const heroImage = document.createElement("img");
heroImage.src = images[0].src;
document.getElementById("hero-content").appendChild(heroImage);

console.log(images);

// canvas.width = 1920;
// canvas.height = 1080;

// const updateImage = (index) => {
//   img.src = currentFrame(index);
//   context.drawImage(img, 0, 0);
// };

window.addEventListener("scroll", () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = fakeScrollHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  heroImage.src = images[frameIndex].src;
});

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

/* $(window).scroll(function () {
  var a = 1000;
  var pos = $(window).scrollTop();
  if (pos > a) {
    $("header").css({
      position: "static",
    });
  } else {
    $("header").css({
      position: "fixed",
    });
  }
});
 */
$(document).ready(function () {
  $(window).scroll(function () {
    var opacity = 1 - $(window).scrollTop() / 10;
    if (opacity < 0) {
      opacity = 0;
    }
    $(".icon-scroll").css("opacity", opacity);
  });
});

$(document).ready(function () {
  $(window).scroll(function () {
    var opacity = 1 - $(window).scrollTop() / 100;
    if (opacity < 0) {
      opacity = 0;
    }
    $("#brandname").css("opacity", opacity);
  });
});

$(document).ready(function () {
  $(window).scroll(function () {
    var fontSize = 100 - $(window).scrollTop() / 10;
    if (fontSize < 90) {
      fontSize = 90;
    }
    $("#brandname").css("font-size", fontSize);
  });
});

$(document).ready(function () {
  $(window).scroll(function () {
    var opacity = $(window).scrollTop() / 100;
    if (opacity > 1) {
      opacity = 1;
    }
    $(".topnav").css("opacity", opacity);
  });
});




  /* function myFunction(x) {
    if (x.matches) { // If media query matches
      $(document).ready(function () {
        $(window).scroll(function () {
          $("#brandname").css("font-size", 100 - $(window).scrollTop() / 10);
        });
        });    } else {
      $(document).ready(function () {
        $(window).scroll(function () {
          $("#brandname").css("font-size", 100 - $(window).scrollTop() / 10);
        });
        });    }
  }
  
  var x = window.matchMedia("(max-width: 700px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes
 */

  function toggleMenu() {
    var menu = document.getElementById("mobileMenu");
    var hamburgerLines = document.querySelectorAll(".line");

    menu.classList.toggle("active");

    // Draai de hamburgerlijnen om wanneer het menu actief is
    for (var i = 0; i < hamburgerLines.length; i++) {
      hamburgerLines[i].classList.toggle("active");
    }
  }