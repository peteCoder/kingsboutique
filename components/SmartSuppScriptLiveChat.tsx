"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    _smartsupp: any;
    smartsupp: any;
  }
}

const SmartsuppScript: React.FC = () => {
  useEffect(() => {
    // Initialize Smartsupp
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = process.env.NEXT_PUBLIC_SMARTSUPP_LIVE_CHAT_API_KEY!;

    if (!window.smartsupp) {
      (function (d) {
        const s = d.getElementsByTagName("script")[0];
        const c = d.createElement("script");
        c.type = "text/javascript";
        c.charset = "utf-8";
        c.async = true;
        c.src = process.env.NEXT_PUBLIC_SMARTSUPP_API_KEY_LINK!;
        s.parentNode?.insertBefore(c, s);
      })(document);
    }
  }, []);

  return null;
};

export default SmartsuppScript;
