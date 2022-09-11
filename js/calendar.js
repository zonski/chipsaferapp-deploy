var app,profile_id,setup={bindActions:function(){$("#endDate-check").change(function(){$(this).prop("checked")?($("#startDate-label").html($.t("event.fields.startDate")),$("#endDate").val($("#startDate").val()),$("#endDate-group").show()):($("#startDate-label").html($.t("event.fields.date")),$("#endDate").val(""),$("#endDate-group").hide())}),$("#event-modal").on("shown.bs.modal",function(){$("#eventType").focus()}),$("#event-modal").on("hidden.bs.modal",function(){entryUtil.clearAdd(),$("#event-btn").click(),$("#taskEvent-btn").prop("disabled",!0)})},bindModalActions:function(){$("#event-btn, #taskEvent-btn").click(function(){"event"===$(this).data("option")?($("#modal-switch").removeClass("taskEvent").addClass("event"),$("#event-modal .modal-title").html($.t("event.title")),$("#btn-true-event").removeClass("d-none"),$("#btn-false-event span:last-child").html($.t("button.cancel"))):"taskEvent"===$(this).data("option")?($("#modal-switch").removeClass("event").addClass("taskEvent"),$("#event-modal .modal-title").html($.t("taskEvent.title")),setup.listTaskEvent()):console.log("Mode UNDEFINED"),$(this).parent().find("button").not($(this)).removeClass("btn-primary").addClass("btn-default"),$(this).removeClass("btn-default").addClass("btn-primary")}),$("#btn-delete-all-event").click(function(){setup.deleteEvent("event",$(this).data("id"))}),$("#btn-delete-event").click(function(){setup.deleteEvent("eventDay",$(this).data("id"))}),$("#btn-false-event").click(function(){$("#modal-switch.taskEvent .form").length>0?$("#taskEvent-btn").click():(entryUtil.clearAdd(),$("#event-modal").modal("hide"))}),$("#btn-true-event").click(function(){$("#endDate-check").prop("checked")||$("#endDate").val($("#startDate").val());var e=$("#modal-switch.taskEvent .form").length>0?"#formTaskEvent":"#entry-add",t=$("#modal-switch.taskEvent .form").length>0?"taskEvent":"event";if(entryUtil.validateFields(e)){var n=$("#eventType").find(":selected"),a=!0,i="event";void 0!==n&&n.data("specificevent")&&0!==n.data("specificevent")&&(t.specificEvent=n.data("specificevent"),a=!1,3==n.data("specificevent")?i+="/drug":2==n.data("specificevent")&&(i+="/supplement")),a&&($("#formLot input").val(""),$("#formAnimal input").val(""));var s=$.t("entry.updateConfirm",{entry:$.t("event.title")})+" "+$.t("taskEvent.deleteTaskEvent");"event"===t?$("#entry-add #id").val()?app.notify("warning",$.t("notify.warning"),s,!0,function(n){n&&(entryUtil.entryCrud(t,"submit",void 0,e,i),$("#event-modal").modal("hide"))}):(entryUtil.entryCrud(t,"submit",void 0,e,i),$("#event-modal").modal("hide")):(entryUtil.entryCrud(t,"submit",void 0,e),$("#taskEvent-btn").click())}})},bindTaskEventActions:function(){$(".table-action").click(function(){switch($(this).data("action")){case"edit":var e=$(this).data("id");setup.formTaskEvent(e);break;case"delete":var t=$(this).data("id");app.notify("warning",$.t("notify.warning"),$.t("entry.deleteConfirm",{entry:$.t("taskEvent.name")}),!0,function(e){e&&entryUtil.entryCrud("taskEvent","delete",t)});break;default:console.log("Table Action UNDEFINED")}}),$("#add-taskEvent-btn").click(function(){setup.formTaskEvent()})},initCalendar:function(){$("#calendar").fullCalendar({header:{left:"prev title next",center:"today",right:"basicDay,basicWeek,month"},defaultView:"basicWeek",eventLimit:!1,contentHeight:"auto",contentWidth:"auto",locale:app.locale.substring(0,2),events:function(e,t,n,a){app.loadingAdd();$.ajax({url:app.api+"api/event/"+e.toISOString()+"/"+t.toISOString(),type:"GET",beforeSend:app.setHeaders}).done(function(e){a(setup.getEvents(e))}).fail(function(e){app.ajaxError(e)}).always(function(){app.loadingRemove()})},eventClick:function(e,t,n){if("1"==profile_id){app.loadingAdd();$.ajax({url:app.api+"api/event/"+e.eventId,type:"GET",beforeSend:app.setHeaders}).done(function(t){setup.editEvent(t,e)}).fail(function(e){app.ajaxError(e)}).always(function(){app.loadingRemove()})}},dayClick:function(e,t,n){"1"==profile_id&&($("#endDate-check").prop("checked",!1).change(),$("#startDate").datepicker("setDate",app.getDateTime(e.toISOString(),"datepicker")),$("#delete-div").hide(),$("#event-modal").modal("show"))},eventAfterAllRender:function(e){var t=parseFloat($(".fc-day-grid-container").css("height").replace("px",""));$("#calendar").fullCalendar("option","contentHeight",t<650?650:"auto")}})},getEvents:function(e){var t=[];return $(e).each(function(){var e=this.id,n=this.description,a=app.getDateTime(this.startDate,"split"),i=app.getDateTime(this.endDate,"split"),s=this.eventType.name,l=this.eventType.id,o="type"+this.eventType.eventTypeFather.id,d=this.eventDay.length>1;$(this.eventDay).each(function(){t.push({id:this.id,title:s,start:app.getDateTime(this.date,"split"),className:o,eventId:e,description:n,startDate:a,endDate:i,isPeriod:d,eventTypeId:l})})}),t},editEvent:function(e,t){entryUtil.clearAdd(),$("#taskEvent-btn").prop("disabled",!1),$('input[name="eventId"]').val(e.id),$("#eventType").val(e.eventType.id),$("#inputType").val(e.inputType),0===e.inputType&&$("#inputType").val(1);var n=0,a=0;1===e.inputType?(n="animal",a=e.animal.id):2===e.inputType&&(n="lot",a=e.lot.id),0!==e.inputType&&setup.populateAutoComplete(n,a),e.eventType.specificEvent&&(3===e.eventType.specificEvent&&setup.populateAutoComplete("drug",e.drug.id),2===e.eventType.specificEvent&&setup.populateAutoComplete("supplement",e.supplement.id)),$('input[name="descriptionEvent"]').val(app.htmlEncode(e.description)),t.isPeriod?($("#startDate").datepicker("setDate",app.getDateTime(e.startDate,"datepicker")),$("#endDate-check").prop("checked",!0).change(),$("#endDate").datepicker("setDate",app.getDateTime(e.endDate,"datepicker")),$("#btn-delete-all-event").show()):($("#startDate").datepicker("setDate",app.getDateTime(e.startDate,"datepicker")),$("#endDate-check").prop("checked",!1).change(),$("#btn-delete-all-event").hide()),$("#eventDay").val(t.id),$("#btn-delete-all-event").data("id",e.id),$("#btn-delete-event").data("id",t.id),$("#delete-div").show(),$("#event-modal").modal("show")},populateAutoComplete:function(e,t){for(var n='input[data-reference="'+e+'"]',a=$(n).autocomplete("option").source,i=$("#"+e),s=0;s<a.length;s++)if(a[s].id==t){$(n).val(a[s].label),i.val(a[s].id);break}},deleteEvent:function(e,t){var n=$.t("entry.deleteConfirm",{entry:$.t(e+".name")})+" "+$.t("taskEvent.deleteTaskEvent");app.notify("warning",$.t("notify.warning"),n,!0,function(n){n&&(entryUtil.entryCrud(e,"delete",t),$("#event-modal").modal("hide"))})},populateSelects:function(){setup.populateSelectFather("eventType",!1,""),entryUtil.populateInput("animal",["code","nickName"],"/getall","#formAnimal","animal","event.fields.animal"),entryUtil.populateInput("lot",["name"],"","#formLot","lot","event.fields.lot"),entryUtil.populateInput("drug",["name","dosage"],"","#formDrug","drug","event.fields.drug"),entryUtil.populateInput("supplement",["name"],"","#formSupplement","supplement","event.fields.supplement"),entryUtil.getJsonData("user","GET").then(function(e){$(".row-users").find("select");$.each(e,function(e,t){$(".row-users").find("select").append($("<option>",{value:t.id,text:t.name}))})})},populateSelectFather:function(e,t,n,a){n||(n=""),a||(a=""),$('[data-combo="'+e+a+'"]').html('<option value="0">Loading...</option>'),$.ajax({url:app.api+"api/"+e+n,type:"GET",beforeSend:app.setHeaders}).done(function(n){var i="";t&&(i+='<option value="0"></option>'),$.each(n,function(){var e="";e+='<optgroup label="'+app.htmlEncode(this.name)+'">',$.each(this.eventTypes,function(){var t=this.id,n=0;void 0!==this.specificEvent&&(n=this.specificEvent),e+='<option value="'+t+'" data-specificevent="'+n+'">'+app.htmlEncode(this.name)+"</option>"}),i+=e+="</optgroup>"}),$('[data-combo="'+e+a+'"]').html(i).change()}).fail(function(e){app.ajaxError(e)})},formTaskEvent:function(e){if($("#taskEvent").removeClass("list").addClass("form"),$(".field-error").removeClass("field-error"),$("#btn-true-event").removeClass("d-none"),$("#btn-false-event span:last-child").html($.t("button.cancel")),$("#task-done-div").hide(),setup.clearTaskFields(),e){app.loadingAdd();$.ajax({url:app.api+"api/taskevent/"+e,type:"GET",beforeSend:app.setHeaders}).done(function(e){$('input[name="taskEventId"]').val(e.id),$('textarea[name="descriptionTaskEvent"]').val(app.htmlEncode(e.description)),$("#startTime").val(e.startTime.substring(0,5)),$("#endTime").val(e.endTime.substring(0,5)),setup.fillCheckboxesOnSelectField(e.users),$("#task-done-div").show(),$("#done").prop("checked",e.done)}).fail(function(e){app.ajaxError(e)}).always(function(){app.loadingRemove()})}},clearTaskFields:function(){$('input[name="taskEventId"]').val(""),$('textarea[name="descriptionTaskEvent"]').val(""),$("#startTime").val(""),$("#endTime").val(""),$("#done").prop("checked",!1),$("#users").multiselect({maxHeight:200,nonSelectedText:$.t("select.noneSelected",{entry:$.t("taskEvent.fields.user")}),nSelectedText:$.t("select.nSelected",{entry:$.t("menu.users")})}),$("#users").multiselect("deselectAll",!1),$("#users").multiselect("updateButtonText")},fillCheckboxesOnSelectField:function(e){var t,n,a=e.length;for(t=0;t<a;t++)n=e[t],$("#users > option").each(function(){n.id==this.value&&$("#users").multiselect("select",this.value)})},listTaskEvent:function(){var e=$("#eventDay").val();$("#taskEvent").removeClass("form").addClass("list"),$("#message-empty").addClass("d-none"),$("#listTaskEvent table").removeClass("d-none"),$("#listTaskEvent table tbody").html(""),$("#btn-true-event").addClass("d-none"),$("#btn-false-event span:last-child").html($.t("button.close")),app.loadingAdd();$.ajax({url:app.api+"api/taskevent/eventday/"+e,type:"GET",beforeSend:app.setHeaders}).done(function(e){var t="";e?($.each(e.taskEvent,function(){t+="<tr><td>"+this.startTime.substring(0,5)+" - "+this.endTime.substring(0,5)+"</td>",t+='<td><div class="break-line">'+app.htmlEncode(this.users[0].name),this.users.length>1&&(t+=" + "+(this.users.length-1)+"</div></td>"),this.done?t+="<td>"+$.t("options.done")+"</td>":t+="<td>"+$.t("options.open")+"</td>",t+="<td>"+render.renderActions(this.id,this.id)+"</td></tr>"}),$("#message-empty").addClass("d-none"),$("#listTaskEvent table").removeClass("d-none"),$("#listTaskEvent table tbody").html(t)):($("#listTaskEvent table").addClass("d-none"),$("#message-empty").removeClass("d-none")),setup.bindTaskEventActions()}).fail(function(e){app.ajaxError(e)}).always(function(){app.loadingRemove()})},specificBaseForm:function(){$("#event-modal").change(function(){var e=$("#eventType").find(":selected");if(e&&void 0!==e.data("specificevent")){var t=e.data("specificevent");0===t?($(".event-specific-base").hide(),$("#formAnimal input, #formLot input, #formDrug input").addClass("no-validate")):($(".event-specific-base").show(),setup.specificInputType(t))}})},specificInputType:function(e){var t=$("#inputType").val();"1"===t?($("#formLot, #formLot input").hide(),$("#formLot input").addClass("no-validate"),$("#formAnimal input").removeClass("no-validate"),$("#formAnimal, #formAnimal input").show()):"2"===t&&($("#formAnimal input").addClass("no-validate"),$("#formLot input").removeClass("no-validate"),$("#formLot, #formLot input").show(),$("#formAnimal, #formAnimal input").hide());var n=["#formDrug","#formSupplement"],a="";switch(e){case 3:a="#formDrug";break;case 2:a="#formSupplement"}a&&(n.splice(n.indexOf(a),1),$(a).show(),$(a+","+a+" input").show(),$(a+" input").removeClass("no-validate")),$.each(n,function(){var e=this.toString();$(e).hide(),$(e+" input").addClass("no-validate"),$(e+", "+e+" input").hide()})},init:function(e){console.log("calendar.js"),app=e,profile_id=localStorage.getItem("profile_id"),this.bindActions(),this.bindModalActions(),this.populateSelects(),this.initCalendar(),setup.specificBaseForm()}};