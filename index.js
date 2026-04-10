// Generated from lib/justinsdk/examples
// @ts-nocheck
import cadRuntime from "@varcad/cad-runtime";
import * as modeling from "@jscad/modeling";

const DEFAULT_EXAMPLE = "examples/caterpillar";
const { rotateX, rotateY, rotateZ, scale, translate } = modeling.transforms;
const { colorize } = modeling.colors;

const EXAMPLE_PATHS = Object.freeze({
  "examples/bearing_captured_in_mobius_cut": "/examples/bearing_captured_in_mobius_cut.scad",
  "examples/bunny_frame": "/examples/bunny_frame.scad",
  "examples/cat_corner_protector": "/examples/cat_corner_protector.scad",
  "examples/caterpillar": "/examples/caterpillar.js",
  "examples/chrome_dino": "/examples/chrome_dino.scad",
  "examples/circle_packing/forest": "/examples/circle_packing/forest.scad",
  "examples/circle_packing/packing_circles": "/examples/circle_packing/packing_circles.scad",
  "examples/circle_packing/star_bunny": "/examples/circle_packing/star_bunny.scad",
  "examples/crystal_cluster": "/examples/crystal_cluster.scad",
  "examples/curved_cabinet": "/examples/curved_cabinet.scad",
  "examples/dancing_cubes": "/examples/dancing_cubes.scad",
  "examples/daruma": "/examples/daruma.scad",
  "examples/differential_line_growth": "/examples/differential_line_growth.scad",
  "examples/differential_line_growth_bowl": "/examples/differential_line_growth_bowl.scad",
  "examples/distorted_vase": "/examples/distorted_vase.scad",
  "examples/dot_photo_sphere": "/examples/dot_photo_sphere.scad",
  "examples/dragon/dragon_and_pearl": "/examples/dragon/dragon_and_pearl.scad",
  "examples/dragon/dragon_claw": "/examples/dragon/dragon_claw.scad",
  "examples/dragon/dragon_foot": "/examples/dragon/dragon_foot.scad",
  "examples/dragon/dragon_head": "/examples/dragon/dragon_head.scad",
  "examples/dragon/dragon_head_low_poly": "/examples/dragon/dragon_head_low_poly.scad",
  "examples/dragon/dragon_scales": "/examples/dragon/dragon_scales.scad",
  "examples/dragon/hilbert_dragon": "/examples/dragon/hilbert_dragon.scad",
  "examples/dragon/hilbert_dragon_low_poly": "/examples/dragon/hilbert_dragon_low_poly.scad",
  "examples/dragon/infinity_dragon": "/examples/dragon/infinity_dragon.scad",
  "examples/dragon/mountain_dragon": "/examples/dragon/mountain_dragon.scad",
  "examples/dragon/spiral_dragon": "/examples/dragon/spiral_dragon.scad",
  "examples/dragon/torus_knot_dragon": "/examples/dragon/torus_knot_dragon.scad",
  "examples/dragon/torus_knot_dragon_and_pearl": "/examples/dragon/torus_knot_dragon_and_pearl.scad",
  "examples/dragon/torus_knot_dragon_low_poly": "/examples/dragon/torus_knot_dragon_low_poly.scad",
  "examples/dragon/treble_clef_dragon": "/examples/dragon/treble_clef_dragon.scad",
  "examples/drilled_cube": "/examples/drilled_cube.scad",
  "examples/emoticon_moai": "/examples/emoticon_moai.scad",
  "examples/emotion_ball": "/examples/emotion_ball.scad",
  "examples/fidget_ball": "/examples/fidget_ball.scad",
  "examples/fidget_ball_fern_leaf": "/examples/fidget_ball_fern_leaf.scad",
  "examples/floor_stand/floor_stand": "/examples/floor_stand/floor_stand.scad",
  "examples/floor_stand/floor_stand_symbol": "/examples/floor_stand/floor_stand_symbol.scad",
  "examples/floor_stand/floor_stand_text": "/examples/floor_stand/floor_stand_text.scad",
  "examples/fourier_vase": "/examples/fourier_vase.scad",
  "examples/hollow_out/hollow_out_cylinder": "/examples/hollow_out/hollow_out_cylinder.scad",
  "examples/hollow_out/hollow_out_holder": "/examples/hollow_out/hollow_out_holder.scad",
  "examples/hollow_out/hollow_out_square": "/examples/hollow_out/hollow_out_square.scad",
  "examples/hollow_out/hollow_out_starburst": "/examples/hollow_out/hollow_out_starburst.scad",
  "examples/hollow_out/hollow_out_torus": "/examples/hollow_out/hollow_out_torus.scad",
  "examples/hollow_out/hollow_out_vase": "/examples/hollow_out/hollow_out_vase.scad",
  "examples/hollow_out/hollow_torus_knot": "/examples/hollow_out/hollow_torus_knot.scad",
  "examples/hypnotic_squares": "/examples/hypnotic_squares.scad",
  "examples/image_slicer": "/examples/image_slicer.scad",
  "examples/klein_bottle": "/examples/klein_bottle.scad",
  "examples/knot": "/examples/knot.scad",
  "examples/mandelbrot_set": "/examples/mandelbrot_set.scad",
  "examples/mask_hook": "/examples/mask_hook.scad",
  "examples/maze/cube_maze": "/examples/maze/cube_maze.scad",
  "examples/maze/cylinder_maze": "/examples/maze/cylinder_maze.scad",
  "examples/maze/devil_maze": "/examples/maze/devil_maze.scad",
  "examples/maze/euler_maze": "/examples/maze/euler_maze.scad",
  "examples/maze/giant_maze": "/examples/maze/giant_maze.scad",
  "examples/maze/gyro_maze": "/examples/maze/gyro_maze.scad",
  "examples/maze/heart2heart_maze": "/examples/maze/heart2heart_maze.scad",
  "examples/maze/heart_maze": "/examples/maze/heart_maze.scad",
  "examples/maze/island_maze": "/examples/maze/island_maze.scad",
  "examples/maze/maze3d": "/examples/maze/maze3d.scad",
  "examples/maze/maze3d_mickey": "/examples/maze/maze3d_mickey.scad",
  "examples/maze/maze3d_sphere": "/examples/maze/maze3d_sphere.scad",
  "examples/maze/maze_city": "/examples/maze/maze_city.scad",
  "examples/maze/maze_masking": "/examples/maze/maze_masking.scad",
  "examples/maze/maze_maze": "/examples/maze/maze_maze.scad",
  "examples/maze/maze_tower": "/examples/maze/maze_tower.scad",
  "examples/maze/maze_vase": "/examples/maze/maze_vase.scad",
  "examples/maze/maze_yinyan": "/examples/maze/maze_yinyan.scad",
  "examples/maze/mobius_maze": "/examples/maze/mobius_maze.scad",
  "examples/maze/noisy_circle_maze": "/examples/maze/noisy_circle_maze.scad",
  "examples/maze/pyramid_hex_maze": "/examples/maze/pyramid_hex_maze.scad",
  "examples/maze/pyramid_maze": "/examples/maze/pyramid_maze.scad",
  "examples/maze/random_scala": "/examples/maze/random_scala.scad",
  "examples/maze/regular_polygon_maze": "/examples/maze/regular_polygon_maze.scad",
  "examples/maze/rock_theta_maze": "/examples/maze/rock_theta_maze.scad",
  "examples/maze/senbon_torii": "/examples/maze/senbon_torii.scad",
  "examples/maze/sphere_maze": "/examples/maze/sphere_maze.scad",
  "examples/maze/spiral_maze": "/examples/maze/spiral_maze.scad",
  "examples/maze/square_maze": "/examples/maze/square_maze.scad",
  "examples/maze/step_pyramid_maze": "/examples/maze/step_pyramid_maze.scad",
  "examples/maze/stereographic_hex_maze": "/examples/maze/stereographic_hex_maze.scad",
  "examples/maze/stereographic_square_maze": "/examples/maze/stereographic_square_maze.scad",
  "examples/maze/theta_maze": "/examples/maze/theta_maze.scad",
  "examples/maze/torus_knot_maze": "/examples/maze/torus_knot_maze.scad",
  "examples/maze/torus_maze": "/examples/maze/torus_maze.scad",
  "examples/maze/twisted_maze": "/examples/maze/twisted_maze.scad",
  "examples/melted_clock": "/examples/melted_clock.scad",
  "examples/mobius_twins": "/examples/mobius_twins.scad",
  "examples/ms_clippy": "/examples/ms_clippy.scad",
  "examples/multiplication_puzzle.": "/examples/multiplication_puzzle..scad",
  "examples/owl": "/examples/owl.scad",
  "examples/perlin_noise_cylinder": "/examples/perlin_noise_cylinder.scad",
  "examples/photo_fibonacci_lattice": "/examples/photo_fibonacci_lattice.scad",
  "examples/photo_sphere": "/examples/photo_sphere.scad",
  "examples/platonic_solid_wireframe": "/examples/platonic_solid_wireframe.scad",
  "examples/qr_coder": "/examples/qr_coder.scad",
  "examples/rubber_duck_debugging": "/examples/rubber_duck_debugging.scad",
  "examples/samurai_daruma": "/examples/samurai_daruma.scad",
  "examples/shape2wire": "/examples/shape2wire.scad",
  "examples/sierpinski_pyramid": "/examples/sierpinski_pyramid.scad",
  "examples/soccer_polyhedron/soccer_jigsaw": "/examples/soccer_polyhedron/soccer_jigsaw.scad",
  "examples/soccer_polyhedron/soccer_polyhedron": "/examples/soccer_polyhedron/soccer_polyhedron.scad",
  "examples/spiral/L_puzzle": "/examples/spiral/L_puzzle.scad",
  "examples/spiral/bauer_text_sphere": "/examples/spiral/bauer_text_sphere.scad",
  "examples/spiral/climbing_rose": "/examples/spiral/climbing_rose.scad",
  "examples/spiral/golden_spiral_jigsaw_puzzle": "/examples/spiral/golden_spiral_jigsaw_puzzle.scad",
  "examples/spiral/heart_chain": "/examples/spiral/heart_chain.scad",
  "examples/spiral/lotus_like_flower": "/examples/spiral/lotus_like_flower.scad",
  "examples/spiral/moving_fish": "/examples/spiral/moving_fish.scad",
  "examples/spiral/nautilus_shell": "/examples/spiral/nautilus_shell.scad",
  "examples/spiral/rose": "/examples/spiral/rose.scad",
  "examples/spiral/seashell": "/examples/spiral/seashell.scad",
  "examples/spiral/simple_seashell": "/examples/spiral/simple_seashell.scad",
  "examples/spiral/spiral_city": "/examples/spiral/spiral_city.scad",
  "examples/spiral/spiral_math_constants": "/examples/spiral/spiral_math_constants.scad",
  "examples/spiral/spiral_ripples": "/examples/spiral/spiral_ripples.scad",
  "examples/spiral/spring_dog": "/examples/spiral/spring_dog.scad",
  "examples/spiral/string_tetrahedron": "/examples/spiral/string_tetrahedron.scad",
  "examples/spiral/string_tetrahedrons": "/examples/spiral/string_tetrahedrons.scad",
  "examples/spiral/text_sphere": "/examples/spiral/text_sphere.scad",
  "examples/spiral/text_tower": "/examples/spiral/text_tower.scad",
  "examples/spiral/twist_bottle": "/examples/spiral/twist_bottle.scad",
  "examples/spiral/twist_taiji": "/examples/spiral/twist_taiji.scad",
  "examples/spiral/vx_spiral_text": "/examples/spiral/vx_spiral_text.scad",
  "examples/spiral/xmas_tree": "/examples/spiral/xmas_tree.scad",
  "examples/spiral_polygons/fidget_boo": "/examples/spiral_polygons/fidget_boo.scad",
  "examples/spiral_polygons/fidget_cat": "/examples/spiral_polygons/fidget_cat.scad",
  "examples/spiral_polygons/fidget_heart": "/examples/spiral_polygons/fidget_heart.scad",
  "examples/spiral_polygons/fidget_polygon": "/examples/spiral_polygons/fidget_polygon.scad",
  "examples/spiral_polygons/fidget_pumpkin": "/examples/spiral_polygons/fidget_pumpkin.scad",
  "examples/spiral_polygons/fidget_skull": "/examples/spiral_polygons/fidget_skull.scad",
  "examples/spiral_polygons/fidget_star": "/examples/spiral_polygons/fidget_star.scad",
  "examples/spiral_polygons/helix_lampshade": "/examples/spiral_polygons/helix_lampshade.scad",
  "examples/spiral_polygons/spiral_plate": "/examples/spiral_polygons/spiral_plate.scad",
  "examples/spiral_polygons/spiral_polygons": "/examples/spiral_polygons/spiral_polygons.scad",
  "examples/spiral_polygons/square_pursuit_3d": "/examples/spiral_polygons/square_pursuit_3d.scad",
  "examples/spiral_polygons/stick_tower": "/examples/spiral_polygons/stick_tower.scad",
  "examples/stereographic_projection/stereographic_caterpillar": "/examples/stereographic_projection/stereographic_caterpillar.scad",
  "examples/stereographic_projection/stereographic_chars": "/examples/stereographic_projection/stereographic_chars.scad",
  "examples/stereographic_projection/stereographic_foliage_scroll": "/examples/stereographic_projection/stereographic_foliage_scroll.scad",
  "examples/stereographic_projection/stereographic_projection": "/examples/stereographic_projection/stereographic_projection.scad",
  "examples/superformula_vase": "/examples/superformula_vase.scad",
  "examples/tableware_organizer": "/examples/tableware_organizer.scad",
  "examples/taiji": "/examples/taiji.scad",
  "examples/taiwan/SD_Card_Taiwan": "/examples/taiwan/SD_Card_Taiwan.scad",
  "examples/taiwan/TaiwaneseBlackBear": "/examples/taiwan/TaiwaneseBlackBear.scad",
  "examples/taiwan/cargo_container_landmark": "/examples/taiwan/cargo_container_landmark.scad",
  "examples/taiwan/chair_score": "/examples/taiwan/chair_score.scad",
  "examples/taiwan/dancing_taiwan": "/examples/taiwan/dancing_taiwan.scad",
  "examples/taiwan/golden_taiwan": "/examples/taiwan/golden_taiwan.scad",
  "examples/taiwan/leopard_cat_taiwan": "/examples/taiwan/leopard_cat_taiwan.scad",
  "examples/taiwan/maze_city_taiwan": "/examples/taiwan/maze_city_taiwan.scad",
  "examples/taiwan/random_city_taiwan": "/examples/taiwan/random_city_taiwan.scad",
  "examples/taiwan/voronoi_taiwan": "/examples/taiwan/voronoi_taiwan.scad",
  "examples/tetrapod_doll": "/examples/tetrapod_doll.scad",
  "examples/text_box": "/examples/text_box.scad",
  "examples/tiles/2_corner_wang_tiles_basic": "/examples/tiles/2_corner_wang_tiles_basic.scad",
  "examples/tiles/2_edge_wang_tiles_basic": "/examples/tiles/2_edge_wang_tiles_basic.scad",
  "examples/tiles/city_tile": "/examples/tiles/city_tile.scad",
  "examples/tiles/hitomezashi_stitching": "/examples/tiles/hitomezashi_stitching.scad",
  "examples/tiles/knot_tiles": "/examples/tiles/knot_tiles.scad",
  "examples/tiles/lavender": "/examples/tiles/lavender.scad",
  "examples/tiles/magic_apartment": "/examples/tiles/magic_apartment.scad",
  "examples/tiles/penrose_basket": "/examples/tiles/penrose_basket.scad",
  "examples/tiles/penrose_crystallization": "/examples/tiles/penrose_crystallization.scad",
  "examples/tiles/random_city": "/examples/tiles/random_city.scad",
  "examples/tiles/random_town_square": "/examples/tiles/random_town_square.scad",
  "examples/tiles/tiled_line_mobius": "/examples/tiles/tiled_line_mobius.scad",
  "examples/tiles/tiled_line_ring": "/examples/tiles/tiled_line_ring.scad",
  "examples/tiles/tiled_line_torus": "/examples/tiles/tiled_line_torus.scad",
  "examples/tiles/tiled_lines": "/examples/tiles/tiled_lines.scad",
  "examples/tiles/tiled_quarter_circles": "/examples/tiles/tiled_quarter_circles.scad",
  "examples/tiles/tiles_wfc_tube": "/examples/tiles/tiles_wfc_tube.scad",
  "examples/tiles/tube_box": "/examples/tiles/tube_box.scad",
  "examples/trefoil_klein_bottle": "/examples/trefoil_klein_bottle.scad",
  "examples/triangle2square/triangle2square": "/examples/triangle2square/triangle2square.scad",
  "examples/triangle2square/triangle2square_box": "/examples/triangle2square/triangle2square_box.scad",
  "examples/triangle2square/triangle2square_pendant": "/examples/triangle2square/triangle2square_pendant.scad",
  "examples/triangle_splice": "/examples/triangle_splice.scad",
  "examples/turtle/fern_leaf_stencil": "/examples/turtle/fern_leaf_stencil.scad",
  "examples/turtle/forest": "/examples/turtle/forest.scad",
  "examples/turtle/hilbert_curve_drawing": "/examples/turtle/hilbert_curve_drawing.scad",
  "examples/turtle/lsystem2_collection": "/examples/turtle/lsystem2_collection.scad",
  "examples/turtle/lsystem3_collection": "/examples/turtle/lsystem3_collection.scad",
  "examples/turtle/sierpinski_triangle": "/examples/turtle/sierpinski_triangle.scad",
  "examples/turtle/tree": "/examples/turtle/tree.scad",
  "examples/twisted_ring": "/examples/twisted_ring.scad",
  "examples/vampire_pen_holder": "/examples/vampire_pen_holder.scad",
  "examples/voronoi/delaunay_fibonacci": "/examples/voronoi/delaunay_fibonacci.scad",
  "examples/voronoi/ripple_sphere": "/examples/voronoi/ripple_sphere.scad",
  "examples/voronoi/ripple_vase": "/examples/voronoi/ripple_vase.scad",
  "examples/voronoi/ripples": "/examples/voronoi/ripples.scad",
  "examples/voronoi/rock_horn": "/examples/voronoi/rock_horn.scad",
  "examples/voronoi/ruyi_pineapple": "/examples/voronoi/ruyi_pineapple.scad",
  "examples/voronoi/voronoi_bracelet": "/examples/voronoi/voronoi_bracelet.scad",
  "examples/voronoi/voronoi_crystallization": "/examples/voronoi/voronoi_crystallization.scad",
  "examples/voronoi/voronoi_fibonacci": "/examples/voronoi/voronoi_fibonacci.scad",
  "examples/voronoi/voronoi_fibonacci2": "/examples/voronoi/voronoi_fibonacci2.scad",
  "examples/voronoi/voronoi_holder": "/examples/voronoi/voronoi_holder.scad",
  "examples/voronoi/voronoi_melon": "/examples/voronoi/voronoi_melon.scad",
  "examples/voronoi/voronoi_penholder": "/examples/voronoi/voronoi_penholder.scad",
  "examples/voronoi/voronoi_sphere": "/examples/voronoi/voronoi_sphere.scad",
  "examples/voronoi/voronoi_torus": "/examples/voronoi/voronoi_torus.scad",
  "examples/voronoi/voronoi_vase": "/examples/voronoi/voronoi_vase.scad",
  "examples/voronoi/worley_vase": "/examples/voronoi/worley_vase.scad",
  "examples/voxel_vase": "/examples/voxel_vase.scad",
  "examples/walk_torus83_fort": "/examples/walk_torus83_fort.scad",
  "examples/worley_noise_ball": "/examples/worley_noise_ball.scad",
  "examples/wormhole": "/examples/wormhole.scad"
});

export const EXAMPLE_OPTIONS = Object.freeze(
  Object.entries(EXAMPLE_PATHS).map(([id, modulePath]) => ({
    id,
    path: modulePath,
    label: id,
  })),
);

const FAMILY_PREFIXES = Object.freeze({
  dragon: "examples/dragon/",
  maze: "examples/maze/",
  spiral: "examples/spiral/",
  spiralPolygons: "examples/spiral_polygons/",
  organicCirclePacking: "examples/circle_packing/",
  organicTurtle: "examples/turtle/",
  organicVoronoi: "examples/voronoi/",
});

const CATERPILLAR_EXAMPLES = Object.freeze([
  "examples/caterpillar",
  "examples/stereographic_projection/stereographic_caterpillar",
]);

const toFiniteNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toPositiveInteger = (value, fallback = 1, { min = 1, max = 8 } = {}) => {
  const parsed = Math.round(toFiniteNumber(value, fallback));
  return Math.max(min, Math.min(max, parsed));
};

const degreesToRadians = (value) => (toFiniteNumber(value, 0) * Math.PI) / 180;
const normalizeVector3 = (value, fallback = [0, 0, 0]) => {
  const source = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : value == null
        ? []
        : [value];
  const numbers = source
    .slice(0, 3)
    .map((entry, index) => toFiniteNumber(entry, fallback[index] ?? 0));
  while (numbers.length < 3) {
    numbers.push(fallback[numbers.length] ?? 0);
  }
  return numbers;
};
const hexToColorArray = (value, fallback = "#67b3ff") => {
  const normalized = String(value || fallback).trim().toLowerCase();
  const hex = /^#[0-9a-f]{6}$/.test(normalized)
    ? normalized.slice(1)
    : /^#[0-9a-f]{3}$/.test(normalized)
      ? `${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`
      : String(fallback || "#67b3ff").replace("#", "");
  const numeric = Number.parseInt(hex, 16);
  return [
    ((numeric >> 16) & 255) / 255,
    ((numeric >> 8) & 255) / 255,
    (numeric & 255) / 255,
    1,
  ];
};

const asGeometryList = (value) =>
  (Array.isArray(value) ? value.flat(Infinity) : [value]).filter(Boolean);

const fromGeometryList = (value) => {
  const geometries = asGeometryList(value);
  if (geometries.length === 0) {
    return null;
  }
  return geometries.length === 1 ? geometries[0] : geometries;
};

const mapGeometryList = (value, mapper) =>
  fromGeometryList(asGeometryList(value).map((geometry) => mapper(geometry)).filter(Boolean));

const translateGeometry = (value, offset = [0, 0, 0]) =>
  mapGeometryList(value, (geometry) => translate(offset, geometry));

const rotateGeometryX = (value, degrees = 0) => {
  const radians = degreesToRadians(degrees);
  return radians ? mapGeometryList(value, (geometry) => rotateX(radians, geometry)) : value;
};

const rotateGeometryZ = (value, degrees = 0) => {
  const radians = degreesToRadians(degrees);
  return radians ? mapGeometryList(value, (geometry) => rotateZ(radians, geometry)) : value;
};

const rotateGeometryY = (value, degrees = 0) => {
  const radians = degreesToRadians(degrees);
  return radians && typeof rotateY === "function"
    ? mapGeometryList(value, (geometry) => rotateY(radians, geometry))
    : value;
};

const scaleGeometryUniform = (value, factor = 1) => {
  const parsed = toFiniteNumber(factor, 1);
  return parsed === 1 ? value : mapGeometryList(value, (geometry) => scale([parsed, parsed, parsed], geometry));
};

const mirrorGeometryOnX = (value) =>
  mapGeometryList(value, (geometry) => scale([-1, 1, 1], geometry));

const tintGeometry = (value, hexColor = "#67b3ff") =>
  typeof colorize === "function"
    ? mapGeometryList(value, (geometry) => colorize(hexToColorArray(hexColor), geometry))
    : value;

const duplicateAlongX = (value, count = 1, spacing = 90) => {
  const geometryList = asGeometryList(value);
  if (geometryList.length === 0) {
    return null;
  }
  const duplicateCount = toPositiveInteger(count, 1, { min: 1, max: 6 });
  if (duplicateCount <= 1) {
    return fromGeometryList(geometryList);
  }
  const offsetStart = ((duplicateCount - 1) * spacing) / 2;
  const duplicates = [];
  for (let index = 0; index < duplicateCount; index += 1) {
    const offset = index * spacing - offsetStart;
    for (const geometry of geometryList) {
      duplicates.push(translate([offset, 0, 0], geometry));
    }
  }
  return fromGeometryList(duplicates);
};

const orbitCopies = (value, count = 1, radius = 120) => {
  const geometryList = asGeometryList(value);
  if (geometryList.length === 0) {
    return null;
  }
  const duplicateCount = toPositiveInteger(count, 1, { min: 1, max: 8 });
  if (duplicateCount <= 1) {
    return fromGeometryList(geometryList);
  }
  const nextRadius = toFiniteNumber(radius, 120);
  const duplicates = [];
  for (let index = 0; index < duplicateCount; index += 1) {
    const angle = (Math.PI * 2 * index) / duplicateCount;
    const x = Math.cos(angle) * nextRadius;
    const y = Math.sin(angle) * nextRadius;
    for (const geometry of geometryList) {
      duplicates.push(translate([x, y, 0], rotateZ(angle, geometry)));
    }
  }
  return fromGeometryList(duplicates);
};

const applyGlobalPresentation = (value, variables = {}) => {
  let next = value;
  next = scaleGeometryUniform(next, variables.display_scale ?? 1);
  next = translateGeometry(next, normalizeVector3(variables.offset_xyz, [0, 0, 0]));
  const [rotateXDeg, rotateYDeg, rotateZDeg] = normalizeVector3(variables.rotate_xyz, [0, 0, 0]);
  next = rotateGeometryX(next, rotateXDeg);
  next = rotateGeometryY(next, rotateYDeg);
  next = rotateGeometryZ(next, rotateZDeg);
  next = rotateGeometryZ(next, variables.yaw_deg ?? 0);
  next = tintGeometry(next, variables.accent_color ?? "#67b3ff");
  return next;
};

const isOrganicExample = (selectedExample) =>
  selectedExample.startsWith(FAMILY_PREFIXES.organicCirclePacking)
  || selectedExample.startsWith(FAMILY_PREFIXES.organicTurtle)
  || selectedExample.startsWith(FAMILY_PREFIXES.organicVoronoi);

const applyExampleSpecificPresentation = (selectedExample, value, variables = {}) => {
  let next = value;

  if (CATERPILLAR_EXAMPLES.includes(selectedExample)) {
    next = duplicateAlongX(
      next,
      variables.caterpillar_companions ?? 1,
      toFiniteNumber(variables.caterpillar_spacing, 120),
    );
  }

  if (selectedExample.startsWith(FAMILY_PREFIXES.maze)) {
    next = translateGeometry(next, [0, 0, toFiniteNumber(variables.maze_lift_z, 0)]);
    next = rotateGeometryZ(next, variables.maze_spin_deg ?? 0);
    if (variables.maze_ring_layout) {
      next = orbitCopies(
        next,
        variables.maze_ring_count ?? 3,
        toFiniteNumber(variables.maze_ring_radius, 130),
      );
    }
  }

  if (selectedExample.startsWith(FAMILY_PREFIXES.dragon)) {
    next = rotateGeometryX(next, variables.dragon_pitch_deg ?? 0);
    if (variables.dragon_mirror) {
      next = mirrorGeometryOnX(next);
    }
  }

  if (
    selectedExample.startsWith(FAMILY_PREFIXES.spiral)
    || selectedExample.startsWith(FAMILY_PREFIXES.spiralPolygons)
  ) {
    next = orbitCopies(
      next,
      variables.spiral_copies ?? 1,
      toFiniteNumber(variables.spiral_orbit_radius, 140),
    );
  }

  if (isOrganicExample(selectedExample)) {
    if (variables.organic_radial_layout) {
      next = orbitCopies(
        next,
        variables.organic_copies ?? 1,
        toFiniteNumber(variables.organic_orbit_radius, 95),
      );
    }
  }

  return next;
};

export async function main({ variables = {} } = {}) {
  const selectedExample = String(variables.example || DEFAULT_EXAMPLE);
  const modulePath = EXAMPLE_PATHS[selectedExample] || EXAMPLE_PATHS[DEFAULT_EXAMPLE];
  const selectedModule = await cadRuntime.importModule(modulePath, { fromPath: "/index.js" });
  const exampleGeometry = typeof selectedModule?.main === "function"
    ? await selectedModule.main({ variables })
    : (selectedModule?.default ?? selectedModule);
  const globallyAdjusted = applyGlobalPresentation(exampleGeometry, variables);
  return applyExampleSpecificPresentation(selectedExample, globallyAdjusted, variables);
}
