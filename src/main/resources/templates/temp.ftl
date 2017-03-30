<!DOCTYPE html>
<html>
<head>
    <base href="<%=basePath%>">
    <title>临时性工作</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <link href="/plugin/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>
    <link href="/plugin/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css"/>
    <link href="/css/spoom.css" rel="stylesheet" type="text/css"/>
    <link href="/plugin/fullcalendar/fullcalendar.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<#include "./sidebar.ftl">

<div class="container-content">
    <div class="center-container">
        <div class="temp-detail">
            <div class="work-panel">
                <div class="panel panel-success">
                    <div class="panel-heading">法规依据</div>
                    <div class="panel-body" id="p-basis">
                        <button type="button" class="fc-listWeek-button fc-button fc-state-default fc-corner-right fc-state-hover">list week</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="temp-calendar bk-white">
            <div id="calendar"></div>
        </div>

    </div>
</div>

<div class="modal fade" id="content-modal" tabindex="-1">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"><span class="fa fa-file-code-o" style="color: #1c8f5f"></span> 法规原文</h4>
            </div>
            <div class="modal-body regulation-content">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关 闭</button>
            </div>
        </div>
    </div>
</div>

<script src="/plugin/jquery.min.js" type="text/javascript"></script>
<script src="/plugin/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/plugin/fullcalendar/moment.min.js" type="text/javascript"></script>
<script src="/plugin/fullcalendar/fullcalendar.js" type="text/javascript"></script>
<script src="/plugin/fullcalendar/zh-cn.js" type="text/javascript"></script>
<script src="/js/js-temp.js" type="text/javascript"></script>
</body>
</html>