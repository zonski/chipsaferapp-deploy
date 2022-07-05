var app,columns,dataFields,report="lot",filtered=!1,setup={backgroundline:"rgb(255, 153, 153)",populateSelect:function(){entryUtil.populateSelect("lot",["name"],!0,"",void 0,void 0,void 0,$.t("select.values.default"),!0)},bindActions:function(){$(".report-action").click(function(){switch($(this).data("action")){case"filter":entryUtil.validateFields("#report-filter")&&(reportUtil.tableLoad(!1),dataFields=entryUtil.buildEntryJson("#report-filter"));break;case"clear":reportUtil.clearFilters();break;default:console.log("Report Action UNDEFINED")}}),$("#periodOption").on("change",function(t){setup.renderPeriodDiv($("#periodOption").val())})},renderPeriodDiv:function(t){2==t?$("#period-div").removeClass("d-none"):$("#period-div").addClass("d-none")},bindTableActions:function(){$(".table-action").click(function(){switch($(this).data("action")){case"animalMovement":$("#animalMovement").modal("show"),$("#id").val($(this).data("id"));break;case"animalWeighing":$("#id").val($(this).data("id")),window.location.href="chartAnimalWeighing.html?id="+$("#id").val();break;default:console.log("Table Action UNDEFINED")}})},reportInXlsPDF:function(t){property=localStorage.getItem("property_id"),periodOption=$("#periodOption").val(),lot=$("#lot").val(),startDate=""==$("#startDate").val()?null:$("#startDate").val().replace(/(\/)/g,"-"),endDate=""==$("#endDate").val()?null:$("#endDate").val().replace(/(\/)/g,"-"),window.location=app.api+"api/lotreport/reportoutput/"+t+"/"+lot+"/"+periodOption+"/"+startDate+"/"+endDate+"/"+property+"/"+app.locale},bindModalActions:function(){$("#btn-cancel").click(function(){$("#animalMovement input").val("")}),$("#btn-ok").click(function(){entryUtil.validateFields("#animalMovement")&&(window.location.href="chartAnimalMovement.html?id="+$("#id").val()+"&dateFrom="+$("#dateFrom").val()+"&dateTo="+$("#dateTo").val())})},tableSetup:function(){columns=[{data:"animalName",responsivePriority:1,render:function(t){return t?app.htmlEncode(t):"-"}},{data:"entryDate",responsivePriority:2,render:function(t){return t?app.htmlEncode(app.getDateTime(t,"DD/MM/YYYY")):"-"}},{data:"departureDate",responsivePriority:1,render:function(t){return t?app.htmlEncode(app.getDateTime(t,"DD/MM/YYYY")):"-"}},{data:"isInLot",responsivePriority:1,render:function(t){return t?$.t("options.yes"):$.t("options.no")}}]},init:function(t){console.log("reportLot.js"),document.title=$.t("report.lot.title"),app=t,setup.populateSelect(),setup.bindActions(),setup.tableSetup(),setup.bindModalActions()}};