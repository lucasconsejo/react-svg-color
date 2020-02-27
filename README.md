## react-svg-color

[![Version](https://img.shields.io/npm/v/react-svg-color.svg)](https://www.npmjs.com/package/react-svg-color)
<!-- [![NPM](https://img.shields.io/npm/dm/react-svg-color.svg)](https://www.npmjs.com/package/react-svg-color) -->

`react-svg-color` allows you to change any color in an svg file.

### Installation

```bash
    npm i react-svg-color
```

An example of how to use the component

```jsx
    import SvgColor from 'react-svg-color'
    import YourSvgFile from 'your-svg-file'
    
    ...

    <SvgColor 
        svg={YourSvgFile} 
        width={200} 
        colors={["#63bf6d", "#59739e", "#ed3e3b", "#d993d5", "#e8a64f"]} 
    />
```


### SvgColor props

| Name         | Type           | Description                                    |
| ------------ | -------------- | ---------------------------------------------- |
| `svg`        | svg file       | Paste your svg file                            |
| `width`      | int            | Change svg width                               |
| `colors`     | array[String]  | Color array to change the desired colors       |

