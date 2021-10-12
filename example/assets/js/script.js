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
    align:'v',
    offset:{
      x:10,
      y:32
    },
    delay:500,
    style:{
      background:'#e36363'
    }
  });
  cttJS.CreateTooltip('.hori_elem',{
    text:'this is horizontally aligned',
    align:'horizontal',
    offset:{
      x:20,
      y:0
    },
    delay:1000
  });
  cttJS.CreateTooltip('#custom',{
    text:`<div class="custom_el">
      <i class="fas fa-brain"></i>
      <span>Big brain time baby</span>
    </div>`,
    align:'h',
    offset:{
      x:20,
      y:0
    },
    delay:1500
  });
});
