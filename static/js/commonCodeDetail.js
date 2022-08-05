$(() => {

    const url = 'http://192.168.219.140:8080';
    // const url = 'http://192.168.0.43:8080';  

    let clickGroupData = null;
    let clickDetailData = null;

    function getloclaStorageData() {
        if(localStorage.getItem('clickedCodeGroupId')){
            clickGroupData=localStorage.getItem('clickedCodeGroupId');
            console.log("localStorage clickedCodeGroupId : ", clickGroupData);
           }
    };

    function getCommonDetailData() {
        $("#codeDetailInfo").dxDataGrid({
            dataSource: DevExpress.data.AspNet.createStore({
                key: 'codeDetailId',
                loadUrl: `${url}/common/detail/${localStorage.getItem('clickedCodeGroupId')}`,
                onBeforeSend(method, ajaxOptions) {
                    ajaxOptions.xhrFields = { withCredentials: true };
                },
            }),
        });
      };

    // common code use yn 변수
    let commonCodeUseYnList = [];

    // 공통코드 리스트로 받아오기
    function useYnList(codeGroupId) {
        let commonCodeList = [];
        $.ajax({
            url: `${url}/common/detail/${codeGroupId}`,
            type: "GET",
            processData: false,
            contentType: false,
            dataType: 'json',
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function (rtn) {
                console.log("rtn : ", rtn);
                for (var i = 0; i < rtn.length; i++) {
                    commonCodeList.push({ "text": rtn[i].codeDetailDesc, "value": rtn[i].codeDetailName });
                };
                console.log('success , common code list: ', commonCodeList);
                commonCodeUseYnList = commonCodeList;
            },
            error: function (e) {
                console.log("err:", e);
                alert("!error happend!");
            }
        });

        console.log("정확한 공통코드 1번 useyn 갖고왔어? : ", commonCodeList);
    };





////



    // common code detail datagrid
    // first start code from this js file!!
    var dataGrid2 = $("#codeDetailInfo").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: 'codeDetailId',
            loadUrl: `${url}/common/detail/${localStorage.getItem('clickedCodeGroupId')}`,
            onBeforeSend(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            },
        }),

        remoteOperations: true,
        scrolling: {
            mode: 'virtual',
        },
        sorting: {
            mode: 'none',
        },

        showBorders: true,
        columns: [{
            dataField: 'orderNum',
        }, {
            dataField: 'codeDetailId',
            visible: false,
        }, {
            dataField: 'codeGroupId',
        }, {
            dataField: 'codeDetailName',
        }, {
            dataField: 'codeDetailDesc',
        }, {
            dataField: 'useYn',
        },
        ],
    }).dxDataGrid('instance');

    ////


    // code detail row click
    $(function () {
        $("#codeDetailInfo").dxDataGrid({
            onRowClick(e) {
                getloclaStorageData();
                console.log("ghkrdlsgkffo local data : ", clickGroupData);
                let data = e.data;
                // console.log("디테일 값 선택", data);
                clickDetailData = data;
                console.log("clickDetailData 확인하기 : ", clickDetailData);
                console.log("clickDetailData: ", clickDetailData);

                if (commonCodeUseYnList.length == 0){
                    useYnList(1); // yn
                    console.log('1st time common code use yn list 길이: ', commonCodeUseYnList.length);
                    console.log('1st time common code use yn list : ', commonCodeUseYnList);
                    } else {
                    console.log('commonCodeUseYnList already exist : ', commonCodeUseYnList);
            
                    commonCodeDetailInfoPopup.option({
                      contentTemplate: () => commonCodeDetailInfoPopupTemplate(),
                      'position.of': `#gridContainer`,
                    });
                    
            
                    console.log("popup 전에 길이 확인하기 : ",commonCodeUseYnList.length); 
            
                    commonCodeDetailInfoPopup.show();
                    }


                
            }
        });
    });



    var commonCodeDetailInfoPopupTemplate = function () {
        const scrollView = $('<div>');
        scrollView.append(
            console.log("template Log"),
            $(`
          
          <h2> Heloo Info popup </h2>
    
          <form id="popupForm" name="popupForm">
          <label> Order Num: </label> <input type="text" id="popupCommonCodeDetailOrderNum" value="${clickDetailData.orderNum}" /> <br>
          <label> Code Group Id: </label> <input type="text" id="popupCommonCodeGroupId" value="${clickGroupData}" readonly/> <br>
          <label> Code Detail id: </label> <input type="text" id="popupCommonCodeDetailId" value="${clickDetailData.codeDetailId}" readonly/> <br>
          <label> Code Detail Name: </label> <input type="text" id="popupCommonCodeDetailName" value="${clickDetailData.codeDetailName}"> <br>
          <label> Code Detail Desc: </label> <input type="text" id="popupCommonCodeDesc" value="${clickDetailData.codeDetailDesc}" readonly/> <br>
          <label> useYn: </label> <select id="detailUseYn" class="useYn" value="" />
      </select> <br>
          </form>

          <script>
          console.log("디테일 팝업에서 만든 공통코드 값 : ", ${JSON.stringify(commonCodeUseYnList)});
          function createSelectBoxAndOptions(selectId, listData) {
              var select = document.getElementById(selectId);
              console.log("createselectboxandoptions function 에서 listdata : ", listData);
              for (var i in listData) {
                  var option = document.createElement("option");
                  option.value = listData[i].value;
                  option.text = listData[i].text;
                  select.appendChild(option);
              }
          };
          createSelectBoxAndOptions('detailUseYn', ${JSON.stringify(commonCodeUseYnList)});

          function getCommonDetailData() {
            $("#codeDetailInfo").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: 'codeDetailId',
                    loadUrl: \`${url}/common/detail/${localStorage.getItem('clickedCodeGroupId')}\`,
                    onBeforeSend(method, ajaxOptions) {
                        ajaxOptions.xhrFields = { withCredentials: true };
                    },
                }),
            });
          };


          
          </script>
          `),

            $('</div>'),
        );

        scrollView.dxScrollView({
            width: '100%',
            height: '100%',
        });

        return scrollView;
    };

    var commonCodeDetailCreatePopupTemplate = function () {
        const scrollView = $('<div>');
        scrollView.append(
            console.log("template Log"),
            $(`

          <h2>Create common code Detail popup </h2>

          <form id="popupForm" name="popupForm">
          <label> Order Num: </label> <input type="text" id="popupCommonCodeDetailOrderNum" value="" /> <br>
          <label> Code Group Id: </label> <input type="text" id="popupCommonCodeGroupId" value="${localStorage.getItem('clickedCodeGroupId')}" readonly/> <br>
          <label> Code Detail id: </label> <input type="text" id="popupCommonCodeDetailId" value="" readonly/> <br>
          <label> Code Detail Name: </label> <input type="text" id="popupCommonCodeDetailName" value=""> <br>
          <label> Code Detail Desc: </label> <input type="text" id="popupCommonCodeDetailDesc" value=""> <br>
          <label> useYn: </label> <select name="useYn" id="useYn" class="useYn" value="" />
      </select> <br>
          </form>
          `),

            $('</div>'),
        );

        scrollView.dxScrollView({
            width: '100%',
            height: '100%',
        });

        return scrollView;
    };





    // commonCodeDetailInfoPopup -> 공통코드디테일팝업
    var commonCodeDetailInfoPopup = $('#codeDetailInfoPopup').dxPopup({
        contentTemplate: commonCodeDetailInfoPopupTemplate,
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
                        "createAt": new Date(),
                        "codeGroupId": $("#popupCommonCodeGroupId").val(),
                        "codeDetailId": $("#popupCommonCodeDetailId").val(),
                        "codeDetailName": $("#popupCommonCodeDetailName").val(),
                        "codeDetailDesc": $("#popupCommonCodeDesc").val(),
                        "useYn": $("#useYn").val(),
                        "orderNum": $("#popupCommonCodeDetailOrderNum").val(),

                    };

                    // 오브젝트 json 타입으로 변경
                    var json = JSON.stringify(data);
                    console.log("확인", json);

                    $.ajax({
                        url: `${url}/common/detail/edit/${clickDetailData.codeDetailId}`,
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

                    console.log("common code edit save click");
                    setTimeout(function () {
                    }, 1000);

                    getCommonDetailData();
                    clickDetaildata = null;
                    commonCodeDetailInfoPopup.hide();
                },
            },
        }, {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'before',
            options: {
                text: 'Delete',
                type: 'submit',
                onClick() {

                    var data = {
                        'defectId' : clickDetailData.codeDetailId};

                    // 오브젝트 json 타입으로 변경
                    var json = JSON.stringify(data);
                    console.log("확인", json);

                    $.ajax({
                        url: `${url}/common/detail/delete/${clickDetailData.codeDetailId}`,
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
                      
                    getCommonDetailData();
                    clickDetaildata = null;
                    commonCodeDetailInfoPopup.hide();
                },
            },
        },{
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: 'Close',
                onClick() {
                    clickDetaildata = null;
                    commonCodeDetailInfoPopup.hide();
                },
            },
        }],
    }).dxPopup('instance');





    

    // commonCodeDetailCreatePopup -> 공통코드디테일팝업
    var commonCodeDetailCreatePopup = $('#codeDetailCreatePopup').dxPopup({
        contentTemplate: commonCodeDetailCreatePopupTemplate,
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


                    console.log("common code create click");

                    var data = {
                        "createAt": new Date(),
                        "codeGroupId": $("#popupCommonCodeGroupId").val(),
                        "codeDetailId": $("#popupCommonCodeDetailId").val(),
                        "codeDetailName": $("#popupCommonCodeDetailName").val(),
                        "codeDetailDesc": $("#popupCommonCodeDetailDesc").val(),
                        "useYn": $("#useYn").val(),
                        "orderNum": $("#popupCommonCodeDetailOrderNum").val(),
                    };
                    console.log("data 상태에서도 name 없나? : ", data);


                    // 오브젝트 json 타입으로 변경
                    var json = JSON.stringify(data);
                    console.log("확인", json);

                    $.ajax({
                        url: `${url}/common/detail/create`,
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

                    console.log("common code create done");
                    setTimeout(function () {
                        // get codedetaillist
                    }, 1000);

                    getCommonDetailData();
                    clickDetaildata = null;
                    commonCodeDetailCreatePopup.hide();
                },
            },
        }, {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: 'Close',
                onClick() {
                    clickDetaildata = null;
                    commonCodeDetailCreatePopup.hide();
                },
            },
        }],
    }).dxPopup('instance');


    $("#codeDetailCreate").dxButton({
        text: 'Create Button',
        onClick: function () {
            commonCodeDetailCreatePopup.option({
                contentTemplate: () => commonCodeDetailCreatePopupTemplate(),
                'position.of': `#gridContainer`,
            });
            commonCodeDetailCreatePopup.show();
        }
    });



})