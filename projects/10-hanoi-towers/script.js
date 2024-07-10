const towerList = Array.from(document.querySelectorAll('.tower'));

const main = document.querySelector('main');

// TBD - create listener and get the number of disks, 
//       limit the number of disks
let numOfDisks = 4, maxWidth = 180, minus = 20, diskHeight = 20, towerBottomMargin = 10; 
// TBD - above some things that should not be hardcoded
// diskHeight is also a tower base height
const disks = [];
/* JS objects are built by Prototypes - they're actually
enveloped now by the syntax of classes */

// This array should keep "clicks" on the towers
const twoClicks = [];

/********* Get Random Color ***********/
const getRand0To255 = () => Math.floor(Math.random() * 256);

const getColor = () => `rgb(${getRand0To255()},${getRand0To255()},${getRand0To255()})`;

/********* Classes ***********/
class Tower {

    constructor(elTower) {

        this.disks = []
        this.elTower = elTower;

    }

    findMiddle() {
        // The leftmost point + half of the width
        this.middle = this.elTower.offsetLeft + this.elTower.offsetWidth / 2;
        console.log(`This.middle = ${this.middle}`);

    }

    removeDisk() {
        return this.disks.pop();
    }

    addDisk(disk) {
        // tbd: if we could add this disk here
        // tbd: set x and y of the disk - get for this "this.middle"
        disk.setX(this.middle);
        disk.setY((this.disks.length + 1) * diskHeight + towerBottomMargin);
        this.disks.push(disk);
    }

    hasDisks() {
        return this.disks.length > 0;
    }

}

class Disk {

    constructor(elDisk,width) {
        this.elDisk = elDisk;
        this.elDisk.style.backgroundColor = getColor();
        this.width = width;
        this.elDisk.style.width = this.width + 'px';
    }

    setX(towerMiddle) {
        console.log(`towerMiddle=${towerMiddle}`)
        console.log(`this.width=${this.width}`)
        this.x = towerMiddle - this.width / 2; 
        this.elDisk.style.left = this.x + 'px';
    }
    
    setY(currentHeight) {
        // tbd
        this.y = currentHeight;
        this.elDisk.style.bottom = this.y + 'px';
    }

}

/*********************** Create Tower Objects ***************************/

const towers = towerList.map(el => {
    
    // const currDate = new Date();
    // const endOfMay = new Date('2024-05-31');
    // Operator "new": 1. Gets location in the memory and now "newTower"
    //                     points to this location in the memory
    //                 2. Calls class Tower constructor function 
    //                 3. Points "this" to the current new location in the memory
    const newTower = new Tower(el);
    newTower.findMiddle();

    return newTower;
    
}) 

/*********************** Create Disk Objects ***************************/
for (let i = 0; i < numOfDisks; i++) {

    const newDiskEl = document.createElement('div');
    newDiskEl.classList.add('disk');
    main.append(newDiskEl);

    // Calculate width:
    // i = 0 width = 180 = maxWidth - minus * i
    // i = 1 width = 160 = maxWidth - minus * i
    // i = 2 width = 140 = maxWidth - minus * i
    // i = 3 width = 120 = maxWidth - minus * i 

    const newDisk = new Disk(newDiskEl, maxWidth - minus * i);

    disks.push(newDisk);
    towers[0].addDisk(newDisk);

}

main.addEventListener('click',(e) => {

    let clickedObject = null;

    if (e.target.classList.contains('tower')) clickedObject = e.target
    else if (e.target.parentElement.classList.contains('tower')) {
        clickedObject = e.target.parentElement
    }
    // tbd - how you get from "click" on some disk to it's tower

    if (clickedObject) {
       
        if (twoClicks[0] === undefined) {
            
            let id = towerList.indexOf(clickedObject);

            if (towers[id].hasDisks()) {
                twoClicks[0] = id;
                clickedObject.classList.add('clicked');
            }
            
        }
    }

})