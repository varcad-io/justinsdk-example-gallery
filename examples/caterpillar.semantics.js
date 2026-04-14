const toFiniteNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const degreesToRadians = (degrees) => (toFiniteNumber(degrees, 0) * Math.PI) / 180;

const rotatePointY = (point, degrees) => {
  const radians = degreesToRadians(degrees);
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  return [
    (point[0] * cosine) + (point[2] * sine),
    point[1],
    (-point[0] * sine) + (point[2] * cosine),
  ];
};

const rotatePointX = (point, degrees) => {
  const radians = degreesToRadians(degrees);
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  return [
    point[0],
    (point[1] * cosine) - (point[2] * sine),
    (point[1] * sine) + (point[2] * cosine),
  ];
};

const addPoints = (left, right) => left.map((value, index) => value + right[index]);
const scalePoint = (point, factor) => point.map((value) => value * factor);

export const getCaterpillarSemanticModel = ({ radius = 5, baseArmAngle = 135, middleArmAngle = 80 } = {}) => {
  const shoulderPivot = [radius * 6, -radius * 4.5, radius * 9.5];
  const upperArmLength = radius * 5.4;
  const forearmLength = radius * 5.8;
  const elbowBend = middleArmAngle - 45;
  const baseArmRotation = (baseArmAngle - 90) * 1.4;

  const elbowLocal = [upperArmLength, 0, 0];
  const wristLocal = addPoints(elbowLocal, rotatePointY([forearmLength, 0, 0], -elbowBend));
  const handLocal = addPoints(
    elbowLocal,
    rotatePointY([forearmLength + (radius * 0.7), 0, radius * 0.05], -elbowBend),
  );
  const upperArmMidpointLocal = [upperArmLength * 0.5, 0, 0];
  const upperArmTopNormal = rotatePointY([0, 0, 1], baseArmRotation);
  const upperArmCylinderFaceNormal = [1, 0, 0];
  const forearmCylinderFaceNormal = [1, 0, 0];
  const wheelFaceNormal = [1, 0, 0];
  const upperArmMidpoint = addPoints(shoulderPivot, rotatePointY(upperArmMidpointLocal, baseArmRotation));
  const companionPerch = addPoints(
    upperArmMidpoint,
    addPoints(
      scalePoint(upperArmTopNormal, radius * 1.25),
      rotatePointY([radius * 0.15, 0, 0], baseArmRotation),
    ),
  );
  const gloveAnchorLocal = [forearmLength + (radius * 0.7), 0, radius * 0.05];
  const transformGloveLocalPoint = (point) =>
    addPoints(
      elbowLocal,
      rotatePointY(
        addPoints(
          gloveAnchorLocal,
          rotatePointX(
            rotatePointY(
              [point[0] * 0.82, point[1] * 0.82, point[2] * 1.06],
              72,
            ),
            180,
          ),
        ),
        -elbowBend,
      ),
    );
  const gloveAccentLeftLocal = transformGloveLocalPoint([radius * 0.12, radius * 0.58, -radius * 0.08]);
  const gloveAccentRightLocal = transformGloveLocalPoint([radius * 0.12, -radius * 0.58, -radius * 0.08]);

  return {
    radius,
    baseArmAngle,
    middleArmAngle,
    baseArmRotation,
    shoulderPivot,
    elbowPivot: addPoints(shoulderPivot, rotatePointY(elbowLocal, baseArmRotation)),
    wristPivot: addPoints(shoulderPivot, rotatePointY(wristLocal, baseArmRotation)),
    handMount: addPoints(shoulderPivot, rotatePointY(handLocal, baseArmRotation)),
    companionPerch,
    upperArmMidpoint,
    upperArmTopNormal,
    upperArmCylinderFaceNormal,
    forearmCylinderFaceNormal,
    wheelFaceNormal,
    gloveAccentLeft: addPoints(shoulderPivot, rotatePointY(gloveAccentLeftLocal, baseArmRotation)),
    gloveAccentRight: addPoints(shoulderPivot, rotatePointY(gloveAccentRightLocal, baseArmRotation)),
    upperArmLength,
    forearmLength,
  };
};

export const getCaterpillarSemanticLandmarks = (variables = {}) => {
  const radius = toFiniteNumber(variables.radius, 5);
  const baseArmAngle = toFiniteNumber(variables.caterpillar_base_arm_angle_deg, 135);
  const middleArmAngle = toFiniteNumber(variables.caterpillar_middle_arm_angle_deg, 80);
  const model = getCaterpillarSemanticModel({
    radius,
    baseArmAngle,
    middleArmAngle,
  });

  return [
    ["parameter", "radius", model.radius],
    ["parameter", "base_arm_angle_deg", model.baseArmAngle],
    ["parameter", "middle_arm_angle_deg", model.middleArmAngle],
    ["part", "left_track_center", [0, -model.radius * 4, 0]],
    ["part", "right_track_center", [0, model.radius * 4, 0]],
    ["part", "body_center", [0, 0, model.radius * 3]],
    ["landmark", "shoulder_pivot", model.shoulderPivot],
    ["landmark", "shoulder_mount_hint", model.shoulderPivot],
    ["landmark", "elbow_pivot", model.elbowPivot],
    ["landmark", "wrist_pivot", model.wristPivot],
    ["landmark", "hand_mount_hint", model.handMount],
    ["landmark", "companion_perch_hint", model.companionPerch],
    ["landmark", "upper_arm_midpoint", model.upperArmMidpoint],
    ["vector", "upper_arm_top_normal", model.upperArmTopNormal],
    ["vector", "upper_arm_cylinder_face_normal", model.upperArmCylinderFaceNormal],
    ["vector", "forearm_cylinder_face_normal", model.forearmCylinderFaceNormal],
    ["vector", "wheel_face_normal", model.wheelFaceNormal],
    ["landmark", "glove_accent_left", model.gloveAccentLeft],
    ["landmark", "glove_accent_right", model.gloveAccentRight],
    ["metric", "upper_arm_length", model.upperArmLength],
    ["metric", "forearm_length", model.forearmLength],
    ["metric", "glove_accent_count", 2],
    ["relation", "arm_chain", ["shoulder_pivot", "elbow_pivot", "wrist_pivot", "hand_mount_hint"]],
    ["relation", "companion_support", ["companion_perch_hint", "shoulder_pivot"]],
    ["relation", "glove_accent_pair", ["glove_accent_left", "glove_accent_right", "hand_mount_hint"]],
    ["heuristic", "dominant_mirror_axis_hint", "y"],
  ];
};
