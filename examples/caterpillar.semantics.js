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
    leftTrackCenter: [0, -radius * 4, 0],
    rightTrackCenter: [0, radius * 4, 0],
    bodyCenter: [0, 0, radius * 3],
  };
};

const createParameter = (id, value, type = "number") => ({
  id,
  type,
  value,
});

const createGroup = ({
  id,
  level,
  role,
  parent = null,
  children = [],
  expectedColor = null,
  styleTags = [],
  anchors = [],
}) => ({
  id,
  level,
  role,
  ...(parent ? { parent } : {}),
  ...(children.length ? { children } : {}),
  ...(expectedColor ? { expectedColor } : {}),
  ...(styleTags.length ? { styleTags } : {}),
  ...(anchors.length ? { anchors } : {}),
});

const createAnchor = ({
  id,
  on,
  position,
  zone = null,
  at = null,
}) => ({
  id,
  on,
  position,
  ...(zone ? { zone } : {}),
  ...(at ? { at } : {}),
});

const createLandmark = ({
  id,
  kind,
  value,
  on = null,
}) => ({
  id,
  kind,
  value,
  ...(on ? { on } : {}),
});

const createRelation = ({
  id,
  type,
  child = null,
  parent = null,
  children = [],
  items = [],
  left = null,
  right = null,
  zone = null,
}) => ({
  id,
  type,
  ...(child ? { child } : {}),
  ...(parent ? { parent } : {}),
  ...(children.length ? { children } : {}),
  ...(items.length ? { items } : {}),
  ...(left ? { left } : {}),
  ...(right ? { right } : {}),
  ...(zone ? { zone } : {}),
});

export const getCaterpillarConstructionSemantics = (variables = {}) => {
  const radius = toFiniteNumber(variables.radius, 5);
  const baseArmAngle = toFiniteNumber(variables.caterpillar_base_arm_angle_deg, 135);
  const middleArmAngle = toFiniteNumber(variables.caterpillar_middle_arm_angle_deg, 80);
  const model = getCaterpillarSemanticModel({
    radius,
    baseArmAngle,
    middleArmAngle,
  });

  return {
    schemaVersion: "1",
    modelId: "caterpillar_machine",
    parameters: [
      createParameter("radius", model.radius, "distance"),
      createParameter("base_arm_angle_deg", model.baseArmAngle, "angle_deg"),
      createParameter("middle_arm_angle_deg", model.middleArmAngle, "angle_deg"),
    ],
    groups: [
      createGroup({
        id: "caterpillar_machine",
        level: "macro",
        role: "machine_character",
        children: ["tracks", "body_shell", "face", "main_arm", "companion"],
        styleTags: ["cartoon", "friendly", "tracked"],
      }),
      createGroup({
        id: "tracks",
        level: "assembly",
        role: "locomotion_base",
        parent: "caterpillar_machine",
        children: ["left_track", "right_track"],
        styleTags: ["grounded", "stable", "mechanical", "black"],
      }),
      createGroup({
        id: "face",
        level: "assembly",
        role: "face_assembly",
        parent: "caterpillar_machine",
        children: ["face_mask", "left_eye", "right_eye", "left_brow", "right_brow"],
        styleTags: ["friendly", "expressive", "high_contrast"],
      }),
      createGroup({
        id: "main_arm",
        level: "assembly",
        role: "arm_assembly",
        parent: "caterpillar_machine",
        children: ["shoulder_mount", "boom", "stick", "glove", "glove_accent_left", "glove_accent_right"],
        styleTags: ["mechanical", "cartoon", "yellow"],
        anchors: ["shoulder_pivot", "elbow_pivot", "wrist_pivot", "hand_mount_hint"],
      }),
      createGroup({
        id: "companion",
        level: "assembly",
        role: "companion_assembly",
        parent: "caterpillar_machine",
        children: ["companion_bug"],
        styleTags: ["green", "small", "playful"],
      }),
      createGroup({
        id: "left_track",
        level: "part",
        role: "locomotion_pod",
        parent: "tracks",
        expectedColor: "black",
        styleTags: ["grounded", "stable", "mechanical", "black"],
      }),
      createGroup({
        id: "right_track",
        level: "part",
        role: "locomotion_pod",
        parent: "tracks",
        expectedColor: "black",
        styleTags: ["grounded", "stable", "mechanical", "black"],
      }),
      createGroup({
        id: "body_shell",
        level: "part",
        role: "primary_mass",
        parent: "caterpillar_machine",
        expectedColor: "yellow",
        styleTags: ["cartoon", "friendly", "dominant", "yellow"],
      }),
      createGroup({
        id: "face_mask",
        level: "feature",
        role: "face_feature",
        parent: "face",
        expectedColor: "aqua",
        styleTags: ["high_contrast", "aqua", "readable"],
      }),
      createGroup({
        id: "left_eye",
        level: "feature",
        role: "face_feature",
        parent: "face",
      }),
      createGroup({
        id: "right_eye",
        level: "feature",
        role: "face_feature",
        parent: "face",
      }),
      createGroup({
        id: "left_brow",
        level: "feature",
        role: "face_feature",
        parent: "face",
      }),
      createGroup({
        id: "right_brow",
        level: "feature",
        role: "face_feature",
        parent: "face",
      }),
      createGroup({
        id: "shoulder_mount",
        level: "part",
        role: "arm_mount",
        parent: "main_arm",
        expectedColor: "yellow",
        styleTags: ["structural", "load_path"],
      }),
      createGroup({
        id: "boom",
        level: "part",
        role: "arm_segment",
        parent: "main_arm",
        expectedColor: "yellow",
        styleTags: ["mechanical", "cartoon", "yellow"],
      }),
      createGroup({
        id: "stick",
        level: "part",
        role: "arm_segment",
        parent: "main_arm",
        expectedColor: "yellow",
        styleTags: ["mechanical", "cartoon", "yellow"],
      }),
      createGroup({
        id: "glove",
        level: "part",
        role: "end_effector",
        parent: "main_arm",
        expectedColor: "white",
        styleTags: ["cartoon", "white", "oversized"],
      }),
      createGroup({
        id: "glove_accent_left",
        level: "feature",
        role: "end_effector_accent",
        parent: "glove",
        expectedColor: "black",
        styleTags: ["black", "small", "attached"],
      }),
      createGroup({
        id: "glove_accent_right",
        level: "feature",
        role: "end_effector_accent",
        parent: "glove",
        expectedColor: "black",
        styleTags: ["black", "small", "attached"],
      }),
      createGroup({
        id: "companion_bug",
        level: "part",
        role: "perched_companion",
        parent: "companion",
        expectedColor: "green",
        styleTags: ["green", "small", "playful"],
      }),
    ],
    anchors: [
      createAnchor({ id: "body_center", on: "body_shell", position: model.bodyCenter, zone: "center_mass" }),
      createAnchor({ id: "left_track_center", on: "left_track", position: model.leftTrackCenter, zone: "center_mass" }),
      createAnchor({ id: "right_track_center", on: "right_track", position: model.rightTrackCenter, zone: "center_mass" }),
      createAnchor({ id: "shoulder_pivot", on: "body_shell", position: model.shoulderPivot, zone: "upper_side_front" }),
      createAnchor({ id: "elbow_pivot", on: "boom", position: model.elbowPivot, at: "distal_end" }),
      createAnchor({ id: "upper_arm_midpoint", on: "boom", position: model.upperArmMidpoint, zone: "upper_surface_mid" }),
      createAnchor({ id: "wrist_pivot", on: "stick", position: model.wristPivot, at: "distal_end" }),
      createAnchor({ id: "hand_mount_hint", on: "glove", position: model.handMount, at: "center_mount" }),
      createAnchor({ id: "companion_perch", on: "boom", position: model.companionPerch, zone: "upper_surface_mid" }),
    ],
    landmarks: [
      createLandmark({ id: "left_track_center", kind: "part", value: model.leftTrackCenter, on: "left_track" }),
      createLandmark({ id: "right_track_center", kind: "part", value: model.rightTrackCenter, on: "right_track" }),
      createLandmark({ id: "body_center", kind: "part", value: model.bodyCenter, on: "body_shell" }),
      createLandmark({ id: "shoulder_pivot", kind: "landmark", value: model.shoulderPivot, on: "shoulder_mount" }),
      createLandmark({ id: "shoulder_mount_hint", kind: "landmark", value: model.shoulderPivot, on: "shoulder_mount" }),
      createLandmark({ id: "elbow_pivot", kind: "landmark", value: model.elbowPivot, on: "boom" }),
      createLandmark({ id: "wrist_pivot", kind: "landmark", value: model.wristPivot, on: "stick" }),
      createLandmark({ id: "hand_mount_hint", kind: "landmark", value: model.handMount, on: "glove" }),
      createLandmark({ id: "companion_perch_hint", kind: "landmark", value: model.companionPerch, on: "companion_bug" }),
      createLandmark({ id: "upper_arm_midpoint", kind: "landmark", value: model.upperArmMidpoint, on: "boom" }),
      createLandmark({ id: "upper_arm_top_normal", kind: "vector", value: model.upperArmTopNormal, on: "boom" }),
      createLandmark({ id: "upper_arm_cylinder_face_normal", kind: "vector", value: model.upperArmCylinderFaceNormal, on: "boom" }),
      createLandmark({ id: "forearm_cylinder_face_normal", kind: "vector", value: model.forearmCylinderFaceNormal, on: "stick" }),
      createLandmark({ id: "wheel_face_normal", kind: "vector", value: model.wheelFaceNormal, on: "tracks" }),
      createLandmark({ id: "glove_accent_left", kind: "landmark", value: model.gloveAccentLeft, on: "glove_accent_left" }),
      createLandmark({ id: "glove_accent_right", kind: "landmark", value: model.gloveAccentRight, on: "glove_accent_right" }),
      createLandmark({ id: "upper_arm_length", kind: "metric", value: model.upperArmLength, on: "boom" }),
      createLandmark({ id: "forearm_length", kind: "metric", value: model.forearmLength, on: "stick" }),
      createLandmark({ id: "glove_accent_count", kind: "metric", value: 2, on: "glove" }),
    ],
    relations: [
      createRelation({ id: "machine_contains", type: "contains", parent: "caterpillar_machine", children: ["tracks", "body_shell", "face", "main_arm", "companion"] }),
      createRelation({ id: "tracks_contains", type: "contains", parent: "tracks", children: ["left_track", "right_track"] }),
      createRelation({ id: "face_contains", type: "contains", parent: "face", children: ["face_mask", "left_eye", "right_eye", "left_brow", "right_brow"] }),
      createRelation({ id: "main_arm_contains", type: "contains", parent: "main_arm", children: ["shoulder_mount", "boom", "stick", "glove", "glove_accent_left", "glove_accent_right"] }),
      createRelation({ id: "companion_contains", type: "contains", parent: "companion", children: ["companion_bug"] }),
      createRelation({ id: "tracks_mirror", type: "mirrored_with", left: "left_track", right: "right_track" }),
      createRelation({ id: "shoulder_attached", type: "attached_to", child: "shoulder_mount", parent: "body_shell" }),
      createRelation({ id: "boom_attached", type: "attached_to", child: "boom", parent: "shoulder_mount" }),
      createRelation({ id: "stick_attached", type: "attached_to", child: "stick", parent: "boom" }),
      createRelation({ id: "glove_attached", type: "attached_to", child: "glove", parent: "stick" }),
      createRelation({ id: "glove_accent_left_attached", type: "attached_to", child: "glove_accent_left", parent: "glove" }),
      createRelation({ id: "glove_accent_right_attached", type: "attached_to", child: "glove_accent_right", parent: "glove" }),
      createRelation({ id: "companion_perched", type: "perched_on", child: "companion_bug", parent: "boom", zone: "upper_surface_mid" }),
      createRelation({ id: "arm_chain", type: "sequence", items: ["shoulder_pivot", "elbow_pivot", "wrist_pivot", "hand_mount_hint"] }),
      createRelation({ id: "companion_support", type: "support", items: ["companion_perch_hint", "shoulder_pivot"] }),
      createRelation({ id: "glove_accent_pair", type: "paired_features", items: ["glove_accent_left", "glove_accent_right", "hand_mount_hint"] }),
    ],
    kinematics: [
      {
        id: "main_arm",
        parts: ["shoulder_mount", "boom", "stick", "glove"],
        endEffector: "glove",
        joints: [
          {
            id: "boom_joint",
            pivotAnchor: "shoulder_pivot",
            driver: "base_arm_angle_deg",
            segment: "boom",
            localAxis: [0, 1, 0],
            limits: { minimum: 20, maximum: 180 },
          },
          {
            id: "elbow_joint",
            pivotAnchor: "elbow_pivot",
            driver: "middle_arm_angle_deg",
            segment: "stick",
            localAxis: [0, 1, 0],
            limits: { minimum: -10, maximum: 150 },
          },
        ],
        rules: [
          "fixed_base_pivot",
          "child_inherits_parent_transform",
          "constant_segment_lengths",
          "end_effector_attached",
        ],
      },
    ],
    metadata: {
      dominantMirrorAxisHint: "y",
    },
  };
};

export const getConstructionSemantics = getCaterpillarConstructionSemantics;
