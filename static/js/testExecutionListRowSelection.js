
$(() => {

  const url = 'http://192.168.219.103:8080';

  function getData() {
    $('#gridContainer').dxDataGrid({
      dataSource: DevExpress.data.AspNet.createStore({
        key: 'executionId',
        loadUrl: `${url}/execution/list`,
        onBeforeSend(method, ajaxOptions) {
          ajaxOptions.xhrFields = { withCredentials: true };
        },
      }),
    });
  };

  const dataGrid = $('#gridContainer').dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      
      key: 'executionId',
      loadUrl: `${url}/execution/list`,
      onBeforeSend(method, ajaxOptions) {
        ajaxOptions.xhrFields = { withCredentials: true };
      },
    }),
    remoteOperations: true,
    Selection: {
      mode: 'single',
    },
    hoverStateEnabled: true,
    // columnsAutoWidth: true,
    showBorders: true,
    filterRow: {
      visible: true,
      applyFilter: 'auto',
    },
    searchPanel: {
      visible: true,
      width: 240,
      placeholder: 'Search...',
    },
    headerFilter: {
      visible: true,
    },

    columns: [
      {
          dataField:'executionId',
          allowEditing: false,
      },
      {
          dataField: 'testType',
          validationRules: [{ type: 'required' }],
      }, 
      {
          dataField: 'scenarioType',
          validationRules: [{ type: 'required' }],
      },
      {
          dataField: 'scenarioCategory',
        validationRules: [{ type: 'required' }],
      },
      {
          dataField: 'version',
          validationRules: [{ type: 'required' }],
      },
      {
          dataField: 'teamName', 
          validationRules: [{ type: 'required' }],
      },
      {
          dataField: 'testScenarioId',
          validationRules: [{ type: 'required' }],
      },
      {
          dataField: 'testScenarioName',
          validationRules: [{ type: 'required' }],
      },{
          dataField: 'screenId', 
          validationRules: [{ type: 'required' }],
                    
      },
      {
          dataField: 'screenName', 
          validationRules: [{ type: 'required' }],
      }, 
      { 
          dataField: 'testCaseId',
          validationRules: [{ type: 'required' }],
      },
      { dataField: 'testCaseName',
      validationRules: [{ type: 'required' }],
      },
      { dataField: 'tester',
      validationRules: [{ type: 'required' }],
      },
      {
          dataField: 'confirmContents',
          validationRules: [{ type: 'required' }],
      },
      {
          id: "execStatusId",
          dataField: 'execStatus',
          // validationRules: [{ type: 'required' }],
          width: 125,
          // lookup: {
          //   dataSource: yn,
          //   displayExpr: 'value',
          //   valueExpr: 'id',
            
          // },
        },
      {
          dataField: 'execDueDate',
          dataType: 'date',
          width: 120,
      },
      {
          dataField: 'projectName',
          
          // visible: false,
      },
      {
          dataField: 'testTargetType',
          visible: false,
      },
      {
          dataField: 'testTargetName',
          visible: false,
      },
      {
          dataField: 'bizDetail',
          visible: false,
      },
      {
          dataField: 'bizCategory',
          visible: false,
      },
      {
          dataField: 'buildName',
          visible: false,
      },
      {
          dataField: 'buildVersion',
          validationRules: [{ type: 'required' }],
      },
      {
          dataField: 'testData',   
          visible: false,
      },
      {
          dataField: 'note',
          visible: false,
          dataType: 'string'
      },
      {
          dataField: 'executionDate',
          dataType: 'date',
          visible: false,
      },
      {
          dataField: 'execResult',
          visible: false,
      },
    ],
  }).dxDataGrid('instance');

  const applyFilterTypes = [{
    key: 'auto',
    name: 'Immediately',
  }, {
    key: 'onClick',
    name: 'On Button Click',
  }];

  const applyFilterModeEditor = $('#useFilterApplyButton').dxSelectBox({
    items: applyFilterTypes,
    value: applyFilterTypes[0].key,
    valueExpr: 'key',
    displayExpr: 'name',
    onValueChanged(data) {
      dataGrid.option('filterRow.applyFilter', data.value);
    }}).dxSelectBox('instance');

  $('#filterRow').dxCheckBox({
    text: 'Filter Row',
    value: true,
    onValueChanged(data) {
      dataGrid.clearFilter();
      dataGrid.option('filterRow.visible', data.value);
      applyFilterModeEditor.option('disabled', !data.value);
    },
  });
  

  $('#headerFilter').dxCheckBox({
    text: 'Header Filter',
    value: true,
    onValueChanged(data) {
      dataGrid.clearFilter();
      dataGrid.option('headerFilter.visible', data.value);
    },
  });


  $('#file-uploader').dxFileUploader({
      selectButtonText: 'Select excel',
      labelText: '',
      accept: 'excel/*',
      uploadMode: 'useForm',
  });

  

  // ?????? ????????? ?????? ??????
  let clickeddata = null;

  // ?????? ????????????
  $(function() {
    $("#gridContainer").dxDataGrid({
        onRowClick(e) {
            let data = e.data;
                if (data) {
                  $('.executionId').text(`Execution Id : ${data.executionId}`);
                  $('.projectName').text(`Project Name : ${data.projectName}`);
                  $('.testType').text(`Test Type : ${data.testType}`);
                  $('.testTargetType').text(`Test Target Type : ${data.testTargetType}`);
                  $('.testTargetName').text(`Test Target Name : ${data.testTargetName}`);
                  $('.scenarioType').text(`Scenario Type : ${data.scenarioType}`);
                  $('.scenarioCategory').text(`Scenario Category : ${data.scenarioCategory}`);
                  $('.bizCategory').text(`Business Categoy : ${data.bizCategory}`);
                  $('.bizDetail').text(`Business Detail : ${data.bizDetail}`);
                  $('.version').text(`Version : ${data.version}`);
                  $('.testScenarioId').text(`Test Scenario Id : ${data.testScenarioId}`);
                  $('.testScenarioName').text(`Test Scenario Name : ${data.testScenarioName}`);
                  $('.screenId').text(`Screen Id : ${data.screenId}`);
                  $('.screenName').text(`Screen Name : ${data.screenName}`);
                  $('.testCaseId').text(`Test Case Id : ${data.testCaseId}`);
                  $('.testCaseName').text(`Test Case Name : ${data.testCaseName}`);
                  $('.tester').text(`Tester : ${data.tester}`);
                  $('.confirmContents').text(`Confirm Contents : ${data.confirmContents}`);
                  $('.testData').text(`Test Data : ${data.testData}`);
                  $('.buildName').text(`Build Name : ${data.buildName}`);
                  $('.buildVersion').text(`Build Vertion : ${data.buildVersion}`);
                  $('.note').text(`Note : ${data.note}`);
                  $('.execDueDate').text(`Execution Due Date : ${new Date(data.execDueDate)}`);
                  $('.executionDate').text(`Execution Date : ${new Date(data.executionDate)}`);
                  $('.execStatus').text(`Execution Status : ${data.execStatus}`);
                  $('.execResult').text(`Execution Result : ${data.execResult}`);
                };
            clickeddata = data;
        },
    })
});


































  // popup template
  const popupContentTemplate = function () {
    const scrollView = $('<div>');
    scrollView.append(
        $(`
        <script>
          
      $('#popupExecutionStatus').click(function(){
        let result = $('#popupExecutionStatus').val();
        console.log(result);
        if ( result == "??????"){
          $("#defectInfo").show();
        } else{
          $("#defectInfo").hide();
        }
      });
        </script>


        <form id="popupForm" name="popupForm">
        <label> Execution Id: </label> <input type="text" id="popupExecutionId" name="executionId" value="${clickeddata.executionId}" readonly/> <br>
        <label> Project Name: </label> <input type="text" id="popupProjectName" name ="popupProjectName" value="${clickeddata.projectName}"> <br>
        <label> Test Type: </label> <input type="text" id="popupTestType" name="popupTestType" value="${clickeddata.testType}"> <br>
        <label> Test Target Type: </label> <input type="text" id="popupTestTargetType" name="popupTestTargetType" value="${clickeddata.testTargetType}"> <br>
        <label> Test Target Name: </label> <input type="text" id="popupTestTargetName" name="popupTestTargetName" value="${clickeddata.testTargetName}"> <br>
        <label> Scenario Type: </label> <input type="text" id="popupScenarioType" name="popupScenarioType" value="${clickeddata.scenarioType}"> <br>
        <label> Scenario Category: </label> <input type="text" id="popupScenarioCategory" name="popupScenarioCategory" value="${clickeddata.scenarioCategory}"> <br>
        <label> Business Category: </label> <input type="text" id="popupBizCategory" name="popupBizCategory" value="${clickeddata.bizCategory}"> <br>
        <label> Business Detail: </label> <input type="text" id="popupBizDetail" name="popupBizDetail" value="${clickeddata.bizDetail}"> <br>
        <label> Version: </label> <input type="text" id="popupVersion" name="popupVersion" value="${clickeddata.version}"> <br>
        <label> Team Name: </label> <input type="text" id="popupTeamName" name="popupTeamName" value="${clickeddata.teamName}"> <br>
        <label> Test Scenario Id: </label> <input type="text" id="popupTestScenarioId" name="popupTestScenarioId" value="${clickeddata.testScenarioId}"> <br>
        <label> Test Scenario Name: </label> <input type="text" id="popupTestScenarioName" name="popupTestScenarioName" value="${clickeddata.testScenarioName}"> <br>
        <label> Screen Id: </label> <input type="text" id="popupScreenId" name="popupScreenId" value="${clickeddata.screenId}"> <br>
        <label> Screen Name: </label> <input type="text" id="popupScreenName" name="popupScreenName" value="${clickeddata.screenName}"> <br>
        <label> Test Case Id: </label> <input type="text" id="popupTestCaseId" name="popupTestCaseId" value="${clickeddata.testCaseId}"> <br>
        <label> Test Case Name: </label> <input type="text" id="popupTestCaseName" name="popupTestCaseName" value="${clickeddata.testCaseName}"> <br>
        <label> Tester: </label> <input type="text" id="popupTester" name="popupTester" value="${clickeddata.tester}"> <br>
        <label> Confirm Contents: </label> <input type="text" id="popupConfirmContents" name="popupConfirmContents" value="${clickeddata.confirmContents}"> <br>
        <label> Test Data: </label> <input type="text" id="popupTestData" name="popupTestData" value="${clickeddata.testData}"> <br>
        <label> Build Name: </label> <input type="text" id="popupBuildName" name="popupBuildName" value="${clickeddata.buildName}"> <br>
        <label> Build Version: </label> <input type="text" id="popupBuildVersion" name="popupBuildVersion" value="${clickeddata.buildVersion}"> <br>
        <label> Note: </label> <input type="text" id="popupNote" name="popupNote" value="${clickeddata.note}"> <br>
        <label> Execution Due Date: </label> <input type="date" id="popupExecutionDueDate" name="popupExecutionDueDate" value="${clickeddata.execDueDate}"> <br>
        <label> Execution Date: </label> 
          <input type="date" id="popupExecutionDate" name="popupExecutionDate" value="${clickeddata.executionDate}" readonly/> <br>
        <label> Execution Status: </label> 
          <select name="popupExecutionStatus" id="popupExecutionStatus" value="">
            <option value="" selected disabled>${clickeddata.execStatus}</option>
            <option value="?????????">????????? </option>
            <option value="??????">?????? </option>
            <option value="??????">?????? </option> 
          </select> <br>
        <label> Execution Result: </label> <input type="text" id="popupExecutionResult" name="popupExecutionResult" value="${clickeddata.execResult}">


        <div id="defectInfo" style="display:none">
        <label> ExecutionId Id: </label> <input type="text" id ="popupExecutionId" name="popupExecutionId" placehold="${clickeddata.executionId}" value="${clickeddata.executionId}" readonly/></p>
        <label> Defect Id: </label> <input type="text" id ="popupDefectId" name="popupDefectId" placehold="" value="" readonly/></p>
        <label> Defect Status: </label> <input type="text" id ="popupDefectStatus" name="popupDefectStatus" placehold="" value=""> <br>
        <label> Create At : </label> <input type="date" id ="popupCreateAt" name="popupCreateAt" placehold="" value=""> <br>
        <label> Created By: </label> <input type="text" id ="popupCreatedBy" name="popupCreatedBy" placehold="" value=""> <br>
        <label> Defect Contents: </label> <input type="text" id ="popupDefectContents" name="popupDefectContents" placehold="?????? ????????? ??????????????????." value=""> <br>
        

        <label> Defect Team: </label> <input type="text" id ="popupDefectTeam" name="popupDefectTeam" placehold="" value=""> <br>
        <label> Defect Charger: </label> <input type="text" id ="popupDefectCharger" name="popupDefectCharger" placehold="" value=""> <br>
        <label> Defect Start Due Date: </label> <input type="date" id ="popupDefectStartDueDate" name="popupDefectStartDueDate" placehold="" value=""> <br>
        <label> Defect End Due Date: </label> <input type="date" id ="popupDefectEndDueDate" name="popupDefectEndDueDate" placehold="" value=""> <br>
        <label> Defect Action Yn: </label> <input type="text" id ="popupDefectActionYn" name="popupDefectActionYn" placehold="" value="" readonly/> <br>
        <label> Defect Action Date: </label> <input type="date" id ="popupDefectActionDate" name="popupDefectActionDate" placehold="" value="" readonly/> <br>
        <label> Defect Action Contents: </label> <input type="text" id ="popupDefectActionContents" name="popupDefectActionContents" placehold="" value="" readonly/> <br>
        <label> Defect Check: </label> <input type="text" id ="popupDefectCheck" name="popupDefectCheck" placehold="" value="" readonly/> <br>
        <label> Defect Check Date: </label> <input type="date" id ="popupDefectCheckDate" name="popupDefectCheckDate" placehold="" value="" readonly/> <br>
        </div>
        </form>`),
      );

      scrollView.dxScrollView({
        width: '100%',
        height: '100%',
      });

      return scrollView;
    };
      


  // popup2 -> new execution create
  const popupContentTemplate2 = function () {
    const scrollView = $('<div>');
    scrollView.append(
      // return $('<div>').append(
        console.log("template Log"),
        console.log(clickeddata),
        $(`<form id="popupForm" name="popupForm">`),
        $(`<label> Execution Id: </label> <input type="text" id="popupExecutionId" name="executionId" value="" readonly/> <br> `),
        $(`<label> Project Name: </label> <input type="text" id="popupProjectName" name ="popupProjectName"value=""> <br>`),
        $(`<label> Test Type: </label> <input type="text" id="popupTestType" name="popupTestType"value=""> <br>`),
        $(`<label> Test Target Type: </label> <input type="text" id="popupTestTargetType" name="popupTestTargetType" value=""> <br>`),
        $(`<label> Test Target Name: </label> <input type="text" id="popupTestTargetName" name="popupTestTargetName" value=""> <br>`),
        $(`<label> Scenario Type: </label> <input type="text" id="popupScenarioType" name="popupScenarioType" value=""> <br>`),
        $(`<label> Scenario Category: </label> <input type="text" id="popupScenarioCategory" name="popupScenarioCategory" value=""> <br>`),
        $(`<label> Business Category: </label> <input type="text" id="popupBizCategory" name="popupBizCategory" value=""> <br>`),
        $(`<label> Business Detail: </label> <input type="text" id="popupBizDetail" name="popupBizDetail" value=""> <br>`),
        $(`<label> Version: </label> <input type="text" id="popupVersion" name="popupVersion" value=""> <br>`),
        $(`<label> Team Name: </label> <input type="text" id="popupTeamName" name="popupTeamName" value=""> <br>`),
        $(`<label> Test Scenario Id: </label> <input type="text" id="popupTestScenarioId" name="popupTestScenarioId" value=""> <br>`),
        $(`<label> Test Scenario Name: </label> <input type="text" id="popupTestScenarioName" name="popupTestScenarioName" value=""> <br>`),
        $(`<label> Screen Id: </label> <input type="text" id="popupScreenId" name="popupScreenId" value=""> <br>`),
        $(`<label> Screen Name: </label> <input type="text" id="popupScreenName" name="popupScreenName" value=""> <br>`),
        $(`<label> Test Case Id: </label> <input type="text" id="popupTestCaseId" name="popupTestCaseId" value=""> <br>`),
        $(`<label> Test Case Name: </label> <input type="text" id="popupTestCaseName" name="popupTestCaseName" value=""> <br>`),
        $(`<label> Tester: </label> <input type="text" id="popupTester" name="popupTester" value=""> <br>`),
        $(`<label> Confirm Contents: </label> <input type="text" id="popupConfirmContents" name="popupConfirmContents" value=""> <br>`),
        $(`<label> Test Data: </label> <input type="text" id="popupTestData" name="popupTestData" value=""> <br>`),
        $(`<label> Build Name: </label> <input type="text" id="popupBuildName" name="popupBuildName" value=""> <br>`),
        $(`<label> Build Version: </label> <input type="text" id="popupBuildVersion" name="popupBuildVersion" value=""> <br>`),
        $(`<label> Note: </label> <input type="text" id="popupNote" name="popupNote" value=""> <br>`),
        $(`<label> Execution Due Date: </label>
          <input type="date" id="popupExecutionDueDate" name="popupExecutionDueDate" value="" readonly/> <br>`),
        $(`<label> Execution Date: </label> 
          <input type="date" id="popupExecutionDate" name="popupExecutionDate" value="" readonly/> <br>`),
        $(`<label> Execution Status: </label> 
          <select name="popupExecutionStatus" id="popupExecutionStatus"> 
            <option value="?????????">?????????</option>
          </select>`),
        $(`<label> Execution Result: </label> <input type="text" id="popupExecutionResult" name="popupExecutionResult" value="" readonly/> <br>`),
        $(`</form>`),
        $('</div>'),
      );

      scrollView.dxScrollView({
        width: '100%',
        height: '100%',
      });

      return scrollView;
    };


    // popup template
  const popupContentTemplate3 = function () {
    const scrollView = $('<div>');
    scrollView.append(
        $(`
        <form id="popupForm" name="popupForm">
        <label> Execution Id: </label> <input type="text" id="popupExecutionId" name="executionId" value="${clickeddata.executionId}" readonly/> <br>
        <label> Project Name: </label> <input type="text" id="popupProjectName" name ="popupProjectName"value="${clickeddata.projectName}"> <br>
        <label> Test Type: </label> <input type="text" id="popupTestType" name="popupTestType"value="${clickeddata.testType}"> <br>
        <label> Test Target Type: </label> <input type="text" id="popupTestTargetType" name="popupTestTargetType" value="${clickeddata.testTargetType}"> <br>
        <label> Test Target Name: </label> <input type="text" id="popupTestTargetName" name="popupTestTargetName" value="${clickeddata.testTargetName}"> <br>
        <label> Scenario Type: </label> <input type="text" id="popupScenarioType" name="popupScenarioType" value="${clickeddata.scenarioType}"> <br>
        <label> Scenario Category: </label> <input type="text" id="popupScenarioCategory" name="popupScenarioCategory" value="${clickeddata.scenarioCategory}"> <br>
        <label> Business Category: </label> <input type="text" id="popupBizCategory" name="popupBizCategory" value="${clickeddata.bizCategory}"> <br>
        <label> Business Detail: </label> <input type="text" id="popupBizDetail" name="popupBizDetail" value="${clickeddata.bizDetail}"> <br>
        <label> Version: </label> <input type="text" id="popupVersion" name="popupVersion" value="${clickeddata.version}"> <br>
        <label> Team Name: </label> <input type="text" id="popupTeamName" name="popupTeamName" value="${clickeddata.teamName}"> <br>
        <label> Test Scenario Id: </label> <input type="text" id="popupTestScenarioId" name="popupTestScenarioId" value="${clickeddata.testScenarioId}"> <br>
        <label> Test Scenario Name: </label> <input type="text" id="popupTestScenarioName" name="popupTestScenarioName" value="${clickeddata.testScenarioName}"> <br>
        <label> Screen Id: </label> <input type="text" id="popupScreenId" name="popupScreenId" value="${clickeddata.screenId}"> <br>
        <label> Screen Name: </label> <input type="text" id="popupScreenName" name="popupScreenName" value="${clickeddata.screenName}"> <br>
        <label> Test Case Id: </label> <input type="text" id="popupTestCaseId" name="popupTestCaseId" value="${clickeddata.testCaseId}"> <br>
        <label> Test Case Name: </label> <input type="text" id="popupTestCaseName" name="popupTestCaseName" value="${clickeddata.testCaseName}"> <br>
        <label> Tester: </label> <input type="text" id="popupTester" name="popupTester" value="${clickeddata.tester}"> <br>
        <label> Confirm Contents: </label> <input type="text" id="popupConfirmContents" name="popupConfirmContents" value="${clickeddata.confirmContents}"> <br>
        <label> Test Data: </label> <input type="text" id="popupTestData" name="popupTestData" value="${clickeddata.testData}"> <br>
        <label> Build Name: </label> <input type="text" id="popupBuildName" name="popupBuildName" value="${clickeddata.buildName}"> <br>
        <label> Build Version: </label> <input type="text" id="popupBuildVersion" name="popupBuildVersion" value="${clickeddata.buildVersion}"> <br>
        <label> Note: </label> <input type="text" id="popupNote" name="popupNote" value="${clickeddata.note}"> <br>
        <label> Execution Due Date: </label> 
          <input type="date" id="popupExecutionDueDate" name="popupExecutionDueDate" value="${clickeddata.execDueDate}"> <br>
        <label> Execution Date: </label> 
          <input type="date" id="popupExecutionDate" name="popupExecutionDate" value="${clickeddata.executionDate}" readonly/> <br>
        <label> Execution Status: </label> 
          <select name="popupExecutionStatus" id="popupExecutionStatus" value="">
            <option value="" selected disabled>${clickeddata.execStatus}</option>
            <option value="?????????">????????? </option>
            <option value="??????">?????? </option>
            <option value="??????">?????? </option> 
          </select> <br>
        <label> Execution Result: </label> <input type="text" id="popupExecutionResult" name="popupExecutionResult" value="${clickeddata.execResult}" >
        </form>`),
      );

      scrollView.dxScrollView({
        width: '100%',
        height: '100%',
      });

      return scrollView;
    };











  // popup ??????

  // result ??????
  const popup = $("#popup").dxPopup({
      contentTemplate: popupContentTemplate,
      width: 500,
      height: 500,
      container: '.dx-viewport',
      showTitle: true,
      title: 'Information',
      dragEnabled: false,
      hideOnOutsideClick: false,
      showCloseButton: true,
      position: {
        at: 'center',
        my: 'center',
      },
      toolbarItems: [{
        widget: 'dxButton',
        toolbar: 'bottom',
        location: 'before',
        options: {
          text: 'Save',
          type: 'submit',
          onClick() {
            console.log("save click");


            // SERIALIZE() ???????????? ??????????????? ?????? ???(NULL ?????? ???) DATA ?????? ?????????
            // var data = $("#popupForm").serialize();
            // console.log("popupForm data: ",data);

            // input data ??? ?????? ???????????? js ??????????????? ?????????
            var data = { 
              'executionId' : $("#popupExecutionId").val(),
              'projectName' : $("#popupProjectName").val(),
              'testType' : $("#popupTestType").val(),
              'testTargetType' : $("#popupTestTargetType").val(),
              'testTargetName' : $("#popupTestTargetName").val(),
              'scenarioType': $("#popupScenarioType").val(),
              'scenarioCategory': $("#popupScenarioCategory").val(),
              'bizCategory': $("#popupBizCategory").val(),
              'bizDetail': $("#popupBizDetail").val(),
              'version': $("#popupVersion").val(),
              'teamName': $("#popupTeamName").val(),
              'testScenarioId': $("#popupTestScenarioId").val(),
              'testScenarioName': $("#popupTestScenarioName").val(),
              'screenId' : $("#popupScreenId").val(),
              'screenName': $("#popupScreenName").val(),
              'testCaseId': $("#popupTestCaseId").val(),
              'testCaseName': $("#popupTestCaseName").val(),
              'tester': $("#popupTester").val(),
              'confirmContents': $("#popupConfirmContents").val(),
              'testData': $("#popupTestData").val(),
              'buildName': $("#popupBuildName").val(),
              'buildVersion': $("#popupBuildVersion").val(),
              'note': $("#popupNote").val(),
              'execDueDate': $("#popupExecutionDueDate").val(),
              // 'executionDate': $("#popupExecutionDate").val(),
              'executionDate': new Date(),
              'execStatus': $("#popupExecutionStatus").val(),
              'execResult': $("#popupExecutionResult").val(),
              'testDefectList': [
                {
                  "createAt": new Date(),
                  "createdBy": $("#popupCreatedBy").val(),
                  "defectActionContents": $("#popupDefectActionContents").val(),
                  "defectActionYn": $("#popupDefectActionYn").val(),
                  "defectCategory": $("#popupDefectCategory").val(),
                  "defectCharger": $("#popupDefectCharger").val(),
                  "defectCheck": $("#popupDefectCheck").val(),
                  "defectCheckDate": $("#popupDefectCheckDate").val(),
                  "defectContents": $("#popupDefectContents").val(),
                  "defectDate": $("#popupDefectDate").val(),
                  "defectEndDueDate": $("#popupDefectEndDueDate").val() ,
                  "defectStartDueDate": $("#popupDefectStartDueDate").val(),
                  "defectStatus": $("#popupDefectStatus").val(),
                  "defectTeam": $("#popupDefectTeam").val(),
                  "executionId": $("#popupExecutionId").val(),
                }
              ],
            };

            // ???????????? json ???????????? ??????
            var json = JSON.stringify(data);
            console.log("??????", $("#popupExecutionStatus").val());

            
            if ($("#popupExecutionStatus").val() == '??????'){
              console.log("????????? ?????? ??????");
            }else{
              console.log("????????? ?????? ??????");
            };

            if($("#popupExecutionStatus").val() == '??????'){
                //Ajax POST Method TEST -> result ?????? ??????
              $.ajax({
                url: `${url}/execution/defect`,
                  dataType: 'json',
                  type: 'POST',
                  data: json,
                  contentType: "application/json; charset=UTF-8",
                  success: function(json) {
                      if (json) {
                        console.log('endend');
                      }
                  }
                });
                console.log("execution/defect ??????");
                
              } else{
                //Ajax POST Method TEST -> result ?????? ??????
                console.log('?????? ??????');
              $.ajax({
                url: `${url}/execution/result/${clickeddata.executionId}`,
                  dataType: 'json',
                  type: 'POST',
                  data: json,
                  contentType: "application/json; charset=UTF-8",
                  success: function(json) {
                      if (json) {
                        console.log('endend');
                      }
                  }
                });
                console.log("execution/result ??????");
                
              };
                    
            // popup ??? ?????? ???????????? json ????????? POST method ????????????
            let message = "????????? ??????????????????!"
            DevExpress.ui.notify({
              message,
              position: {
                my: 'center top',
                at: 'center top',
              },
            }, 'success', 3000);

            getData();
            popup.hide();
          },
        },
      }, {
        widget: 'dxButton',
        toolbar: 'bottom',
        location: 'after',
        options: {
          text: 'Close',
          onClick() {
            popup.hide();
          },
        },
      }],
      
    }).dxPopup('instance');





    // create execution
    const popup2 = $("#popup2").dxPopup({
      contentTemplate: popupContentTemplate2,
      width: 500,
      height: 500,
      container: '.dx-viewport',
      showTitle: true,
      title: 'Information',
      dragEnabled: false,
      hideOnOutsideClick: false,
      showCloseButton: true,
      position: {
        at: 'center',
        my: 'center',
      },
      toolbarItems: [{
        widget: 'dxButton',
        toolbar: 'bottom',
        location: 'before',
        options: {
          text: 'Create',
          type: 'submit',
          onClick() {
            console.log("create click");

            // input data ??? ?????? ???????????? js ??????????????? ?????????
            var data = { 
              'executionId' : $("#popupExecutionId").val(),
              'projectName' : $("#popupProjectName").val(),
              'testType' : $("#popupTestType").val(),
              'testTargetType' : $("#popupTestTargetType").val(),
              'testTargetName' : $("#popupTestTargetName").val(),
              'scenarioType': $("#popupScenarioType").val(),
              'scenarioCategory': $("#popupScenarioCategory").val(),
              'bizCategory': $("#popupBizCategory").val(),
              'bizDetail': $("#popupBizDetail").val(),
              'version': $("#popupVersion").val(),
              'teamName': $("#popupTeamName").val(),
              'testScenarioId': $("#popupTestScenarioId").val(),
              'testScenarioName': $("#popupTestScenarioName").val(),
              'screenId' : $("#popupScreenId").val(),
              'screenName': $("#popupScreenName").val(),
              'testCaseId': $("#popupTestCaseId").val(),
              'testCaseName': $("#popupTestCaseName").val(),
              'tester': $("#popupTester").val(),
              'confirmContents': $("#popupConfirmContents").val(),
              'testData': $("#popupTestData").val(),
              'buildName': $("#popupBuildName").val(),
              'buildVersion': $("#popupBuildVersion").val(),
              'note': $("#popupNote").val(),
              'execDueDate': $("#popupExecutionDueDate").val(),
              'executionDate': new Date(),
              'execStatus': $("#popupExecutionStatus").val(),
              'execResult': $("#popupExecutionResult").val(),
            };

            // ???????????? json ???????????? ??????
            var json = JSON.stringify(data);

            console.log(json);

            //Ajax POST Method TEST -> new execution create
            $.ajax({
                url: `${url}/execution/create`,
                dataType: 'json',
                type: 'POST',
                data: json,
                contentType: "application/json; charset=UTF-8",
                success: function(json) {
                    if (json) {
                      console.log('endend');
                    }
                }
              }); 
              getData();
            // popup ??? ?????? ???????????? json ????????? POST method ????????????
            let message = "????????? ??????????????????!"
            DevExpress.ui.notify({
              message,
              position: {
                my: 'center top',
                at: 'center top',
              },
            }, 'success', 3000);

            
            popup2.hide();
          },
        },
      }, {
        widget: 'dxButton',
        toolbar: 'bottom',
        location: 'after',
        options: {
          text: 'Close',
          onClick() {
            popup2.hide();
          },
        },
      }],
    }).dxPopup('instance');


  // edit ??????
  const popup3 = $("#popup3").dxPopup({
    contentTemplate: popupContentTemplate,
    width: 500,
    height: 500,
    container: '.dx-viewport',
    showTitle: true,
    title: 'Information',
    dragEnabled: false,
    hideOnOutsideClick: false,
    showCloseButton: true,
    position: {
      at: 'center',
      my: 'center',
    },
    toolbarItems: [{
      widget: 'dxButton',
      toolbar: 'bottom',
      location: 'before',
      options: {
        text: 'Save',
        type: 'submit',
        onClick() {
          console.log("save click");


          // SERIALIZE() ???????????? ??????????????? ?????? ???(NULL ?????? ???) DATA ?????? ?????????
          // var data = $("#popupForm").serialize();
          // console.log("popupForm data: ",data);

          // input data ??? ?????? ???????????? js ??????????????? ?????????
          var data = { 
            'executionId' : $("#popupExecutionId").val(),
            'projectName' : $("#popupProjectName").val(),
            'testType' : $("#popupTestType").val(),
            'testTargetType' : $("#popupTestTargetType").val(),
            'testTargetName' : $("#popupTestTargetName").val(),
            'scenarioType': $("#popupScenarioType").val(),
            'scenarioCategory': $("#popupScenarioCategory").val(),
            'bizCategory': $("#popupBizCategory").val(),
            'bizDetail': $("#popupBizDetail").val(),
            'version': $("#popupVersion").val(),
            'teamName': $("#popupTeamName").val(),
            'testScenarioId': $("#popupTestScenarioId").val(),
            'testScenarioName': $("#popupTestScenarioName").val(),
            'screenId' : $("#popupScreenId").val(),
            'screenName': $("#popupScreenName").val(),
            'testCaseId': $("#popupTestCaseId").val(),
            'testCaseName': $("#popupTestCaseName").val(),
            'tester': $("#popupTester").val(),
            'confirmContents': $("#popupConfirmContents").val(),
            'testData': $("#popupTestData").val(),
            'buildName': $("#popupBuildName").val(),
            'buildVersion': $("#popupBuildVersion").val(),
            'note': $("#popupNote").val(),
            'execDueDate': new Date($("#popupExecutionDueDate").val()),
            'executionDate': $("#popupExecutionDate").val(),
            'execStatus': $("#popupExecutionStatus").val(),
            'execResult': $("#popupExecutionResult").val(),
          };
          

          // ???????????? json ???????????? ??????
          var json = JSON.stringify(data);

          console.log(json);

             //Ajax POST Method TEST -> ?????? ??????
          $.ajax({
              url: `${url}/execution/update/${clickeddata.executionId}`,
              dataType: 'json',
              type: 'POST',
              data: json,
              contentType: "application/json; charset=UTF-8",
              success: function(json) {
                  if (json) {
                    console.log('endend');
                  }
              }
            });                  
          // popup ??? ?????? ???????????? json ????????? POST method ????????????
          let message = "????????? ??????????????????!"
          DevExpress.ui.notify({
            message,
            position: {
              my: 'center top',
              at: 'center top',
            },
          }, 'success', 3000);

          getData();

          popup3.hide();
        },
      },
    }, {
      widget: 'dxButton',
      toolbar: 'bottom',
      location: 'after',
      options: {
        text: 'Close',
        onClick() {
          popup3.hide();
        },
      },
    }],
    
  }).dxPopup('instance');


















    // button

    $("#buttonContainer").dxButton({
        text: 'Result Button',
        onClick: function() {
          if(clickeddata){
          popup.option({
            contentTemplate: () => popupContentTemplate(),
            'position.of': `#gridContainer`,
          });
          popup.show();
        }
        },
      });

      
      $("#executionEditPopup").dxButton({
        text: 'Edit Button',
        onClick: function() {
          if(clickeddata){
          popup3.option({
            contentTemplate: () => popupContentTemplate3(),
            'position.of': `#gridContainer`,
          });
          popup3.show();
        }
        },
      });


    $("#createInfo").dxButton({
      text: 'New Execution',
      onClick: function() {
        popup2.option({
          contentTemplate: () => popupContentTemplate2(),
          'position.of': `#gridContainer`,
        });
        popup2.show();
      }
    });



    $("#deleteButton").dxButton({
      text: 'Delete Button',
      onClick: function() {
      //?????? ???????????? ??? ???????????? ?????? ?????????.  
      if(clickeddata){
  
      //????????? ????????? ????????? js ??????????????? ?????????.  
      var data = {
        'executionId' : clickeddata.executionId
      };
  
      //????????? ?????? ??????????????? json ???????????? ?????????.
      var json = JSON.stringify(data);
  
      $.ajax({
        url: `${url}/execution/delete/${clickeddata.executionId}`,
        dataType: 'json',
        type: 'DELETE',
        data: json,
        contentType: "application/json; charset=UTF-8",
        success: function(json) {
            if (json) {
              console.log('endend');
            }
        }
      }); 

      getData();
    }
  }
    });
   


  function getOrderDay(rowData) {
    return (new Date(rowData.OrderDate)).getDay();
  };

  
});