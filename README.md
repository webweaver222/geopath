# Task:
To make SPA that allows user to define route by putting seperate points on the map

# UI
App should consist of input field, list of points(addresses) and interactive map

# Task Functional Requirements 

- New point appears in the list after typing address in the input field and pressing ENTER. Also marker must appear in the center of the interactive map
- Every list item should have delete button that erases marker from the list and from the map
- Drag and drop in the list shoud be implemented
- Markers on the map also have to be draggable
- Markers on the map have to be connected with route line in the right order according to the list
- Clicking on the marker shows address in the bubble
- Any changes in the list or moving the markers have to rerender the route line

# What I used: 

* React and Redux
* Google maps Api 
  - Geocode 
  - Reverse_geocode
  - Markers
  - Polyline
* For DnD list [React List Drag and Drop](https://www.npmjs.com/package/react-list-drag-and-drop)


