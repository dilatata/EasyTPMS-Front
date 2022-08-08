
$(() => {

  const url = 'http://192.168.219.140:8080';


  function getData() {
    $('#gridContainer').dxDataGrid({
      dataSource: DevExpress.data.AspNet.createStore({
        key: 'codeGroupId',
        loadUrl: `${url}/common/group/list`,
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
  };


  const dataGrid = $('#gridContainer').dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      key: 'codeGroupId',
      loadUrl: `${url}/common/group/list`,
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
        dataField: 'codeGroupId',
        allowEditing: false,
      },
      {
        dataField: 'codeGroupName',
        validationRules: [{ type: 'required' }],
      },
      {
        dataField: 'codeGroupDesc',
        validationRules: [{ type: 'required' }],
      },
      {
        dataField: 'useYn',
        validationRules: [{ type: 'required' }],
      },
    ],
  }).dxDataGrid('instance');




  // 선택 데이터 정보 변수
  let clickeddata = null;
  var clickedDetaildata = null;


  // 하단 정보보기
  $(function () {
    $("#gridContainer").dxDataGrid({
      onRowClick(e) {
        const data = e.data;
        
        if (data) {
          $('.codeGroupId').text(`codeGroupId : ${data.codeGroupId}`);
          $('.codeGroupName').text(`codeGroupName : ${data.codeGroupName}`);
          $('.codeGroupDesc').text(`codeGroupDesc : ${data.codeGroupDesc}`);
          $('.useYn').text(`useYn : ${data.useYn}`);
        };
        clickeddata = data;
        console.log("clickeddata : ",clickeddata);
        localStorage.setItem("clickedCodeGroupId", clickeddata.codeGroupId);

        if (commonCodeUseYnList.length == 0) {
          useYnList(1);
          console.log(commonCodeUseYnList.length);
          console.log('1st time common code use yn list : ', commonCodeUseYnList);



        } else {
          console.log('commonCodeUseYnList already exist : ', commonCodeUseYnList);

          popup.option({
            contentTemplate: () => popupContentTemplate(),
            'position.of': `#gridContainer`,
          });


          console.log("popup 전에 길이 확인하기 : ", commonCodeUseYnList.length); //0 -> 이러면 안돼는데!!

          popup.show();
        }

      },
    });
  });














  // common code group edit popup template
  const popupContentTemplate = function () {
    const scrollView = $('<div>');
    scrollView.append(
      $(`
        <form id="popupForm" name="popupForm">
        <label> codeGroupId: </label> <input type="text" id="codeGroupId" name="codeGroupId" value="${clickeddata.codeGroupId}" readonly/> <br>
        <label> codeGroupName: </label> <input type="text" id="codeGroupName" name="codeGroupName" value="${clickeddata.codeGroupName}"> <br>
        <label> codeGroupDesc: </label> <input type="text" id="codeGroupDesc" name="codeGroupDesc" value="${clickeddata.codeGroupDesc}"> <br>
        <label> useYn: </label> <select name="useYn" id="useYn" class="useYn" value="${clickeddata.useYn}" /> 
        </select> <br>
        <br>
        <hr>
        <br>

        <div>
          <div id="codeDetailCreate"></div> //button
          <div id="codeDetailDelete"></div> //button

          <div id="codeDetailInfo"></div> //grid
        <div>
        <div id="codeDetailInfoPopup"></div>
        <div id="codeDetailCreatePopup"></div>

        
        </form>



        <script>
        var commonCodeUseYn = ${JSON.stringify(commonCodeUseYnList)};

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
        createSelectBoxAndOptions('useYn', commonCodeUseYn);
    
        // common code detail datagrid
        var dataGrid2 = $("#codeDetailInfo").dxDataGrid({
            dataSource: DevExpress.data.AspNet.createStore({
                key: 'codeDetailId',
                loadUrl: \`${url}/common/detail/${clickeddata.codeGroupId}\`,
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

        $("#codeDetailDelete").dxButton({
          text: 'Delete Button',
          onClick: function () {
              if (clickedDetaildata) {
                  console.log("delete button!");
                  console.log(clickedDetaildata);
  
  
                  //유저가 입력한 정보를 js 오브젝트로 만든다.  
                  var data = {
                      'codeDetailId': clickedDetaildata.codeDetailId
                  };
  
                  console.log(data);
                  var codeDetailIdNum = null;
                  codeDetailIdNum = clickedDetaildata.codeDetailId;
                  console.log("codeDetailIdNum", codeDetailIdNum);
  
                  //위에서 만든 오브젝트를 json 타입으로 바꾼다.
                  var json = JSON.stringify(data);
  
                  $.ajax({
                      url: \`${url}/common/detail/delete/codeDetailId\`, // codedetailId 값을 받아오지 못하는 문제 일반 문자로 읽음
                      dataType: 'json',
                      type: 'DELETE',
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
  
  
              } else {
                  console.log("no clickedDetaildata");
              }
          }
      });
  

        </script>
        <script src="../static/js/commonCodeDetail.js" />`),
    );

    scrollView.dxScrollView({
      width: '100%',
      height: '100%',
    });

    return scrollView;
  };


  // popup2 -> new commone code group create
  const popupContentTemplate2 = function () {
    const scrollView = $('<div>');
    scrollView.append(
      // return $('<div>').append(
      console.log("template Log"),
      console.log("clickeddata : ", clickeddata),
      $(`        
        <form id="popupForm" name="popupForm">
        <label> codeGroupId: </label> <input type="text" id="codeGroupId" name="codeGroupId" value="" readonly/> <br>
        <label> codeGroupName: </label> <input type="text" id="codeGroupName" name="codeGroupName" value=""> <br>
        <label> codeGroupDesc: </label> <input type="text" id="codeGroupDesc" name="codeGroupDesc" value=""> <br>
        
        <label> useYn: </label> 
          <select name="useYn" id="useYn" value="">
            <option value="" selected disabled>== 필수 선택==</option>
            <option value="y">y</option>
            <option value="n">n</option>
          </select> <br>
          </form>
          
          
          <script>
          var commonCodeUseYn = ${JSON.stringify(commonCodeUseYnList)};

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
          createSelectBoxAndOptions('useYn', commonCodeUseYn);

          </script>`),
    );

    scrollView.dxScrollView({
      width: '100%',
      height: '100%',
    });

    return scrollView;
  };










  // popup 기능

  // edit 팝업
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

          if ($("#useYn").val() == null) {
            var useYn = `${clickeddata.useYn}`;
            var data = {
              "codeGroupId": $("#codeGroupId").val(),
              "codeGroupName": $("#codeGroupName").val(),
              "codeGroupDesc": $("#codeGroupDesc").val(),
              "useYn": useYn,
            };
          } else {
            var data = {
              "codeGroupId": $("#codeGroupId").val(),
              "codeGroupName": $("#codeGroupName").val(),
              "codeGroupDesc": $("#codeGroupDesc").val(),
              "useYn": $("#useYn").val(),
            };
          }


          // 오브젝트 json 타입으로 변경
          var json = JSON.stringify(data);



          // popup 창 위의 정보들을 json 형태로 POST method 연결하기
          let message = "정보를 수정했습니다!"
          DevExpress.ui.notify({
            message,
            position: {
              my: 'center top',
              at: 'center top',
            },
          }, 'success', 3000);

          $.ajax({
            url: `${url}/common/group/edit/${clickeddata.codeGroupId}`,
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




  // 공통코드 그룹 생성
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
          console.log("create common code group")

          // input data 값 각각 갖고와서 js 오브젝트로 만들기
          // var data = $("#popupForm").serialize();
          var data = {
            "codeGroupId": $("#codeGroupId").val(),
            "codeGroupName": $("#codeGroupName").val(),
            "codeGroupDesc": $("#codeGroupDesc").val(),
            "useYn": $("#useYn").val(),
          };


          // 오브젝트 json 타입으로 변경
          var json = JSON.stringify(data);
          console.log("json : ", json);

          //Ajax POST Method TEST -> new execution create
          $.ajax({
            url: `${url}/common/group/create`,
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
                alert("정보를 생성했습니다.");
              }
            },
            error: function (e) {

            }
          });

          setTimeout(function () {
            getData();
          }, 1000);

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




















  // button

  $("#buttonContainer").dxButton({
    text: 'Edit Button',
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



  $("#createInfo").dxButton({
    text: 'New Code Group',
    onClick: function () {
      popup2.option({
        contentTemplate: () => popupContentTemplate2(),
        'position.of': `#gridContainer`,
      });
      popup2.show();
    }
  });



  $("#deleteButton").dxButton({
    text: 'Delete Group Button',
    onClick: function () {
      //원래 동작해야 할 이벤트를 중지 시킨다.  
      if (clickeddata) {

        //유저가 입력한 정보를 js 오브젝트로 만든다.  
        var data = {
          'codeGroupId': clickeddata.codeGroupId
        };

        console.log(data);

        //위에서 만든 오브젝트를 json 타입으로 바꾼다.
        var json = JSON.stringify(data);

        $.ajax({
          url: `${url}/common/group/delete/${clickeddata.codeGroupId}`,
          dataType: 'json',
          type: 'DELETE',
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
        getData();
      }
    }
  });

  function getOrderDay(rowData) {
    return (new Date(rowData.OrderDate)).getDay();
  };


});
