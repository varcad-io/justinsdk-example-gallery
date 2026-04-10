import cadRuntime from "@varcad/cad-runtime";

const toFiniteNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export async function main({ variables = {} } = {}) {
  const caterpillar = await cadRuntime.importModule("/examples/caterpillar.scad?use", {
    fromPath: "/examples/caterpillar.js",
  });
  const baseArmAngle = toFiniteNumber(variables.caterpillar_base_arm_angle_deg, 135);
  const middleArmAngle = toFiniteNumber(variables.caterpillar_middle_arm_angle_deg, 80);

  if (typeof caterpillar?.caterpillars === "function") {
    return caterpillar.caterpillars(5, baseArmAngle, middleArmAngle);
  }

  return caterpillar?.default ?? caterpillar;
}
