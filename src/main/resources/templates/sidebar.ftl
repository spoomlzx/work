<div class="header navbar navbar-default navbar-fixed-top">
    <div class="logo">
        <a href="/"><span>基层部队标准工作程序规范</span></a>
    </div>
    <div class="btn-group login-info">
    <#if currentUser??>
        <a href="/loginPage" type="button" class="btn btn-danger">
            <span class="fa fa-user"></span> ${currentUser.username}
        </a>
        <a href="/logout" type="button" class="btn btn-success"><span class="fa fa-sign-out"></span> 退出</a>
    </#if >
    <#if !currentUser??>
        <a href="/loginPage" type="button" class="btn btn-danger"><span class="fa fa-sign-in"></span> 登录</a>
        <a href="/logout" type="button" class="btn btn-success"><span class="glyphicon glyphicon-info-sign"></span> 注册</a>
    </#if>
    </div>
</div>
<div class="left-sidebar">
    <ul class="nav nav-sidebar">
        <li id="li-unfinished">
            <a href="/work">
                <span class="fa fa-exclamation-triangle"></span>
                <span>待办提醒</span>
            </a>
        </li>
        <li class="active" id="li-work">
            <a href="/work">
                <span class="fa fa-list-ul"></span>
                <span >工作清单</span>
            </a>
        </li>
        <li id="li-regulation">
            <a href="/regulation">
                <span class="fa fa-file-text"></span>
                <span >法规制度</span>
            </a>
        </li>
        <li id="li-progress">
            <a href="/progress">
                <span class="fa fa-calendar"></span>
                <span >工作进度</span>
            </a>
        </li>
        <li id="li-temp">
            <a href="/temp">
                <span class="fa fa-calendar-plus-o"></span>
                <span >临时工作</span>
            </a>
        </li>
        <li id="li-assess">
            <a href="/assess">
                <span class="fa fa-bar-chart"></span>
                <span >检查考评</span>
            </a>
        </li>
        <li id="li-setting">
            <a href="/work">
                <span class="fa fa-cogs"></span>
                <span >系统设置</span>
            </a>
        </li>
    </ul>
</div>