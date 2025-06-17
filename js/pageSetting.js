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
};