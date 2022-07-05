var app,table,entry="resourceArea",map=null,areaObject=null,drawingManager="",drawArea="",setup={bindActions:function(){$(".entry-action").click(function(){switch($(this).data("action")){case"addOpen":render.switchTop();break;case"addCancel":render.switchTop(),setup.clearMap();break;case"submit":setup.validateForm()&&entryUtil.entryCrud(entry,"submit");break;case"selectGeoref":$("#georef-modal").modal("show");break;default:console.log("Entry Action UNDEFINED")}}),$("#area").change(function(){setup.clearMap()}),$("#resourceModel").change(function(){setup.clearDraw()})},bindTableActions:function(){$(".table-action").click(function(){switch($(this).data("action")){case"edit":entryUtil.entryCrud(entry,"get",$(this).data("id"));break;case"delete":var e=$(this).data("id");app.notify("warning",$.t("notify.warning"),$.t("entry.deleteConfirm",{entry:$.t(entry+".name")}),!0,function(a){a&&entryUtil.entryCrud(entry,"delete",e)});break;default:console.log("Table Action UNDEFINED")}})},bindModalActions:function(){googleMapsFn.addCoordToModal($("#georefs").data("min")),$("#georef-modal").on("shown.bs.modal",function(){$(".y:first").val()?googleMapsFn.lockCoords(!0):googleMapsFn.lockCoords(!1),setup.handleMap()}),$("#georef-modal").on("hidden.bs.modal",function(){googleMapsFn.changeGeorefModal("map")}),$('[data-action="addCoord"]').click(function(){googleMapsFn.addCoordToModal(1)}),$("#map-btn").click(function(){googleMapsFn.changeGeorefModal("map"),setup.handleMap()}),$("#text-btn").click(function(){googleMapsFn.changeGeorefModal("text")}),$("#btn-clear-draw").click(function(){setup.clearDraw()})},clearDraw:function(){googleMapsFn.resetCoordModal($("#georefs").data("min")),googleMapsFn.lockCoords(!1),areaObject&&(areaObject.setMap(null),areaObject=null),drawingManager?(drawingManager.setMap(map),setup.setDrawingMode()):setup.initDrawingManager()},clearMap:function(){setup.clearDraw(),areaObject&&(areaObject.setMap(null),areaObject=null),map=null,$("#map").html("")},handleMap:function(){map||setup.loadAreaFather()},loadAreaFather:function(){var e=app.api+"api/area/"+$("#area").val();app.loadingAdd(),$.ajax({url:e,type:"GET",beforeSend:app.setHeaders}).done(function(e){if(e)if(e.georeferencing){var a=e.georeferencing.coordinates.points,o={lat:a[0].y,lng:a[0].x},n=googleMapsFn.latLngFromPoints(a);map=googleMapsFn.drawMapWithResources(o);var t=googleMapsFn.drawPolygon(n,"#00cace",e.id);t.setMap(map),drawArea=t,googleMapsFn.fitPolygon(t,map),$("#text").hasClass("locked")?setup.setDrawing():setup.initDrawingManager()}else $("#map").html('<div class="text-center">'+$.t("area.emptyError")+"</div>");else $("#map").html('<div class="text-center">'+$.t("area.selectEmptyError")+"</div>")}).fail(function(e){app.ajaxError(e)}).always(function(){app.loadingRemove()})},initDrawingManager:function(){drawingManager=new google.maps.drawing.DrawingManager({markerOptions:{icon:"images/icons/32-arvore.png"},drawingControl:!1}),setup.setDrawingMode(),drawingManager.setMap(map),google.maps.event.addListener(drawingManager,"polygoncomplete",function(e){setup.setVertices(e.getPath(),e.getPath().getLength(),e),e.setOptions({fillColor:"#FFA440",strokeColor:"#FFA440"}),googleMapsFn.checkPointOutArea(drawArea)}),google.maps.event.addListener(drawingManager,"markercomplete",function(e){setup.setVertices(e.position,1,e),googleMapsFn.checkPointOutArea(drawArea)}),google.maps.event.addListener(drawingManager,"polylinecomplete",function(e){setup.setVertices(e.getPath(),e.getPath().getLength(),e),e.setOptions({fillColor:"#0FA3FF",strokeColor:"#0FA3FF"}),googleMapsFn.checkPointOutArea(drawArea)})},setVertices:function(e,a,o){if(areaObject=o,drawingManager.setMap(null),googleMapsFn.resetCoordModal(a),1==a)$("#georef-modal .y").val(String(e.lat()).replace(".",",")),$("#georef-modal .x").val(String(e.lng()).replace(".",","));else for(var n=0;n<a;n++)$("#georef-modal .y:eq("+n+")").val(String(e.getAt(n).lat()).replace(".",",")),$("#georef-modal .x:eq("+n+")").val(String(e.getAt(n).lng()).replace(".",","));googleMapsFn.lockCoords(!0)},setDrawing:function(){var e=$("#resourceModel option:selected").data("geometrytype"),a=googleMapsFn.latLngFromForm();"Line"==e?(area=googleMapsFn.drawPolyline(a,"#0FA3FF",3,0),area.setMap(map)):"Polygon"==e?(area=googleMapsFn.drawPolygon(a,"#FFA440",0),area.setMap(map)):"Point"==e?(area=googleMapsFn.drawMarker(a,"#444444","32-arvore.png"),area.setMap(map)):console.log("geometrytype UNDEFINED")},setDrawingMode:function(){var e=$("#resourceModel option:selected").data("geometrytype");"Line"===e?(drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE),$("#georefs").data("min",2),googleMapsFn.resetCoordModal(2),$("#add-coord-row").removeClass("hidden")):"Polygon"===e?(drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON),googleMapsFn.resetCoordModal(3),$("#georefs").data("min",3),$("#add-coord-row").removeClass("hidden")):"Point"===e?(drawingManager.setDrawingMode(google.maps.drawing.OverlayType.MARKER),googleMapsFn.resetCoordModal(1),$("#georefs").data("min",1),$("#add-coord-row").addClass("hidden")):console.log("geometrytype UNDEFINED")},tableSetup:function(){var e=[{data:"id",visible:!1,render:function(e){return app.htmlEncode(e)}},{data:"code",render:function(e){return e?app.htmlEncode(e):"-"}},{data:"area",render:function(e){return e?app.htmlEncode(e.name):"-"}},{data:"resourceModel",render:function(e){return e?app.htmlEncode(e.name):"-"}},{data:null,render:function(e){return render.renderActions(e.id,e.id,e.locked)}}];entryUtil.tableLoad(e,!1)},validateForm:function(){var e=$("#georefs").data("min"),a=$("#georef-modal .x").filter(function(){return this.value.length>0}).length;return!(!entryUtil.validateFields()||googleMapsFn.checkPointOutArea(drawArea)||a>=1&&e>a&&(app.notify("warning",$.t("notify.warning"),$.t("resourceArea.error.minCoordinates"),!1),1))},populateSelects:function(){entryUtil.populateSelect("area",["name"],!1,"/areabase/true"),entryUtil.populateSelect("resource",["name"],!1,"","","resourceType.geometryType")},init:function(e){console.log("associateResourceArea.js"),document.title=$.t("resourceArea.title"),app=e,this.bindActions(),this.bindModalActions(),this.populateSelects(),this.tableSetup()}};