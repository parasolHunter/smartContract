//判断是否存在画布  
function isCanvasSupported() {  
    var elem = document.createElement('canvas');  
    return !!(elem.getContext && elem.getContext('2d'));  
}  
  
//压缩方法  
function compress(event, callback) {  
    if ( typeof (FileReader) === 'undefined') {  
        console.log("当前浏览器内核不支持base64图标压缩");  
        //调用上传方式  不压缩  
    } else {  
        try {  
            var file = event.currentTarget.files[0];  
             if(!/image\/\w+/.test(file.type)){     
                    alert("请确保文件为图像类型");    
                    return false;    
             }   
            var reader = new FileReader();  
            reader.onload = function (e) {  
            var image = $('<img/>');  
            image.load(function () {  
            console.log("开始压缩");  
//	            var square = 700;  
            var canvas = document.createElement('canvas');  
            canvas.width = this.width;  
            canvas.height = this.height;  
            var context = canvas.getContext('2d');  
            context.fillStyle = 'rgba(255, 255, 255, 0)';
            context.fillRect(0, 0, this.width, this.height);  
            context.clearRect(0, 0, this.width, this.height);

            var imageWidth;  
            var imageHeight;  
            var offsetX = 0;  
            var offsetY = 0;  
            if (this.width > this.height) {  
              imageWidth = this.width;  
//	              imageWidth = Math.round(square * this.width / this.height);
              imageHeight = this.height;  
//	              offsetX = - Math.round((imageWidth - square) / 2);  
            } else {  
//	              imageHeight = Math.round(square * this.height / this.width);  
              imageHeight = this.height;
              imageWidth = this.width;  
//	              offsetY = - Math.round((imageHeight - square) / 2);  
            }  
            context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);  
            var data = canvas.toDataURL('image/jpeg');  
                //压缩完成执行回调  
               callback(data);  
            });  
            image.attr('src', e.target.result);  
            };  
            reader.readAsDataURL(file);  
        } catch(e) {  
            console.log("压缩失败!");  
            //调用上传方式  不压缩  
        }  
    }  
}  

/*三个参数
file：一个是文件(类型是图片格式)，
w：一个是文件压缩的后宽度，宽度越小，字节越小
objDiv：一个是容器或者回调函数*/
function photoCompress(file,w,objDiv){
    var ready=new FileReader();
    /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
    ready.readAsDataURL(file);
    ready.onload=function(){
        var re=this.result;
        canvasDataURL(re,w,objDiv)
    }
}
function canvasDataURL(path, obj, callback){
    var img = new Image();
    img.src = path;
    img.onload = function(){
        var that = this;
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 0.7;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if(obj.quality && obj.quality <= 1 && obj.quality > 0){
            quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
    }
}
/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 * 用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData){
    var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}