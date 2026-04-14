import * as modeling from "@jscad/modeling";

const { geom3 } = modeling.geometries;

export const hasAuthoredGeometryColors = (value) => {
  if (!value) {
    return false;
  }
  if (Array.isArray(value)) {
    return value.some((entry) => hasAuthoredGeometryColors(entry));
  }
  if (!geom3.isA(value)) {
    return false;
  }
  if (Array.isArray(value?.color) && value.color.length >= 3) {
    return true;
  }
  const polygons = geom3.toPolygons(value);
  return polygons.some((polygon) => Array.isArray(polygon?.color) && polygon.color.length >= 3);
};

export const shouldApplyAccentTint = (value) => !hasAuthoredGeometryColors(value);
