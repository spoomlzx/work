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
    <link href="/plugin/datetime/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css"/>
    <link href="/css/spoom.css" rel="stylesheet" type="text/css"/>
    <link href="/plugin/fullcalendar/fullcalendar.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<#include "./sidebar.ftl">

<div class="container-content">
    <div class="center-container">

        <div class="event-calendar bk-white">
            <div id="calendar"></div>
        </div>

    </div>
</div>

<#--显示event详情-->
<div class="event-detail" style="display: none">
    <div class="form-group">
        <button type="button" class="btn btn-danger event-delete">删除</button>
        <button type="button" class="btn btn-info hidden">编辑</button>
    </div>
    <div class="form-group event-title-show">
        <h3>开发工作规范软件</h3>
    </div>
    <div class="form-group event-time-show">
        <div class="display-inline-block ">
            <span class="fa fa-calendar"></span><span>04-27 15:00 – 04-29 10:30</span>
        </div>
    </div>
    <div class="form-group event-person-show">
        <div class="display-inline-block ">
            <label class="label">重要</label><span>责任人：</span><span></span>
        </div>
    </div>
    <div class="form-group event-describe-show">

    </div>
</div>

<#--添加event-->
<div id="event-add-modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title modal-title-issue">添加工作</h4>
            </div>

            <div class="modal-body">
                <div class="form-group event-title">
                    <label>标题<span class="not_empty_tips">*</span></label>
                    <input type="text" name="title" class="form-control">
                </div>

                <div class="form-group">
                    <div class="display-inline-block event-person">
                        <label>责任人</label>
                        <input class="form-control" type="text" value="">
                    </div>
                </div>

                <div class="form-group">
                    <div class="event-time-picker display-inline-block">
                        <div class="display-inline-block event-start">
                            <label>开始时间<span class="not_empty_tips">*</span></label>
                            <input class="form-control event-time" type="text" value="">
                        </div>
                        <div class="display-inline-block event-end right">
                            <label>结束时间<span class="not_empty_tips">*</span></label>
                            <input class="form-control event-time" type="text" value="">
                        </div>
                    </div>
                    <div class="display-inline-block event-priority">
                        <label>优先级<span class="not_empty_tips">*</span></label>
                        <div>
                            <input class="display-none" type="radio" id="pri-0" name="priority" value="#FF9933">
                            <label class="priority-label" for="pri-0">不指定</label>
                            <input class="display-none" type="radio" id="pri-1" name="priority" value="#d9534f">
                            <label class="priority-label" for="pri-1">严重</label>
                            <input class="display-none" type="radio" id="pri-2" name="priority" value="#428bca">
                            <label class="priority-label" for="pri-2">主要</label>
                            <input class="display-none" type="radio" id="pri-3" name="priority" value="#5bc0de">
                            <label class="priority-label" for="pri-3">次要</label>
                            <input class="display-none" type="radio" id="pri-4" name="priority" value="#5cb85c">
                            <label class="priority-label" for="pri-4">不重要</label>
                        </div>
                    </div>
                </div>
                <div class="form-group event-describe">
                    <label>详情</label>
                    <textarea class="form-control" rows="5"></textarea>
                </div>
                <div class="form-group">
                    <button class="btn btn-success" id="event-add-btn">确认添加</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="/plugin/jquery.min.js" type="text/javascript"></script>
<script src="/plugin/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/plugin/moment.min.js" type="text/javascript"></script>
<script src="/plugin/layer/layer.js" type="text/javascript"></script>
<script src="/plugin/fullcalendar/fullcalendar.js" type="text/javascript"></script>
<script src="/plugin/fullcalendar/zh-cn.js" type="text/javascript"></script>
<script src="/plugin/datetime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="/plugin/datetime/bootstrap-datetimepicker.zh-CN.js" type="text/javascript"></script>
<script src="/js/js-temp.js" type="text/javascript"></script>
</body>
</html>