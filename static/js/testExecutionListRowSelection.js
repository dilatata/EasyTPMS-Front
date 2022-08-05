$(() => {

  const url = 'http://192.168.219.140:8080';
  // const url = 'http://192.168.0.43:8080';


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

  function getFormatDate(data) {
    var year = data.getFullYear();
    var month = (1 + data.getMonth());
    month = month >= 10 ? month : '0' + month;
    var day = data.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
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
        dataField: 'executionId',
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
      }, {
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
      {
        dataField: 'testCaseName',
        validationRules: [{ type: 'required' }],
      },
      {
        dataField: 'tester',
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
  },
  ).dxDataGrid('instance');


  $('#file-uploader').dxFileUploader({
    selectButtonText: 'Select excel',
    labelText: '',
    accept: 'excel/*',
    uploadMode: 'useForm',
  });


  // 선택 데이터 정보 변수
  let clickeddata = null;

  // common code use yn 변수
  let commonCodeUseYnList = [];
  // execution status 변수
  let commonCodeExecutionStatusList = [];
  
  // 공통코드 리스트로 받아오기
  function commonCodeList(codeGroupId) {
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
        console.log('success , common code list: ',commonCodeList);
        if(codeGroupId==1){
        commonCodeUseYnList = commonCodeList;
        console.log('codeGroupId=1');
        } 
        else if(codeGroupId==129){
          commonCodeExecutionStatusList = commonCodeList;
        console.log('codeGroupId=129');
        };
      },
      error: function (e) {
        console.log("err:", e);
        alert("!error happend!");
      }
    });
  };

  // 하단 정보보기
  $(function () {
    $("#gridContainer").dxDataGrid({
      onRowClick(e) {
        let data = e.data;
        // console.log(data);
        clickeddata = data;
        console.log("clickeddata",clickeddata);
        localStorage.setItem("clickedExecutionId", clickeddata.executionId);

        if (commonCodeUseYnList.length == 0 && commonCodeExecutionStatusList.length == 0){
        commonCodeList(129); // executionStatus
        commonCodeList(1); // yn
        console.log(commonCodeUseYnList.length);
        console.log(commonCodeExecutionStatusList.length);
        console.log('1st time common code use yn list : ', commonCodeUseYnList, commonCodeExecutionStatusList);
        } else {
        console.log('commonCodeUseYnList already exist : ', commonCodeUseYnList, commonCodeExecutionStatusList);

        popup.option({
          contentTemplate: () => popupContentTemplate(),
          'position.of': `#gridContainer`,
        });
        

        console.log("popup 전에 길이 확인하기 : ",commonCodeUseYnList.length, commonCodeExecutionStatusList.length); 

        popup.show();
        }

        // popup.option({
        //   contentTemplate: () => popupContentTemplate(),
        //   'position.of': `#gridContainer`,
        // });

        // setTimeout(function () {
        //   console.log("popup 전에 길이 확인하기 : ",commonCodeUseYnList.length); //0 -> 이러면 안돼는데!!
        //   popup.show();
        // }, 1000);
        

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
          $('.execDueDate').text(`Execution Due Date : ${getFormatDate(new Date(data.execDueDate))}`);
          $('.executionDate').text(`Execution Date : ${getFormatDate(new Date(data.executionDate))}`);
          $('.execStatus').text(`Execution Status : ${data.execStatus}`);
          $('.execResult').text(`Execution Result : ${data.execResult}`);
        };

      },
    })
  });


  //   $(function () {
  //   $("#gridContainer").dxDataGrid({
  //     onRowClick(e) {
  //       clickeddata = e.data;
  //       console.log(clickeddata);
  //       console.log("POPUP DETAIL");
  //       if (clickeddata){
        
        
  //       $('.executionId').text(`Execution Id : ${clickeddata.executionId}`);
  //       $('.projectName').text(`Project Name : ${clickeddata.projectName}`);

  //       // detailPopup.show();
  //       }      
  //      }
//      })



  
  

    /**
   * select -> option 자동으로 만들기
   */
  function createSelectBoxAndOptions(selectId, listData){
    var select = document.getElementById(selectId);
    for(var i in listData){
      var option = document.createElement("option");
      option.value = listData[i].value;
      option.text = listData[i].text;
      select.appendChild(option);
    }
  };

































  // popup template
  const popupContentTemplate = function () {
    const scrollView = $('<div>');
    scrollView.append(
      $(`
        <div id="defectButton" class="defectButton" style="display:inline-block">
        <button id="createDefect"><span>결함 생성</span></button>
        <button id="getDefectList"><span>결함 목록</span></button>
        </div>
        
        <hr/>
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
        <label> Execution Due Date: </label> <input type="date" id="popupExecutionDueDate" name="popupExecutionDueDate" value="${getFormatDate(new Date(clickeddata.execDueDate))}"> <br>
        <label> Execution Date: </label> 
          <input type="date" id="popupExecutionDate" name="popupExecutionDate" value="${getFormatDate(new Date(clickeddata.executionDate))}" readonly/> <br>
        <label> Execution Status: </label> 
          <select name="popupExecutionStatus" id="popupExecutionStatus" value="">
          </select> <br>
        <label> Execution Result: </label> <input type="text" id="popupExecutionResult" name="popupExecutionResult" value="${clickeddata.execResult}"> <br>


        <div id="defectPopupArea" class="layerpop" style="width: 500px; height: 500px; position: absolute;"></div>
        <div id="createDefectPopupArea"></div>
        <div id="getDefectListPopupArea"></div>

        
        <div id="defectInfo" style="display:none">
        <label> ExecutionId Id: </label> <input type="text" id ="popupExecutionId" name="popupExecutionId" placehold="${clickeddata.executionId}" value="${clickeddata.executionId}" readonly/></p>
        <label> Defect Id: </label> <input type="text" id ="popupDefectId" name="popupDefectId" placehold="" value="" readonly/></p>
        <label> Defect Status: </label> <input type="text" id ="popupDefectStatus" name="popupDefectStatus" placehold="" value="NEW" readonly/> <br>
        <label> Create At : </label> <input type="date" id ="popupCreateAt" name="popupCreateAt" placehold="${getFormatDate(new Date())}" value="" readonly/> <br>
        <label> Created By: </label> <input type="text" id ="popupCreatedBy" name="popupCreatedBy" placehold="" value="" readonly/> <br>
        <label> Defect Contents: </label> <input type="text" id ="popupDefectContents" name="popupDefectContents" placehold="결함 내용을 입력해주세요." value=""> <br>
        

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

        </form>
        
        
                
        <script>
        var commonCodeUseYn = ${JSON.stringify(commonCodeUseYnList)};
        var commonCodeExecutionStatus =${JSON.stringify(commonCodeExecutionStatusList)};



        function createSelectBoxAndOptions(selectId, listData){
          var select = document.getElementById(selectId);
          console.log("createselectboxandoptions function 에서 listdata : ", listData);
          for(var i in listData){
            var option = document.createElement("option");
            option.value = listData[i].value;
            option.text = listData[i].text;
            select.appendChild(option);
          }
        };
        createSelectBoxAndOptions('popupExecutionStatus', commonCodeExecutionStatus);




        function getFormatDate(data) {
          var year = data.getFullYear();
          var month = (1 + data.getMonth());
          month = month >= 10 ? month : '0' + month;
          var day = data.getDate();
          day = day >= 10 ? day : '0' + day;
          return year + '-' + month + '-' + day;
        };


    
        </script>
        <script src="../static/js/testExecutionListPopupDefectInfo.js" />`),
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
          <input type="date" id="popupExecutionDueDate" name="popupExecutionDueDate" value=""> <br>`),
      $(`<label> Execution Date: </label> 
          <input type="date" id="popupExecutionDate" name="popupExecutionDate" value="" readonly/> <br>`),
      $(`<label> Execution Status: </label> 
          <select name="popupExecutionStatus" id="popupExecutionStatus"> 
            <option value="미수행">미수행</option>
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
          <input type="date" id="popupExecutionDueDate" name="popupExecutionDueDate" value="${getFormatDate(new Date(clickeddata.execDueDate))}"> <br>
        <label> Execution Date: </label> 
          <input type="date" id="popupExecutionDate" name="popupExecutionDate" value="${getFormatDate(new Date(clickeddata.executionDate))}" readonly/> <br>
        <label> Execution Status: </label> 
          <select name="popupExecutionStatus" id="popupExecutionStatus" value="">
            <option value="" selected disabled>${clickeddata.execStatus}</option>
            <option value="미수행">미수행 </option>
            <option value="성공">성공 </option>
            <option value="실패">실패 </option> 
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


  // defect popup template
  const popupDefectTemplate = function () {
    const scrollView = $('<div>');
    scrollView.append(
      $(`
      <form>
      <div id="defectTemplate">
      <label> ExecutionId Id: </label> <input type="text" id ="popupExecutionId" name="popupExecutionId" placehold="${clickeddata.executionId}" value="${clickeddata.executionId}" readonly/></p>
      <label> Defect Id: </label> <input type="text" id ="popupDefectId" name="popupDefectId" placehold="" value="" readonly/></p>
      <label> Defect Status: </label> <input type="text" id ="popupDefectStatus" name="popupDefectStatus" placehold="" value="NEW" readonly/> <br>
      <label> Create At : </label> <input type="date" id ="popupCreateAt" name="popupCreateAt" placehold="${getFormatDate(new Date())}" value="" readonly/> <br>
      <label> Created By: </label> <input type="text" id ="popupCreatedBy" name="popupCreatedBy" placehold="" value="" readonly/> <br>
      <label> Defect Contents: </label> <input type="text" id ="popupDefectContents" name="popupDefectContents" placehold="결함 내용을 입력해주세요." value=""> <br>
      

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
      </form>`)
    );
    scrollView.dxScrollView({
      width: '100%',
      height: '100%',
    });

    return scrollView;
  };







  // popup 기능

  // result 팝업
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


          // SERIALIZE() 사용하면 편하겠지만 계속 공(NULL 아닌 빈) DATA 값만 넘어감
          // var data = $("#popupForm").serialize();
          // console.log("popupForm data: ",data);

          // input data 값 각각 갖고와서 js 오브젝트로 만들기
          var data = {
            'executionId': $("#popupExecutionId").val(),
            'projectName': $("#popupProjectName").val(),
            'testType': $("#popupTestType").val(),
            'testTargetType': $("#popupTestTargetType").val(),
            'testTargetName': $("#popupTestTargetName").val(),
            'scenarioType': $("#popupScenarioType").val(),
            'scenarioCategory': $("#popupScenarioCategory").val(),
            'bizCategory': $("#popupBizCategory").val(),
            'bizDetail': $("#popupBizDetail").val(),
            'version': $("#popupVersion").val(),
            'teamName': $("#popupTeamName").val(),
            'testScenarioId': $("#popupTestScenarioId").val(),
            'testScenarioName': $("#popupTestScenarioName").val(),
            'screenId': $("#popupScreenId").val(),
            'screenName': $("#popupScreenName").val(),
            'testCaseId': $("#popupTestCaseId").val(),
            'testCaseName': $("#popupTestCaseName").val(),
            'tester': $("#popupTester").val(),
            'confirmContents': $("#popupConfirmContents").val(),
            'testData': $("#popupTestData").val(),
            'buildName': $("#popupBuildName").val(),
            'buildVersion': $("#popupBuildVersion").val(),
            'note': $("#popupNote").val(),
            'execDueDate': getFormatDate(new Date()),
            'executionDate': new Date(),
            'execStatus': $("#popupExecutionStatus").val(),
            'execResult': $("#popupExecutionResult").val(),
            'testDefectList': [
              {
                "createAt": new Date(),
                "createdBy": $("#popupCreatedBy").val(), // session username 넣기
                "defectActionContents": $("#popupDefectActionContents").val(),
                "defectActionYn": $("#popupDefectActionYn").val(),
                "defectCategory": $("#popupDefectCategory").val(),
                "defectCharger": $("#popupDefectCharger").val(),
                "defectCheck": $("#popupDefectCheck").val(),
                "defectCheckDate": $("#popupDefectCheckDate").val(),
                "defectContents": $("#popupDefectContents").val(),
                "defectDate": $("#popupDefectDate").val(),
                "defectEndDueDate": $("#popupDefectEndDueDate").val(),
                "defectStartDueDate": $("#popupDefectStartDueDate").val(),
                "defectStatus": $("#popupDefectStatus").val(),
                "defectTeam": $("#popupDefectTeam").val(),
                "executionId": $("#popupExecutionId").val(),
              }
            ],
          };

          // 오브젝트 json 타입으로 변경
          var json = JSON.stringify(data);
          console.log("확인", json);


          if ($("#popupExecutionStatus").val() == '실패') {
            console.log("조건문 확인 완료");
          } else {
            console.log("조건문 실패 아님");
          };

          // if ($("#popupExecutionStatus").val() == '실패') {
          //   //Ajax POST Method TEST -> result 실패 입력
          //   $.ajax({
          //     url: `${url}/execution/defect`,
          //     dataType: 'json',
          //     type: 'POST',
          //     data: json,
          //     contentType: "application/json; charset=UTF-8",
          //     processData: false,
          //     cache: false,
          //     crossDomain: true,
          //     xhrFields: {
          //       withCredentials: true
          //     },
          //     onBeforeSend(method, ajaxOptions) {
          //       ajaxOptions.xhrFields = { withCredentials: true };
          //     },
          //     success: function (json) {
          //       if (json) {
          //         console.log('endend');
          //       }
          //     }
          //   });
          //   console.log("execution/defect 실행");

          // } else {
          //   //Ajax POST Method TEST -> result 성공 입력
            console.log('상태 성공');
            $.ajax({
              url: `${url}/execution/result/${clickeddata.executionId}`,
              dataType: 'json',
              type: 'POST',
              data: json,
              contentType: "application/json; charset=UTF-8",
              processData: false,
              cache: false,
              crossDomain: true,
              xhrFields: {
                withCredentials: true
              },
              onBeforeSend(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
              },
              success: function (json) {
                if (json) {
                  console.log('endend');
                }
              }
            });
            console.log("execution/result 실행");

          // };

          // popup 창 위의 정보들을 json 형태로 POST method 연결하기
          let message = "정보를 수정했습니다!"
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

          // input data 값 각각 갖고와서 js 오브젝트로 만들기
          var data = {
            'executionId': $("#popupExecutionId").val(),
            'projectName': $("#popupProjectName").val(),
            'testType': $("#popupTestType").val(),
            'testTargetType': $("#popupTestTargetType").val(),
            'testTargetName': $("#popupTestTargetName").val(),
            'scenarioType': $("#popupScenarioType").val(),
            'scenarioCategory': $("#popupScenarioCategory").val(),
            'bizCategory': $("#popupBizCategory").val(),
            'bizDetail': $("#popupBizDetail").val(),
            'version': $("#popupVersion").val(),
            'teamName': $("#popupTeamName").val(),
            'testScenarioId': $("#popupTestScenarioId").val(),
            'testScenarioName': $("#popupTestScenarioName").val(),
            'screenId': $("#popupScreenId").val(),
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
            'executionDate': $("#popupExecutionDate").val(),
            'execStatus': $("#popupExecutionStatus").val(),
            'execResult': $("#popupExecutionResult").val(),
          };

          // 오브젝트 json 타입으로 변경
          var json = JSON.stringify(data);

          console.log("확인", json);

          //Ajax POST Method TEST -> new execution create
          $.ajax({
            url: `${url}/execution/create`,
            dataType: 'json',
            type: 'POST',
            data: json,
            contentType: "application/json; charset=UTF-8",
            processData: false,
            cache: false,
            crossDomain: true,
            xhrFields: {
              withCredentials: true
            },
            onBeforeSend(method, ajaxOptions) {
              ajaxOptions.xhrFields = { withCredentials: true };
            },
            success: function (json) {
              if (json) {
                console.log('endend');
              }
            }
          });

          setTimeout(function () {
            getData();
          }, 1000);

          // popup 창 위의 정보들을 json 형태로 POST method 연결하기
          let message = "정보를 생성했습니다!"
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


  // edit 팝업
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




          // input data 값 각각 갖고와서 js 오브젝트로 만들기
          var data = {
            'executionId': $("#popupExecutionId").val(),
            'projectName': $("#popupProjectName").val(),
            'testType': $("#popupTestType").val(),
            'testTargetType': $("#popupTestTargetType").val(),
            'testTargetName': $("#popupTestTargetName").val(),
            'scenarioType': $("#popupScenarioType").val(),
            'scenarioCategory': $("#popupScenarioCategory").val(),
            'bizCategory': $("#popupBizCategory").val(),
            'bizDetail': $("#popupBizDetail").val(),
            'version': $("#popupVersion").val(),
            'teamName': $("#popupTeamName").val(),
            'testScenarioId': $("#popupTestScenarioId").val(),
            'testScenarioName': $("#popupTestScenarioName").val(),
            'screenId': $("#popupScreenId").val(),
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
            'executionDate': $("#popupExecutionDate").val(),
            'execStatus': $("#popupExecutionStatus").val(),
            'execResult': $("#popupExecutionResult").val(),
          };


          // 오브젝트 json 타입으로 변경
          var json = JSON.stringify(data);


          console.log("확인", json);

          //Ajax POST Method TEST -> 일반 수정
          $.ajax({
            url: `${url}/execution/update/${clickeddata.executionId}`,
            dataType: 'json',
            type: 'POST',
            data: json,
            processData: false,
            cache: false,
            crossDomain: true,
            xhrFields: {
              withCredentials: true
            },
            contentType: "application/json; charset=UTF-8",
            success: function (json) {
              if (json) {
                console.log('endend');
              }
            }
          });
          // popup 창 위의 정보들을 json 형태로 POST method 연결하기
          let message = "정보를 수정했습니다!"
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


  // defect popup
  // const defectPopup2 = $("#").dxPopup({
  //   contentTemplate: popupContentTemplate2,
  //   width: 500,
  //   height: 500,
  //   container: '.dx-viewport',
  //   showTitle: true,
  //   title: 'Information',
  //   dragEnabled: false,
  //   hideOnOutsideClick: false,
  //   showCloseButton: true,
  //   position: {
  //     at: 'center',
  //     my: 'center',
  //   },
  //   toolbarItems: [{
  //     widget: 'dxButton',
  //     toolbar: 'bottom',
  //     location: 'before',
  //     options: {
  //       text: 'Create',
  //       type: 'submit',
  //       onClick() {
  //         console.log("create click");

  //         // input data 값 각각 갖고와서 js 오브젝트로 만들기
  //         var data = {
  //           'executionId': $("#popupExecutionId").val(),
  //           'projectName': $("#popupProjectName").val(),
  //           'testType': $("#popupTestType").val(),
  //           'testTargetType': $("#popupTestTargetType").val(),
  //           'testTargetName': $("#popupTestTargetName").val(),
  //           'scenarioType': $("#popupScenarioType").val(),
  //           'scenarioCategory': $("#popupScenarioCategory").val(),
  //           'bizCategory': $("#popupBizCategory").val(),
  //           'bizDetail': $("#popupBizDetail").val(),
  //           'version': $("#popupVersion").val(),
  //           'teamName': $("#popupTeamName").val(),
  //           'testScenarioId': $("#popupTestScenarioId").val(),
  //           'testScenarioName': $("#popupTestScenarioName").val(),
  //           'screenId': $("#popupScreenId").val(),
  //           'screenName': $("#popupScreenName").val(),
  //           'testCaseId': $("#popupTestCaseId").val(),
  //           'testCaseName': $("#popupTestCaseName").val(),
  //           'tester': $("#popupTester").val(),
  //           'confirmContents': $("#popupConfirmContents").val(),
  //           'testData': $("#popupTestData").val(),
  //           'buildName': $("#popupBuildName").val(),
  //           'buildVersion': $("#popupBuildVersion").val(),
  //           'note': $("#popupNote").val(),
  //           'execDueDate': $("#popupExecutionDueDate").val(),
  //           'executionDate': $("#popupExecutionDate").val(),
  //           'execStatus': $("#popupExecutionStatus").val(),
  //           'execResult': $("#popupExecutionResult").val(),
  //         };

  //         // 오브젝트 json 타입으로 변경
  //         var json = JSON.stringify(data);

  //         console.log("확인", json);

  //         //Ajax POST Method TEST -> new execution create
  //         $.ajax({
  //           url: `${url}/execution/create`,
  //           dataType: 'json',
  //           type: 'POST',
  //           data: json,
  //           contentType: "application/json; charset=UTF-8",
  //           processData: false,
  //           cache: false,
  //           crossDomain:true,
  //           xhrFields: {
  //             withCredentials: true
  //           },
  //           onBeforeSend(method, ajaxOptions) {
  //             ajaxOptions.xhrFields = { withCredentials: true };
  //           },
  //           success: function (json) {
  //             if (json) {
  //               console.log('endend');
  //             }
  //           }
  //         });

  //         setTimeout(function () {
  //           getData();
  //         }, 1000);

  //         // popup 창 위의 정보들을 json 형태로 POST method 연결하기
  //         let message = "정보를 생성했습니다!"
  //         DevExpress.ui.notify({
  //           message,
  //           position: {
  //             my: 'center top',
  //             at: 'center top',
  //           },
  //         }, 'success', 3000);


  //         popup2.hide();
  //       },
  //     },
  //   }, {
  //     widget: 'dxButton',
  //     toolbar: 'bottom',
  //     location: 'after',
  //     options: {
  //       text: 'Close',
  //       onClick() {
  //         popup2.hide();
  //       },
  //     },
  //   }],
  // }).dxPopup('instance');








  //
  











  // button

  $("#buttonContainer").dxButton({
    text: 'Result Button',
    onClick: function () {
      if (clickeddata) {
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
    onClick: function () {
      if (clickeddata) {
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
    onClick: function () {
      popup2.option({
        contentTemplate: () => popupContentTemplate2(),
        'position.of': `#gridContainer`,
      });
      popup2.show();
    }
  });



  $("#deleteButton").dxButton({
    text: 'Delete Button',
    onClick: function () {
      //원래 동작해야 할 이벤트를 중지 시킨다.  
      if (clickeddata) {

        //유저가 입력한 정보를 js 오브젝트로 만든다.  
        var data = {
          'executionId': clickeddata.executionId
        };

        //위에서 만든 오브젝트를 json 타입으로 바꾼다.
        var json = JSON.stringify(data);

        $.ajax({
          url: `${url}/execution/delete/${clickeddata.executionId}`,
          type: 'DELETE',
          dataType: 'json',
          data: json,
          contentType: "application/json; charset=UTF-8",
          processData: false,
          cache: false,
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          },

          success: function (json) {
            if (json) {
              console.log('endend');
            }
          }
        });

        getData();
        // clearClickedData();
      }
    }
  });


  //photo exemple
  const fileInput = document.getElementById("fileUpload");
  // 또는 const fileInput = $("#fileUpload").get(0);
  let regex = new RegExp("(.*?)\.(jpg|png)$");
	let maxSize = 1048576; //1MB	
  
	function fileCheck(fileName, fileSize){

		if(fileSize >= maxSize){
			alert("파일 사이즈 초과");
			return false;
		}
			  
		if(!regex.test(fileName)){
			alert("해당 종류의 파일은 업로드할 수 없습니다.");
			return false;
		}
		
		return true;		
		
	}


  // pic 파일 존재여부 확인하기
  // fileInput.onchange = () => {
  //   const selectedFile = fileInput.files[0];
  //   console.log(selectedFile);
  //   console.log(selectedFile.name);
  //   console.log(selectedFile.size);

  //   let formData = new FormData();
  //   formData.append("pic", selectedFile);
  //   console.log(formData);
  //   console.log(formData.pic);

    

  // if(!fileCheck(selectedFile.name, selectedFile.size)){
  //   return false;
  // }
  // alert("file 존재함 , 통과");
  // };



  $("#Phosubmit").click(
    function() {
      const photoFile = document.getElementById("fileUpload");

      const formData = new FormData();
      formData.append("pic", photoFile.files[0]);
      console.log(photoFile.files[0]);
      console.log(formData);

      $.ajax({
        url: `${url}/defect/attachFile/create`,
        type: "POST",
        processData: false,
        contentType: false,
        data: formData,
        dataType:'json',
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (rtn) {
          alert("upload success");
        },
        error: function (e) {
          console.log("err:", e);
          alert("please check your image");
          setTimeout(function(){
          getData();},2000);
        }
      });
    }
  )



  // excel upload
  $("#excelUpload").click(
    function (event) {
      console.log("받아온 값 확인하기", $("#excelInput")[0]);

      //원래 동작해야 할 이벤트를 중지 시킨다.  
      event.preventDefault();
      let excelInput = $("#excelInput")[0];

      // 파일을 여러개 선택할 수 있으므로 files 라는 객체에 담긴다.
      console.log("excelInput : ", excelInput.files);

      if (excelInput.files.length === 0) {
        alert("파일은 선택해주세요");
        return;
      }

      const formData = new FormData();
      formData.append("file", excelInput.files[0]);
      console.log("$('#uploadForm')[0] : ", $('#uploadForm')[0]);
      console.log(formData);

      $.ajax({
        enctype: 'multipart/form-data',
        url: `${url}/execution/excel/upload`,
        type: "POST",
        processData: false,
        contentType: false,
        cache: false,
        data: formData,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (rtn) {
          alert("upload success")
        },
        error: function (e) {
          console.log("err:", e)
          alert("excel file을 확인해 주세요.")
        }
      });

      // input 내용 비우기
      $("#excelInput").val("");
      //저장하는 시간이 필요하므로 2초 지연
      setTimeout(function () {
        getData();
      }, 2000);
    }
  );


  // excel download
  $("#execelTemplateDownload").dxButton({
    text: 'Download Execl Form',
    onClick: function () {
      $.ajax({
        url: `${url}/execution/excel/download`,
        enctype: 'multipart/form-data',
        type: 'GET',
        processData: false,
        contentType: "application/json; charset=utf-8",
        // contentType : "multipart/form-data",
        cache: false,
        crossDomain: true,
        xhrFields: {
          withCredentials: true,
          responseType: 'arraybuffer'
        },
        success: function (response) {

          var bytes = new Uint8Array(response.FileContents);
          var blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          var downloadUrl = URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = downloadUrl;
          a.download = "excelTemplateFile.xlsx";
          document.body.appendChild(a);
          a.click();

          console.log('endend');
        },
        error: function (e) {
          alert("error!")
        }
      });

      // api 통하지 않고 고정된 엑셀 서식 이렇게도 할 수 있다는데 나는 모르겠다~
      // document.location.replace = "../static/execeltemplate/uploadExcelTemplate.xlsx"
    }
  });


  // login
  $('#loginBtn').dxButton({
    text: 'login',
    onClick: function () {

      var data = {
        'userId': $("#loginId").val(),
        'userPassword': $("#loginPassword").val(),
      };
      console.log("check input login data: ", data);

      var json = JSON.stringify(data);

      $.ajax({
        url: `${url}/login`,
        dataType: 'json',
        type: 'POST',
        data: json,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        contentType: "application/json; charset=UTF-8",
        success: function (data) {
          console.log("response data check : ", data)
          alert("환영합니다!");
          console.log("Resonse : ", Response);
          window.location.href = 'TestExecutionList.html';
        },
        error: function (e) {
          console.log("err:", e)
          alert("로그인을 실패했습니다.")
          window.location.href = 'TestExecutionList.html';

        }
      });
    }
  });


  // logOut
  $('#logOut').dxButton({
    text: 'logout',

    onClick: function () {
      window.location.href = 'login.html';
      setTimeout(function () {
        console.log("1초 간격두기");
      }, 1000);
      $.ajax({
        url: `${url}/logout`,
        dataType: 'json',
        type: 'POST',
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        contentType: "application/json; charset=UTF-8",
        success: function () {
          alert("정상적으로 로그아웃 되었습니다. ");
          window.location.href = 'login.html';
        },
        error: function (e) {
          console.log("err:", e)
          alert("로그아웃을 실패했습니다.")
          window.location.href = 'TestExecutionList.html';
        }
      });
    }
  });


  function getOrderDay(rowData) {
    return (new Date(rowData.OrderDate)).getDay();
  };


});