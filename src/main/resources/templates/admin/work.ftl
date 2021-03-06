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
    <link href="/plugin/select2/css/select2.css" rel="stylesheet" type="text/css"/>
    <link href="/css/spoom.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" charset="utf-8" src="/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="/ueditor/ueditor.all.js"></script>
</head>
<body>
<#include "../sidebar.ftl"/>


<div class="container-content">
    <div class="work-edit-detail">
        <div class="panel panel-default title">
            <input class="hidden" <#if work??>value="${work.workId}" </#if> id="w-e-workid">
            <input class="form-control left" placeholder="工作标题" <#if work??>value="${work.name}" </#if> id="w-e-name" style="width:40%">
            <select class="form-control left" id="w-e-type" style="width: 10%">
                <option value="年度" <#if work?? && work.type='年度'>selected</#if>>年度</option>
                <option value="半年" <#if work?? && work.type='半年'>selected</#if>>半年</option>
                <option value="季度" <#if work?? && work.type='季度'>selected</#if>>季度</option>
                <option value="月度" <#if work?? && work.type='月度'>selected</#if>>月度</option>
                <option value="周" <#if work?? && work.type='周'>selected</#if>>周</option>
                <option value="日" <#if work?? && work.type='日'>selected</#if>>日</option>
                <option value="按需" <#if work?? && work.type='按需'>selected</#if>>按需</option>
            </select>
        <#if types??>
            <select class="form-control left" id="w-e-unit-type" style="width: 10%">
                <#list types as type>
                    <option value="${type.unitTypeId}">${type.name}</option>
                </#list>
            </select>
        </#if>
            <div class="right">
            <#if work??>
                <#if preId??>
                    <a type="button" class="btn btn-default" href="/work/${preId}">上一条</a>
                </#if>
                <#if nextId??>
                    <a type="button" class="btn btn-default" href="/work/${nextId}">下一条</a>
                </#if>
            </#if>
                <a type="button" class="btn btn-success" href="/work">返 回</a>
                <button type="button" class="btn btn-primary <#if !work??>hidden</#if>" id="w-edit-btn">保存</button>
                <button type="button" class="btn btn-warning <#if work??>hidden</#if>" id="w-add-btn">添加</button>

            </div>
        </div>
        <div class="work-panel">
            <div class="panel panel-success">
                <div class="panel-heading">工作内容</div>
                <div class="panel-body edit" style="overflow: hidden">
                    <script id="w-e-content" type="text/plain"><#if work??>${work.content}</#if></script>
                </div>
            </div>
        </div>
        <div class="work-panel">
            <div class="panel panel-warning">
                <div class="panel-heading">法规依据</div>
                <div class="panel-body edit" style="overflow: hidden">
                    <script id="w-e-basis" type="text/plain"><#if work??>${work.basis}</#if></script>
                </div>
            </div>
        </div>
        <div class="work-panel">
            <div class="panel panel-danger">
                <div class="panel-heading">注意事项</div>
                <div class="panel-body edit" style="overflow: hidden">
                    <script id="w-e-tips" type="text/plain"><#if work??>${work.tips}</#if></script>
                </div>
            </div>
        </div>
        <div class="work-panel">
            <div class="panel panel-primary">
                <div class="panel-heading">引用法规</div>
                <div class="panel-body">
                    <select class="regulation-select form-control" data-ids="<#if work??>${work.tips}</#if>" multiple="multiple">
                    <#list regulations as regulation>
                        <option value="${regulation.reguId}">${regulation.title}</option>
                    </#list>
                    </select>
                </div>
            </div>
        </div>

        <div class="work-panel" style="margin-bottom: 400px">
            <div class="panel panel-primary">
                <div class="panel-heading">流程图</div>
                <div class="panel-body">
                    <input type="file" value="sdgsdg" id="img_input"/>
                    <p id="img_area" style="margin-top: 10px;padding: 10px"><#if work??&&work.flowChart??><img width="100%" src="${work.flowChart}" alt=""/></#if></p>
                </div>
            </div>
        </div>

    </div>
</div>


<script src="/plugin/jquery.min.js" type="text/javascript"></script>
<script src="/plugin/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/plugin/select2/js/select2.full.js" type="text/javascript"></script>
<script src="/plugin/layer/layer.js" type="text/javascript"></script>
<script src="/js/js-admin-work.js" type="text/javascript"></script>
</body>
</html>