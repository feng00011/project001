<ul class="layui-nav" lay-filter="">
                <li class="layui-nav-item">
                    <a href="javascript:;">目录</a>
                    <dl class="layui-nav-child">
                        <!-- 二级菜单 -->
                        <dd><a href="">第一张图</a></dd>
                        <dd><a href="">第二张图</a></dd>
                        <dd><a href="">第三张图</a></dd>
                        <dd><a href="">第四张图</a></dd>
                        <dd><a href="">第五张图</a></dd>
                        <dd><a href="">第六张图</a></dd>
                    </dl>
                </li>
                <li class="layui-nav-item"><a href="">社区</a></li>
            </ul>

​            
            d3.select("#graph").graphviz().engine('dot')
                .renderDot('digraph  { table1[label = "<h1>123</h1>"];A->B[color=blue,dir=both,label="双向 "];B->C[dir=none,label="无向 "];C->D[dir=back];D->A[dir=forward];a -> c;b -> f;c ->f;f ->e;a->e;f -> g;a -> g;b -> gsdsdsdsdsdds;c -> g;a -> h;b -> h;f -> h;g -> h;c -> h;e -> h}');
            d3.select("#graph").graphviz().width('900px').height('90vh').fit(true);

~~~
[
    {
      "car": "Audi",
      "price": 40000,
      "color": "blue",
      "for": ""
    }, {
      "car": "BMW",
      "price": 35000,
      "color": "black",
      "for": ""
    }, {
      "car": "Porsche",
      "price": 60000,
      "color": "green",
      "for": ""
    }
  ]
~~~

<div class="NodePart" style="display:none">
                        <div class="layui-card">
                            <div class="layui-card-header">当前节点</div>
                            <div class="layui-card-body">
                                <label for="">节点名称：</label>
                                <label for="" class="thisNodeName">2222</label>
                            </div>
                        </div>
                    </div>
                    <div class="EdgePart" style="display:none">
                        <div class="layui-card">
                            <div class="layui-card-header">当前路径</div>
                            <div class="layui-card-body">
                                <label for="">路径名称：</label>
                                <label for="" class="thisEdgeName"></label>
                            </div>
                        </div>
    
                    </div>
                    <div id="addNodeForm">
                        <form class="layui-form" action="">
                            <div class="layui-form-item">
                                <label class="layui-form-label">节点名</label>
                                <div class="layui-input-block">
                                    <input type="text" name="title" required lay-verify="required" placeholder="请输入标题"
                                        autocomplete="off" class="layui-input">
                                </div>
                            </div>
    
                            <div class="layui-form-item layui-form-text">
                                <label class="layui-form-label">文本域</label>
                                <div class="layui-input-block">
                                    <textarea name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-block">
                                    <button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
                                    <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                                </div>
                            </div>
                        </form>
                    </div>



## post的test



~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./assets/lib/layui/css/layui.css">
    <!-- <link rel="stylesheet" href="./assets/lib/bootstrap.css"> -->
    <script src="./assets/lib/jquery.js"></script>
</head>

<body>
    <form action="" id="t1">
        name:<input type="text" name="uname">
        lex:<input type="text" name="ulex" value="NodeId5" style="display: none;">
        <!-- 一定要加name，否则serialize()就没有输出了 -->
        <button type="submit">提交</button>
    </form>

    <script>
        $(function () {
            $('#t1').submit(function (e) {
                e.preventDefault();
                // 别忘了这是函数，调用得加括号
                let str = $(this).serialize()
                console.log(str);
                $.post("http://127.0.0.1/api/delnode", str, function (res) {
                    // $("span").html(result);
                    console.log(res);
                });
            })
        })

    </script>


</body>

</html>
~~~

