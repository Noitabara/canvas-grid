class Start{
    constructor(target, height = 500, width = 500){
        this.height = height
        this.width = width
        this.createCanvas(target)
    }
    createCanvas(target){
        this.canvas = document.createElement('canvas')
        this.canvas.id = 'TestCanvas'
        this.canvas.setAttribute('width', this.width)
        this.canvas.setAttribute('height', this.height)
        this.ctx = this.canvas.getContext('2d')
        target.appendChild(this.canvas)
    }

}
class Grid{
    constructor(target, columns = 3, rows = 5, fontSize = 20){
        this.columns = columns
        this.rows = rows
        this.canvasHeight = target.canvas.height
        this.canvasWidth = target.canvas.width

        this.fontSize = fontSize

        this.colLength = this.canvasWidth/this.columns
        this.colIndex = Array(this.columns - 1).fill().map((col, index) => this.colLength*(index+1))
        this.rowHeight = this.fontSize+2
        this.rowIndex = Array(this.rows - 1).fill().map((row, index) => this.rowHeight*(index+1))

        this.drawGrid(target.ctx)
    }
    drawGrid(canvasCTX){
        // * Draws Columns
        this.colIndex.forEach((col, index) => {
            canvasCTX.moveTo(col, 0)
            canvasCTX.lineTo(col, this.canvasHeight)
        })
        // * Draws Rows
        this.rowIndex.forEach((row, index) => {
            canvasCTX.moveTo(0, row)
            canvasCTX.lineTo(this.canvasWidth, row)
        })
        // * DRAW THAT STUFF BOI.
        canvasCTX.stroke()
    }
}
const test = new Start(document.body)
const grid = new Grid(test)