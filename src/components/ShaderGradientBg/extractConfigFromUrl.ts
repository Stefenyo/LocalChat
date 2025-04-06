/**
 * Parses a URL and extracts values that match the GradientT keys.
 * @param {string} url
 * @returns {Object} Object matching GradientT shape with parsed values
 */
const extractConfigFromURL = (url: string) => {
  const gradientKeys = new Set([
    "type",
    "animate",
    "uTime",
    "uSpeed",
    "uStrength",
    "uDensity",
    "uFrequency",
    "uAmplitude",
    "positionX",
    "positionY",
    "positionZ",
    "rotationX",
    "rotationY",
    "rotationZ",
    "color1",
    "color2",
    "color3",
    "reflection",
    "wireframe",
    "shader",
    "control",
    "isFigmaPlugin",
    "smoothTime",
    "cAzimuthAngle",
    "cPolarAngle",
    "cDistance",
    "cameraZoom",
    "lightType",
    "brightness",
    "envPreset",
    "grain",
    "grainBlending",
    "zoomOut",
  ]);

  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  const result: Record<string, unknown> = {};

  for (const [key, value] of params.entries()) {
    if (gradientKeys.has(key)) {
      let parsedValue: unknown = value;

      // Try to parse numbers
      if (!isNaN(Number(value)) && value.trim() !== "") {
        parsedValue = Number(value);
      }

      // Try to parse booleans
      if (value === "true" || value === "false") {
        parsedValue = value === "true";
      }

      result[key] = parsedValue;
    }
  }

  return result;
};

export { extractConfigFromURL };
