





//注意：导航 依赖 element 模块，否则无法进行功能性操作
layui.use('element', function () {
    var element = layui.element;

    //…
});
$(function () {
    parserMod()
})
// 测试：拖动div内的元素？后台传过来的是svg，是可以选中的



function parserMod() {
    var dotSrc = `
digraph {
    graph [label="Click on a node or an edge to delete it" labelloc="t", fontsize="20.0" tooltip=" "]
    Node1 [id="NodeId1" label="N1" my1=1]
    Node2 [id="NodeId2" label="N2" ]
    Node3 [id="NodeId3" label="N3" ]
    Node4 [id="NodeId4" label="N4" ]
    Node1 -> Node2 [id="EdgeId12" label="E12"]
    Node1 -> Node3 [id="EdgeId13" label="E13"]
    Node2 -> Node3 [id="EdgeId23" label="E23"]
    Node3 -> Node4 [id="EdgeId34" label="E34"]
}
`;
    var dotSrcLines;
    var dotSrc1 = dotSrc;
    var graphviz = d3.select("#graph").graphviz().width('900px').height('90vh').fit(true);
    function render() {
        // console.log('DOT source =', dotSrc);
        dotSrcLines = dotSrc.split('\n');
        graphviz
            .renderDot(dotSrc)
            .on("end", interactive);
    }

    function render2() {
        dotSrcLines = dotSrc1.split('\n');
        graphviz
            .renderDot(dotSrc);

    }
    function interactive() {
        // console.log(dotSrcLines);
        nodes = d3.selectAll('.node,.edge');
        nodes
            .on("click", function () {
                render2();
                var title = d3.select(this).selectAll('title').text().trim();
                var text = d3.select(this).selectAll('text').text();
                var id = d3.select(this).attr('id');
                var class1 = d3.select(this).attr('class');
                // var reg = new RegExp("a", "g");
                dotElement = title.replace('->', ' -> ');
                // 这是针对path部分的，也可以叫edge，title命名规则是a->b，需加空格
                console.log('Element id="%s" class="%s" title="%s" text="%s" dotElement="%s"', id, class1, title, text, dotElement);
                console.log('Finding and deleting references to %s "%s" from the DOT source', class1, dotElement);
                for (i = 0; i < dotSrcLines.length;) {
                    if (dotSrcLines[i].indexOf(dotElement) >= 0) {
                        //使得相关分支都变色，所以不能使用title等点击事件获取的当前元素属性
                        console.log('Changing line %d: %s', i, dotSrcLines[i]);
                        let idd = dotSrcLines[i].match(/id="(\S*)"/);
                        let txt = dotSrcLines[i].match(/label="(\S*)"/);
                        let dotE = dotSrcLines[i].match(/(.+?)\[/g);
                        dotE = dotE.toString().replace(/\[/, '').trim();
                        // console.log(dotE);
                        dotSrcLines[i] = '    ' + dotE + ' [id=' + '"' + idd[1] + '"' + ' label=' + '"' + txt[1] + '"' + ' color="red"]';
                        console.log(dotSrcLines);
                        //前进去搜索与其相关的，此时需要另外赋值id，text ，dotElement
                        i++;
                    } else {
                        i++;
                    }
                }
                // console.log(dotSrc);

                dotSrc = dotSrcLines.join('\n');
                // console.log(dotSrc);
                render();

            });
    }

    render();

}