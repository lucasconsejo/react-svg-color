const colorRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g

const decode = svg => decodeURIComponent(svg)

const encode = svg => {
    svg = encodeURI(svg)
    svg = svg.replace(/%20/g, ' ')
    svg = svg.replace(/#/g, '%23')
    svg = "data:image/svg+xml,"+svg

    return svg
}

const changeColors = (svg, colors) => {
    let svgArray = svg.split(colorRegex)
    let colorsIndex = 0

    for (let i = 1; i < svgArray.length; i++) {
        let color = "";
        if (i % 2 != 0) {
            color = `#${svgArray[i]}`
            if (color.match(colorRegex).length > 0) {
                svg = svg.replace(color, colors[colorsIndex])
                colorsIndex++
            }
        }
    }
    
    return svg
}

export default { decode, encode, changeColors }