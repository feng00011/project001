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

            
            d3.select("#graph").graphviz().engine('dot')
                .renderDot('digraph  { table1[label = "<h1>123</h1>"];A->B[color=blue,dir=both,label="双向 "];B->C[dir=none,label="无向 "];C->D[dir=back];D->A[dir=forward];a -> c;b -> f;c ->f;f ->e;a->e;f -> g;a -> g;b -> gsdsdsdsdsdds;c -> g;a -> h;b -> h;f -> h;g -> h;c -> h;e -> h}');
            d3.select("#graph").graphviz().width('900px').height('90vh').fit(true);