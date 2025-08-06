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

  let isDragging = false;
  let lastX = 0, lastY = 0;
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

  document.querySelectorAll(".pop-item").forEach((item,index) => {
  item.addEventListener('click', () => {
    const popup = document.querySelector(`.popupOverlay.popup${index + 1}`);
    popup.classList.add('active');
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


    target.addEventListener("mousedown", e => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      img.style.cursor = "grabbing";
    });

    target.addEventListener("mouseup", () => {
      isDragging = false;
      img.style.cursor = "grab";
    });

    target.addEventListener("mousemove", e => {
      if (!isDragging) return;
      offsetX += e.clientX - lastX;
      offsetY += e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      updateTransform();
    });

    target.addEventListener("wheel", e => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 1.1 : 0.9;
      scale *= delta;
      updateTransform();
    }, { passive: false });

  });

};

function updateTransform() {
    img.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  }