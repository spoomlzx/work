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
    <link href="/plugin/ztree/zTreeStyle.css" rel="stylesheet" type="text/css"/>
    <link href="/css/spoom.css" rel="stylesheet" type="text/css"/>
</head>
<body>

<#include "./sidebar.ftl"/>

<div class="container-content">
    <div class="toolbar">
    <#if currentUser?? && currentUser.role == "ADMIN">
        <button href="#regulation-modal" data-toggle="modal" class="btn btn-warning btn-add">添加法规</button>
    </#if>
        <span class="input-message col-md-offset-1" id="r-add-message"></span>
    </div>
    <div class="center-container bk-white">
        <div class="unit-list bk-green-dan">
            <ul id="treeDemo" class="ztree"></ul>
        </div>
        <div class="unit-detail bk-white">
            <table class="table table-bordered table-hover" data-unitid="164" id="workhistory_table" style="width: 100%">
                <thead class="bk-grey">
                <tr>
                    <th> 工作名称</th>
                    <th> 类型</th>
                    <th> 完成状态</th>
                    <th> 完成时限</th>
                    <th> 操作</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                </tfoot>
            </table>
        </div>


    </div>
</div>

<script src="/plugin/jquery.min.js" type="text/javascript"></script>
<script src="/plugin/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/plugin/datatables/datatables.min.js" type="text/javascript"></script>
<script src="/plugin/ztree/jquery.ztree.js" type="text/javascript"></script>
<script src="/js/js-progress.js" type="text/javascript"></script>
</body>
</html>