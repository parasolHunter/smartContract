var imgTypeArr = new Array();
var imgArr = new Array();
var isHand = 0;// 1正在处理图片
var base64Img = '';
var nowImgType = "image/jpeg";
var jic = {
    compress : function(source_img_obj, imgType) {
        source_img_obj.onload = function() {
            var cvs = document.createElement('canvas');
            var scale = this.height / this.width;
            cvs.width = 940;
            cvs.height = 940 * scale;
            var ctx = cvs.getContext("2d");
            ctx.drawImage(this, 0, 0, cvs.width, cvs.height);
            var newImageData = cvs.toDataURL(imgType, 0.8);
            base64Img = newImageData;
            //预览图
            //var img = new Image();
            //img.src = newImageData;
            //$(img).css('width', 100 + 'px');
            //$(img).css('height', 100 + 'px');
            //$("#canvasDiv").append(img);
            
            isHand = 0;
            catUpload();
        }
    }
}
function handleFileSelect(evt) {
    isHand = 1;
    imgArr = [];
    imgTypeArr = [];
    $("#canvasDiv").html("");
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }
        imgTypeArr.push(f.type);
        nowImgType = f.type;
        var reader = new FileReader();
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                var i = new Image();
                i.src = e.target.result;
                jic.compress(i, nowImgType);
            };
        })(f);
    }
}

function canvsalert(msg) {
    var style = "display: block; width: 92%;padding:4%; height: 100%; z-index: 10; position: fixed; text-align: center; top: 0px; background: rgba(1,1,1,0.8); color: #fff; padding-top: 200px; font-size: 1em;line-height:1.5em;left:0;";
    var str = '<div id="canvsalertc" style="' + style + '">' + msg + '</div>';
    $("body").append(str);
    setTimeout('$("#canvsalertc").remove()', 3000);
}