const hueRange = $("#hue-range");
const saturationRange = $("#saturation-range");
const lightnessRange = $("#lightness-range");
const rgbCreation = $("#hue-range, #saturation-range, #lightness-range, #row-saturation-range, #row-lightness-range");
const upArrow = $(".up-arrow");
const downArrow = $(".down-arrow");
const vrkDiv = $(".vrk-color");
$(document).ready(function () {
    rgbCreation.on('change', function () {
        let rgb;
        let _that = $(this);
        $(this).parent().find("h3 span").text(Math.round(($(this).val()*100)) + '%');
        vrkDiv.find('.vrk-color-row').each(function(index) {
            if(index == 0) {
                rgb =  hslToRgb(parseFloat(hueRange.val()), parseFloat(saturationRange.val()), parseFloat(lightnessRange.val()));
                if(_that.attr('id') !== 'saturation-range' && _that.attr('id') !== 'lightness-range') {
                    saturationRange.css('background-image',`linear-gradient(90deg, rgb(109, 109, 109), ${rgb})`);
                    lightnessRange.css('background-image',`linear-gradient(90deg, rgb(33, 18, 31), ${rgb}, rgb(237, 222, 235))`)
                }
            }
            else {
                rgb =  hslToRgb(parseFloat(hueRange.val()), parseFloat(saturationRange.val()) - (index * $("#row-saturation-range").val()), parseFloat(lightnessRange.val())- (index * $("#row-lightness-range").val()));
            }
            $(this).css('background', rgb);
            $(this).find('input').val(rgb);
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
            if(r < 0 && g < 0 && b < 0) {
                rgbToHex(0, 0, 0)
                return `rgb(${Math.round(0)}, ${Math.round(0)}, ${Math.round(0)})`;
            } else {
                rgbToHex(Math.round(r), Math.round(g), Math.round(b))
                
                return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
            }
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
        vrkDiv.append(`<div class="vrk-color-row"><input class="color" id="vrk-input-1" onclick="copyColor(this)" readonly/></div>`);
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
function copyColor(obj) {
    var copyText = $(obj);
    copyText.select();
    document.execCommand("copy");
    $(obj).closest('.vrk-color-row').append('<span class="copied">COPIED</span>');
    setTimeout(function() {
        $(".copied").remove();
    }, 1000);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
