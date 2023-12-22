import { globalStyle } from "@vanilla-extract/css";
import { Colors } from "./colors";
import { mediaQueryScreen } from "./queries";

globalStyle("body", {
  fontFamily: "var(--font-noto_sans_jp)",
  backgroundColor: Colors.background.body.light,
  color: Colors.color.main_text.light,
});

globalStyle("p, button, td", {
  fontSize: "small",

  "@media": {
    [mediaQueryScreen("md")]: {
      fontSize: "medium",
    },
  },
});

globalStyle("h2", {
  fontSize: "large",

  "@media": {
    [mediaQueryScreen("md")]: {
      fontSize: "x-large",
    },
  },
});

globalStyle("h1", {
  "@media": {
    [mediaQueryScreen("md")]: {
      fontSize: "xx-large",
    },
  },
});