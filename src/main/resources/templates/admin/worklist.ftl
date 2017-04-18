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
            <table class="table table-bordered table-hover" style="width:100%;">
                <thead>
                <tr class="bk-grey">
                    <th> 序号</th>
                    <th> 法规制度名称</th>
                    <th> 发文机关</th>
                    <th> 类别</th>
                    <th> 操作</th>
                </tr>
                </thead>
            </table>
            <table class="table table-bordered table-hover" id="regulation_table" style="width:100%;">
                <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th id="s-2"></th>
                    <th id="s-3"></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <#list regulations as regulation>
                <tr>
                    <td></td>
                    <td class="r-title"> ${regulation.title}</td>
                    <td class="r-department"> ${regulation.department}</td>
                    <td class="r-category"> ${regulation.category}</td>
                    <td>
                        <div class="regulation-content" style="display: none">${regulation.content}</div>
                        <button href="#content-modal" data-toggle="modal" class="btn btn-info btn-show">
                            <span class="fa fa-file"></span>原文
                        </button>
                        <#if currentUser?? && currentUser.role == "ADMIN">
                            <button href="#edit-modal" data-toggle="modal" class="btn btn-success btn-edit" data-reguid="${regulation.reguId}">
                                <span class="fa fa-edit"></span>修改
                            </button>
                            <button href="#delete-modal" data-toggle="modal" class="btn btn-danger btn-delete" data-reguid="${regulation.reguId}">
                                <span class="fa fa-cut"></span>删除
                            </button>
                        </#if>
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
<script src="/plugin/datatables/datatables.min.js" type="text/javascript"></script>
<script src="/plugin/jquery.slimscroll.js" type="text/javascript"></script>
<script src="/js/js-admin-worklist.js" type="text/javascript"></script>
</body>
</html>
