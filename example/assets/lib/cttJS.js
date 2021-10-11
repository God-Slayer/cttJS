/* -----------------------------------------------
/* Author: Rowen Singh
/* GitHub: https://github.com/God-Slayer/cttJS
/* README: https://github.com/God-Slayer/cttJS/blob/main/README.md
/* v1.0.0
/* ----------------------------------------------- */
$(document).ready(function(){
  $(document).on('mouseenter','.cttJS_elem',function(e){
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
var custom_tooltips=[];
var cttJS={
  Initialize:function(){
    // Only create custom tooltip if it doesn't exist in the body
    if($('[data-cttJS_tooltip]').length<1){
      $('body').append(`<div data-cttJS_tooltip>
        <span></span>
      </div>`);
    }
  },
  CreateTooltip:function(target_element,ctt_param){
    var cttJS_obj={
      target:target_element,
      text:ctt_param.text,
      alignment:ctt_param.align,
      offset:ctt_param.offset
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

      // Search through targets classes for a match
      if($.inArray(v.target.replace('.','').trim(),trgt_class)>-1){
        ctt_obj=v;
      }
      // Check if targets id matches
      else if(v.target.replace('#','').trim()==trgt_el.id && trgt_el.id!=null){
        ctt_obj=v;
      }
    });

    // Set tooltip text once found
    $('[data-cttJS_tooltip] span').text(ctt_obj.text);

    // Tooltip dimensions can now be fetched
    var ctt_w=ctt_tt.width();
    var ctt_h=ctt_tt.height();

    // Check if tooltip should be horizontally aligned
    if($.inArray(ctt_obj.alignment,ctt_align)>-1){
      var h_offset_y=ctt_obj.offset!==undefined?ctt_obj.offset.h_align.y:0;
      ctt_ypos=ctt_ypos+(((trgt_el.h-ctt_h)/2)+h_offset_y);

      if(ctt_xpos<win_w/2){
        var h_offset_x=ctt_obj.offset!==undefined?ctt_obj.offset.h_align.x:0;
        ctt_xpos=ctt_xpos+(((trgt_el.w+h_offset_x)));
        ctt_tt.addClass('right');
      }
      else{
        ctt_xpos=ctt_xpos-ctt_w-28;
        ctt_tt.addClass('left');
      }
    }
    // Align tooltip vertically
    else{
      var v_offset_x=ctt_obj.offset!==undefined?ctt_obj.offset.v_align.x:0;
      ctt_xpos=ctt_xpos+(((trgt_el.w-ctt_w)/2)+v_offset_x);

      if(ctt_ypos<win_h/2){
        var v_offset_y=ctt_obj.offset!==undefined?ctt_obj.offset.v_align.y:0;
        ctt_ypos=ctt_ypos+(trgt_el.h+v_offset_y);
        ctt_tt.addClass('bottom');
      }
      else{
        ctt_ypos=ctt_ypos-ctt_h-28;
        ctt_tt.addClass('top');
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
    $('[data-cttJS_tooltip] span').text('');
    $('[data-cttJS_tooltip]').css({display:'none'});
    $('[data-cttJS_tooltip]').removeClass('top');
    $('[data-cttJS_tooltip]').removeClass('bottom');
    $('[data-cttJS_tooltip]').removeClass('left');
    $('[data-cttJS_tooltip]').removeClass('right');
  }
};
