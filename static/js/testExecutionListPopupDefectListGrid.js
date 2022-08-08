$(() => {


    const url = 'http://192.168.219.140:8080';
    
    // common code use yn 변수
    let clickeddata = null;
    function getloclaStorageData() {
    if(localStorage.getItem('clickedExecutionId')){
        clickeddata =localStorage.getItem('clickedExecutionId');
       }
    };

    getloclaStorageData();

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
    
})