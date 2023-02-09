const intro = document.querySelector('.intro');
const video = intro.querySelector('video');
const text = intro.querySelector('.h1');
//END SECTION
const section = document.querySelector('.section');
const end = document.querySelector('.h1');

//SCROLLMAGIC
const controller = new ScrollMagic.Controller();

//SCENES
const scene = new ScrollMagic.Scene({
    duration: 3000,
    triggerELement: intro,
    triggerHook: 0,
}).addIndicators()
.setPin(intro)
.addTo(controller);

//VIDEO ANIMATION
let scrollpos = 0;

scene.on('update', e => {
    scrollpos = e.scrollPos / 1000;
});

setInterval(() => {
    video.currentTime = scrollpos;
}, 33.3);





