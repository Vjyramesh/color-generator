$(document).ready(function () {
    const hueRange = $("#hue-range");
    const saturationRange = $("#saturation-range");
    const lightnessRange = $("#lightness-range");
    const rgbCreation = $("#hue-range, #saturation-range, #lightness-range");
    const upArrow = $(".up-arrow");
    const leftArrow = $(".left-arrow");
    const rightArrow = $(".right-arrow");
    const downArrow = $(".down-arrow");
    const vrkDiv = $(".vrk-color");
    rgbCreation.on('change', function () {
        let rgb;
        let _that = $(this);
        
        vrkDiv.find('.vrk-color-row').each(function(index) {
            if(index == 0) {
                rgb =  hslToRgb(parseFloat(hueRange.val()), parseFloat(saturationRange.val()), parseFloat(lightnessRange.val()));
                if(_that.attr('id') !== 'saturation-range' && _that.attr('id') !== 'lightness-range') {
                    saturationRange.css('background-image',`linear-gradient(90deg, rgb(109, 109, 109), ${rgb})`);
                    lightnessRange.css('background-image',`linear-gradient(90deg, rgb(33, 18, 31), ${rgb}, rgb(237, 222, 235))`)
                }
            }
            else {
                rgb =  hslToRgb(parseFloat(hueRange.val()), parseFloat(saturationRange.val()) - (index * 0.1), parseFloat(lightnessRange.val())- (index * 0.1));
            }
            $(this).css('background', rgb);

        });
        
    });

    function hslToRgb(hue, saturation, lightness) {
        var r, g, b, var1, var2;
        if (saturation === 0) {
            r = lightness * 255;
            b = lightness * 255;
            g = lightness * 255;
            return `rgb(${r}, ${g}, ${b})`;

        } else {
            if (lightness < 0.5) {
                var2 = lightness * (1 + saturation);
            } else {
                var2 = (lightness + saturation) - (saturation * lightness);
            }
            var1 = 2 * lightness - var2;
            r = 255 * Hue_2_RGB(var1, var2, hue + (1 / 3))
            g = 255 * Hue_2_RGB(var1, var2, hue)
            b = 255 * Hue_2_RGB(var1, var2, hue - (1 / 3))
            return `rgb(${r}, ${g}, ${b})`;
        }
    }

    function Hue_2_RGB(v1, v2, vH) {
        if (vH < 0) vH += 1
        if (vH > 1) vH -= 1
        if ((6 * vH) < 1) return (v1 + (v2 - v1) * 6 * vH)
        if ((2 * vH) < 1) return (v2)
        if ((3 * vH) < 2) return (v1 + (v2 - v1) * ((2 / 3) - vH) * 6)
        return (v1)
    }
    downArrow.on('click', function() {
        vrkDiv.append(`<div class="vrk-color-row"></div>`);
        const length = vrkDiv.find('.vrk-color-row').length;
        rowCreation(length);
        rgbCreation.trigger('change');
    });

    upArrow.on('click', function() {
       const length =  vrkDiv.find('.vrk-color-row').length;
       if(length > 1) {
        vrkDiv.find('.vrk-color-row').eq(length-1).remove();
        rowCreation(length -1)
       }
       
    });
    function rowCreation(length) {
        vrkDiv.find('.vrk-color-row').each(function(){
            $(this).css('height', 100/length + 'vh');
        });
    }
})