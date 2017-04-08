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
        <div class="unit-list bk-green-dan">
            <ul id="treeDemo" class="ztree"></ul>
        </div>

    </div>
</div>

<script src="/plugin/jquery.min.js" type="text/javascript"></script>
<script src="/plugin/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/js/app.js" type="text/javascript"></script>
<script src="/plugin/ztree/jquery.ztree.js" type="text/javascript"></script>
<script src="/js/js-admin-unit.js" type="text/javascript"></script>
</body>
</html>