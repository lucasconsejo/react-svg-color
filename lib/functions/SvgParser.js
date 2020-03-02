const colorRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/

const decode = svg => decodeURIComponent(svg)

const encode = svg => {
    svg = encodeURI(svg)
    svg = svg.replace(/%20/g, ' ')
    svg = svg.replace(/#/g, '%23')
    svg = "data:image/svg+xml,"+svg

    return svg
}

const changeColors = (svg, colors) => {
    let colorsIndex = 0

    let changeResult = changeExistingColor(svg, colors, colorsIndex)
    
    svg = changeResult[0]
    colorsIndex = changeResult[1]

    svg = changeColorPath(svg, colors, colorsIndex)

    return svg
}

const changeExistingColor = (svg, colors, colorsIndex) => {
    let svgArray = svg.split(colorRegex)

    for (let i = 1; i < svgArray.length; i++) {

        if(i % 2 != 0) {
            if(isColorValid(colors[colorsIndex])) {
                let previousColor = svgArray[i]
                let newColor = colors[colorsIndex]

                if (previousColor.match(/([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/)) {
                    svgArray[i] = svgArray[i].replace(previousColor, newColor)
                }
            }
            else {
                svgArray[i] = `#${svgArray[i]}`
            }
    
            colorsIndex++
        }
    }

    return [ svgArray.join(""), colorsIndex ]
}

const changeColorPath = (svg, colors, colorsIndex) => {
    let svgArray = svg.split("<path")

    for(let i = 0; i < svgArray.length; i++)  {
 
        if(!svgArray[i].match(colorRegex) && svgArray[i].match(/^ /)) {
            if(isColorValid(colors[colorsIndex])) {
                let pathSplit = svgArray[i].split("/>")
                pathSplit[0] += ` fill="${colors[colorsIndex]}"`
                svgArray[i] = pathSplit.join("/>")
            }
            colorsIndex++
        }
    }

    return svgArray.join("<path")
}

const isColorValid = color => {
    if(color !== undefined && color !== null) {
        if(color.trim() != "") {
            if(color.match(colorRegex)) {
                return true
            }
        }
        return false
    }
    return false
}

const isTransformFieldExist = (svg, field) => {
    let regex = new RegExp(`transform=.*${field}`)
    return svg.match(regex)
}

const changeRotate = (svg, rotate) => {
    let svgArray = svg.split("<svg")
    let svgArray2 = svgArray[1].split(">")

    if(svgArray2[0].match(/transform=.*/)) {
        if(isTransformFieldExist(svgArray2[0], "rotate")) {
            if(isTransformFieldExist(svgArray2[0], "scale")) {
                if (svgArray2[0].match(/scale.*rotate/)) {
                    svgArray2[0] = svgArray2[0].replace(/scale\(.*\)/, ` scale(0.8) rotate(${rotate})`)
                }
                else {
                    svgArray2[0] = svgArray2[0].replace(/rotate\(.*\)/, ` scale(0.8) rotate(${rotate})`)
                }
            }
            else {
                svgArray2[0] = svgArray2[0].replace(/rotate\(.*\)/, ` scale(0.8) rotate(${rotate})`)
            }
        }
        else {
            if(isTransformFieldExist(svgArray2[0], "scale")) {
                svgArray2[0] = svgArray2[0].replace(/scale\(.*\)/, ` scale(0.8) rotate(${rotate})`)
            }
            else {
                let svgArray3 = svgArray2[0].split('transform="')
                let svgArray4 = svgArray3[1].split('"')
                svgArray4[0] += `scale(0.8) rotate(${rotate})`
                svgArray3[1] = svgArray4.join('"')
                svgArray2[0] = svgArray3.join('transform="')
            }
        }
    }
    else {
        svgArray2[0] += ` transform="scale(0.8) rotate(${rotate})"`
    }

    svgArray[1] = svgArray2.join(">")
    svgArray = svgArray.join("<svg")
    return svgArray
}

export default { decode, encode, changeColors, changeRotate }