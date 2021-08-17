<template>
  <canvas ref="mainMap" style="position: fixed"></canvas>

  <svg
    width="530"
    height="559"
    viewBox="0 0 530 559"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="road-svg"
  >
    <path
      d="M1 557.5L106.5 468L79.5 365L174 378.5L250 335.5L269 248.5L293.5 105L309.5 40L393.5 105L458.5 2L529 59"
      stroke="#13ACEE"
      stroke-width="2"
      stroke-dasharray="8 8"
      class="road-path"
    />
  </svg>

  <svg
    viewBox="0 0 534 564"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="road-svg"
  >
    <path
      d="M3 561L108.5 471.5L81.5 368.5L176 382L252 339L271 252L295.5 108.5L311.5 43.5L395.5 108.5L460.5 5.5L531 62.5"
      stroke="#FF0000"
      stroke-width="7"
      class="road-path"
      ref="redPath"
    />
  </svg>

  <svg
    viewBox="0 0 1522 766"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="test-svg"
  >
    <path :d="svgPath" stroke="#FF0000" stroke-width="7" />
  </svg>

  <MapMarker
    :x="890"
    :y="596"
    dialogHtml="I'm having funnnn in Pennsylvannia"
  />

  <MapMarker
    v-for="{ x, y, dialogHtml } in mapMarkers"
    :x="x"
    :y="y"
    :dialogHtml="dialogHtml"
  />

  <!-- <MapMarker v-for="mapMarker in mapMarkers" v-bind="mapMarker" /> -->
</template>

<script>
/* TODO
Make SVG import from assets: https://www.npmjs.com/package/vite-svg-loader
*/

import { defineComponent, onMounted, ref, computed } from 'vue';
import map from './assets/img/big_map.png';
import MapMarker from './components/MapMarker.vue';

import { mapMarkers } from './store/mapMarkers';

export default defineComponent({
  name: 'App',
  components: {
    MapMarker,
  },
  setup() {
    const mainMap = ref(null);
    const redPath = ref(null);

    onMounted(() => {
      /* Canvas */
      var canvas = mainMap.value;
      console.log('canvas', canvas);
      var ctx = canvas.getContext('2d');

      // canvas.width = window.screen.width; // Includes scroll bar
      // canvas.height = window.screen.height; This is just a big bruh and not working

      // canvas.width = 1522;
      // canvas.height = 766;

      canvas.width = document.documentElement.clientWidth;
      // canvas.width = window.innerWidth; // This includes scroll bar
      canvas.height = window.innerHeight;

      console.log(canvas.width, ' x ', canvas.height);

      var background = new Image();
      background.src = map;
      // background.src = '/img/big_map.png';

      // Make sure the image is loaded first otherwise nothing will draw.
      background.onload = function () {
        ctx.drawImage(background, 0, 0);
      };

      /* SVG Path */
      // Get a reference to the <path>
      var path = redPath.value;
      console.log('path', path);

      // Get length of path... ~577px in this case
      var pathLength = path.getTotalLength();
      console.log('pathLength', pathLength);

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

    const svgPath = computed(() => {
      let dPath = `M ${mapMarkers[0].x} ${mapMarkers[0].y}`;

      console.log(mapMarkers[0]);

      for (let i = 1; i < mapMarkers.length; i++) {
        dPath += `L ${mapMarkers[i].x} ${mapMarkers[i].y}`;
      }
      return dPath;
    });

    return {
      mainMap,
      redPath,
      mapMarkers,
      svgPath,
    };
  },
});
</script>

<style>
body {
  /* feel free to change height */
  height: 5000px;
  background: linear-gradient(to bottom, orange, darkblue);
  margin: 0;
  padding: 0;
}

h1 {
  font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',
    Helvetica, Arial, 'Lucida Grande', sans-serif;
  font-weight: 300;
  color: white;
  text-transform: uppercase;
  text-align: center;
  font-size: 22px;
  letter-spacing: 5px;
  font-weight: 100;
  padding: 25px 15px;
  text-shadow: 1px 1px 1px #333;
}

.road-svg {
  position: fixed;
  top: 132px;
  left: 778px;
  width: 528px;
  height: 555.5px;
}

.test-svg {
  position: fixed;
  width: 100%;
  height: 100%;
}

.marker-svg {
  position: fixed;
  width: 45px;
  height: 45px;
  fill: #d81b60;
  cursor: pointer;
}
</style>
