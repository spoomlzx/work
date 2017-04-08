<!DOCTYPE html>
<html>
<head>
    <base href="<%=basePath%>">
    <title>工作进度</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <link href="/plugin/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>
    <link href="/plugin/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css"/>
    <link href="/plugin/ztree/ztree.css" rel="stylesheet" type="text/css"/>
    <link href="/css/spoom.css" rel="stylesheet" type="text/css"/>
</head>
<body>

<#include "./sidebar.ftl"/>

<div class="container-content" id="p-container" data-unitid="${currentUser.unitId}">
    <div class="center-container bk-white">
        <div class="unit-list panel panel-warning bk-green-dan">
            <div class="panel-heading">单位结构</div>
            <div class="panel-body">
                <ul id="treeDemo" class="ztree"></ul>
            </div>
        </div>
        <div class="unit-work-list panel panel-warning">
            <div class="panel-heading">工作进度</div>
            <div class="panel-body">
                <div style="padding: 4px">
                    <span class="left" style="line-height: 34px">根据类别筛选：</span>
                    <select class="form-control left" style="width: 100px" id="p-w-type">
                        <option value="全部" selected="selected">全部</option>
                        <option value="年度">年度</option>
                        <option value="半年">半年</option>
                        <option value="季度">季度</option>
                        <option value="月度">月度</option>
                        <option value="周">周</option>
                        <option value="日">日</option>
                    </select>
                </div>

                <table class="table table-striped">
                    <thead>
                    <tr class="active">
                        <th style="width: 8%">#</th>
                        <th style="width: 66%">工作名称</th>
                        <th>完成率</th>
                    </tr>
                    </thead>
                    <tbody id="p-w-list">
                    </tbody>
                </table>
            </div>
        </div>
        <div class="unit-detail bk-white">
            <div class="alert alert-info title">
                <span style="padding-left: 10px">
                    <span class="fa fa-forward"></span>
                    <span id="p-s-name">工作标题</span>
                </span>
                <span id="p-s-type" class="right">工作类别</span>
            </div>
            <div class="w-btns hidden" data-id="年度">
            <#list 1..1 as i>
                <button class="btn" style="width: 100px">${i}</button>
            </#list>
            </div>
            <div class="w-btns hidden" data-id="按需">
            <#list 1..1 as i>
                <button class="btn" style="width: 100px">${i}</button>
            </#list>
            </div>
            <div class="w-btns hidden" data-id="半年">
            <#list 1..2 as i>
                <button class="btn" style="width: 100px">${i}</button>
            </#list>
            </div>
            <div class="w-btns hidden" data-id="季度">
            <#list 1..4 as i>
                <button class="btn" style="width: 100px">${i}</button>
            </#list>
            </div>
            <div class="w-btns hidden" data-id="月度">
            <#list 1..12 as i>
                <button class="btn" style="width: 100px">${i}</button>
            </#list>
            </div>
            <div class="w-btns hidden" data-id="周">
            <#list 1..52 as i>
                <button class="btn" style="width: 50px">${i}</button>
            </#list>
            </div>
            <div class="w-btns hidden" data-id="日">
            <#list 1..366 as i>
                <button class="btn" style="width: 50px">${i}</button>
            </#list>
            </div>

        </div>
        <div class="unit-work-log work-log">
            <div class="panel panel-danger">
                <div class="panel-heading"><span class="fa fa-bars"></span> 工作日志</div>
                <div class="panel-body">
                    <ul class="list-group" id="l-list">
                    </ul>
                </div>
            </div>
        </div>

    </div>
</div>
<div class="modal fade" id="log-show-modal" tabindex="-1">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">日志</h4>
            </div>
            <div class="modal-body">
                <ul class="list-group">
                    <li class="list-group-item">
                        <h4 class="list-group-item-heading col-md-4">时间:</h4>
                        <p class="list-group-item-text col-md-offset-4" id="l-show-time">List group item heading</p>
                    </li>
                    <li class="list-group-item">
                        <h4 class="list-group-item-heading col-md-4">责任人：</h4>
                        <p class="list-group-item-text col-md-offset-4" id="l-show-duty-person">List group item heading</p>
                    </li>
                    <li class="list-group-item">
                        <h4 class="list-group-item-heading col-md-4">参加人员类别：</h4>
                        <p class="list-group-item-text col-md-offset-4" id="l-show-person-type">List group item heading</p>
                    </li>
                    <li class="list-group-item">
                        <h4 class="list-group-item-heading col-md-4">人数：</h4>
                        <p class="list-group-item-text col-md-offset-4" id="l-show-count">List group item heading</p>
                    </li>
                    <li class="list-group-item">
                        <h4 class="list-group-item-heading col-md-4">工作情况描述：</h4>
                        <p class="list-group-item-text col-md-offset-4" id="l-show-describe">List group item heading</p>
                    </li>
                </ul>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<script src="/plugin/jquery.min.js" type="text/javascript"></script>
<script src="/plugin/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/js/app.js" type="text/javascript"></script>
<script src="/plugin/datatables/datatables.min.js" type="text/javascript"></script>
<script src="/plugin/ztree/jquery.ztree.js" type="text/javascript"></script>
<script src="/js/js-progress.js" type="text/javascript"></script>
</body>
</html>