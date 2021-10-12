/* -----------------------------------------------
/* Author: Rowen Singh
/* GitHub: https://github.com/God-Slayer/cttJS
/* README: https://github.com/God-Slayer/cttJS/blob/main/README.md
/* v1.0.1
/* ----------------------------------------------- */
$(document).ready(function(){
  $(document).on('mouseenter','.cttJS_elem',function(e){
    // Clear any displayed tooltip
    clearTimeout(ctt_delay);
    $('[data-cttJS_tooltip] span').text('');
    $('[data-cttJS_tooltip]').css({display:'none'}).removeClass('top').removeClass('bottom').removeClass('left').removeClass('right');

    // Reset tooltip styling
    cttJS.ResetTooltipStyle();

    var target_elem={
      pos:$(this).offset(),
      w:$(this).width(),
      h:$(this).height(),
      class:$(this).attr('class'),
      id:$(this).attr('id')!==undefined?$(this).attr('id'):null,
    };

    cttJS.DisplayTooltip(target_elem);
  });
  $(document).on('mouseleave','.cttJS_elem',function(){
    cttJS.HideTooltip();
  });
});
// Allowed parameters for horizontal alignment
var ctt_align=['h','horizontal'];
var ctt_delay;
var ctt_interval=0;
var default_style={
  background: 'rgba(0,153,255,.8)',
  color: 'rgb(255,255,255)',
  font_size: '.8rem',
  text_align: 'center',
  text_transform:'capitalize',
  border_radius: '.2rem',
  padding: '.3rem'
};
var custom_style={};
var custom_tooltips=[];
var cttJS={
  Initialize:function(ctt_prop){
    // Only create custom tooltip if it doesn't exist in the body
    if($('[data-cttJS_tooltip]').length<1){
      $('body').append(`<div data-cttJS_tooltip>
        <span></span>
      </div>`);
    }

    // Set tooltip properties
    if(!$.isEmptyObject(ctt_prop)){
      custom_style=ctt_prop;

      for(var p in ctt_prop){
        $(':root').css(`--ctt_${p}`,ctt_prop[p]);
      }
    }
  },
  CreateTooltip:function(target_element,ctt_param){
    var cttJS_obj={
      target:target_element,
      text:ctt_param.text,
      alignment:ctt_param.align,
      offset:ctt_param.offset,
      delay:ctt_param.delay,
      style:ctt_param.style
    };
    // If tooltips array is blank
    if(custom_tooltips.length<1){
      custom_tooltips.push(cttJS_obj);
      $(target_element).addClass('cttJS_elem');
    }
    else{
      // Check if element already exists in tooltips array
      var duplicate=false;
      $.each(custom_tooltips,function(i,v){
        if(v.target==target_element){
          duplicate=true;
        }
      });
      // Add to tooltip array if not duplicate
      if(!duplicate){
        custom_tooltips.push(cttJS_obj);
        $(target_element).addClass('cttJS_elem');
      }
    }
  },
  DisplayTooltip:function(trgt_el){
    // Get window dimensions
    var win_h=$(window).height();
    var win_w=$(window).width();

    // Set tooltip x and y pos to elements x and y pos
    var ctt_xpos=trgt_el.pos.left;
    var ctt_ypos=trgt_el.pos.top;

    var ctt_tt=$('[data-cttJS_tooltip]');
    var ctt_obj={};

    // Find target elements tooltip data
    var trgt_class=trgt_el.class.split(' ');
    $.each(custom_tooltips,function(i,v){

      // Search through targets classes fora match
      if($.inArray(v.target.replace('.','').trim(),trgt_class)>-1){
        ctt_obj=v;
      }
      // Check if targets id matches
      else if(v.target.replace('#','').trim()==trgt_el.id && trgt_el.id!=null){
        ctt_obj=v;
      }
    });

    // Set tooltip text once found
    $('[data-cttJS_tooltip] span').html(ctt_obj.text);

    // Tooltip dimensions can now be fetched
    var ctt_w=ctt_tt.width();
    var ctt_h=ctt_tt.height();

    // If no offsets are passed
    if(ctt_obj.offset==undefined){
      ctt_obj.offset.x=0;
      ctt_obj.offset.y=0;
    }

    // Check if tooltip should be horizontally aligned
    if($.inArray(ctt_obj.alignment,ctt_align)>-1){
      ctt_ypos=ctt_ypos+(((trgt_el.h-ctt_h)/2)+ctt_obj.offset.y);

      if(ctt_xpos<win_w/2){
        ctt_xpos=ctt_xpos+(((trgt_el.w+ctt_obj.offset.x)));
        ctt_tt.addClass('right');
      }
      else{
        ctt_xpos=ctt_xpos-ctt_w-28;
        ctt_tt.addClass('left');
      }
    }
    // Align tooltip vertically
    else{
      ctt_xpos=ctt_xpos+(((trgt_el.w-ctt_w)/2)+ctt_obj.offset.x);

      if(ctt_ypos<win_h/2){
        ctt_ypos=ctt_ypos+(trgt_el.h+ctt_obj.offset.y);
        ctt_tt.addClass('bottom');
      }
      else{
        ctt_ypos=ctt_ypos-ctt_h-28;
        ctt_tt.addClass('top');
      }
    }

    // Set the tooltip delay
    ctt_interval=ctt_obj.delay;

    // Handle custom styles
    if(ctt_obj.style!==undefined){
      for(var p in ctt_obj.style){
        $(':root').css(`--ctt_${p}`,ctt_obj.style[p]);
      }
    }

    // Display tooltip
    ctt_tt.css({
      display:'block',
      top:ctt_ypos,
      left:ctt_xpos
    });
  },
  HideTooltip:function(){
    clearTimeout(ctt_delay);

    ctt_delay = setTimeout(function(){
      $('[data-cttJS_tooltip] span').text('');
      $('[data-cttJS_tooltip]').css({display:'none'});
      $('[data-cttJS_tooltip]').removeClass('top');
      $('[data-cttJS_tooltip]').removeClass('bottom');
      $('[data-cttJS_tooltip]').removeClass('left');
      $('[data-cttJS_tooltip]').removeClass('right');
      cttJS.ResetTooltipStyle();
    },ctt_interval);
  },
  ResetTooltipStyle:function(){
    if($.isEmptyObject(custom_style)){
      for(var p in default_style){
        $(':root').css(`--ctt_${p}`,default_style[p]);
      }
    }
    else{
      for(var p in custom_style){
        $(':root').css(`--ctt_${p}`,custom_style[p]);
      }
    }
  }
};
