
//注意：导航 依赖 element 模块，否则无法进行功能性操作
layui.use('element', function () {
    var element = layui.element;

    //…
});
$(function(){
    mouseMove()
})
// 测试：拖动div内的元素？后台传过来的是svg，是可以选中的
function mouseMove(){
    var moveTarget = $('.my-left');
    $(moveTarget).on('mousedown',function(e){
        console.log(e.offsetLeft);
        console.log(e.pageY);
        $(moveTarget).css('left',e.offsetLeft+'px')
    })
}

