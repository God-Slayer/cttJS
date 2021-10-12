## cttJS

### A lightweight javascript library for creating custom tooltips.

---

### `Usage`

Load cttJS.js and cttJS.css:

**index.html**
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  
  <head>
    <script type="text/javascript" src="assets/lib/cttJS.js"></script>
    <link rel="stylesheet" type="text/css" href="assets/lib/cttJS.css">
  </head>
  
  <body>
    <h1 class="vert_elem">Vertical Tooltip</h1>
  </body>
  
</html>
```

**script.js**
```javascript
$(document).ready(function(){

  cttJS.Initialize({
    background: 'rgba(0,153,255,.8)',
    color: 'rgb(255,255,255)',
    font_size: '.8rem',
    text_align: 'center',
    text_transform:'capitalize',
    border_radius: '.2rem',
    padding: '.3rem'
  });

  cttJS.CreateTooltip('.vert_elem',{
    text:'this is vertically aligned with styling overridden',
    align:'vertical',
    offset:{
      x:10,
      y:32
    },
    delay:500,
    style:{
      background:'#e36363'
    }
  });
  
});
```

### `cttJS`
```javascript
$(document).ready(function(){
  
  // Add the tooltip to the project and define the default styling of the tooltip
  cttJS.Initialize({
    background: 'rgba(0,153,255,.8)',
    color: 'rgb(255,255,255)',
    font_size: '.8rem',
    text_align: 'center',
    text_transform:'capitalize',
    border_radius: '.2rem',
    padding: '.3rem'
  });
  
  // 'selector' -> target element's id or class
  cttJS.CreateTooltip('selector',{
    text:'this is vertically aligned with styling overridden',
    // align -> 'vertical','v','horizontal','h'
    align:'v',
    offset:{
      x:10,
      y:32
    },
    delay:500,
    // Custom styling can't be added to a specific element to override initialized styling
    style:{
      background:'#e36363'
    }
  });
  
});
```
