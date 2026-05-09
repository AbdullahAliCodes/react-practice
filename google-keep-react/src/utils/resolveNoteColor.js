import { coloursLight, coloursDark } from "../constants/NoteColours";

const isWhiteish = (c) => {
  if (!c) return true;
  const v = String(c).toLowerCase();
  return v === "white" || v === "#fff" || v === "#ffffff";
};

export const resolveNoteColor = (stored, theme) => {
  const dark = theme === "dark";
  if (isWhiteish(stored)) return dark ? "#202124" : "#fff";

  const lightIdx = coloursLight.indexOf(stored);
  if (lightIdx !== -1) return dark ? coloursDark[lightIdx] : coloursLight[lightIdx];

  const darkIdx = coloursDark.indexOf(stored);
  if (darkIdx !== -1) return dark ? coloursDark[darkIdx] : coloursLight[darkIdx];

  return stored;
};
