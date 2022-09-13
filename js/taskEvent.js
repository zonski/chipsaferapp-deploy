var app,statusChanged=!1,setup={bindActions:function(){$("#status").change(function(){var e=$(this).data("id"),t=$(this).prop("checked"),a=t?"Done":"Created";app.loadingAdd(),$.ajax({url:app.api+"api/taskevent/status/"+e+"/"+a,type:"PUT",beforeSend:app.setHeaders}).done(function(e){statusChanged=!0,$("#calendar").fullCalendar("refetchEvents"),app.notify("success",$.t("notify.success"),$.t("entry.putMsg",{entry:$.t("taskEvent.fields.status")}),!1)}).fail(function(e){$("#status").prop("checked",!t),app.ajaxError(e)}).always(function(){app.loadingRemove()})}),$(".entry-action").click(function(){switch($(this).data("action")){case"submit":if(entryUtil.validateFields("#formSpecificEventBase")){var e=entryUtil.buildEntryJson("#formSpecificEventBase");1==$("#inputType").data("inputType")&&(e.animal={},e.animal.id=$("#animalId-inputTypeAnimal").val()),app.loadingAdd(),$.ajax({url:app.api+"api/taskevent/weighing",type:"POST",data:JSON.stringify(e),contentType:"application/json; charset=utf-8",beforeSend:app.setHeaders}).done(function(t){app.notify("success",$.t("notify.success"),$.t("entry.postMsg",{entry:$.t("taskEvent.fields.weight")}),!1),entryUtil.clearAdd("#formSpecificEventBase"),$("#animalId-inputTypeAnimal").val(e.animal.id)}).fail(function(e){app.ajaxError(e)}).always(function(){app.loadingRemove()})}break;default:console.log("Entry Action UNDEFINED")}})},initCalendar:function(){var e=app.getUrlParam("date")||moment(),t="en-us"===app.locale.toLowerCase()?"MMM DD, YYYY":"DD MMM YYYY";$("#calendar").fullCalendar({header:{left:"prev title next",right:"today"},views:{basicDay:{titleFormat:t}},defaultDate:e,defaultView:"basicDay",eventLimit:!1,contentHeight:"auto",locale:app.locale.toLowerCase(),displayEventTime:!1,events:function(e,t,a,n){statusChanged?statusChanged=!1:$("#taskEvent").addClass("hidden"),app.loadingAdd(),$.ajax({url:app.api+"api/taskevent/eventDay/"+e.toISOString()+"/"+t.toISOString(),type:"GET",beforeSend:app.setHeaders}).done(function(e){n(setup.getTaskEvents(e))}).fail(function(e){app.ajaxError(e)}).always(function(){app.loadingRemove()})},eventClick:function(e,t,a){if(app.isMobile()){var n=moment(a.end._d).format("MM/DD/YYYY");window.location.href="taskEventView.html?id="+e.id+"&date="+n}else setup.populateView(e.id)},eventRender:function(e,t,a){t.find("span.fc-title").html(t.find("span.fc-title").text())},eventAfterAllRender:function(e){var t=parseFloat($(".fc-day-grid-container").css("height").replace("px",""));t=t<650?650:"auto",e.setHeight(t)}})},getTaskEvents:function(e){var t=[];return $(e).each(function(){eventType=this.event.eventType,$(this.taskEvent).each(function(){var e="Done"===this.status?'<span class="icon icon-check-2"></span>':"",a=app.getDateTime(this.startDateTime,"HH:mm")+" - "+app.getDateTime(this.endDateTime,"HH:mm");t.push({id:this.id,title:e+a+" "+app.htmlEncode(eventType.name),start:app.getDateTime(this.startDateTime,"HH:mm"),end:app.getDateTime(this.endDateTime,"HH:mm"),className:"type"+eventType.eventTypeFather.id+" "+this.status})})}),t},populateView:function(e){app.loadingAdd(),$.ajax({url:app.api+"api/taskevent/"+e,type:"GET",beforeSend:app.setHeaders}).done(function(e){$("#taskEvent").removeClass("hidden");for(var t=1;t<6;t++)$("#taskEvent .taskEventGroup").removeClass("type"+t);if($("#taskEvent .taskEventGroup").addClass("type"+e.eventDay.event.eventType.eventTypeFather.id),$("#title-taskEvent").html(app.htmlEncode(e.eventDay.event.eventType.name)),e.eventTaskDescription=e.eventTaskDescription.replace(/\n/g,"<br/>"),$("#description").html(e.eventTaskDescription),$("#duration").html(app.getDateTime(e.startDateTime,"HH:mm")+" - "+app.getDateTime(e.endDateTime,"HH:mm")),0!==e.eventDay.event.eventType.specificEvent){if($("#formSpecificEventBase").show(),1===e.eventDay.event.eventType.specificEvent?$("#formWeighing").show():$("#formWeighing").hide(),2===e.eventDay.event.inputType)setup.populateAutoComplete(e.eventDay.event.lot.id),$("#inputType").html($.t("event.fields.bylot")),$("#inputName").html(e.eventDay.event.lot.name),$("#formAnimal").show(),$("#inputType").data("inputType",2);else if(1===e.eventDay.event.inputType){$("#inputType").html($.t("event.fields.byanimal"));var a="";e.eventDay.event.animal.code&&(a+=e.eventDay.event.animal.code),e.eventDay.event.animal.nickName&&(a=a+" - "+e.eventDay.event.animal.nickName),$("#inputName").html(a),$("#animalId-inputTypeAnimal").val(e.eventDay.event.animal.id),$("#formAnimal").hide(),$("#inputType").data("inputType",1)}}else $("#formSpecificEventBase").hide();"Done"===e.status?$("#status").prop("checked",!0):$("#status").prop("checked",!1),$("#status").data("id",e.id)}).fail(function(e){app.ajaxError(e)}).always(function(){app.loadingRemove()})},populateAutoComplete:function(e){entryUtil.populateInput("animal",["code","nickName"],"/getByLotId/"+e,"#formAnimal","animal","event.fields.animal")},init:function(e){console.log("taskEvent.js"),app=e,this.bindActions(),this.initCalendar(),entryUtil.handleNumber()}};