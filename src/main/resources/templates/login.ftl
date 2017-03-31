<!DOCTYPE html>
<html>
<head>
    <title>登陆</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <link href="/plugin/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>
    <link href="/plugin/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css"/>
    <link href="/css/spoom.css" rel="stylesheet" type="text/css"/>
</head>
<body class="login-body">
<div class="header navbar navbar-default navbar-fixed-top">
    <div class="logo">
        <a href="/"><span>基层部队标准工作程序规范</span></a>
    </div>
    <div class="btn-group login-info right">
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
<div class="login-box">
    <form action="/login" method="post" class="form-horizontal form-login">
        <div class="row">
            <div class="form-body col-md-7">
                <div class="form-group <#if result??>${result}</#if>">
                    <label class="col-md-4 control-label">用户名</label>
                    <div class="col-md-8">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                            <input type="text" class="form-control" placeholder="用户" name="username">
                        </div>
                    </div>
                </div>
                <div class="form-group <#if result??>${result}</#if>">
                    <label class="col-md-4 control-label">密码</label>
                    <div class="col-md-8">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                            <input type="password" class="form-control" placeholder="密码" name="password">
                        </div>
                    </div>
                </div>
                <div class="form-group last">
                    <div class="right" style="padding-right: 15px">
                        <input type="checkbox" checked="checked" name="remember-me" id="remember-me"/>记住密码
                    </div>
                </div>

                <div class="form-actions top">
                    <div class="row">
                        <div class="col-md-offset-4 col-md-4">
                            <button type="submit" class="btn btn-block btn-success">登陆</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 border-left-after-grey reg-box">
                <span style="padding-left: 20px">没有账号?</span>
                <a href="/home/reg" class="btn btn-link btn-lg btn-logon">
                    立即注册 →
                </a>
                <a href="/"><img src="/image/logo.png" width="165px"></a>
            </div>
        </div>
    </form>

</div>

<script src="/plugin/jquery.min.js" type="text/javascript"></script>
<script src="/plugin/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/js/js-login.js" type="text/javascript"></script>
</body>
</html>