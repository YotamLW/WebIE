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
// Nodal Analysis 
//

class Connection {
    complementaryConnection
    constructor (node, component, direction) {
        this.node = node
        this.component = component
        this.direction = direction
    }
}

class Node { // nodes are basically wire connections that represent constant voltage 

    voltage
    connections = [] // connections will be of the Connection class where node is the node that this one is connected to (the object itself), component is the component object, direction +1 is if the component is facing out (-1 if facing in), and complementaryConnection is the connection the other node has with this one (going in the opposite direction) 

    connectTo (node, component = "none", direction = 1) { // this function handles new connections 
        if (component == "none") {
            for (let i in node.connections) {
                node.connections[i].complementaryConnection.node = this // sets connection node of nodes connected to other node to point to this node instead 
                this.connections.push(node.connections[i]) // adds other node's connection to this node 
            }
            delete node.connections
        }
        else if (this.connections.indexOf(node) > -1) {console.log("Connection already exists")}
        else {
            let connectionOut = new Connection(node, component, direction)
            let connectionIn = new Connection(this, component, -direction)
            connectionOut.complementaryConnection = connectionIn
            connectionIn.complementaryConnection = connectionOut
            this.connections.push(connectionOut)
            node.connections.push(connectionIn)
        }
    }

    analysis () {

    }

}


//
// Components 
//

class Component {

    name = "Undefined"
    x = 0
    y = 0
    s = currentUser.s
    outputs = []

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

    potentialDifference

}

class Ground extends Component {

    name = "Ground"
    outputVoltage = 0

    analysis (inp = "output") {
        if (inp == "output") {for (let i in this.outputs) {outputs[i].analysis(this.outputVoltage)}}
        else {return 0}
    }

}

class DC_Voltage_Source extends Passive_Component {

    name = "DC Voltage source"
    outputVoltage

    constructor (pd) {
        super()
        this.potentialDifference = pd
    }

}

class Resistor extends Passive_Component {

    name = "Resistor"
    resistance

    constructor (resistance) {
        super()
        this.resistance = resistance
    }

    voltageOut (voltageIn) {return 0}

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

let r1 = new Resistor(2)
let node1 = new Node()
let node2 = new Node()
node1.voltage = 0
