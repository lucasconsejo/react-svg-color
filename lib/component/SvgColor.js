import React, { Component } from 'react'
import SvgParser from '../functions/SvgParser'

export default class SvgColor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            svg: null
        }
        this.getSvgData = this.getSvgData.bind(this);
    }

    componentDidMount() {
        this.getSvgData()
    } 

    async getSvgData() {
        let { svg } = this.props
        
        let data = await fetch(svg).then(res => {
            let reader = res.body.getReader();
            let decoder = new TextDecoder('utf-8');
    
            return reader.read().then(result =>{
                return decoder.decode(result.value);
            })
        })

        this.setState({ svg: data })
    }

    render() {
        let { svg } = this.state
        let { colors, width } = this.props
        
        if(svg != null) {
            svg = SvgParser.decode(svg)
            svg = SvgParser.changeColors(svg, colors)
            svg = SvgParser.encode(svg)

            return (
                React.createElement("div", null, 
                    React.createElement("img", {src: svg, style: {width: width}})
                )
            )
        }
        else {
            return React.createElement("div", null)
        }
    }
} 
