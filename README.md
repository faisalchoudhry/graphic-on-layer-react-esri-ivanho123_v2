# graphic-on-layer-react-esri-ivanho123_v2
 
Navigation header

-Using react-router and navlinks

-Responsive menu with ‘burger button’ like app bar from Material UI -Navigation page items ‘Main’, ‘Gegevens’,‘Projects’, ‘Colofon’
-Main is where webmap, other pages be components with dummytext later development

Sidebar widget

This is a widget where user can interact with map and has the following functions:

-dropdown for choosing area type (key ‘gebied’) from places API, places with this area type are only visible on map

-radio button for showing or not showing new polygon layer stations 
-Slider 1 rangeslider for setting % ‘PRIJSEFFECT’ 
-Slider 2 rangeslider for setting ‘MARKTWAARDE’

-Update button component Updateplaces.js

-When user interacts with dashboard like setting slider, API call to backend and new places response is loaded to map

-Widget with ‘Output Dashboard’ total sum of values of ‘TIJD_PRIJS_1’ of places selected -details about widget will follow
 
Two layers added

-Extra layers named ‘route’ and ‘busstations’ will be added to map

-It is possible to add or remove graphics from a FeatureLayer (applyEdits)

-See sidebar widget where user can select/deselect a selectbox

==All things implemented