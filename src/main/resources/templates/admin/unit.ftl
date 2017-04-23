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
    <link href="/css/spoom.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<#include "../sidebar.ftl"/>

<div class="container-content" id="p-container" data-unitid="${currentUser.unitId}">
    <div class="center-container bk-white">
        <div class="panel panel-warning unit-manage-list bk-green-dan">
            <div class="panel-heading">单位结构</div>
            <div class="panel-body">
                <ul id="treeDemo" class="ztree"></ul>
            </div>
        </div>
        <div class="unit-manage-detail">
            <div class="panel panel-success">
                <div class="panel-heading">编辑单位</div>
                <div class="panel-body">
                    <div class="form-group">
                        <button class="btn btn-primary" id="u-edit-btn">编辑单位</button>
                        <button class="btn btn-success" id="u-add-btn">添加下属单位</button>
                        <button class="btn btn-danger" id="u-del-btn">删除单位</button>
                    </div>
                    <div>
                        <form class="form-horizontal" role="form">
                            <div class="form-body">
                                <div class="form-group">
                                    <label class="col-md-1 control-label">节点ID</label>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" id="u-id" disabled="disabled">
                                    </div>
                                </div>
                                <div class="form-group hidden">
                                    <label class="col-md-1 control-label">父节点ID</label>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" id="u-pid">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-1 control-label">单位名称</label>
                                    <div class="col-md-5">
                                        <input type="text" class="form-control" id="u-name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-1 control-label">排序值</label>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" id="u-sid">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-1 control-label">单位类型</label>
                                    <div class="col-md-3">
                                        <select class="form-control" id="u-type">
                                        <#list types as type>
                                            <option value="${type.unitTypeId}">${type.name}</option>
                                        </#list>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="panel panel-primary">
                <div class="panel-heading">
                    账号管理
                </div>
                <div class="panel-body">
                    <table class="table table-bordered" id="user-list">
                        <thead>
                        <tr class="bk-grey">
                            <th> 用户ID</th>
                            <th> 用户名</th>
                            <th> 角色类型</th>
                            <th> 邮箱</th>
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
<script src="/plugin/layer/layer.js" type="text/javascript"></script>
<script src="/plugin/ztree/jquery.ztree.js" type="text/javascript"></script>
<script src="/plugin/datatables/datatables.min.js" type="text/javascript"></script>
<script src="/js/js-admin-unit.js" type="text/javascript"></script>
</body>
</html>