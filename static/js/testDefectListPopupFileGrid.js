$(() => {

    // const url = 'http://192.168.219.140:8080';
    const url = 'http://192.168.0.43:8080';

    let clickeddata = null;
    let defectOnRowclick = null;
    function getloclaStorageData() {
    if(localStorage.getItem('clickedDefectId')){
        clickeddata =localStorage.getItem('clickedDefectId');
        console.log("localStorage clickedDefectId : ", clickeddata);
        defectOnRowclick = JSON.parse(localStorage.getItem('defectOnRowclick'));
        console.log("defectOnRowclick : ", defectOnRowclick.executionId, defectOnRowclick.defectId);
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


        // create button
        // $("#Phosubmit2").dxButton({
        //   text: 'File Create Button',
        //   onClick:     function() {
        //     const photoFile = document.getElementById("defectAttachFileCreate2");
      
        //     const formData = new FormData();
        //     formData.append("pic", photoFile.files[0]);
        //     console.log(photoFile.files[0]);
        //     console.log(formData);
      
        //     $.ajax({
        //       url: `${url}/defect/attachFile/create`,
        //       type: "POST",
        //       processData: false,
        //       contentType: false,
        //       data: formData,
        //       dataType:'json',
        //       crossDomain: true,
        //       xhrFields: {
        //         withCredentials: true
        //       },
        //       success: function (rtn) {
        //         alert("upload success");
        //       },
        //       error: function (e) {
        //         console.log("err:", e);
        //         alert("please check your image");
        //         getData();
        //       }
        //     });
        //   },
        // });



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
              // url: `${url}/defect/attachFile/create`,
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
                },5000);
              },
              error: function (e) {
                console.log("err:", e);
                alert("please check your image");
                setTimeout(function(){
                  getAttachFileData()
                },2000);
              }
            });

          }
        )





        // delete button
        $("#defectAttachFileDelete").dxButton({
          text: 'FIle Delete Button',
          onClick: function () {
            if (clickeddata) {
              
              
            }
          },
        });
      
})