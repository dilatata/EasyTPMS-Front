
$(() => {

  const url = 'http://192.168.219.140:8080';
  // const url = 'http://192.168.0.43:8080';


  function getData() {
    $('#gridContainer').dxDataGrid({
      dataSource: DevExpress.data.AspNet.createStore({
        key: 'id',
        loadUrl: `${url}/user/list`,
        onBeforeSend(method, ajaxOptions) {
          ajaxOptions.xhrFields = { withCredentials: true };
        },
      }),
    });
  };

  const dataGrid = $('#gridContainer').dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      key: 'id',
      loadUrl: `${url}/user/list`,
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
          dataField:'id',
          allowEditing: false,
      },
      {
          dataField: 'userId',
          validationRules: [{ type: 'required' }],
      }, 
      {
          dataField: 'userPassword',
          validationRules: [{ type: 'required' }],
      },
      {
          dataField: 'userName',
        validationRules: [{ type: 'required' }],
      },
      {
          dataField: 'userEmail',
          validationRules: [{ type: 'required' }],
      },
      {
          dataField: 'roleType', 
          validationRules: [{ type: 'required' }],
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


  // 선택 데이터 정보 변수
  let clickeddata = null;
  // common code use yn 변수
  let commonCodeUseYnList = [];
  // execution status 변수
  let commonCodeExecutionStatusList = [];
  // user type 변슈
  let commonCodeUserTypeList = [];


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
        }
        else if(codeGroupId==161){
          commonCodeUserTypeList = commonCodeList;
          console.log('codeGroupId=161');
        };
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
            const data = e.data;
 
            if (data) {
              // $('.id').text(`Id : ${data.id}`);
              $('.userId').text(`userId : ${data.userId}`);
              $('.userPassword').text(`userPassword : ${data.userPassword}`);
              $('.userName').text(`userName : ${data.userName}`);
              $('.userEmail').text(`userEmail : ${data.userEmail}`);
              $('.roleType').text(`roleType Type : ${data.roleType}`);
              };
            clickeddata = data;
            console.log("clickeddata : ", clickeddata);


            if (commonCodeUserTypeList.length == 0){
              commonCodeList(161) // usertype
              console.log(commonCodeUserTypeList.length);
              console.log('1st time common code user type list : ', commonCodeUserTypeList);
              } else {
              console.log('commonCodeUserTypeList already exist : ', commonCodeUserTypeList);
      
              popup.option({
                contentTemplate: () => popupContentTemplate(),
                'position.of': `#gridContainer`,
              });
              
              console.log("popup 전에 길이 확인하기 : ",commonCodeUserTypeList.length); 
              
              popup.show();
            };
  
            
        },
    })
});


































  // edit popup template
  const popupContentTemplate = function () {
    const scrollView = $('<div>');
    scrollView.append(
        $(`

        <form id="popupForm" name="popupForm">
        <label> Id: </label> <input type="text" id="userMainId" name="userMainId" value="${clickeddata.id}" readonly/> <br>
        <label> User Id: </label> <input type="text" id="userId" name="userId" value="${clickeddata.userId}" readonly/> <br>
        <label> User Password: </label> <input type="text" id="userPassword" name="userPassword" value="${clickeddata.userPassword}"> <br>
        
        <label> User Name: </label> <input type="text" id="userName" name ="userName" value="${clickeddata.userName}"> <br>
        <label> User Email: </label> <input type="text" id="userEmail" name="userEmail" value="${clickeddata.userEmail}"> <br>
        
        <label> Role Type: </label> 
          <select name="roleType" id="roleType" value="${clickeddata.roleType}">
          </select> <br>
        
        </form>
        
        <script>
        var commonCodeUseYn = ${JSON.stringify(commonCodeUseYnList)};
        var commonCodeExecutionStatus =${JSON.stringify(commonCodeExecutionStatusList)};
        var commonCodeUserTypeList =${JSON.stringify(commonCodeUserTypeList)};



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
        createSelectBoxAndOptions('roleType', commonCodeUserTypeList);

        </script>
        
        `),
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
        $(`<form id="popupForm" name="popupForm">        
        <label> User Id: </label> <input type="text" id="userId" name="userId" value=""> <br>
        <label> User Password: </label> <input type="text" id="userPassword" name="userPassword" value=""> <br>
        
        <label> User Name: </label> <input type="text" id="userName" name ="userName"value=""> <br>
        <label> User Email: </label> <input type="text" id="userEmail" name="userEmail" value=""> <br>
        
        <label> Role Type: </label> 
          <select name="roleType" id="roleType" value="">
            <option value="" selected disabled> == role type == </option>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select> <br>
          </form>`),
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

            // SERIALIZE() 사용하면 편하겠지만 계속 공(NULL 아닌 빈) DATA 값만 넘어감
            // var data = $("#popupForm").serialize();
            if ($("#roleType").val() == null) {
              var roletype = `${clickeddata.roleType}`;
              var data = { 
                "id": $("#userMainId").val(),
                "userId": $("#userId").val(),
                "userPassword": $("#userPassword").val(),
                "userName": $("#userName").val(),
                "userEmail": $("#userEmail").val(),
                "roleType": roletype,
              };
            }else{
              var data = { 
                "id": $("#userMainId").val(),
                "userId": $("#userId").val(),
                "userPassword": $("#userPassword").val(),
                "userName": $("#userName").val(),
                "userEmail": $("#userEmail").val(),
                "roleType": $("#roleType").val(),
              };
            }
     
            // 오브젝트 json 타입으로 변경
            var json = JSON.stringify(data);

            $.ajax({
              url: `${url}/user/edit/${clickeddata.id}`,
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
              success: function(json) {
                  if (json) {
                    console.log('endend');
                  }
              }
            });
            setTimeout(function () {
              getData();
            },1000); 
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

            // input data 값 각각 갖고와서 js 오브젝트로 만들기
            // var data = $("#popupForm").serialize();
            var data = { 
              "userId": $("#userId").val(),
              "userPassword": $("#userPassword").val(),
              "userName": $("#userName").val(),
              "userEmail": $("#userEmail").val(),
              "roleType": $("#roleType").val(),
            };
            console.log(data);
        

            // 오브젝트 json 타입으로 변경
            var json = JSON.stringify(data);

            //Ajax POST Method TEST -> new execution create
            $.ajax({
                url: `${url}/user/create`,
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
                success: function(json) {
                    if (json) {
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


  

















    // button

    $("#buttonContainer").dxButton({
        text: 'Edit Button',
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



    $("#createInfo").dxButton({
      text: 'New User',
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
        'id' : clickeddata.id
      };
  
      console.log(data);
  
      //위에서 만든 오브젝트를 json 타입으로 바꾼다.
      var json = JSON.stringify(data);
  
      $.ajax({
        url: `${url}/user/delete/${clickeddata.id}`,
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