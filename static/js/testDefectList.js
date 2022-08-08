$(() => {

  // const url = 'http://192.168.219.140:8080';
  const url = 'http://192.168.0.43:8080';

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

  function getFormatDate(data) {
    var year = data.getFullYear();
    var month = (1+ data.getMonth());
    month = month >= 10? month:'0' + month;
    var day = data.getDate();
    day = day >= 10 ? day :'0' +day;
    return year + '-' + month + '-' + day;
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
      },
      {
          dataField:'defectStatus',
      },
      {
          dataField:'createdBy',
      },
      {
          dataField:'createAt',
          dataType: 'date',
      },
      {
          dataField:'defectTeam',
          visible: false,
      },
      {
          dataField:'defectCharger',
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







    // 선택 데이터 정보 변수
  let clickeddata = null;
  let commonCodeUseYnList = [];

  // 공통코드 리스트로 받아오기
  function useYnList(codeGroupId) {

    let commonCodeList = [];
    $.ajax({
      url: `${url}/common/detail/${codeGroupId}`,
      type: "GET",
      processData: false,
      contentType: false,
      dataType:'json',
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
      success: function (rtn) {
        console.log("rtn : ",rtn);
        for(var i=0; i<rtn.length; i++){
          commonCodeList.push({"text" : rtn[i].codeDetailDesc, "value" : rtn[i].codeDetailName});
        };
        commonCodeUseYnList = commonCodeList;
      },
      error: function (e) {
        console.log("err:", e);
        alert("!error happend!");
      }
    });  
  };

  // 하단 정보보기
  $(function() {
    $("#gridContainer").dxDataGrid({
        onRowClick(e) {
            let data = e.data;
            clickeddata = data;
            localStorage.setItem("clickedDefectId", clickeddata.defectId);
            localStorage.setItem("defectOnRowclick", JSON.stringify(clickeddata));

        if (commonCodeUseYnList.length == 0){
        useYnList(1);

        } else {
        popup.option({
          contentTemplate: () => popupContentTemplate(),
          'position.of': `#gridContainer`,
        });
        
        popup.show();
        }

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
                  $('.defectId').text(`defectId : ${data.defectId}`);
                  $('.defectCategory').text(`defectCategory : ${data.defectCategory}`);
                  $('.defectContents').text(`defectContents : ${data.defectContents}`);
                  $('.createdBy').text(`createdBy : ${data.createdBy}`);
                  $('.createAt').text(`createAt : ${getFormatDate(new Date(data.createAt))}`);
                  $('.defectTeam').text(`defectTeam : ${data.defectTeam}`);
                  $('.defectCharger').text(`defectCharger : ${data.defectCharger}`);
                  $('.defectStartDueDate').text(`defectStartDueDate : ${getFormatDate(new Date(data.defectStartDueDate))}`);
                  $('.defectEndDueDate').text(`defectEndDueDate : ${getFormatDate(new Date(data.defectEndDueDate))}`);
                  $('.defectStatus').text(`defectStatus : ${data.defectStatus}`);
                  $('.defectDate').text(`defectDate : ${getFormatDate(new Date(data.defectDate))}`);
                  $('.defectActionYn').text(`defectActionYn : ${data.defectActionYn}`);
                  $('.defectActionContents').text(`defectActionContents : ${data.defectActionContents}`);
                  $('.defectCheck').text(`defectCheck : ${data.defectCheck}`);
                  $('.defectCheckDate').text(`defectCheckDate : ${getFormatDate(new Date(data.defectCheckDate))}`);
                  $('.executionDate').text(`Execution Date : ${getFormatDate(new Date(data.executionDate))}`);
                  $('.execStatus').text(`Execution Status : ${data.execStatus}`);
                  $('.execResult').text(`Execution Result : ${data.execResult}`);

                };
            
        },
    })
});

function createSelectBoxAndOptions(selectId, listData){
  var select = document.getElementById(selectId);
  for(var i in listData){
    var option = document.createElement("option");
    option.value = listData[i].value;
    option.text = listData[i].text;
    select.appendChild(option);
  }
};







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
        <label> Execution Date: </label> <input type="date" id="executionDate" name="executionDate" value="${getFormatDate(new Date(clickeddata.executionDate))}" readonly/> <br>
        <label> Execution Status: </label> 
          <select name="execStatus" id="execStatus" value="">
            <option value="" selected disabled>${clickeddata.execStatus}</option>
          </select> <br>
        <label> Execution Result: </label> <input type="text" id="execResult" name="execResult" value="${clickeddata.execResult}" readonly/>
        <br>
        
        <label> Defect Category: </label> <input type="text" id="defectCategory" name="defectCategory" value="${clickeddata.defectCategory}"> <br>
        <label> Defect Contents: </label> <input type="text" id="defectContents" name="defectContents" value="${clickeddata.defectContents}"> <br>
        <label> Created By: </label> <input type="text" id="createdBy" name="createdBy" value="${clickeddata.createdBy}"> <br>
        <label> Create At: </label> <input type="date" id="createAt" name="createAt" value="${getFormatDate(new Date(clickeddata.createAt))}" readonly/> <br>
        
        <label> Defect Team: </label> <input type="text" id="defectTeam" name="defectTeam" value="${clickeddata.defectTeam}"> <br>
        <label> Defect Charger: </label> <input type="text" id="defectCharger" name="defectCharger" value="${clickeddata.defectCharger}"> <br>
        
        <label> Defect Start Due Date: </label> <input type="date" id="defectStartDueDate" name="defectStartDueDate" value="${getFormatDate(new Date(clickeddata.defectStartDueDate))}"> <br>
        <label> Defect End Due Date: </label> <input type="date" id="defectEndDueDate" name="defectEndDueDate" value="${getFormatDate(new Date(clickeddata.defectEndDueDate))}"> <br>
        
        <label> Defect Status: </label> <input type="text" id="defectStatus" name="defectStatus" value="${clickeddata.defectStatus}" readonly/> <br>
        
        <label> Defect Date: </label> <input type="date" id="defectDate" name="defectDate" value="${getFormatDate(new Date(clickeddata.defectDate))}" readonly/> <br>
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
            <input type="date" id="defectCheckDate" name="defectCheckDate" value="${getFormatDate(new Date(clickeddata.defectCheckDate))}"> <br>
        </div>

        <br><hr><br>

        <div id="defectAttachFileCreate"></div></form>
        <form enctype="multipart/form-data">
        <input type="file" id="defectAttachFileCreate2" name="files" multiple="multiple"/>
        <input type="submit" id="Phosubmit2" value="전송"/>

        <div id="defectAttachFileDelete"></div>
        <div id="defectAttachFileGrid">
        </div>
        </form>
        
        <script src="../static/js/testDefectListPopupFileGrid.js"/>`),
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
          <label> Defect End Due Date: </label> <input type="date" id="defectEndDueDate" name="defectEndDueDate" value="${getFormatDate(new Date(clickeddata.defectEndDueDate))}"> <br>
          
          <label> Defect Status: </label> <input type="text" id="defectStatus" name="defectStatus" value="${clickeddata.defectStatus}" readonly/> <br>
          
          <label> Defect Date: </label> <input type="date" id="defectDate" name="defectDate" value="${getFormatDate(new Date(clickeddata.defectDate))}" readonly/> <br>
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
            <input type="date" id="defectCheckDate" name="defectCheckDate" value="${getFormatDate(new Date(clickeddata.defectCheckDate))}" readonly/> <br>
  
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
        
        <label> Defect Start Due Date: </label> <input type="date" id="defectStartDueDate" name="defectStartDueDate" value="${getFormatDate(new Date(clickeddata.defectStartDueDate))}"> <br>
        <label> Defect End Due Date: </label> <input type="date" id="defectEndDueDate" name="defectEndDueDate" value="${getFormatDate(new Date(clickeddata.defectEndDueDate))}"> <br>
        
        <label> Defect Status: </label> <input type="text" id="defectStatus" name="defectStatus" value="${clickeddata.defectStatus}" readonly/> <br>
        
        <label> Defect Date: </label> 
          <input type="date" id="defectDate" name="defectDate" value="${getFormatDate(new Date(clickeddata.defectDate))}" readonly/> <br>
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
            <input type="date" id="defectCheckDate" name="defectCheckDate" value=""> <br>
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
            'defectDate': new Date(),
            'defectActionYn': $("#defectActionYn").val(),
            'defectActionContents': $("#defectActionContents").val(),
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
              xhrFields: {
                withCredentials : true
              },
              success: function(json) {
                  if (json) {
                    console.log('endend');
                  }
              }
            });
          }


            getData();
            clickeddata = null;

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
            'defectCheckDate': new Date(),
          };

          // 오브젝트 json 타입으로 변경
          var json = JSON.stringify(data);

          if (`${clickeddata.defectActionYn}` =='y' && $("#defectCheckYn").val() != null) {
            $.ajax({
              url: `${url}/defect/check/${clickeddata.defectId}`,
                dataType: 'json',
                type: 'POST',
                data: json,
                processData: false,
                cache: false,
                crossDomain:true,
                xhrFields: {
                  withCredentials: true
                },
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
            clickeddata = null;
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
          var data = { 
            'executionId' : $("#executionId").val(),
            'defectId' : $("#defectId").val(),
            'defectCategory' : $("#defectCategory").val(),
            'defectContents' : $("#defectContents").val(),
            'createdBy' : $("createdBy").val(),
            'createAt' : new Date(),
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
              processData: false,
              cache: false,
              crossDomain:true,
              xhrFields: {
                withCredentials: true
              },
              contentType: "application/json; charset=UTF-8",
              success: function(data) {
                  if (data) {
                    console.log('endend');
                  }
              }
            }); 

          getData();
          clickeddata = null;
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
              processData: false,
              cache: false,
              crossDomain:true,
              xhrFields: {
                withCredentials: true
              },
              contentType: "application/json; charset=UTF-8",
              xhrFields: {
                withCredentials : true
              },
              success: function(json) {
                  if (json) {
                    console.log('endend');
                  }
              }
            });
            
          getData();
          clickeddata = null;
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
  if(clickeddata){

  var data = {
    'defectId' : clickeddata.defectId
  };

  var json = JSON.stringify(data);

  $.ajax({
    url: `${url}/defect/delete/${clickeddata.defectId}`,
    dataType: 'json',
    type: 'DELETE',
    data: json,
    processData: false,
    cache: false,
    crossDomain:true,
    xhrFields: {
      withCredentials: true
    },
    contentType: "application/json; charset=UTF-8",
    xhrFields: {
      withCredentials : true
    },
    success: function(json) {
        if (json) {
          console.log('endend');
        }
    }
  });
  getData(); 
  clickeddata = null;
}
}
});


  
    function getOrderDay(rowData) {
      return (new Date(rowData.OrderDate)).getDay();
    }
  });
  