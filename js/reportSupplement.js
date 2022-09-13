var app,columns,tableSupplement,report="animal",filtered=!1,filteredSupplement=!1,setup={populateSelect:function(){entryUtil.populateSelect("classificationType",["name"],!0,"/getall/true"),entryUtil.populateInput("lot",["name"],"","","lot","lot.title"),entryUtil.setAutoComplete("subSpecies","",[],"subSpecies","subspecies.title",function(e){e?entryUtil.populateSelect("pelage",["name"],!0,"/getbysubspecies/"+e,void 0,void 0,!1):$('[data-combo="pelage"]').html("")})},bindActions:function(){$(".report-action").click(function(){switch($(this).data("action")){case"filter":reportUtil.tableLoad();break;case"clear":reportUtil.clearFilters();break;default:console.log("Report Action UNDEFINED")}}),$("#classificationType").change(function(){"0"!=$(this).val()?entryUtil.populateSelect("species",["name"],!0,"/classificationTpe/"+$("#classificationType").val()+"/true"):$('[data-combo="species"]').html("")}),$("#species").change(function(){$('input[name="subSpecies"]').val(""),$("#subSpecies").val(""),"0"!=$(this).val()?entryUtil.getAutoCompleteData("subSpecies","",["name"],"/species/"+$("#species").val()+"/true"):$('input[name="subSpecies"]').autocomplete("option","source",[])})},bindTableActions:function(){$(".table-action").click(function(){switch($(this).data("action")){case"supplement":setup.getSupplementReport($(this).data("id")),$("#supplement-modal").modal("show");break;default:console.log("Table Action UNDEFINED")}})},tableSetup:function(){columns=[{data:"code",responsivePriority:2,render:function(e){return e?app.htmlEncode(e):"-"}},{data:"id",responsivePriority:1,className:"hide",render:function(e){return app.htmlEncode(e)}},{data:"nickName",responsivePriority:3,render:function(e){return e?app.htmlEncode(e):"-"}},{data:"deviceCode",responsivePriority:4,render:function(e){return e?app.htmlEncode(e):"-"}},{data:"gender",responsivePriority:5,render:function(e){return 1===e?$.t("animal.fields.genderMale"):2===e?$.t("animal.fields.genderFemale"):"-"}},{data:"subSpecies.name",responsivePriority:6,render:function(e){return e?app.htmlEncode(e):"-"}},{data:"pelage.name",responsivePriority:7,render:function(e){return e?app.htmlEncode(e):"-"}},{data:"dateBirth",responsivePriority:8,render:function(e){return e?app.htmlEncode(app.getDateTime(e)):"-"}},{data:"dateWeaning",responsivePriority:9,render:function(e){return e?app.htmlEncode(app.getDateTime(e)):"-"}},{data:"dateCastrate",responsivePriority:10,render:function(e){return e?app.htmlEncode(app.getDateTime(e)):"-"}},{data:"mother",responsivePriority:11,render:function(e){return e?e.nickName?app.htmlEncode(e.code+" - "+e.nickName):app.htmlEncode(e.code):"-"}},{data:"father",responsivePriority:12,render:function(e){return e?e.nickName?app.htmlEncode(e.code+" - "+e.nickName):e.code:"-"}},{data:null,responsivePriority:1,render:function(e){return'<a data-action="supplement" data-id="'+e.id+'" class="table-action icon icon-food"></a>'}}]},getSupplementReport:function(e){filteredSupplement?tableSupplement.ajax.url(app.api+"api/supplementreport/list/"+e).load():(filteredSupplement=!0,tableSupplement=$("#supplement-table").DataTable({processing:!0,serverSide:!0,ordering:!1,responsive:!0,info:!0,search:!1,lengthChange:!1,pageLength:7,paging:!0,language:{url:"locales/"+app.locale+"/translation.json"},ajax:{url:app.api+"api/supplementreport/list/"+e,type:"POST",beforeSend:app.setHeaders,error:function(e){app.ajaxError(e)}},preDrawCallback:function(){$("#supplement-table_filter").remove(),app.loadingAdd()},drawCallback:function(){app.loadingRemove()},initComplete:function(){$("#supplement-table_length").parent().removeClass("col-sm-6").addClass("col-xs-3"),$("#supplement-table").show()},columns:[{data:"supplement.name",responsivePriority:1,render:function(e){return e?app.htmlEncode(e):"-"}},{data:"supplement.supplementType.name",responsivePriority:2,render:function(e){return e?app.htmlEncode(e):"-"}},{data:"supplement.productBrand",responsivePriority:3,render:function(e){return e?app.htmlEncode(e):"-"}},{data:"supplement.weight",responsivePriority:6,render:function(e){return e?app.htmlEncode(e):"-"}},{data:"history.user.name",responsivePriority:4,render:function(e){return e?app.htmlEncode(e):"-"}},{data:"history.createdDateTime",responsivePriority:5,render:function(e){return e?app.htmlEncode(app.getDateTime(e)):"-"}}]}))},init:function(e){console.log("reportSupplement.js"),app=e,setup.populateSelect(),setup.bindActions(),setup.tableSetup()}};