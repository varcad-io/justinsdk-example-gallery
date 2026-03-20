use <@justinsdk/src/shape_circle.scad>
use <@justinsdk/src/midpt_smooth.scad>
use <@justinsdk/src/polyline_join.scad>
use <@justinsdk/src/in_shape.scad>
use <@justinsdk/src/polyhedra/icosahedron.scad>
use <@justinsdk/src/triangle/tri_delaunay.scad>
use <@justinsdk/src/triangle/tri_incenter.scad>
use <@justinsdk/src/surface/sf_thickenT.scad>
use <@justinsdk/src/experimental/differential_line_growth.scad>
use <@justinsdk/src/experimental/ptf_c2sphere.scad>

$fn = 24;
r = 10;
times = 50;
line_r = 2;
smooth = true;
smooth_times = 2;
filled = true;
node_option = [
    0.4,    // maxForce 
    0.5,    // maxSpeed
    5,      // separationDistance
    1.2,    // separationCohesionRatio 
    4       // maxEdgeLength
];

init_shape = shape_circle(r);
poly = differential_line_growth(init_shape, node_option, times);
smoothed = smooth ? midpt_smooth(poly, smooth_times, true) : poly;

sphere_r = norm(max(smoothed));
sphere_path = [for(p = smoothed) ptf_c2sphere(p, sphere_r)];

if(filled) {
    triangles = [
        for(t = tri_delaunay(smoothed))
        let(tri = [for(i = t) smoothed[i]])
        if(in_shape(smoothed, tri_incenter(tri))) t
    ];

    sf_thickenT(sphere_path, line_r, triangles);
}

polyline_join([each sphere_path, sphere_path[0]])
    icosahedron(line_r);
