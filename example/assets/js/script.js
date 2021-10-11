$(document).ready(function(){
  cttJS.Initialize();
  cttJS.CreateTooltip('.vert_elem',{
    text:'this is vertically aligned',
    align:'vertical',
    offset:{
      v_align:{
        x:10,
        y:32
      }
    }
  });
  cttJS.CreateTooltip('.hori_elem',{
    text:'this is horizontally aligned',
    align:'horizontal',
    offset:{
      h_align:{
        x:20,
        y:0
      }
    }
  });
  cttJS.CreateTooltip('#third',{
    text:'third tooltip',
    align:'h',
    offset:{
      h_align:{
        x:20,
        y:0
      }
    }
  });
});
