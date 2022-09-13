var app,setup={bindActions:function(){$("[data-action]").click(function(){switch($(this).data("action")){case"login":setup.validateForm();break;default:console.log("Data Action UNDEFINED")}}),$(".login-input").keypress(function(e){13===e.keyCode?$("#btn-login").click():($("#username-input").removeClass("error"),$("#password-input").removeClass("error"))}),$("#btn-recover").unbind("click").bind("click",function(){var e=document.getElementById("email-input").value;if(app.loadingAdd(),""==e||!setup.validateEmail(e))return app.loadingRemove(),app.notify("warning",$.t("notify.warning"),$(".recoverypwdEmlErr").text(),!1,null),$("#email-input").addClass("error-field"),!1;$("#email-input").removeClass("error-field"),$.ajax({url:app.api+"api/user/recoverypwd/"+e,type:"GET",statusCode:{200:function(){app.loadingRemove(),app.notify("success",$.t("notify.success"),$(".recoverypwdsuccess").text(),!1,null),$(".recovery-pwd-bck").click()},404:function(){$(".recoverypwdemail404").text(),app.notify("warning",$.t("notify.warning"),$(".recoverypwdemail404").text(),!1,null),app.loadingRemove()}}})}),$(".recovery-pwd-bck").unbind("click").bind("click",function(e){$(".login-window").show(),$(".recover-window").hide()}),$(".recovery-pwd").unbind("click").bind("click",function(e){$(".login-window").hide(),$(".recover-window").show()})},validateForm:function(){var e=document.getElementById("username-input").value,n=document.getElementById("password-input").value;e&&n?setup.login(e,n):app.notify("warning",$.t("notify.warning"),$.t("login.fieldsError"),!1,function(){n||($("#password-input").addClass("error"),$("#password-input").focus())})},validateEmail:function(e){return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)},login:function(e,n){var t={username:e,password:n,grant_type:"password"};app.loadingAdd(),$.ajax({url:app.api+"token",type:"POST",data:t,beforeSend:app.setHeaders}).done(function(n){app.setTokens(n.access_token,n.refresh_token,e,void 0,n.expires_in,n.profile_id,n.user_id,"False"==n.acceptanceTerms?0:1),setup.redirectConditions("1"==localStorage.getItem("acceptanceTerms"))}).fail(function(e){app.isMobile()&&alert(navigator.userAgent+"\n"+app.api+"token\n"+e.status),400===e.status?app.notify("error",$.t("notify.error"),e.responseText,!1,function(){$("#username-input").addClass("error"),$("#password-input").addClass("error"),$("#username-input").focus()}):app.ajaxError(e)}).always(function(){app.loadingRemove()})},redirectConditions:function(e){window.location.href=e?"propertyMenu.html":"termsConditions.html"},isLogged:function(){const e=new Date(localStorage.getItem("last_refresh"));new Date(e.getTime()+12e5)>new Date&&(localStorage.getItem("access_token")&&localStorage.getItem("property_id")?window.navigator.onLine?app.refreshToken("home.html"):window.location.href="home.html":localStorage.getItem("access_token")&&setup.redirectConditions("1"==localStorage.getItem("acceptanceTerms")))},init:function(e){var n=Math.floor(5*Math.random())+1;$(".cover-up").css("background-image","url(../images/bg/wall"+n+".jpg)"),app=e,this.isLogged(),$("#username-input").focus(),$("#username-input").attr("placeholder",$.t("login.username")).attr("maxlength",50),$("#password-input").attr("placeholder",$.t("login.password")),this.bindActions()}};