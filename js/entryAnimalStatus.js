var app,table,entry="animalStatus",setup={bindActions:function(){$(".entry-action").click(function(){switch($(this).data("action")){case"addOpen":case"addCancel":render.switchTop();break;case"submit":entryUtil.validateFields()&&entryUtil.entryCrud(entry,"submit");break;default:console.log("Entry Action UNDEFINED")}})},bindTableActions:function(){$(".table-action").click(function(){switch($(this).data("action")){case"edit":entryUtil.entryCrud(entry,"get",$(this).data("id"));break;case"delete":var t=$(this).data("id");app.notify("warning",$.t("notify.warning"),$.t("entry.deleteConfirm",{entry:$.t(entry+".name")}),!0,function(e){e&&entryUtil.entryCrud(entry,"delete",t)});break;default:console.log("Table Action UNDEFINED")}})},tableSetup:function(){var t=[{data:"id",className:"hide",render:function(t){return app.htmlEncode(t)}},{data:"shortName",render:function(t){return t?app.htmlEncode(t):"-"}},{data:"description",render:function(t){return t?app.htmlEncode(t):"-"}},{data:"active",render:function(t){return t?$.t("options.yes"):$.t("options.no")}},{data:null,render:function(t){return render.renderActions(t.id,t.id,t.locked)}}];entryUtil.tableLoad(t,!1)},populateSelects:function(){},init:function(t){console.log("entryAnimalStatus.js"),app=t,this.bindActions(),this.populateSelects(),this.tableSetup()}};