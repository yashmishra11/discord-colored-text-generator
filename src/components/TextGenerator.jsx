import { useState } from "react";

const TextGenerator = () => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("red");
  const [bgColor, setBgColor] = useState("black");
  const [isBold, setIsBold] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const formatText = (txt) => {
    if (!txt) return "";
    if (isBold) txt = `**${txt}**`;
    if (isUnderline) txt = `__${txt}__`;
    return {
      red: `\`\`\`diff\n- ${txt}\n\`\`\``,
      green: `\`\`\`diff\n+ ${txt}\n\`\`\``,
      blue: `\`\`\`ini\n[ ${txt} ]\n\`\`\``,
      yellow: `\`\`\`fix\n${txt}\n\`\`\``,
      cyan: `\`\`\`yaml\n${txt}\n\`\`\``,
      gray: `\`\`\`css\n${txt}\n\`\`\``,
    }[color] || txt;
  };

  const colors = {
    text: { red: "#ff4c4c", green: "#4cff4c", blue: "#4c4cff", yellow: "#ffff4c", cyan: "#4cffff", gray: "#aaaaaa" },
    bg: { black: "#000", white: "#fff", gray: "#333", blue: "#001f3f", green: "#003f00", red: "#3f0000" },
  };

  const handleReset = () => {
    setText("");
    setIsBold(false);
    setIsUnderline(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Discord Colored Text Generator</h2>
      <textarea
        rows="4"
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <label>
          Select Color:
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            {Object.keys(colors.text).map((c) => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </label>
        <label>
          Select BG Color:
          <select value={bgColor} onChange={(e) => setBgColor(e.target.value)}>
            {Object.keys(colors.bg).map((c) => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <button onClick={() => setIsBold(!isBold)}>
          {isBold ? "Remove Bold" : "Bold"}
        </button>
        <button onClick={() => setIsUnderline(!isUnderline)}>
          {isUnderline ? "Remove Underline" : "Underline"}
        </button>
        <button onClick={handleReset} style={{ backgroundColor: "#ff4c4c", color: "#fff" }}>
          Reset
        </button>
      </div>
      {text && (
        <div
          style={{
            width: "100%",
            height: 100,
            overflowY: "auto",
            backgroundColor: "#1e1e1e",
            padding: 10,
            borderRadius: 5,
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            textAlign: "left",
            marginTop: 10,
          }}
        >
          <span style={{ color: colors.text[color], backgroundColor: colors.bg[bgColor], padding: "3px 6px", borderRadius: 3 }}>
            {formatText(text)}
          </span>
        </div>
      )}
      <p style={{ textAlign: "center", marginTop: 10 }}>{text ? "Copy the above text and paste it in Discord to see the colors!" : "Start typing to generate Discord colored text!"}</p>
      <p>This is an unofficial tool, not endorsed by Discord.</p>
    </div>
  );
};

export default TextGenerator;