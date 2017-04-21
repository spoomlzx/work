<!DOCTYPE html>
<html>
<head>
    <base href="<%=basePath%>">
    <title>法规制度</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <link href="/plugin/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>
    <link href="/plugin/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css"/>
    <link href="/css/spoom.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" charset="utf-8" src="/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="/ueditor/ueditor.all.js"></script>
</head>
<body>

<#include "../sidebar.ftl"/>

<div class="container-content">
    <div class="work-edit-detail">
        <div class="panel panel-default title">
            <select class="form-control left" id="w-l-type" style="width: 10%">
            <#list types as type>
                <option value="${type.unitTypeId}">${type.name}</option>
            </#list>
            </select>
            <div class="right">
                <button class="btn btn-warning btn-show" onclick="window.location.href='/workAdd'">
                    <span class="fa fa-plus"></span>添 加
                </button>
            </div>
        </div>
    </div>
    <div class="center-container bk-white">
        <div class="regulation-list">
            <table class="table table-bordered table-hover" id="workList_table" style="width:100%;">
                <thead>
                <tr>
                    <th id="s-0">筛 选</th>
                    <th id="s-1"></th>
                    <th id="s-2"></th>
                    <th></th>
                </tr>
                <tr class="bk-grey">
                    <th> 工作ID</th>
                    <th> 工作名称</th>
                    <th> 工作类型</th>
                    <th> 操作</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="modal fade" id="delete-modal" tabindex="-1">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="form-group notice-msg">
                    <h3 id="w-d-name"></h3>
                    删除后无法恢复,确定删除这项工作吗?
                </div>
                <div class="form-group notice-btn">
                    <button class="btn btn-danger" id="w-delete">删 除</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">关 闭</button>
                </div>
            </div>
        </div>
    </div>
</div>


<script src="/plugin/jquery.min.js" type="text/javascript"></script>
<script src="/plugin/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/js/app.js" type="text/javascript"></script>
<script src="/plugin/datatables/datatables.min.js" type="text/javascript"></script>
<script src="/js/js-admin-worklist.js" type="text/javascript"></script>
</body>
</html>
