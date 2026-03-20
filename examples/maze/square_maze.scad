use <@justinsdk/src/maze/mz_square.scad>
use <@justinsdk/src/maze/mz_squarewalls.scad>
use <@justinsdk/src/polyline_join.scad>

module square_maze(rows, cell_width, wall_thickness) {
    cells = mz_square(rows, rows);
    walls = mz_squarewalls(cells, cell_width);

    for(wall = walls) {
        polyline_join(wall)
            square(wall_thickness, center = true);
    } 
}

square_maze(
    rows = 10, 
    cell_width = 2, 
    wall_thickness = 1
);