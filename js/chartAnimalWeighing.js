var app,table,setup={bindActions:function(){$("#btn-back").click(function(t){window.location.href="reportAnimal.html"})},chartSetup:function(){var t=app.getUrlParam("id"),i=chartUtil.getData("animal","/weighing/"+t);i&&(i.valueSuffix=" Kg",i.yAxisTitle="Kg",chartUtil.line("chart",i))},init:function(t){console.log("chartAnimalWeighing.js"),app=t,setup.chartSetup(),setup.bindActions()}};