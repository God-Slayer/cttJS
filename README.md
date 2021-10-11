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
    <h1 class="vert_elem">Vertical Element</h1>
  </body>
  
</html>
```

**script.js**
```javascript
$(document).ready(function(){

  cttJS.Initialize();
  
  cttJS.CreateTooltip('.vert_elem',{
    text:'this tooltip is vertically aligned',
    align:'vertical',
    offset:{
      v_align:{
        x:10,
        y:32
      }
    }
  });
  
});
```

### `cttJS`
```javascript
$(document).ready(function(){
  
  // Add the tooltip to the project
  cttJS.Initialize();
  
  // selector -> target element class or id
  cttJS.CreateTooltip('selector',{
    text:'this tooltip is vertically aligned',
    // align -> 'v', 'vertical', 'h', 'horizontal'
    align:'vertical',
    // offset -> use v_align for vertical alignment and h_align for horizontal alignment
    offset:{
      v_align:{
        x:10,
        y:32
      },
      h_align:{
        x:0,
        y:16
      }
    }
  });
  
});
```
