class CanvasGrid{
    constructor(target, {width = 700, columns = 3, rows = 5, fontsize = 20} = {}){
        this.columns = columns
        this.rows = rows
        this.fontsize = fontsize
        this.canvasHeight = this.rows * (fontsize + 2)
        this.canvasWidth = width
        this.createCanvas(target)

        this.colLength = this.canvasWidth/this.columns
        this.colIndex = Array(this.columns - 1).fill().map((col, index) => this.colLength*(index +1))
        this.rowHeight = this.fontsize+2
        this.rowIndex = Array(this.rows - 1).fill().map((row, index) => this.rowHeight*(index + 1))
        this.drawGrid(this.ctx)
    }
    createCanvas(target){
        this.canvas = document.createElement('canvas')
        this.canvas.id = 'TestCanvas'
        this.canvas.setAttribute('width', this.canvasWidth)
        this.canvas.setAttribute('height', this.canvasHeight)
        this.ctx = this.canvas.getContext('2d')
        target.appendChild(this.canvas)
    }
    drawGrid(canvasCTX){
        this.colIndex.forEach((col, index) => {
            canvasCTX.moveTo(col, 0)
            canvasCTX.lineTo(col, this.canvasHeight)
        })
        this.rowIndex.forEach((row, index) => {
            canvasCTX.moveTo(0, row)
            canvasCTX.lineTo(this.canvasWidth, row)
        })
        canvasCTX.strokeRect(0, 0, this.canvasWidth, this.canvasHeight)
        canvasCTX.stroke()
    }
}

// const test = new CanvasGrid(document.body, {columns: 5})
export { CanvasGrid }