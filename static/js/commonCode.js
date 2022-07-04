
$(() => {

  const url = 'http://192.168.219.106:8080';

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

  

  // 선택 데이터 정보 변수
  let clickeddata = null;

  // 하단 정보보기
  $(function() {
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
            console.log(clickeddata);


    $("#codeDetailInfo").dxDataGrid({
      dataSource: DevExpress.data.AspNet.createStore({
        key: 'codeDetailId',
        loadUrl: `${url}/common/detail/${clickeddata.codeGroupId}`,
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
      rowDragging: {
        allowReordering: true,
        onReorder(e) {
          const visibleRows = e.component.getVisibleRows();
          const toIndex = tasks.indexOf(visibleRows[e.toIndex].data);
          const fromIndex = tasks.indexOf(e.itemData);
  
          tasks.splice(fromIndex, 1);
          tasks.splice(toIndex, 0, e.itemData);
  
          e.component.refresh();
        },
      },
      showBorders: true,
      columns: [{
        dataField: 'codeDetailId',
      }, {
        dataField: 'codeGroupId',
      }, {
        dataField: 'codeDetailName',
      },{
        dataField:'codeDetailDesc',
      },{
        dataField: 'orderNum',
      },{
        dataField: 'useYn',
      },
    ],
    }).dxDataGrid('instance');
  },
});
  

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
            dataField:'codeGroupId',
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
});



























  // edit popup template
  const popupContentTemplate = function () {
    const scrollView = $('<div>');
    scrollView.append(
        $(`
        <form id="popupForm" name="popupForm">
        <label> codeGroupId: </label> <input type="text" id="codeGroupId" name="codeGroupId" value="${clickeddata.codeGroupId}" readonly/> <br>
        <label> codeGroupName: </label> <input type="text" id="codeGroupName" name="codeGroupName" value="${clickeddata.codeGroupName}"> <br>
        <label> codeGroupDesc: </label> <input type="text" id="codeGroupDesc" name="codeGroupDesc" value="${clickeddata.codeGroupDesc}"> <br>
        
        <label> useYn: </label> 
          <select name="useYn" id="useYn" value="${clickeddata.useYn}">
            <option value="${clickeddata.useYn}" selected disabled>${clickeddata.useYn}</option>
            <option value="y">y</option>
            <option value="n">n</option>
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
            if ($("#useYn").val() == null) {
              var useYn = `${clickeddata.useYn}`;
              var data = { 
                "codeGroupId": $("#codeGroupId").val(),
                "codeGroupName": $("#codeGroupName").val(),
                "codeGroupDesc": $("#codeGroupDesc").val(),
                "useYn": useYn,
              };
            }else{
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
              success: function(json) {
                  if (json) {
                    console.log('endend');
                  }
              }
            }); 

            // get 불러오기
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
              "codeGroupId": $("#codeGroupId").val(),
              "codeGroupName": $("#codeGroupName").val(),
              "codeGroupDesc": $("#codeGroupDesc").val(),
              "useYn": $("#useYn").val(),
            };
        

            // 오브젝트 json 타입으로 변경
            var json = JSON.stringify(data);

            //Ajax POST Method TEST -> new execution create
            $.ajax({
              url: `${url}/common/group/create`,
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
      text: 'New Code Group',
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
        'codeGroupId' : clickeddata.codeGroupId
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