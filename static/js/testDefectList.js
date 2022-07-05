$(() => {

  const url = 'http://192.168.219.103:8080';


  function getData() {
    $('#gridContainer').dxDataGrid({
      dataSource: DevExpress.data.AspNet.createStore({
        key: 'defectId',
        loadUrl: `${url}/defect/list`,
        onBeforeSend(method, ajaxOptions) {
          ajaxOptions.xhrFields = { withCredentials: true };
        },
      }),
    });
  };


  const dataGrid = $('#gridContainer').dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      key: 'defectId',
      loadUrl: `${url}/defect/list`,
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
      // {
      //     dataField: 'testType',
      //     validationRules: [{ type: 'required' }],
      // }, 
      // {
      //     dataField: 'scenarioType',
      //     validationRules: [{ type: 'required' }],
      // },
      // {
      //     dataField: 'scenarioCategory',
      //  validationRules: [{ type: 'required' }],
      // },
      // {
      //     dataField: 'version',
      //     validationRules: [{ type: 'required' }],
      // },
      // {
      //     dataField: 'teamName', 
      //     validationRules: [{ type: 'required' }],
      // },
      // {
      //     dataField: 'testScenarioId',
      //     validationRules: [{ type: 'required' }],
      // },
      // {
      //     dataField: 'testScenarioName',
      //     validationRules: [{ type: 'required' }],
      // },{
      //     dataField: 'screenId', 
      //  validationRules: [{ type: 'required' }],
      // },
      // {
      //     dataField: 'screenName', 
      //     validationRules: [{ type: 'required' }],
      // }, 
      // { 
      //     dataField: 'testCaseId',
      //     validationRules: [{ type: 'required' }],
      // },
      // { dataField: 'testCaseName',
      // validationRules: [{ type: 'required' }],
      // },
      // { dataField: 'tester',
      // validationRules: [{ type: 'required' }],
      // },
      // {
      //     dataField: 'confirmContents',
      //     validationRules: [{ type: 'required' }],
      // },
      // { dataField: 'execStatus',
      // // validationRules: [{ type: 'required' }],
      // },
      // {
      //     dataField: 'execDueDate',
      //     dataType: 'date',
      //     width: 120,
      // },
      // {
      //     dataField: 'projectName',
      //     visible: false,
      // },
      // {
      //     dataField: 'testTargetType',
      //     visible: false,
      // },
      // {
      //     dataField: 'testTargetName',
      //     visible: false,
      // },
      // {
      //     dataField: 'bizDetail',
      //     visible: false,
      // },
      // {
      //     dataField: 'bizCategory',
      //     visible: false,
      // },
      // {
      //     dataField: 'buildName',
      //     visible: false,
      // },
      // {
      //     dataField: 'buildVersion',
      //     validationRules: [{ type: 'required' }],
      // },
      // {
      //     dataField: 'testData',   
      //     visible: false,
      // },
      // {
      //     dataField: 'notes',
      //     visible: false,
      // },
      // {
      //     dataField: 'executionDate',
      //     dataType: 'date',
      //     visible: false,
      // },
      // {
      //     dataField: 'executionResult',
      //     visible: false,
      // },
      {
          dataField :'executionId',
          visible: false,
      },
      { 
          dataField: 'defectId',
          visible: false,
      },
      {
          dataField: 'defectCategory',
          visible: false,
      },
      {
          dataField:'defectContents',
          // validationRules: [{ type: 'required' }],
      },
      {
          dataField:'defectStatus',
          // validationRules: [{ type: 'required' }],
      },
      {
          dataField:'createdBy',
          // validationRules: [{ type: 'required' }],
      },
      {
          dataField:'createAt',
          dataType: 'date',
          // validationRules: [{ type: 'required' }],
      },
      {
          dataField:'defectTeam',
          visible: false,
      },
      {
          dataField:'defectCharger',
          // validationRules: [{ type: 'required' }],
      },
      {
          dataField:'defectStartDueDate',
          dataType: 'date',
          visible: false,
      },
      {
          dataField: 'defectEndDueDate',
          dataType: 'date',
          visible: false,
      },
      {
          dataField: 'defectDate',
          dataType: 'date',
          visible: false,
      },
      {
          dataField: 'defectActionYn',
          visible: false,
      }, 
      {
          dataField: 'defectActionContents',
          visible: false,
      },
      {
          dataGrid:'defectCheck',
          visible: false,
      },
      {
          dataGrid:'defectCheckDate',
          dataType: 'date',
          visible: false,
      },]
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
      },
    }).dxSelectBox('instance');
  
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






    // 선택 데이터 정보 변수
  let clickeddata = null;
  // let sysdate = new Date();
  // let formatSysdate = sysdate.format('{yyyy}-{MM}-{dd}');

  // 하단 정보보기
  $(function() {
    $("#gridContainer").dxDataGrid({
        onRowClick(e) {
            let data = e.data;
                if (data) {
                  $('.executionId').text('Execution Id :'+ `${data.executionId}`);
                  $('.testType').text(`Test Type : ${data.testType}`);
                  $('.scenarioType').text(`Scenario Type : ${data.scenarioType}`);
                  $('.scenarioCategory').text(`Scenario Category : ${data.scenarioCategory}`);
                  $('.version').text(`Version : ${data.version}`);
                  $('.testScenarioId').text(`Test Scenario Id : ${data.testScenarioId}`);
                  $('.testScenarioName').text(`Test Scenario Name : ${data.testScenarioName}`);
                  $('.testCaseId').text(`Test Case Id : ${data.testCaseId}`);
                  $('.testCaseName').text(`Test Case Name : ${data.testCaseName}`);
                  console.log(data.createAt,new Date(data.createAt));
                  $('.defectId').text(`defectId : ${data.defectId}`);
                  $('.defectCategory').text(`defectCategory : ${data.defectCategory}`);
                  $('.defectContents').text(`defectContents : ${data.defectContents}`);
                  $('.createdBy').text(`createdBy : ${data.createdBy}`);
                  $('.createAt').text(`createAt : ${new Date(data.createAt)}`);
                  $('.defectTeam').text(`defectTeam : ${data.defectTeam}`);
                  $('.defectCharger').text(`defectCharger : ${data.defectCharger}`);
                  $('.defectStartDueDate').text(`defectStartDueDate : ${new Date(data.defectStartDueDate)}`);
                  $('.defectEndDueDate').text(`defectEndDueDate : ${new Date(data.defectEndDueDate)}`);
                  $('.defectStatus').text(`defectStatus : ${data.defectStatus}`);
                  console.log(new Date(data.defectDate));
                  $('.defectDate').text(`defectDate : ${new Date(data.defectDate)}`);
                  $('.defectActionYn').text(`defectActionYn : ${data.defectActionYn}`);
                  $('.defectActionContents').text(`defectActionContents : ${data.defectActionContents}`);
                  $('.defectCheck').text(`defectCheck : ${data.defectCheck}`);
                  $('.defectCheckDate').text(`defectCheckDate : ${new Date(data.defectCheckDate)}`);

                  $('.executionDate').text(`Execution Date : ${new Date(data.executionDate)}`);
                  $('.execStatus').text(`Execution Status : ${data.execStatus}`);
                  $('.execResult').text(`Execution Result : ${data.execResult}`);

                };
            clickeddata = data;
        },
    })
});








  // defect result popup
  const popupContentTemplate = function() {
    const scrollView = $('<div>');
    scrollView.append(
        $(`
        <form id="popupForm" name="popupForm">
        <label> Execution Id: </label> <input type="text" id="executionId" name="executionId" value="${clickeddata.executionId}" readonly/> <br>
        <label> Defect Id: </label> <input type="text" id="defectId" name ="defectId" value="${clickeddata.defectId}" readonly/> <br>
        <label> Test Type: </label> <input type="text" id="testType" name="testType"value="${clickeddata.testType}" readonly/> <br>
        <label> Scenario Type: </label> <input type="text" id="scenarioType" name="scenarioType" value="${clickeddata.scenarioType}" readonly/> <br>
        <label> Scenario Category: </label> <input type="text" id="scenarioCategory" name="scenarioCategory" value="${clickeddata.scenarioCategory}" readonly/> <br>
        <label> Version: </label> <input type="text" id="version" name="version" value="${clickeddata.version}" readonly/> <br>
        <label> Test Scenario Id: </label> <input type="text" id="testScenarioId" name="testScenarioId" value="${clickeddata.testScenarioId}" readonly/> <br>
        <label> Test Scenario Name: </label> <input type="text" id="testScenarioName" name="testScenarioName" value="${clickeddata.testScenarioName}" readonly/> <br>
        <label> Test Case Id: </label> <input type="text" id="testCaseId" name="testCaseId" value="${clickeddata.testCaseId}" readonly/> <br>
        <label> Test Case Name: </label> <input type="text" id="testCaseName" name="testCaseName" value="${clickeddata.testCaseName}" readonly/> <br>
 
        <br>
        <label> Execution Date: </label> <input type="date" id="executionDate" name="executionDate" value="${clickeddata.executionDate}" readonly/> <br>
        <label> Execution Status: </label> 
          <select name="execStatus" id="execStatus" value="">
            <option value="" selected disabled>${clickeddata.execStatus}</option>
          </select> <br>
        <label> Execution Result: </label> <input type="text" id="execResult" name="execResult" value="${clickeddata.execResult}" readonly/>
        <br>
        
        <label> Defect Category: </label> <input type="text" id="defectCategory" name="defectCategory" value="${clickeddata.defectCategory}"> <br>
        <label> Defect Contents: </label> <input type="text" id="defectContents" name="defectContents" value="${clickeddata.defectContents}"> <br>
        <label> Created By: </label> <input type="text" id="createdBy" name="createdBy" value="${clickeddata.createdBy}"> <br>
        <label> Create At: </label> <input type="date" id="createAt" name="createAt" value="${clickeddata.createAt}"> <br>
        
        <label> Defect Team: </label> <input type="text" id="defectTeam" name="defectTeam" value="${clickeddata.defectTeam}"> <br>
        <label> Defect Charger: </label> <input type="text" id="defectCharger" name="defectCharger" value="${clickeddata.defectCharger}"> <br>
        
        <label> Defect Start Due Date: </label> <input type="date" id="defectStartDueDate" name="defectStartDueDate" value="${clickeddata.defectStartDueDate}"> <br>
        <label> Defect End Due Date: </label> <input type="date" id="defectEndDueDate" name="defectEndDueDate" value="${clickeddata.defectEndDueDate}"> <br>
        
        <label> Defect Status: </label> <input type="text" id="defectStatus" name="defectStatus" value="${clickeddata.defectStatus}" readonly/> <br>
        
        <label> Defect Date: </label> <input type="date" id="defectDate" name="defectDate" value="${Date(clickeddata.defectDate)}" readonly/> <br>
        <br>
        <label> Defect Action Yn: </label> 
          <select id="defectActionYn" name="defectActionYn" value="">
            <option value="" selected disabled>${clickeddata.defectActionYn}</option> <br>
            <option value="n">n </option>
            <option value="y">y </option>
          </select><br>
        <label> Defect Action Contents: </label> <input type="text" id="defectActionContents" name="defectActionContents" value="${clickeddata.defectActionContents}"> <br>
        
        <div id="defectCheckInfo" style="display:none">
          <label> Defect Check: </label> 
            <select id="defectCheck" name="defectCheck" value="">
                <option value="" selected disabled>${clickeddata.defectCheck}</option> <br>
                <option value="n">n </option>
                <option value="y">y </option>
            </select><br>
          <label> Defect Check Date: </label> 
            <input type="date" id="defectCheckDate" name="defectCheckDate" value="${Date(clickeddata.defectCheckDate)}"> <br>
        </div>
        </form>`),
      );

      scrollView.dxScrollView({
        width: '100%',
        height: '100%',
      });

      return scrollView;
    };



    // defect check popup
    const popupContentTemplate4 = function() {
      const scrollView = $('<div>');
      scrollView.append(
          $(`
          <form id="popupForm" name="popupForm">
          <label> Execution Id: </label> <input type="text" id="executionId" name="executionId" value="${clickeddata.executionId}" readonly/> <br>
          <label> Defect Id: </label> <input type="text" id="defectId" name ="defectId" value="${clickeddata.defectId}" readonly/> <br>
          <label> Test Type: </label> <input type="text" id="testType" name="testType"value="${clickeddata.testType}" readonly/> <br>
          <label> Scenario Type: </label> <input type="text" id="scenarioType" name="scenarioType" value="${clickeddata.scenarioType}" readonly/> <br>
          <label> Scenario Category: </label> <input type="text" id="scenarioCategory" name="scenarioCategory" value="${clickeddata.scenarioCategory}" readonly/> <br>
          <label> Version: </label> <input type="text" id="version" name="version" value="${clickeddata.version}" readonly/> <br>
          <label> Test Scenario Id: </label> <input type="text" id="testScenarioId" name="testScenarioId" value="${clickeddata.testScenarioId}" readonly/> <br>
          <label> Test Scenario Name: </label> <input type="text" id="testScenarioName" name="testScenarioName" value="${clickeddata.testScenarioName}" readonly/> <br>
          <label> Test Case Id: </label> <input type="text" id="testCaseId" name="testCaseId" value="${clickeddata.testCaseId}" readonly/> <br>
          <label> Test Case Name: </label> <input type="text" id="testCaseName" name="testCaseName" value="${clickeddata.testCaseName}" readonly/> <br>
   
          <br>
          <label> Execution Date: </label> <input type="date" id="executionDate" name="executionDate" value="${clickeddata.executionDate}" readonly/> <br>
          <label> Execution Status: </label> 
            <select name="execStatus" id="execStatus" value="">
              <option value="" selected disabled>${clickeddata.execStatus}</option>
            </select> <br>
          <label> Execution Result: </label> <input type="text" id="execResult" name="execResult" value="${clickeddata.execResult}" readonly/>
          <br>
          
          <label> Defect Category: </label> <input type="text" id="defectCategory" name="defectCategory" value="${clickeddata.defectCategory}"> <br>
          <label> Defect Contents: </label> <input type="text" id="defectContents" name="defectContents" value="${clickeddata.defectContents}"> <br>
          <label> Created By: </label> <input type="text" id="createdBy" name="createdBy" value="${clickeddata.createdBy}"> <br>
          <label> Create At: </label> <input type="text" id="createAt" name="createAt" value="${clickeddata.createAt}"> <br>
          
          <label> Defect Team: </label> <input type="text" id="defectTeam" name="defectTeam" value="${clickeddata.defectTeam}"> <br>
          <label> Defect Charger: </label> <input type="text" id="defectCharger" name="defectCharger" value="${clickeddata.defectCharger}"> <br>
          
          <label> Defect Start Due Date: </label> <input type="date" id="defectStartDueDate" name="defectStartDueDate" value="${clickeddata.defectStartDueDate}"> <br>
          <label> Defect End Due Date: </label> <input type="date" id="defectEndDueDate" name="defectEndDueDate" value="${clickeddata.defectEndDueDate}"> <br>
          
          <label> Defect Status: </label> <input type="text" id="defectStatus" name="defectStatus" value="${clickeddata.defectStatus}" readonly/> <br>
          
          <label> Defect Date: </label> <input type="date" id="defectDate" name="defectDate" value="${Date(clickeddata.defectDate)}" readonly/> <br>
          <br>
          <label> Defect Action Yn: </label> 
            <select id="defectActionYn" name="defectActionYn" value="">
              <option value="" selected disabled>${clickeddata.defectActionYn}</option> <br>
            </select><br>
          <label> Defect Action Contents: </label> <input type="text" id="defectActionContents" name="defectActionContents" value="${clickeddata.defectActionContents}"> <br>
          

          <label> Defect Check: </label> 
            <select id="defectCheckYn" name="defectCheck" value="">
              <option value="" selected disabled>${clickeddata.defectCheck}</option> <br>
              <option value="n">n </option>
              <option value="y">y </option>
            </select><br>
          <label> Defect Check Date: </label> 
            <input type="date" id="defectCheckDate" name="defectCheckDate" value="${Date(clickeddata.defectCheckDate)}" readonly/> <br>
  
          </form>`),
        );
  
        scrollView.dxScrollView({
          width: '100%',
          height: '100%',
        });
  
        return scrollView;
      };




  


  // popup2 -> new defect create
  const popupContentTemplate2 = function() {
    const scrollView = $('<div>');
    scrollView.append(
      $(`
      <form id="popupForm" name="popupForm">
        <label> Execution Id: </label> <input type="text" id="executionId" name="executionId" value=""> <br>
      
        <label> Defect Category: </label> <input type="text" id="defectCategory" name="defectCategory" value=""> <br>
        <label> Defect Contents: </label> <input type="text" id="defectContents" name="defectContents" value=""> <br>
        <label> Created By: </label> <input type="text" id="createdBy" name="createdBy" value=""> <br>
        <label> Create At: </label> <input type="text" id="createAt" name="createAt" value=""> <br>
        
        <label> Defect Team: </label> <input type="text" id="defectTeam" name="defectTeam" value=""> <br>
        <label> Defect Charger: </label> <input type="text" id="defectCharger" name="defectCharger" value=""> <br>
        
        <label> Defect Start Due Date: </label> <input type="date" id="defectStartDueDate" name="defectStartDueDate" value=""> <br>
        <label> Defect End Due Date: </label> <input type="date" id="defectEndDueDate" name="defectEndDueDate" value=""> <br>
        
        <label> Defect Status: </label> <input type="text" id="defectStatus" name="defectStatus" value="New" readonly/> <br>
        </form>`),
      );

      scrollView.dxScrollView({
        width: '100%',
        height: '100%',
      });

      return scrollView;
    };


    // edit popup template 
  const popupContentTemplate3 = function () {
    const scrollView = $('<div>');
    scrollView.append(
        $(`
        <form id="popupForm" name="popupForm">
        <label> Execution Id: </label> <input type="text" id="executionId" name="executionId" value="${clickeddata.executionId}" readonly/> <br>
        <label> Defect Id: </label> <input type="text" id="defectId" name ="defectId" value="${clickeddata.defectId}" readonly/> <br>
        <label> Test Type: </label> <input type="text" id="testType" name="testType"value="${clickeddata.testType}" readonly/> <br>
        <label> Scenario Type: </label> <input type="text" id="scenarioType" name="scenarioType" value="${clickeddata.scenarioType}" readonly/> <br>
        <label> Scenario Category: </label> <input type="text" id="scenarioCategory" name="scenarioCategory" value="${clickeddata.scenarioCategory}" readonly/> <br>
        <label> Version: </label> <input type="text" id="version" name="version" value="${clickeddata.version}" readonly/> <br>
        <label> Test Scenario Id: </label> <input type="text" id="testScenarioId" name="testScenarioId" value="${clickeddata.testScenarioId}" readonly/> <br>
        <label> Test Scenario Name: </label> <input type="text" id="testScenarioName" name="testScenarioName" value="${clickeddata.testScenarioName}" readonly/> <br>
        <label> Test Case Id: </label> <input type="text" id="testCaseId" name="testCaseId" value="${clickeddata.testCaseId}" readonly/> <br>
        <label> Test Case Name: </label> <input type="text" id="testCaseName" name="testCaseName" value="${clickeddata.testCaseName}" readonly/> <br>
 
        <br>
        <label> Execution Date: </label> <input type="date" id="executionDate" name="executionDate" value="${clickeddata.executionDate}" readonly/> <br>
        <label> Execution Status: </label> 
          <select name="execStatus" id="execStatus" value="">
            <option value="" selected disabled>${clickeddata.execStatus}</option>
          </select> <br>
        <label> Execution Result: </label> <input type="text" id="execResult" name="execResult" value="${clickeddata.execResult}" readonly/>
        <br>
        
        <label> Defect Category: </label> <input type="text" id="defectCategory" name="defectCategory" value="${clickeddata.defectCategory}"> <br>
        <label> Defect Contents: </label> <input type="text" id="defectContents" name="defectContents" value="${clickeddata.defectContents}"> <br>
        <label> Created By: </label> <input type="text" id="createdBy" name="createdBy" value="${clickeddata.createdBy}"> <br>
        <label> Create At: </label> <input type="text" id="createAt" name="createAt" value="${clickeddata.createAt}"> <br>
        
        <label> Defect Team: </label> <input type="text" id="defectTeam" name="defectTeam" value="${clickeddata.defectTeam}"> <br>
        <label> Defect Charger: </label> <input type="text" id="defectCharger" name="defectCharger" value="${clickeddata.defectCharger}"> <br>
        
        <label> Defect Start Due Date: </label> <input type="date" id="defectStartDueDate" name="defectStartDueDate" value="${clickeddata.defectStartDueDate}"> <br>
        <label> Defect End Due Date: </label> <input type="date" id="defectEndDueDate" name="defectEndDueDate" value="${clickeddata.defectEndDueDate}"> <br>
        
        <label> Defect Status: </label> <input type="text" id="defectStatus" name="defectStatus" value="${clickeddata.defectStatus}" readonly/> <br>
        
        <label> Defect Date: </label> 
          <input type="date" id="defectDate" name="defectDate" value="${Date(clickeddata.defectDate)}" readonly/> <br>
        <br>
        <label> Defect Action Yn: </label> 
          <select id="defectActionYn" name="defectActionYn" value="">
            <option value="" selected disabled>${clickeddata.defectActionYn}</option> <br>
            <option value="n">n </option>
            <option value="y">y </option>
          </select><br>
        <label> Defect Action Contents: </label> <input type="text" id="defectActionContents" name="defectActionContents" value="${clickeddata.defectActionContents}"> <br>
        
        <div id="defectCheckInfo">
          <label> Defect Check: </label> 
            <select id="defectCheck" name="defectCheck" value="">
                <option value="" selected disabled>${clickeddata.defectCheck}</option> <br>
                <option value="n">n </option>
                <option value="y">y </option>
            </select><br>
          <label> Defect Check Date: </label> 
            <input type="date" id="defectCheckDate" name="defectCheckDate" value="sysdate.toLocaleDateString();"> <br>
        </div>
        </form>`),
      );

      scrollView.dxScrollView({
        width: '100%',
        height: '100%',
      });

      return scrollView;
    };




















 // popup

  // result 입력 popup
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
          console.log("result actionYn save click");


          // SERIALIZE() 사용하면 편하겠지만 계속 공(NULL 아닌 빈) DATA 값만 넘어감
          // var data = $("#popupForm").serialize();
          var data = { 
            'executionId' : $("#executionId").val(),
            'defectId' : $("#defectId").val(),
            'defectCategory' : $("#defectCategory").val(),
            'defectContents' : $("#defectContents").val(),
            'createdBy' : $("createdBy").val(),
            'createAt' : $("createAt").val(),
            'defectTeam' : $("#defectTeam").val(),
            'defectCharger': $("#defectCharger").val(),
            'defectStartDueDate': $("#defectStartDueDate").val(),
            'defectEndDueDate': $("#defectEndDueDate").val(),
            'defectStatus': $("#defectStatus").val(),
            'defectDate': new Data(),
            'defectActionYn': $("#defectActionYn").val(),
            'defectActionContents': $("#defectActionContents").val(),
            'defectCheck': $("#defectCheck").val(),
            'defectCheckDate': $("#defectCheckDate").val(),
          };



          // 오브젝트 json 타입으로 변경
          var json = JSON.stringify(data);

          // defect action yn 의 경우
          if (`${clickeddata.defectActionYn}` =='n' &&  $("#defectActionYn").val() == 'y'){
          $.ajax({
            url: `${url}/defect/update/result/${clickeddata.defectId}`,
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
          }


            getData();
          // popup 창 위의 정보들을 json 형태로 POST method 연결하기
          let message = "정보를 수정했습니다!"
          DevExpress.ui.notify({
            message,
            position: {
              my: 'center top',
              at: 'center top',
            },
          }, 'success', 3000);
          
          popup.hide();
          // grid 에 reload 해야함
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



  // defect check popup

  const popup4 = $("#popup4").dxPopup({
    contentTemplate: popupContentTemplate4,
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
          console.log("defect check save click");


          // var data = $("#popupForm").serialize();
          var data = { 
            'executionId' : $("#executionId").val(),
            'defectId' : $("#defectId").val(),
            'defectCategory' : $("#defectCategory").val(),
            'defectContents' : $("#defectContents").val(),
            'createdBy' : $("createdBy").val(),
            'createAt' : $("createAt").val(),
            'defectTeam' : $("#defectTeam").val(),
            'defectCharger': $("#defectCharger").val(),
            'defectStartDueDate': $("#defectStartDueDate").val(),
            'defectEndDueDate': $("#defectEndDueDate").val(),
            'defectStatus': $("#defectStatus").val(),
            'defectDate': $("#defectDate").val(),
            'defectActionYn': $("#defectActionYn").val(),
            'defectActionContents': $("#defectActionContents").val(),
            'defectCheck': $("#defectCheckYn").val(),
            'defectCheckDate': new Data(),
          };
          console.log('data stringify 전: ', data);

          // 오브젝트 json 타입으로 변경
          var json = JSON.stringify(data);

          console.log(json);
          

          if (`${clickeddata.defectActionYn}` =='y' && $("#defectCheckYn").val() != null) {
            $.ajax({
              url: `${url}/defect/check/${clickeddata.defectId}`,
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
            } else{
              console.log('something happen');
            
            }


            getData();
          // popup 창 위의 정보들을 json 형태로 POST method 연결하기
          let message = "defect check!"
          DevExpress.ui.notify({
            message,
            position: {
              my: 'center top',
              at: 'center top',
            },
          }, 'success', 3000);
          
          popup4.hide();
          // grid 에 reload 해야함
        },
      },
    }, {
      widget: 'dxButton',
      toolbar: 'bottom',
      location: 'after',
      options: {
        text: 'Close',
        onClick() {
          popup4.hide();
        },
      },
    }],
  }).dxPopup('instance');





  // create popup
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

          // var data = $("#popupForm").serialize();
          var data = { 
            'executionId' : $("#executionId").val(),
            'defectId' : $("#defectId").val(),
            'defectCategory' : $("#defectCategory").val(),
            'defectContents' : $("#defectContents").val(),
            'createdBy' : $("createdBy").val(),
            'createAt' : new Data(),
            'defectTeam' : $("#defectTeam").val(),
            'defectCharger': $("#defectCharger").val(),
            'defectStartDueDate': $("#defectStartDueDate").val(),
            'defectEndDueDate': $("#defectEndDueDate").val(),
            'defectStatus': $("#defectStatus").val(),
            'defectDate': $("#defectDate").val(),
            'defectActionYn': $("#defectActionYn").val(),
            'defectActionContents': $("#defectActionContents").val(),
            'defectCheck': $("#defectCheck").val(),
            'defectCheckDate': $("#defectCheckDate").val(),
          };

          // 오브젝트 json 타입으로 변경
          var json = JSON.stringify(data);

          //Ajax POST Method TEST -> new execution create
          $.ajax({
              url: `${url}/defect/create`,
              dataType: 'json',
              type: 'POST',
              data: json,
              contentType: "application/json; charset=UTF-8",
              success: function(data) {
                  if (data) {
                    console.log('endend');
                  }
              }
            }); 

          // popup 창 위의 정보들을 json 형태로 POST method 연결하기
          let message = "정보를 생성했습니다!"
          DevExpress.ui.notify({
            message,
            position: {
              my: 'center top',
              at: 'center top',
            },
          }, 'success', 3000);

          getData();
          popup2.hide();
          // grid 에 reload 해야함
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




// edit popup
  const popup3 = $("#popup3").dxPopup({
    contentTemplate: popupContentTemplate3,
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
          console.log("edit popup save click");

          // var data = $("#popupForm").serialize();
          var data = { 
            'executionId' : $("#executionId").val(),
            'defectId' : $("#defectId").val(),
            'defectCategory' : $("#defectCategory").val(),
            'defectContents' : $("#defectContents").val(),
            'createdBy' : $("createdBy").val(),
            'createAt' : $("createAt").val(),
            'defectTeam' : $("#defectTeam").val(),
            'defectCharger': $("#defectCharger").val(),
            'defectStartDueDate': $("#defectStartDueDate").val(),
            'defectEndDueDate': $("#defectEndDueDate").val(),
            'defectStatus': $("#defectStatus").val(),
            'defectDate': $("#defectDate").val(),
            'defectActionYn': $("#defectActionYn").val(),
            'defectActionContents': $("#defectActionContents").val(),
            'defectCheck': $("#defectCheck").val(),
            'defectCheckDate': $("#defectCheckDate").val(),
          };

          // 오브젝트 json 타입으로 변경
          var json = JSON.stringify(data);

          $.ajax({
            url: `${url}/defect/edit/detail/${clickeddata.defectId}`,
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

          let message = "정보를 수정했습니다!"
          DevExpress.ui.notify({
            message,
            position: {
              my: 'center top',
              at: 'center top',
            },
          }, 'success', 3000);

          popup3.hide();
          // grid 에 reload 해야함
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



















  //button

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

  $("#defectCheck").dxButton({
    text: 'Defect Check Button',
    onClick: function() {
      if(clickeddata){
      popup4.option({
        contentTemplate: () => popupContentTemplate4(),
        'position.of': `#gridContainer`,
      });
      popup4.show();
    }
    },
  });

  $("#defectEditPopup").dxButton({
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
  text: 'New Defect',
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
  //원래 동작해야 할 이벤트를 중지 시킨다.  
  if(clickeddata){

  //유저가 입력한 정보를 js 오브젝트로 만든다.  
  var data = {
    'defectId' : clickeddata.defectId
  };

  //위에서 만든 오브젝트를 json 타입으로 바꾼다.
  var json = JSON.stringify(data);

  $.ajax({
    url: `${url}/defect/delete/${clickeddata.defectId}`,
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
    }
  });
  