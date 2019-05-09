class CanvasGrid{
    constructor(target, {width = 800, columns = 4, rows = 20, fontsize = 20} = {}){
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

        this.AZ = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')
        this.cellColumn = this.colIndex
        this.cellRow = this.rowIndex
        this.cellColumn.unshift(2)
        this.cellRow.unshift(2)
        // !! Quick fix. Need to change.
        this.cellTable = []
        this.cellRow.map((row, rowIndex) => {
            const ROI = rowIndex + 1
            return this.cellColumn.map((col, colIndex) => {
                // return `${this.AZ[colIndex]}${ROI}: [${Math.round(col)}, ${(row-1)+fontsize}]`
                return {
                    cellName: `${this.AZ[colIndex]}${ROI}`,
                    position: [col+2, (row-2)+fontsize]
                }
            })
        }).forEach(cellData => this.cellTable.push.apply(this.cellTable, cellData))
    }
    createCanvas(target){
        this.canvas = document.createElement('canvas')
        this.canvas.id = 'TestCanvas'
        this.canvas.setAttribute('width', this.canvasWidth)
        this.canvas.setAttribute('height', this.canvasHeight)
        this.ctx = this.canvas.getContext('2d')
        this.ctx.font = `${this.fontsize}px Ariel`
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
    logCellTable(){
        // console.table()
        console.log(JSON.stringify(this.cellTable))
    }
    writeData(cell = 'A1', data = 'Hello World'){
        const [x, y] = this.cellTable.find(c => c.cellName == cell).position
        this.ctx.fillText(data, x, y)
    }
}

// const test = new CanvasGrid(document.body, {columns: 5})
export { CanvasGrid }