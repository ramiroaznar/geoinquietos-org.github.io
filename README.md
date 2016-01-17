geoinquietos.org
======================

This is a jekyll powered site to render data about [Geoinquietos](http://www.geoinquietos.org) groups.
The site contains two entities:

- Groups
- Contacts

Groups are listed on the main page and every group details page renders several information and contact links.

Apart from groups and contact details a [groups.json](http://geoinquietos-org.github.io/groups.json) GeoJSON is generated that is fed into a [CartoDB table](https://team.cartodb.com/u/jsanz/tables/groups/public) that is used from the front page and group details page. The code related with these maps is easily found at the front page and group template.

Only templates are in Spanish so it should be quite straight forward to replicate this site with other groups.

Comments are welcomed as issues.
