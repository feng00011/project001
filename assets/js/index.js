
$(function () {

    var arrList = new Array();//定义一个全局容器
    $.get('http://127.0.0.1/api/nodedata', function (res) {

        let tmp1 = JSON.parse(res);
        // console.log(tmp1);
        // tmp1是节点的数据
        setdot(tmp1, 1)
        $.get('http://127.0.0.1/api/edgedata', function (res2) {
            // console.log(JSON.parse(JSON.stringify(res)));
            // console.log(res);
            let tmp = JSON.parse(res2);
            // tmp是路径的数据
            setdot(tmp, 2)
            arrList.unshift('digraph {')
            arrList.unshift('')
            arrList.push('}')
            arrList.push('')
            arrList = arrList.join('\n');
            // console.log(arrList);

            // --------------------------------------------------------d3板块开始
            $(function () {
                parserMod()
            })
            // 测试：拖动div内的元素？后台传过来的是svg，是可以选中的
            function parserMod() {
                //     var dotSrc = `
                // digraph {
                //     graph [label="Click on a node or an edge" labelloc="t", fontsize="20.0" tooltip=" "]
                //     Node1 [id="NodeId1" label="N1" my1=1]
                //     Node2 [id="NodeId2" label="N2" ]
                //     Node3 [id="NodeId3" label="N3" ]
                //     Node4 [id="NodeId4" label="N4" ]
                //     Node1 -> Node2 [id="EdgeId12" label="E12"]
                //     Node1 -> Node3 [id="EdgeId13" label="E13"]
                //     Node2 -> Node3 [id="EdgeId23" label="E23"]
                //     Node3 -> Node4 [id="EdgeId34" label="E34"]
                // }
                // `;
                // console.log(JSON.stringify(arrList));
                let dotSrc = arrList;
                // dotSrc = dotSrc.toString();
                // console.log(dotSrc);
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
                            var title = d3.select(this).selectAll('title').text().trim();//对应的nodename
                            var text = d3.select(this).selectAll('text').text();//对应的是label的内容
                            var id = d3.select(this).attr('id');//对应的是nodeId
                            var class1 = d3.select(this).attr('class');
                            // var reg = new RegExp("a", "g");
                            // console.log(title);
                            // console.log(id);
                            // console.log(class1);

                            dotElement = title.replace('->', ' -> ');
                            // dom操作生成右边的内容----开始
                            $('#delButtonId').val(title)
                            $('#editName').val(text)
                            $('#thisEditClass').val(class1)
                            $('.thisEditOldId').val(id)
                            let edgestr = renderEditEdge(tmp, title)
                            $('#editEdge').val(edgestr)
                            // 给删除按钮上面隐藏的input加入nodeid
                            // 操作显示内容开始----------------------------------------------------------------
                            if (class1 === 'node') {
                                $('.NodePart').css('display', 'block');
                                $('#normalPart').css('display', 'none');
                                $('.EdgePart').css('display', 'none');
                                $('.thisNodeName').empty().append(text)
                                console.log(tmp);
                                let flagRightPrior = 0;
                                let flagRightNext = 0;
                                $('#NodelistRight').empty()

                                let arrPri = [];
                                let arrNex = [];
                                for (i = 0; i < tmp.length; i++) {

                                    if (tmp[i].prior === title) {
                                        // console.log(tmp[i].next);
                                        arrNex.push(tmp[i].next)
                                        // $('#nextNode').append('<td>' + tmp[i].next + '</td>')
                                        flagRightNext++
                                    }
                                    if (tmp[i].next === title) {
                                        // console.log(tmp[i].prior);
                                        arrPri.push(tmp[i].prior)
                                        // $('#priorNode').append('<td>' + tmp[i].prior + '</td>')
                                        flagRightPrior++
                                    }
                                }
                                // console.log(flagRightPrior);
                                if (!flagRightPrior) {
                                    // $('#priorNode').append('<td>null</td>')
                                    arrPri.push('null')
                                }
                                if (!flagRightNext) {
                                    // $('#nextNode').append('<td>null</td>')
                                    arrNex.push('null')
                                }
                                console.log(arrPri);
                                console.log(arrNex);

                                let rightLength1 = Math.ceil((arrPri.length + arrNex.length) / 2)
                                for (let i = 0; i < rightLength1; i++) {
                                    $('#NodelistRight').append('<tr id="innertr' + i + '"></tr>')

                                }
                                for (let i = 0; i < rightLength1; i++) {

                                    if (arrPri[i]) {
                                        $('#innertr' + i).append('<td>' + arrPri[i] + '</td>')
                                    } else {
                                        $('#innertr' + i).append('<td></td>')
                                    }
                                    if (arrNex[i]) {
                                        $('#innertr' + i).append('<td>' + arrNex[i] + '</td>')
                                    } else {
                                        $('#innertr' + i).append('<td></td>')
                                    }

                                }
                            } else if (class1 === 'edge') {
                                $('.NodePart').css('display', 'none');
                                $('#normalPart').css('display', 'none');
                                $('.EdgePart').css('display', 'block');
                                $('.thisEdgeName').empty().append(text)
                            }
                            // 操作显示内容结束


                            // dom操作生成右边的内容----结束
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
            // ------------------------------------------------------------------------------d3板块结束
        })



    });

    // 删除节点或者路径的函数
    $('#delbutton').submit(function (e) {
        e.preventDefault();
        let str = $(this).serialize()
        // console.log(str);
        if (str.length > 7) {
            $.post("http://127.0.0.1/api/delnode", str, function (res) {
                // $("span").html(result);
                console.log(res);
            });
            // console.log(str);

        } else {
            console.log('请选择节点/路径');
        }
    })
    // 删除节点或者路径的函数结束

    // 增加节点的函数开始
    $('#addNodeForm').submit(function (e) {
        e.preventDefault();
        let str = $(this).serialize()
        $.post("http://127.0.0.1/api/addnode", str, function (res) {
            // $("span").html(result);
            console.log(res);
            if (res.status == 11 || res.status == 10 || res.status == 12) {
                alert(res.msg)
            }
        });
    })
    // 增加节点的函数结束

    // 增加路径的函数开始
    $('#addEdgeForm').submit(function (e) {
        e.preventDefault();
        let str = $(this).serialize()
        // console.log(str.nodeAddNodeEdge);
        $.post("http://127.0.0.1/api/addedge", str, function (res) {
            // $("span").html(result);
            console.log(res);
            if (res.status == 11 || res.status == 10 || res.status == 12) {
                alert(res.msg)
            }
        });
    })
    // 增加路径的函数结束

    // 修改node/edge的名称（label）开始

    $('#editNameForm').submit(function (e) {
        e.preventDefault();
        let str = $(this).serialize()
        $.post('http://127.0.0.1/api/editname', str, function (res) {
            //    console.log(res);
            if (res.status == 11 || res.status == 10 || res.status == 12 || res.status == 8) {
                alert(res.msg)
            } else {
                console.log(res);
            }
            // 修改label不会影响d3核心判断，不会影响图的结构，d3是依靠nodeName来判断的，这个是我们后台生成的

        })

    })
    // 修改node/edge的名称（label）结束

    // 修改edge的（AA->BB）开始
    $('#editEdgeForm').submit(function(e){
        e.preventDefault();
        let str = $(this).serialize()
        console.log(str);
        $.post('http://127.0.0.1/api/editedge',str,function(res){
            console.log(res);
        })
    })
    // 修改edge的（AA->BB）结束






    //注意：导航 依赖 element 模块，否则无法进行功能性操作
    layui.use('element', function () {
        var element = layui.element;

        //…
    });

    layui.use('form', function () {
        var form = layui.form;

        //监听提交
        form.on('submit(formDemo)', function (data) {
            layer.msg(JSON.stringify(data.field));
            return false;
        });
    });


    // 组装dot模板，将后台传输过来的json数组组装，用在ajax-get里的
    function setdot(targetN, flag) {
        if (flag === 1) {
            for (i = 0; i < targetN.length; i++) {
                arrList.push('    ' + targetN[i].nodeName + ' [id=' + '"' + targetN[i].nodeId + '"' + ' label=' + '"' + targetN[i].label + '"' + ']');
            }
        }
        if (flag === 2) {
            for (i = 0; i < targetN.length; i++) {
                arrList.push('    ' + targetN[i].prior + ' -> ' + targetN[i].next + ' [id=' + '"' + targetN[i].edgeId + '"' + ' label=' + '"' + targetN[i].label + '"' + ']')
            }
        }
    }
    function renderEditEdge(arr, nodeName) {
        let str = '';
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].prior == nodeName || arr[i].next == nodeName) {
                str += arr[i].prior + '->' + arr[i].next + ':' + arr[i].label + ';'
            }
        }
        str = str.substring(0, str.length - 1)
        // 去掉最后一个分号
        return str
    }
})
