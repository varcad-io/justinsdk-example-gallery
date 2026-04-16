import cadRuntime, { defineConstructionSemantics } from "@varcad/cad-runtime";
import * as modeling from "@jscad/modeling";
import {
  getCaterpillarConstructionSemantics,
  getCaterpillarSemanticModel,
} from "./caterpillar.semantics.js";

const { colorize } = modeling.colors;
const { cylinder, cuboid, sphere } = modeling.primitives;
const { rotateX, rotateY, rotateZ, scale, translate } = modeling.transforms;

const COLORS = Object.freeze({
  yellow: [1, 0.92, 0.18, 1],
  aqua: [0.19, 0.86, 0.94, 1],
  green: [0.39, 0.78, 0.28, 1],
  black: [0.04, 0.05, 0.07, 1],
  white: [1, 1, 1, 1],
});

const toFiniteNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const degreesToRadians = (degrees) => (toFiniteNumber(degrees, 0) * Math.PI) / 180;

const asGeometryList = (value) => (
  Array.isArray(value)
    ? value.flatMap((entry) => asGeometryList(entry)).filter(Boolean)
    : (value == null ? [] : [value])
);

const transformGeometryList = (value, transform) =>
  asGeometryList(value).map((geometry) => transform(geometry));

const colorizeGeometryList = (value, color) =>
  transformGeometryList(value, (geometry) => colorize(color, geometry));

const callModule = (namespace, exportName, args = [], fallbackFactory = null) => {
  if (typeof namespace?.[exportName] === "function") {
    return namespace[exportName](...args);
  }
  return typeof fallbackFactory === "function" ? fallbackFactory() : fallbackFactory;
};

const createFallbackTrack = (radius) => (
  scale(
    [1.1, 1, 1.5],
    cuboid({
      size: [radius * 8.6, radius * 3.8, radius * 1.6],
    }),
  )
);

const createFallbackBody = (radius) => scale([1, 1, 0.9], sphere({ radius: radius * 4, segments: 64 }));

const createFallbackArmSegment = (radius, length, segmentRadius, jointRadius) => [
  translate(
    [length / 2, 0, -radius * 0.05],
    cuboid({
      size: [length, segmentRadius * 2.2, radius * 1.15],
    }),
  ),
  rotateY(Math.PI / 2, cylinder({ height: radius * 1.4, radius: jointRadius, segments: 48 })),
];

const createFallbackGlove = (radius) => [
  scale([1.05, 0.95, 0.65], sphere({ radius: radius * 2.25, segments: 48 })),
  translate(
    [-radius * 1.8, 0, radius * 0.45],
    scale([1.1, 1.65, 0.7], sphere({ radius: radius * 0.95, segments: 40 })),
  ),
];

const createFallbackCompanion = (radius) => {
  const bodyPoints = [
    [0, 0, -radius / 3],
    [radius * 1.5, 0, 0],
    [radius * 3, 0, radius],
    [radius * 4.25, 0, radius * 2],
  ];
  return bodyPoints.map((point) => translate(point, sphere({ radius, segments: 32 })));
};

const buildTrackAssembly = (source, radius, offsetY) => {
  const baseTrack = callModule(source, "track", [radius], () => createFallbackTrack(radius));
  const shell = colorizeGeometryList(
    transformGeometryList(baseTrack, (geometry) => translate([0, offsetY, 0], rotateX(Math.PI / 2, geometry))),
    COLORS.black,
  );

  const wheelOffsets = [-radius * 4, 0, radius * 4];
  const wheelHighlights = wheelOffsets.flatMap((offsetX) => (
    [
      translate(
        [offsetX, offsetY, radius * 0.1],
        rotateY(Math.PI / 2, cylinder({ height: radius * 1.2, radius: radius * 0.92, segments: 40 })),
      ),
      translate(
        [offsetX, offsetY, radius * 0.1],
        rotateY(Math.PI / 2, cylinder({ height: radius * 0.8, radius: radius * 0.45, segments: 40 })),
      ),
    ].map((geometry, index) => colorize(index === 0 ? COLORS.white : COLORS.black, geometry))
  ));

  return [...shell, ...wheelHighlights];
};

const buildFaceOverlays = (radius) => {
  const visor = colorize(
    COLORS.aqua,
    translate(
      [radius * 3.05, 0, radius * 3.05],
      rotateY(degreesToRadians(8), scale([1, 0.96, 0.42], sphere({ radius: radius * 2.35, segments: 48 }))),
    ),
  );

  const eyeOffsetX = radius * 3.2;
  const eyeOffsetZ = radius * 3.1;
  const eyeOffsetY = radius * 0.82;
  const eyes = [
    translate([eyeOffsetX, -eyeOffsetY, eyeOffsetZ], scale([0.2, 0.7, 0.18], sphere({ radius: radius, segments: 28 }))),
    translate([eyeOffsetX, eyeOffsetY, eyeOffsetZ], scale([0.2, 0.7, 0.18], sphere({ radius: radius, segments: 28 }))),
  ].map((geometry) => colorize(COLORS.black, geometry));

  const brows = [
    translate(
      [radius * 2.95, -radius * 1.1, radius * 4.0],
      rotateZ(degreesToRadians(18), cuboid({ size: [radius * 1.3, radius * 0.26, radius * 0.18] })),
    ),
    translate(
      [radius * 2.95, radius * 1.1, radius * 4.0],
      rotateZ(degreesToRadians(-18), cuboid({ size: [radius * 1.3, radius * 0.26, radius * 0.18] })),
    ),
  ].map((geometry) => colorize(COLORS.black, geometry));

  return [visor, ...eyes, ...brows];
};

const buildBodyAssembly = (source, radius) => {
  const baseBody = callModule(source, "body", [radius], () => createFallbackBody(radius));
  const body = colorizeGeometryList(
    transformGeometryList(baseBody, (geometry) => translate([0, 0, radius * 3], geometry)),
    COLORS.yellow,
  );
  const overlays = buildFaceOverlays(radius);
  return [...body, ...overlays];
};

const buildArmAssembly = (source, radius, baseArmAngle, middleArmAngle) => {
  const semanticModel = getCaterpillarSemanticModel({
    radius,
    baseArmAngle,
    middleArmAngle,
  });
  const {
    shoulderPivot,
    upperArmLength,
    forearmLength,
    baseArmRotation,
  } = semanticModel;
  const segmentRadius = radius * 0.5;
  const shoulderJointRadius = radius * 1.02;
  const elbowJointRadius = radius * 0.9;
  const wristJointRadius = radius * 0.76;
  const elbowBend = middleArmAngle - 45;

  const upperArm = colorizeGeometryList(
    callModule(
      source,
      "arm_segment",
      [radius, upperArmLength, segmentRadius, shoulderJointRadius],
      () => createFallbackArmSegment(radius, upperArmLength, segmentRadius, shoulderJointRadius),
    ),
    COLORS.yellow,
  );

  const elbowJoint = colorize(
    COLORS.yellow,
    translate(
      [upperArmLength, 0, -radius * 0.05],
      rotateY(Math.PI / 2, cylinder({ height: radius * 1.45, radius: elbowJointRadius, segments: 40 })),
    ),
  );

  const forearmLocal = [
    ...colorizeGeometryList(
      callModule(
        source,
        "arm_segment",
        [radius, forearmLength, segmentRadius * 0.93, elbowJointRadius],
        () => createFallbackArmSegment(radius, forearmLength, segmentRadius * 0.93, elbowJointRadius),
      ),
      COLORS.yellow,
    ),
    colorize(
      COLORS.yellow,
      translate(
        [forearmLength, 0, -radius * 0.02],
        rotateY(Math.PI / 2, cylinder({ height: radius * 1.4, radius: wristJointRadius, segments: 40 })),
      ),
    ),
  ];

  const forearm = transformGeometryList(
    forearmLocal,
    (geometry) => translate([upperArmLength, 0, 0], rotateY(degreesToRadians(-elbowBend), geometry)),
  );

  const gloveLocalTransform = (geometry) => translate(
    [upperArmLength, 0, 0],
    rotateY(
      degreesToRadians(-elbowBend),
      translate(
        [forearmLength + (radius * 0.7), 0, radius * 0.05],
        rotateX(Math.PI, rotateY(degreesToRadians(72), scale([0.82, 0.82, 1.06], geometry))),
      ),
    ),
  );

  const gloveBase = callModule(source, "glove", [radius], () => createFallbackGlove(radius));
  const glove = colorizeGeometryList(
    transformGeometryList(gloveBase, gloveLocalTransform),
    COLORS.white,
  );

  const gloveAccentLocal = [
    translate(
      [radius * 0.12, radius * 0.58, -radius * 0.08],
      cuboid({ size: [radius * 1.05, radius * 0.18, radius * 0.22] }),
    ),
    translate(
      [radius * 0.12, -radius * 0.58, -radius * 0.08],
      cuboid({ size: [radius * 1.05, radius * 0.18, radius * 0.22] }),
    ),
  ];
  const gloveAccent = colorizeGeometryList(
    transformGeometryList(gloveAccentLocal, gloveLocalTransform),
    COLORS.black,
  );

  const localArm = [...upperArm, elbowJoint, ...forearm, ...glove];
  const placedArm = transformGeometryList(
    localArm,
    (geometry) => translate(shoulderPivot, rotateY(degreesToRadians(baseArmRotation), geometry)),
  );
  const placedAccents = transformGeometryList(
    gloveAccent,
    (geometry) => translate(shoulderPivot, rotateY(degreesToRadians(baseArmRotation), geometry)),
  );

  return [...placedArm, ...placedAccents];
};

const buildCompanionAssembly = (source, radius, baseArmAngle, middleArmAngle) => {
  const semanticModel = getCaterpillarSemanticModel({
    radius,
    baseArmAngle,
    middleArmAngle,
  });
  const companion = callModule(source, "small_caterpillar", [radius], () => createFallbackCompanion(radius));
  return colorizeGeometryList(
    transformGeometryList(
      companion,
      (geometry) => translate(
        semanticModel.companionPerch,
        rotateY(degreesToRadians(semanticModel.baseArmRotation - 18), scale([0.8, 0.8, 0.8], geometry)),
      ),
    ),
    COLORS.green,
  );
};

export const getConstructionSemantics = defineConstructionSemantics((builder, variables = {}) => {
  builder.merge(getCaterpillarConstructionSemantics(variables));
});

export async function main({ variables = {} } = {}) {
  const source = await cadRuntime.importModule("/examples/caterpillar.scad?use", {
    fromPath: "/examples/caterpillar.js",
  });

  const radius = 5;
  const baseArmAngle = toFiniteNumber(variables.caterpillar_base_arm_angle_deg, 135);
  const middleArmAngle = toFiniteNumber(variables.caterpillar_middle_arm_angle_deg, 80);

  const parts = [
    ...buildTrackAssembly(source, radius, -radius * 4),
    ...buildBodyAssembly(source, radius),
    ...buildTrackAssembly(source, radius, radius * 4),
    ...buildArmAssembly(source, radius, baseArmAngle, middleArmAngle),
    ...buildCompanionAssembly(source, radius, baseArmAngle, middleArmAngle),
  ];

  return parts;
}
