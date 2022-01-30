# Spring + Angular App (checking points on a graph)
Spring backend + Angular fronted (with Bootstrap) app. With authorization/registration, JWT token (per request), canvas graph


Spring REST API.

Form for entering login and password. Information about users registered in the system is stored in a separate database table (the password is stored as a hash sum). Access of unauthorized users to the main page of the application is prohibited.

A dynamically updated picture depicting an area on the coordinate plane in accordance with the number of the variant and points, the coordinates of which were specified by the user. Clicking on the image should initiate a script that determines the coordinates of a new point and sends them to the server to check if it falls into the area. The color of the dots should depend on the fact of hitting / missing the area. Changing the radius should also initiate a redraw of the image.
A table listing the results of previous checks.

All check results must be stored in a database managed by PostgreSQL (using Spring JPA)

https://se.ifmo.ru/courses/web?p_p_id=iapsportletlab9_WAR_iapsportlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_cacheability=cacheLevelPage?1643560446754![image](https://user-images.githubusercontent.com/54905627/151711220-00ecd284-285b-4662-a3d0-47bdccec30f9.png)
