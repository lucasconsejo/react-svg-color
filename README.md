## react-svg-color

[![Version](https://img.shields.io/npm/v/react-svg-color.svg)](https://www.npmjs.com/package/react-svg-color)
[![NPM](https://img.shields.io/npm/dm/react-svg-color.svg)](https://www.npmjs.com/package/react-svg-color)

`react-svg-color` allows you to change any color in a svg file.

### Installation

```bash
    npm i react-svg-color
```

An example of how to use the component

```jsx
    import SvgColor from 'react-svg-color'
    import Umbrella from 'umbrella.svg'
    
    ...

    <SvgColor 
        svg={Umbrella} 
        width={200} 
        colors={["#7EADCC", "#316F99", "#FFFDB8", "#FF8D78", "#FF8D78", "#7EADCC", "#B8FFF6", "#B8FFF6","#FF8D78"]}   
    />
```

## Result

<img src="https://raw.githubusercontent.com/lucasconsejo/react-svg-color/master/.github/images/example.png" width="500" />




### Props

| Name         | Type           | Description                                    |
| ------------ | -------------- | ---------------------------------------------- |
| `svg`        | svg file       | Paste your svg file                            |
| `width`      | int            | Change width                                   |
| `colors`     | array[String]  | Color array to change the desired colors (hex) |
| `rotate`     | int            | Change rotation                                |
