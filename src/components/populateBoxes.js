function fillArray() {
    let returnArray = []
    let count = 156
    for (let i = 1, j = 1; i <= count; i++){

        returnArray.push({
            rowId: Math.ceil(i / 12),
            id: i,
            columnId: j,
            color: 'green',
            beingGrown: 'none',
            isGrowing: 'false',
            longTermItem: 'none',
        })
        j > 19 ? j = 1 : j++
    }
    return returnArray
} 

export default fillArray()