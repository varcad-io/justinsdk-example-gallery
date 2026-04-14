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

const addPoints = (left, right) => left.map((value, index) => value + right[index]);

export const getCaterpillarSemanticModel = ({ radius = 5, baseArmAngle = 135, middleArmAngle = 80 } = {}) => {
  const shoulderPivot = [radius * 6, -radius * 4.5, radius * 9.5];
  const companionPerch = [radius * 3.5, -radius * 4.5, radius * 9.75];
  const upperArmLength = radius * 5.4;
  const forearmLength = radius * 5.35;
  const elbowBend = middleArmAngle - 45;
  const baseArmRotation = 90 - baseArmAngle;

  const elbowLocal = [upperArmLength, 0, 0];
  const wristLocal = addPoints(elbowLocal, rotatePointY([forearmLength, 0, 0], -elbowBend));
  const handLocal = addPoints(
    elbowLocal,
    rotatePointY([forearmLength + (radius * 0.7), 0, radius * 0.05], -elbowBend),
  );

  return {
    radius,
    baseArmAngle,
    middleArmAngle,
    shoulderPivot,
    elbowPivot: addPoints(shoulderPivot, rotatePointY(elbowLocal, baseArmRotation)),
    wristPivot: addPoints(shoulderPivot, rotatePointY(wristLocal, baseArmRotation)),
    handMount: addPoints(shoulderPivot, rotatePointY(handLocal, baseArmRotation)),
    companionPerch,
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
    ["metric", "upper_arm_length", model.upperArmLength],
    ["metric", "forearm_length", model.forearmLength],
    ["relation", "arm_chain", ["shoulder_pivot", "elbow_pivot", "wrist_pivot", "hand_mount_hint"]],
    ["relation", "companion_support", ["companion_perch_hint", "shoulder_pivot"]],
    ["heuristic", "dominant_mirror_axis_hint", "y"],
  ];
};
