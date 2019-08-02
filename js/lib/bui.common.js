$(document).ready(function () {
    //页面提示信息,tips
    BUI.use('bui/tooltip', function (Tooltip) {
        var tips = new Tooltip.Tips({
            tip: {
                trigger: '.J_tips', //出现此样式的元素显示tip
                alignType: 'right', //默认方向
                arrowTpl: '<span class="x-align-arrow"></span>',
                elCls: 'custom',
                offset: 10 //距离左边的距离
            }
        });
        tips.render();
    });

})

//全选取消按钮函数
function checkAll(chkobj) {
    if ($(chkobj).text() == "全选") {
        $(chkobj).text("取消");
        $(".checkall").prop("checked", true);
    } else {
        $(chkobj).text("全选");
        $(".checkall").prop("checked", false);
    }
}
//弹窗 信息显示 非模态
function jsMsgDialog(msgtitle,msgobj,width,height)
{
BUI.use('bui/overlay',function(Overlay){
var dialog = new Overlay.Dialog({
            title:msgtitle,
            width:width,
            height:height,
            contentId:msgobj,
            mask:false,
            buttons:[]
 }).show();  
})
}
//弹出一个信息提示
function jsShowmMsg(msgTitle,msgUrl,msgType,callback) {
    var arg=arguments.length;
		BUI.Message.Alert(msgTitle,function(){
		if (arg == 4) {
			callback();
		}
		if (msgUrl == "back") {
			window.history.back(-1);
		} else if (msgUrl != "") {
			window.location.href = msgUrl;
		}
        },msgType);
}

//模态弹出框，由DOM生成内容，信息选择
function jsDOMDialog(dtitle,objId,dwidth,dheight,callback)
{	
	BUI.use(['bui/overlay','bui/form'],function(Overlay,Form){
	  var formID=	$("#"+objId).find("form");
	  //console.log(formID.html());
	  //console.log(formID.validate());
      var dialog = new Overlay.Dialog({
            title:dtitle,
            width:dwidth,
            height:dheight,
            //配置DOM容器的编号
            contentId:objId,
            closeAction : 'destroy',
            beforeclose:function () { 
	           callback(this);
	           //  this.close(); 
            },
            success:function () { 
              var flag=callback();	
              this.close(); 
//	          if(flag){
//	        	  console.log("关闭:"+flag);
//	        	  this.close(); 
//	          }else{
//	        	  console.log("显示:"+flag);
//	        	  this.show();
//	          }
            }
          }).show();
      });
}

//信息提示,自动隐藏
function jsShowMsgAutoHide(msg) {
        BUI.Message.Show({
          msg : msg,
          icon : 'question',
          buttons : [],
          autoHide : true,
          autoHideDelay : 2000
});
}

//确认对话框信息提示
function jsShowmConfirm(msg,callback) {
	var arg=arguments.length;
	BUI.Message.Confirm(msg,function(){
	setTimeout(function(){
	  //BUI.Message.Alert('这只是简单的错误信息','error');
	  callback();
	});
  },'question');
}