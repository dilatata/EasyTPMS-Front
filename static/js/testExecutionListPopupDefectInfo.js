
$(() => {


    // const url = 'http://192.168.219.140:8080';
    const url = 'http://192.168.0.43:8080';

    // common code use yn 변수
    let clickeddata = null;
    function getloclaStorageData() {
        if (localStorage.getItem('clickedExecutionId')) {
            clickeddata = localStorage.getItem('clickedExecutionId');
            console.log("localStorage clickedExecutionId : ", clickeddata);
        }
    };


    // let commonCodeUseYnList = [];
    // let commonCodeExecutionStatusList = [];

    // var commonCodeUseYn = JSON.stringify(commonCodeUseYnList);
    // var commonCodeExecutionStatus =JSON.stringify(commonCodeExecutionStatusList);


    // function createSelectBoxAndOptions(selectId, listData){
    //     var select = document.getElementById(selectId);
    //     console.log("createselectboxandoptions function 에서 listdata : ", listData);
    //     for(var i in listData){
    //     var option = document.createElement("option");
    //     option.value = listData[i].value;
    //     option.text = listData[i].text;
    //     select.appendChild(option);
    //     }
    // };

    // createSelectBoxAndOptions('popupExecutionStatus2', commonCodeUseYn);



    // 날짜
    function getFormatDate(data) {
        var year = data.getFullYear();
        var month = (1 + data.getMonth());
        month = month >= 10 ? month : '0' + month;
        var day = data.getDate();
        day = day >= 10 ? day : '0' + day;
        return year + '-' + month + '-' + day;
    };


    $('#popupExecutionStatus').click(function () {
        let result = $('#popupExecutionStatus').val();
        console.log(result);
        getloclaStorageData();
        if (result == "실패") {
            console.log("goDetail() done");
            defectInfoPopup.show();
        } else {
            console.log('팝업닫기');
            defectInfoPopup.hide();
        }
    });





    $("#createDefect").click(function () {
        // create defect popup form
        console.log("create defect popup Form");
        getloclaStorageData();
        defectInfoPopup.show();
    });


    $("#getDefectList").click(function () {
        // create defect List popup form
        console.log("create defect Listpopup Form");
        getloclaStorageData();
        getDefectListPopup.show();
    });




    // defect create template
    var defectInfoPopupTemplate = function () {
        const scrollView2 = $('<div>');
        scrollView2.append(
            $(`          
        <form id="newdefectForm" method="post" enctype="multipart/form-data">
        <div id="defectTemplate">
        <h1> this is defect create form </h1>

        <div id="exeInfo">
        <label> ExecutionId Id: </label> <input type="text" id ="popupExecutionId" name="popupExecutionId" placehold="${clickeddata}" value="${clickeddata}" readonly/></p>
        <label> Defect Id: </label> <input type="text" id ="popupDefectId" name="popupDefectId" placehold="" value="" readonly/></p>
        <label> Defect Status: </label> <input type="text" id ="popupDefectStatus" name="popupDefectStatus" placehold="" value="NEW" readonly/> <br>
        <label> Create At : </label> <input type="date" id ="popupCreateAt" name="popupCreateAt" placehold="${getFormatDate(new Date())}" value="" readonly/> <br>
        <label> Created By: </label> <input type="text" id ="popupCreatedBy" name="popupCreatedBy" placehold="" value="" readonly/> <br>
        <label> Defect Contents: </label> <input type="text" id ="popupDefectContents2" name="popupDefectContents2" placehold="결함 내용을 입력해주세요." value=""> <br>
        </div>

        

        <!-- 
        <div id="defectInfoToolbar">
        <button class="defectInfoToolbar1">
        <span>defect Info</span>
        </button>
        <button class="defectInfoToolbar2">
        <span>attach file</span>
        </button> 
        -->

        <div id="defectInfo">
        <h2> defect info insert!!</h2>

        <div id="defectInfo1">
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

        <div id="attachFile" style="display:block">
        <h2>this is for Attach file!</h2>
        
        <div class="button">
            <label for="chooseFile">
                👉 CLICK HERE! 👈
            </label>
        </div>
        <input type="file" id="chooseFile" name="chooseFile" accept="image/*" >

        </div>

        </div>

        </div>
        </form>
        <!-- <script type="text/javascript" src="../static/js/testExecutionListPopupDefectListGrid.js" /> -->
        `)
        );

        scrollView2.dxScrollView({
            width: '100%',
            height: '100%',
        });

        return scrollView2;
    };



    // execution status 실패, create new defect and popup
    var defectInfoPopup = $("#defectPopupArea").dxPopup({
        contentTemplate: defectInfoPopupTemplate,
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
                    console.log("new defect popup save click");

                    var data = {
                        executionId: $("#popupExecutionId").val(),
                        projectName: $("#popupProjectName").val(),
                        testType: $("#popupTestType").val(),
                        testTargetType: $("#popupTestTargetType").val(),
                        testTargetName: $("#popupTestTargetName").val(),
                        scenarioType: $("#popupScenarioType").val(),
                        scenarioCategory: $("#popupScenarioCategory").val(),
                        bizCategory: $("#popupBizCategory").val(),
                        bizDetail: $("#popupBizDetail").val(),
                        version: $("#popupVersion").val(),
                        teamName: $("#popupTeamName").val(),
                        testScenarioId: $("#popupTestScenarioId").val(),
                        testScenarioName: $("#popupTestScenarioName").val(),
                        screenId: $("#popupScreenId").val(),
                        screenName: $("#popupScreenName").val(),
                        testCaseId: $("#popupTestCaseId").val(),
                        testCaseName: $("#popupTestCaseName").val(),
                        tester: $("#popupTester").val(),
                        confirmContents: $("#popupConfirmContents").val(),
                        testData: $("#popupTestData").val(),
                        buildName: $("#popupBuildName").val(),
                        buildVersion: $("#popupBuildVersion").val(),
                        note: $("#popupNote").val(),
                        execDueDate: getFormatDate(new Date()),
                        executionDate: $("#popupExecutionDate").val(),
                        executionDate: new Date(),
                        execStatus: $("#popupExecutionStatus").val(),
                        execResult: $("#popupExecutionResult").val(),
                        testDefectList: [
                            {
                                createAt: new Date(),
                                createdBy: $("#popupCreatedBy").val(), // session username 넣기
                                defectActionContents: $("#popupDefectActionContents").val(),
                                defectActionYn: $("#popupDefectActionYn").val(),
                                defectCategory: $("#popupDefectCategory").val(),
                                defectCharger: $("#popupDefectCharger").val(),
                                defectCheck: $("#popupDefectCheck").val(),
                                defectCheckDate: $("#popupDefectCheckDate").val(),
                                defectContents: $("#popupDefectContents2").val(),
                                defectDate: $("#popupDefectDate").val(),
                                defectEndDueDate: $("#popupDefectEndDueDate").val(),
                                defectStartDueDate: $("#popupDefectStartDueDate").val(),
                                defectStatus: $("#popupDefectStatus").val(),
                                defectTeam: $("#popupDefectTeam").val(),
                                executionId: $("#popupExecutionId").val(),
                            }
                        ]
                    };



                    if ($('#chooseFile').val().length == 0) {
                        $.ajax({
                            url: `${url}/execution/defect`,
                            dataType: 'json',
                            type: 'POST',
                            data: JSON.stringify(data),
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
                            },
                            error: function (e) {
                                console.log("err:", e);
                                alert("please check your image");
                            }
                        });
                        console.log("execution/defect 실행");
                    };

                    // 첨부파일 ajax

                    if ($('#chooseFile').val().length > 0) {
                        const photoFile = document.getElementById("chooseFile");

                        var form = $('#form')[0];
                        const formData = new FormData(form);
                        formData.append('pic', photoFile.files[0]);
                        formData.append('key', new Blob([JSON.stringify(data)], { type: "application/json" }));

                        // formData.append('data', JSON.stringify(data));
                        console.log("formData 확인하기 : ", formData);



                        $.ajax({
                            url: `${url}/execution/defect/attach-file`,
                            type: "POST",
                            processData: false,
                            contentType: false,
                            cache: false,
                            data: formData,
                            dataType: 'json',
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
                            }
                        });
                    };
                    defectInfoPopup.hide();
                }
            }
        },
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: 'Close',
                onClick() {
                    defectInfoPopup.hide();
                },
            },
        }
        ],
    }).dxPopup('instance');


    // create defect Info
    var createDefectInfoPopup = $("#createDefectPopupArea").dxPopup({
        contentTemplate: defectInfoPopupTemplate,
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
                    console.log("new defect popup save click");
                    var data = {
                        "createAt": new Date(),
                        "createdBy": $("#popupCreatedBy").val(), // session username 넣기
                        "defectActionContents": $("#popupDefectActionContents").val(),
                        "defectActionYn": $("#popupDefectActionYn").val(),
                        "defectCategory": $("#popupDefectCategory").val(),
                        "defectCharger": $("#popupDefectCharger").val(),
                        "defectCheck": $("#popupDefectCheck").val(),
                        "defectCheckDate": $("#popupDefectCheckDate").val(),
                        "defectContents": $("#popupDefectContents2").val(),
                        "defectDate": $("#popupDefectDate").val(),
                        "defectEndDueDate": $("#popupDefectEndDueDate").val(),
                        "defectStartDueDate": $("#popupDefectStartDueDate").val(),
                        "defectStatus": $("#popupDefectStatus").val(),
                        "defectTeam": $("#popupDefectTeam").val(),
                        "executionId": $("#popupExecutionId").val(),
                    };

                    if ($('#chooseFile').val().length == 0) {
                        $.ajax({
                            url: `${url}/defect/create`,
                            dataType: 'json',
                            type: 'POST',
                            data: JSON.stringify(data),
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
                        console.log("execution/defect 실행");
                    };

                    // 첨부파일 ajax
                    if ($('#chooseFile').val().length > 0) {
                        const photoFile = document.getElementById("chooseFile");

                        const formData = new FormData();
                        formData.append("pic", photoFile.files[0]);
                        formData.append("key", new Blob([JSON.stringify(data)], { type: "application/json" }));
                        // formData.append('data', [JSON.stringify(data)], { type: "application/json" });


                        console.log("formData 확인하기 : ", formData);



                        $.ajax({
                            url: `${url}/execution/defect/attach-file`,
                            type: "POST",
                            processData: false,
                            contentType: false,
                            cache: false,
                            data: formData,
                            dataType: 'json',
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
                                createDefectInfoPopup.hide();
                            }
                        });
                    };
                    createDefectInfoPopup.hide();
                }
            }
        },
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: 'Close',
                onClick() {
                    createDefectInfoPopup.hide();
                },
            },
        }],
    }).dxPopup('instance');





    // defect create template
    var getDefectListPopupTemplate = function () {
        const scrollView2 = $('<div>');
        scrollView2.append(
            $(`        
        <h2> defect List popup </h2>
        <div id="defectListGrid"></div>
        <script src="../static/js/testExecutionListPopupDefectListGrid.js" />        
        `)
        );

        scrollView2.dxScrollView({
            width: '100%',
            height: '100%',
        });

        return scrollView2;
    };

    function getDefectList() {
        $('#defectListGrid').dxDataGrid({
            dataSource: DevExpress.data.AspNet.createStore({
                key: 'defectId',
                loadUrl: `${url}/defect/list-by-execution-id/${clickeddata}`,
                onBeforeSend(method, ajaxOptions) {
                    ajaxOptions.xhrFields = { withCredentials: true };
                },
            }),
        });
    };

    const defectListDataGrid = $('#defectListGrid').dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: 'defectId',
            loadUrl: `${url}/defect/list-by-execution-id/${clickeddata}`,
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
                dataField: 'defectContents',
                // validationRules: [{ type: 'required' }],
            },
            {
                dataField: 'defectStatus',
                // validationRules: [{ type: 'required' }],
            },
            {
                dataField: 'createdBy',
                // validationRules: [{ type: 'required' }],
            },
            {
                dataField: 'createAt',
                dataType: 'date',
                // validationRules: [{ type: 'required' }],
            },
            {
                dataField: 'defectTeam',
                visible: false,
            },
            {
                dataField: 'defectCharger',
                // validationRules: [{ type: 'required' }],
            },
            {
                dataField: 'defectStartDueDate',
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
                dataGrid: 'defectCheck',
                visible: false,
            },
            {
                dataGrid: 'defectCheckDate',
                dataType: 'date',
                visible: false,
            },]
    }).dxDataGrid('instance');



    // execution 화면에서 defectList popup
    var getDefectListPopup = $("#getDefectListPopupArea").dxPopup({
        contentTemplate: getDefectListPopupTemplate,
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
        }, toolbarItems: [{
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: 'Close',
                onClick() {
                    getDefectListPopup.hide();
                },
            },
        }],
    }).dxPopup('instance');



});

