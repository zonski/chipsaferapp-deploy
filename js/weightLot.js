var app,table,entry="weightLot",setup={bindActions:function(){$(".entry-action").click(function(){switch($(this).data("action")){case"addOpen":setup.setValues(),localStorage.removeItem("historylotweight"),localStorage.removeItem("historylot"),render.switchTop();break;case"addCancel":render.switchTop();break;case"submit":entryUtil.validateFields()&&entryUtil.entryCrud(entry,"submit","","#entry-add");break;default:console.log("Entry Action UNDEFINED")}})},bindTableActions:function(){$(".table-action").click(function(){switch($(this).data("action")){case"edit":entryUtil.entryCrud(entry,"get",$(this).data("id"));break;default:console.log("Table Action UNDEFINED")}})},tableSetup:function(){columns=[{data:"history.lot.name",render:function(t){return app.htmlEncode(t)}},{data:"weight",render:function(t){return t?app.htmlEncode(t):"-"}},{data:"arroba",render:function(t){return t?app.htmlEncode(t):"-"}},{data:"dateWeighing",render:function(t){return t?app.htmlEncode(app.getDateTime(t)):"-"}},{data:null,render:function(t){return render.renderActions(t.id,null,null)}}],entryUtil.tableLoad(columns)},setValues:function(){$(document).ready(function(){$("#dateWeighing").datepicker("hide"),$("#lotId").prop("disabled",!1),$("#lotId").focus()})},populateSelects:function(){entryUtil.populateSelectWithSpecifiedComboData("lot","lot",["name"],!0,"",void 0,void 0,void 0,$.t("select.values.default"),!0)},init:function(t){console.log("weighAnimals.js"),document.title=$.t("weighing.lotTitle"),app=t,this.bindActions(),this.bindTableActions(),this.populateSelects(),this.tableSetup()}};