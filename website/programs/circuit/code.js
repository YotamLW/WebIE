/* This code is for the circuit sandbox simulator 

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

let cTime = Date.now() // current live time 
let pTime // live time at of previous iteration 
let dt  // difference in time (unfortunately not infinitesimal) 



//
// Components 
//

class Component {

    x = 0
    y = 0
    s = currentUser.s

    fillStyle = "magenta"
    strokeStyle = "black"
    lineWidth = this.s / 10

    setDrawParameters () { // function to avoid repeated setting of drawing parameters (only really useful for many repeated components) 
        c.fillStyle = this.fillStyle
        c.strokeStyle = this.strokeStyle
        c.lineWidth = this.lineWidth
    }

    draw () { // default unassigned component symbol 
        c.beginPath()
        c.moveTo(-this.s, -this.s)
        c.lineTo(this.s, -this.s)
        c.lineTo(this.s, this.s)
        c.lineTo(-this.s, this.s)
        c.lineTo(-this.s, -this.s)
        c.fill()
        c.stroke()
    }

}

class Passive_Component extends Component {

    input

}

class DC_Voltage_Source extends Passive_Component {

    name = "DC Voltage source"
    pd = 10

}

class Resistor extends Passive_Component {

    name = "Resistor"
    resistance = 1

    fillStyle = "white"

    draw () {
        c.beginPath()
        c.moveTo(4 * -this.s, -this.s)
        c.lineTo(4 * this.s, -this.s)
        c.lineTo(4 * this.s, this.s)
        c.lineTo(4 * -this.s, this.s)
        c.lineTo(4 * -this.s, -this.s)
        c.fill()
        c.stroke()
    }

}