(() => {
  const storageKey = "nearcue.language";
  const script = document.currentScript;
  const currentLanguage = script?.dataset.currentLanguage;
  const alternatePage = script?.dataset.alternatePage;

  if (!currentLanguage || !alternatePage) return;

  let selectedLanguage;
  try {
    selectedLanguage = window.localStorage.getItem(storageKey);
  } catch {
    // 浏览器禁用本地存储时，仍可根据首选语言正常选择页面。
  }

  if (!["zh-Hans", "en"].includes(selectedLanguage)) {
    selectedLanguage = undefined;
  }

  if (!selectedLanguage) {
    const preferredLanguages = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];
    const preferredLanguage = preferredLanguages.find(Boolean)?.toLowerCase() ?? "en";
    const prefersChinese = preferredLanguage.startsWith("zh");
    selectedLanguage = prefersChinese ? "zh-Hans" : "en";
  }

  if (selectedLanguage !== currentLanguage) {
    window.location.replace(new URL(alternatePage, window.location.href).href);
    return;
  }

  window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-language-choice]").forEach((link) => {
      link.addEventListener("click", () => {
        try {
          window.localStorage.setItem(storageKey, link.dataset.languageChoice);
        } catch {
          // 切换仍会通过链接完成，本地存储只负责记住选择。
        }
      });
    });
  });
})();
