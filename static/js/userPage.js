
$(() => {

  const url = 'http://192.168.219.103:8080';

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
        <label> User Id: </label> <input type="text" id="userId" name="userId" value="${clickeddata.userId}"> <br>
        <label> User Password: </label> <input type="text" id="userPassword" name="userPassword" value="${clickeddata.userPassword}"> <br>
        
        <label> User Name: </label> <input type="text" id="userName" name ="userName" value="${clickeddata.userName}"> <br>
        <label> User Email: </label> <input type="text" id="userEmail" name="userEmail" value="${clickeddata.userEmail}"> <br>
        
        <label> Role Type: </label> 
          <select name="roleType" id="roleType" value="${clickeddata.roleType}">
            <option value="${clickeddata.roleType}" selected disabled>${clickeddata.roleType}</option>
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


 






  // popup ??????

  // edit ??????
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

            // SERIALIZE() ???????????? ??????????????? ?????? ???(NULL ?????? ???) DATA ?????? ?????????
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
     
            
            // ???????????? json ???????????? ??????
            var json = JSON.stringify(data);


          $.ajax({
            url: `${url}/user/edit/${clickeddata.id}`,
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
            popup.hide();
            // grid ??? reload ?????????
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

            // input data ??? ?????? ???????????? js ??????????????? ?????????
            // var data = $("#popupForm").serialize();
            var data = { 
              "userId": $("#userId").val(),
              "userPassword": $("#userPassword").val(),
              "userName": $("#userName").val(),
              "userEmail": $("#userEmail").val(),
              "roleType": $("#roleType").val(),
            };
            console.log(data);
        

            // ???????????? json ???????????? ??????
            var json = JSON.stringify(data);

            //Ajax POST Method TEST -> new execution create
            $.ajax({
                url: `${url}/user/create`,
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
            popup2.hide();
            // grid ??? reload ?????????
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
      //?????? ???????????? ??? ???????????? ?????? ?????????.  
      if(clickeddata){
  
      //????????? ????????? ????????? js ??????????????? ?????????.  
      var data = {
        'id' : clickeddata.id
      };
  
      console.log(data);
  
      //????????? ?????? ??????????????? json ???????????? ?????????.
      var json = JSON.stringify(data);
  
      $.ajax({
        url: `${url}/user/delete/${clickeddata.id}`,
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