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

        <div class="temp-calendar bk-white">
            <div id="calendar" data-unitid="<#if currentUser??>${currentUser.unitId}</#if>"></div>
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


<div id="new-issue-panel" class="margin-top-35 modal fade in" aria-hidden="false" style="display: block;">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title modal-title-issue">新建任务</h4>
            </div>

            <div class="modal-body">
                <div class="q-title">
                    <label>标题<span class="not_empty_tips">*</span></label>
                    <input type="text" id="q-title" name="title" class="form-control" onkeydown="if(event.keyCode==13){return false;}" autofocus="">
                </div>
                <div class="issue_finish_priority">
                    <div class="create_left finish_at" id="q-plan-started-at-datepicker" style="width: 254px;">
                        <label>计划开始时间</label>

                    </div>
                    <div class="priority-label create_priority" style="margin-left: 65px;">
                        <label class="to-block">优先级</label>
                        <div class="modal-priority-list">
                            <input class="show-none" type="radio" id="pri-0" name="priority" value="未指定" checked="checked">
                            <label class="q-pri-label" for="pri-0">不指定</label>
                            <input class="show-none" type="radio" id="pri-1" name="priority" value="严重">
                            <label class="q-pri-label" for="pri-1">严重</label>
                            <input class="show-none" type="radio" id="pri-2" name="priority" value="主要">
                            <label class="q-pri-label" for="pri-2">主要</label>
                            <input class="show-none" type="radio" id="pri-3" name="priority" value="次要">
                            <label class="q-pri-label" for="pri-3">次要</label>
                            <input class="show-none" type="radio" id="pri-4" name="priority" value="不重要">
                            <label class="q-pri-label" for="pri-4">不重要</label>
                        </div>
                    </div>
                </div>
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