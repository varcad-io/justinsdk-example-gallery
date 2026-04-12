use <@justinsdk/src/arc.scad>
use <@justinsdk/src/pie.scad>
use <@justinsdk/src/hollow_out.scad>

$fn = 96;

module track(radius) {
	module wheels(radius) {
		module wheel() {
			rotate_extrude() 
			translate([radius, 0, 0]) 
				circle(radius / 2);
		}
		
		for(i = [0:4:8]) {
			translate([radius * i, 0, 0])
				wheel();
		}
	}
	
    module track_profile() {
        hull() {
			circle(1.7 * radius );
			translate([radius * 8, 0, 0]) 
				circle(1.7 * radius);
		}
	}

    translate([-radius * 4, 0, -radius])
	scale([1, 1, 1.5]) {
		color("black")
		linear_extrude(radius * 1.5)
		hollow_out(shell_thickness = 0.45 * radius)
		    track_profile();

		color("white") 
		translate([0, 0, radius * 0.75]) 
		scale([1, 1, 1.5]) 
		    wheels(radius);
	}
}

module body(radius) {
	module eye() {
		translate([-radius / 15, 0, 0]) 
		rotate([0, 0, 90]) 
			arc(radius / 2, [0, 180], radius / 5, width_mode = "LINE_OUTWARD");
				
		translate([0, radius / 3, 0]) 
			circle(radius / 3);
	}

	module eyebrow() {
		rotate([0, 0, 90]) 
			arc(radius / 1.25, [25, 155], radius / 10, width_mode = "LINE_OUTWARD");
	}

    scale([1, 1, 0.9]) {
		color("yellow") 
		    sphere(radius * 4);
		
		color("Aqua") 
		rotate([85, 0, 90]) 
		intersection() {
			linear_extrude(radius * 4.5) 
			    pie(radius * 3.5, [0, 180]);
			difference() {
				sphere(radius * 4 + radius / 5);
				sphere(radius * 4);
			}
		}
		
		// eyes
		color("black") {    
			rotate([0, 65, 16]) 
			linear_extrude(radius * 4.25)
				eye();
			
			rotate([0, 65, -16]) 
			linear_extrude(radius * 4.25) 
				eye();
		}
		
		// eyebrows
		color("black") {
			rotate([0, 55, 20]) 
			linear_extrude(radius * 4.25)
				eyebrow();
				
			rotate([0, 55, -20]) 
			linear_extrude(radius * 4.25) 
				eyebrow();				
		}
	}
}

module arm_segment(radius, length, segment_radius, joint_radius) {
	translate([0, 0, -radius * 0.6]) 
	linear_extrude(radius * 1.2)
		hull() {
			circle(segment_radius);
			translate([length, 0, 0]) 
				circle(segment_radius);
		}

	translate([0, 0, -radius * 0.75]) 
	linear_extrude(radius * 1.5) 
		circle(joint_radius);
}

module arm_attachment_transform(radius, middle_arm_angle = 80) {
	upper_arm_length = radius * 9;
	forearm_length = radius * 8.5;
	elbow_bend = middle_arm_angle;

	translate([upper_arm_length, 0, 0]) 
	rotate([0, 0, elbow_bend]) 
	translate([forearm_length + radius * 0.95, 0, radius * 0.05]) 
	rotate([0, 88, 180]) 
		children();
}

module arm(radius, middle_arm_angle = 80) {
	upper_arm_length = radius * 9;
	forearm_length = radius * 8.5;
	segment_radius = radius * 0.48;
	shoulder_joint_radius = radius;
	elbow_joint_radius = radius * 0.92;
	wrist_joint_radius = radius * 0.78;
	elbow_bend = middle_arm_angle;

	color("yellow") {
		arm_segment(radius, upper_arm_length, segment_radius, shoulder_joint_radius);

		translate([upper_arm_length, 0, -radius * 0.75]) 
		linear_extrude(radius * 1.5) 
			circle(elbow_joint_radius);

		translate([upper_arm_length, 0, 0]) 
		rotate([0, 0, elbow_bend]) {
			arm_segment(radius, forearm_length, segment_radius * 0.94, elbow_joint_radius);

			translate([forearm_length, 0, -radius * 0.7]) 
			linear_extrude(radius * 1.4) 
				circle(wrist_joint_radius);
		}

		arm_attachment_transform(radius, middle_arm_angle)
			glove(radius);
	}
}

module glove(radius) {
    scale([0.8, 0.8, 1.2]) {
		color("white") {
			hull() {
				scale([1.1, 1, 0.5]) 
				    sphere(radius * 2.5);
					
				translate([-radius * 1.75, 0, radius / 1.5]) 
				scale([1, 1.75, 0.8]) 
				    sphere(radius);
			}

			translate([-radius * 2.5, 0, radius / 1.5]) 
			scale([1.2, 2, 1]) 
			    sphere(radius);

			rotate(-10)
			translate([0, -radius * 2.5, 0])  
			scale([1.75, 1, 0.8]) 
			    sphere(radius / 1.5);	
		}   
		
		color("black") 
		intersection() {
			scale([1.1, 1, 0.55]) 
			    sphere(radius * 2.5);
			
			union() {
				translate([0, radius * 0.75, -radius * 2])  
				linear_extrude(radius) 
					square([radius * 2, radius / 4], center = true);
				
				translate([0, -radius * 0.75, -radius * 2])  
				linear_extrude(radius) 
					square([radius * 2, radius / 4], center = true);				
			}
		}
	}
}

module big_caterpillar(radius, base_arm_angle = 135, middle_arm_angle = 80) {
	// Anchor the shoulder directly into the body shell instead of floating the
	// whole arm assembly above the tracks.
	shoulder_pivot = [radius * 3.5, -radius * 0.75, radius * 5.75];
	// The UI slider is expressed as "forward/backward", so map the base angle so
	// larger values swing the arm back toward the body rather than away from it.
	effective_base_arm_angle = 180 - base_arm_angle;

	translate([0, -radius * 4, 0]) 
	rotate([90, 0, 0]) 
	    track(radius);
	
	translate([0, 0, radius * 3]) 
	    body(radius);
	
	translate([0, radius * 4, 0]) 
	rotate([90, 0, 0]) 
	    track(radius);
	
	translate(shoulder_pivot) 
	rotate([270, effective_base_arm_angle, 0]) {
	    arm(radius, middle_arm_angle);

		arm_attachment_transform(radius, middle_arm_angle)
		translate([radius * 0.4, 0, radius * 2.1]) 
		rotate([180, 0, 180]) 
		small_caterpillar(radius * 0.8);
	}
}

module small_caterpillar(radius) {
	body_pts = [
	    [0, 0, -radius / 3],
		[radius * 1.5, 0, 0],
		[radius * 3, 0, radius],
		[radius * 4.25, 0, radius * 2]
	];
	
	color("LimeGreen")
	for(p = body_pts) {
	    translate(p) 
		    sphere(radius);
	}

    module eye() {
		color("white") 
		translate([0, 0, 0]) 
		    sphere(radius / 1.5);

		color("black") 
		translate([.5 * radius, radius / 4, 0]) 
		    sphere(radius / 3);

		color("white") 
		translate([.655 * radius, radius / 2.75, 0])
		    sphere(radius / 6);
	}
	
	half_r = radius / 2;
	translate([radius * 4.75, 0, radius * 3]) {
	    translate([0, half_r, 0]) eye();
		translate([0, -half_r, 0]) eye();
	}
}

module caterpillars(radius, base_arm_angle = 135, middle_arm_angle = 80) {
	big_caterpillar(radius, base_arm_angle, middle_arm_angle);
}

caterpillars(5);
