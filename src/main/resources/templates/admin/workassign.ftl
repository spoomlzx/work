<!DOCTYPE html>
<html>
<head>
    <title>工作清单</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <link href="/plugin/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>
    <link href="/plugin/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css"/>
    <link href="/plugin/ztree/ztree.css" rel="stylesheet" type="text/css"/>
    <link href="/plugin/select2/css/select2.css" rel="stylesheet" type="text/css"/>
    <link href="/css/spoom.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<#include "../sidebar.ftl"/>

<div class="container-content" id="p-container">
    <div class="center-container bk-white">
        <div class="work-assign-list panel panel-warning">
            <div class="panel-heading">单位类型</div>
            <div class="panel-body">
                <ul id="treeDemo" class="ztree"></ul>
            </div>
        </div>
        <div class="work-assign-detail">
            <div class="panel panel-success">
                <div class="panel-heading">添加工作</div>
                <div class="panel-body">
                    <select class="work-available-select form-control"  style="width: 85%" multiple="multiple">
                        <option value="423">渔业船员证书核发</option>
                    </select>
                    <button class="btn btn-success right" id="wa-add-btn" data-id="1" data-type="年度" style="width: 10%">添加</button>
                </div>
            </div>
            <div class="panel panel-success">
                <div class="panel-heading">
                    <span style="color: black" id="wa-unit-type">航空兵部队 </span>
                    <span class="fa fa-arrow-right"></span>
                    <span id="wa-work-type"> 年度</span>工作
                </div>
                <div class="panel-body">
                    <table class="table table-bordered" id="worklist-now">
                        <thead>
                        <tr class="bk-grey">
                            <th> 工作编号</th>
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
    </div>
</div>

<script src="/plugin/jquery.min.js" type="text/javascript"></script>
<script src="/plugin/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/js/app.js" type="text/javascript"></script>
<script src="/plugin/ztree/jquery.ztree.js" type="text/javascript"></script>
<script src="/plugin/select2/js/select2.full.js" type="text/javascript"></script>
<script src="/plugin/datatables/datatables.min.js" type="text/javascript"></script>
<script src="/js/js-admin-workAssign.js" type="text/javascript"></script>
</body>
</html>