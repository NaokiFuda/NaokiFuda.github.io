// JavaScript source code

const styleConfig = {
  heading1: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  heading2: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "8px"
  },
  bodyText: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "12px"
  }
};

  let isZooming = false;
  let offsetX = 0, offsetY = 0;
  let scale = 1;

// スタイルを適用する関数
function applyStyle(element, styleObj) {
  Object.assign(element.style, styleObj);
}

// ページ読み込み後に適用
window.onload = function () {
    document.body.style.backgroundColor = "#302e2e";
    document.body.style.textAlign = "left";
    document.body.style.fontFamily = "'Zen Maru Gothic', sans-serif";
  // すべてのH1にheading1スタイル
  document.querySelectorAll("h1").forEach(el => applyStyle(el, styleConfig.heading1));
  // すべてのH2にheading2スタイル
  document.querySelectorAll("h2").forEach(el => applyStyle(el, styleConfig.heading2));
  // すべてのpにbodyTextスタイル
  document.querySelectorAll("p").forEach(el => applyStyle(el, styleConfig.bodyText));

  document.querySelectorAll(".pop-item").forEach(item => {
  item.addEventListener('click', () => {
    const popup = document.querySelector(`.popupOverlay.popup${item.dataset.popup}`);
    popup.classList.add('active');
    const popcontents = popup.querySelector(".popupContent");
    if(!popup.querySelector("noscroll")){
      const height = popcontents.offsetHeight / 2 - 300;
      updateTransform(popcontents,0,height,1);
      offsetX =0;offsetY = height;
    }
    else{

    }
    
    });
  });
  document.querySelectorAll('.popupOverlay').forEach(popup => {
    popup.addEventListener('click', (e) => {
      // 背景（自身）がクリックされた場合だけ閉じる（中身をクリックした場合は無視）
      if (e.target === popup) {
        popup.classList.remove('active');
      }
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.fadein').forEach(el => {
    observer.observe(el);
  });

  document.querySelectorAll(".popupContent").forEach(target => {
    if(target.classList.contains("noscroll")) return;

    target.addEventListener("keydown", (e) => {
      if (e.key === "Shift") {
        isZooming = true;
      }
    });
    target.addEventListener("keyup", (e) => {
      if (e.key === "Shift") {
        isZooming = false;
      }
    });

    target.addEventListener("wheel", e => {
      e.preventDefault();
      if (!isZooming)
      {
        offsetX -= e.deltaX;
        offsetY -= e.deltaY;
      }
      else
      {
        const delta = e.deltaY < 0 ? 1.1 : 0.9;
        scale *= delta;
      }
      updateTransform(target,offsetX,offsetY,scale);
    }, { passive: false });
  });
  document.addEventListener('DOMContentLoaded', function() {
      const thumbnailButton = document.querySelector('.thumbnail-button');
      const videoOverlay = document.querySelector('.video-overlay');
      const videoPlayer = document.getElementById('videoPlayer');
      const closeButton = document.querySelector('.close-button');

      // サムネイルボタンがクリックされた時の処理
      thumbnailButton.addEventListener('click', function() {
          videoOverlay.style.display = 'block';
          videoPlayer.play();
      });

      // 閉じるボタンがクリックされた時の処理
      closeButton.addEventListener('click', function() {
          videoOverlay.style.display = 'none';
          videoPlayer.pause();
          videoPlayer.currentTime = 0; // 動画を最初に戻す
      });
  });
};

function updateTransform(target,offsetX,offsetY,scale) {
      target.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
}