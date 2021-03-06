$(document).ready(function () {
  /* Canvas */
  var canvas = document.getElementById('main-map');
  var ctx = canvas.getContext('2d');

  canvas.width = window.screen.width;
  canvas.height = window.screen.height;
  console.log(window.screen.width, ' x ', window.screen.height);

  var background = new Image();
  background.src = 'public/img/big_map.png';

  // Make sure the image is loaded first otherwise nothing will draw.
  background.onload = function () {
    ctx.drawImage(background, 0, 0);
  };

  /* SVG Path */
  // Get a reference to the <path>
  var path = $('.road-path').get(1);
  console.log('path', path);

  // Get length of path... ~577px in this case
  var pathLength = path.getTotalLength();

  // Make very long dashes (the length of the path itself)
  path.style.strokeDasharray = pathLength + ' ' + pathLength;

  // Offset the dashes so the it appears hidden entirely
  path.style.strokeDashoffset = pathLength;

  // Jake Archibald says so
  // https://jakearchibald.com/2013/animated-line-drawing-svg/
  path.getBoundingClientRect();

  // When the page scrolls...
  window.addEventListener('scroll', function (e) {
    // What % down is it?
    // https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript/2387222#2387222
    // Had to try three or four differnet methods here. Kind of a cross-browser nightmare.
    var scrollPercentage =
      (document.documentElement.scrollTop + document.body.scrollTop) /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight);

    console.log('scrollPercentage', scrollPercentage);
    if (scrollPercentage == 0.13683716851408523) {
      console.log('Reached Philidelphia');
    }
    // Length to offset the dashes
    var drawLength = pathLength * scrollPercentage;

    // Draw in reverse
    path.style.strokeDashoffset = pathLength - drawLength;

    // When complete, remove the dash array, otherwise shape isn't quite sharp
    // Accounts for fuzzy math
    if (scrollPercentage >= 0.99) {
      path.style.strokeDasharray = 'none';
    } else {
      path.style.strokeDasharray = pathLength + ' ' + pathLength;
    }
  });

  /* Checkpoints */
  // Pressing to determine coordinate locations
  window.addEventListener('click', (e) => {
    console.log(e.clientX, e.clientY);
  });
});
