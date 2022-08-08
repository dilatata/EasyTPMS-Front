$(() => {

    const url = 'http://192.168.219.140:8080';

    let clickeddata = null;
    let defectOnRowclick = null;
    function getloclaStorageData() {
    if(localStorage.getItem('clickedDefectId')){
        clickeddata =localStorage.getItem('clickedDefectId');
        defectOnRowclick = JSON.parse(localStorage.getItem('defectOnRowclick'));
      }
    };

    getloclaStorageData();

    function getAttachFileData() {
      $('#defectAttachFileGrid').dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
          key: 'fileId',
          loadUrl: `${url}/defect/attachFile/list/${defectOnRowclick.defectId}`,
          onBeforeSend(method, ajaxOptions) {
            ajaxOptions.xhrFields = { withCredentials: true };
          },
        }),
      });
    };


    const attachfileDataGrid = $('#defectAttachFileGrid').dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
          key: 'fileId',
          loadUrl: `${url}/defect/attachFile/list/${defectOnRowclick.defectId}`,
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
            dataField :'executionId',
            visible: false,
        },
          {
              dataField :'defectId',
              visible: false,
          },
          { 
              dataField: 'fileId',
          },
          {
              dataField: 'fileOrder',
              visible: false,
          },
          {
              dataField: 'fileName',
          },
          {
              dataField: 'fileSize',
          },]
        }).dxDataGrid('instance');


        // createbutton 2
        $("#Phosubmit2").click(
          function() {
            const photoFile = document.getElementById("defectAttachFileCreate2");
      

            var data = {
              'defectId': $("#executionId").val(),
              'executionId': $("#defectId").val()
            };

            var json = JSON.stringify(data);

            const formData = new FormData();
            formData.append("pic", photoFile.files[0]);
            console.log(photoFile.files[0]);
            console.log(formData);
            console.log(url);
            console.log(defectOnRowclick.executionId);
            setTimeout(5000);

      
            $.ajax({
              url: `${url}/defect/attachFile/insert/${defectOnRowclick.executionId}/${defectOnRowclick.defectId}`,
              type: "POST",
              processData: false,
              contentType: false,
              data: formData,
              dataType:'json',
              cache: false,
              crossDomain: true,
              xhrFields: {
                withCredentials: true
              },
              success: function (rtn) {
                alert("upload success");
                setTimeout(function(){
                  getAttachFileData()
                },1000);
              },
              error: function (e) {
                console.log("err:", e);
                alert("please check your image");
                setTimeout(function(){
                  getAttachFileData()
                },1000);
              }
            });

          }
        )





        // delete button
        $("#defectAttachFileDelete").dxButton({
          text: 'FIle Delete Button',
          onClick: function () {
            if (clickeddata) {
              //
            }
          },
        });
      
})