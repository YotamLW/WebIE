/* This is code for general user interface to be used by multiple pages 

Copyright (C) 2026 Yotam Limor-Waisberg 
For more information visit <https://www.github.com/YotamLW/WebIE> 

This program is free software: you can redistribute it and/or modify 
it under the terms of the GNU Affero General Public License as 
published by the Free Software Foundation, either version 3 of the 
License, or (at your option) any later version. 

This program is distributed in the hope that it will be useful, 
but WITHOUT ANY WARRANTY; without even the implied warranty of 
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the 
GNU Affero General Public License for more details. 

You should have received a copy of the GNU Affero General Public License 
along with this program.  If not, see <https://www.gnu.org/licenses/>. 
*/

// setting up canvas 
let canvas = document.getElementById("screen")
let c = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.position = "absolute"
canvas.style.top = "0"
canvas.style.left = "0"

// UI global variables 
let w = canvas.width // screen width 
let h = canvas.height // screen height 

function refreshScreen () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    w = canvas.width
    h = canvas.height
}


// declaration of the user class, which affects positioning of elements on the canvas 
class User {

    name
    // pixels away from centre of screen 
    x = 0
    y = 0

    sf = 20 // base size factor (temporary fixed value - will later be dependent on width and height of screen) 
    zoom = 0 // zoom level 
    s = this.sf * exp(this.zoom) // size factor adjusted to zoom 
    zoomIncrement = 0.2
    maxZoom = 2
    zoomType = "mouse" // mouse-relative or screen-centre-relative 

    constructor (name) {this.name = name}

    move (dx, dy) {
        this.x -= dx
        this.y += dy
    }

    zoomFunction (event) {
        this.zoom -= this.zoomIncrement * event.deltaY / 100 // +- the zoom increment per mouse scroll (deltaY is 0, 100 or -100) 
        if (this.zoom < -maxZoom) {this.zoom = -maxZoom}
        else if (this.zoom > maxZoom) {this.zoom = maxZoom} // prevents scrolling too much 
        else {
            if (this.zoomType == "mouse") {player1.x += event.x - w/2; player1.y -= event.y - h/2} // moves centre to cursor position 
            player1.x *= exp(event.deltaY < 0 ? this.zoomIncrement : -this.zoomIncrement)
            player1.y *= exp(event.deltaY < 0 ? this.zoomIncrement : -this.zoomIncrement)
            if (this.zoomType == "mouse") {player1.x -= event.x - w/2; player1.y += event.y - h/2} // moves centre back (mouse-centred scrolling) 
        }
        this.s = this.sf * exp(this.zoom) // zoom level is applied exponentially for smoother feel (base is arbitrary) 
    }

    // function to draw an object (rotation coming soon) given its centre coordinates (and relative to user position) 
    drawSomething (obj, cx, cy) {
        c.save()
        c.translate(cx - this.x, cy + this.y)
        obj.draw()
        c.restore()
    }

    reset () {
        this.x = 0
        this.y = 0
        this.zoom = 0
        this.s = this.sf
    }

}