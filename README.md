# spring_angular_app
Spring backend + Angular fronted (with Bootstrap) app. With authorization/registration, JWT token (per request), canvas plot


Spring REST API.

Form for entering login and password. Information about users registered in the system is stored in a separate database table (the password is stored as a hash sum). Access of unauthorized users to the main page of the application is prohibited.

A dynamically updated picture depicting an area on the coordinate plane in accordance with the number of the variant and points, the coordinates of which were specified by the user. Clicking on the image should initiate a script that determines the coordinates of a new point and sends them to the server to check if it falls into the area. The color of the dots should depend on the fact of hitting / missing the area. Changing the radius should also initiate a redraw of the image.
A table listing the results of previous checks.

All check results must be stored in a database managed by PostgreSQL (using Spring JPA)
