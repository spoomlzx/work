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
                <#list workList as work>
                <tr>
                    <td> ${work.workId}</td>
                    <td> ${work.name}</td>
                    <td> ${work.type}</td>
                    <td>
                        <button class="btn btn-warning btn-show" onclick="window.location.href='/workAdd'">
                            <span class="fa fa-edit"></span>添加
                        </button>
                        <button class="btn btn-success btn-show" onclick="window.location.href='/work/${work.workId}'">
                            <span class="fa fa-edit"></span>编辑
                        </button>
                        <button class="btn btn-danger btn-show">
                            <span class="fa fa-file"></span>删除
                        </button>
                    </td>
                </tr>
                </#list>
                </tbody>
            </table>
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
