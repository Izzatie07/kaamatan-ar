import { CSS3DObject } from "/kaamatan-ar/libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js";
const THREE = window.MINDAR.IMAGE.THREE;

const createYoutube = () => {
  return new Promise((resolve) => {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const player = new YT.Player('player', {
        videoId: 'gSydjXLJKnw',
        events: {
          onReady: () => resolve(player)
        }
      });
    };
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    const player = await createYoutube();

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.querySelector("#ar-container"),
      imageTargetSrc: "/kaamatan-ar/assets/targets/Suling.mind",
    });

    const { renderer, cssRenderer, cssScene, camera } = mindarThree;

    const obj = new CSS3DObject(document.querySelector("#ar-div"));

    const cssAnchor = mindarThree.addCSSAnchor(0);
    cssAnchor.group.add(obj);

    cssAnchor.onTargetFound = () => player.playVideo();
    cssAnchor.onTargetLost = () => player.pauseVideo();

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      cssRenderer.render(cssScene, camera);
    });
  };

  start();
});