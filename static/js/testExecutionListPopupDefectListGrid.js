$(() => {


    const url = 'http://192.168.219.140:8080';
    // const url = 'http://192.168.0.43:8080';
    
    // common code use yn 변수
    let clickeddata = null;
    function getloclaStorageData() {
    if(localStorage.getItem('clickedExecutionId')){
        clickeddata =localStorage.getItem('clickedExecutionId');
        console.log("localStorage clickedExecutionId : ", clickeddata);
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
                dataField: 'defectId',
                visible: false,
            },
            {
                dataField: 'defectCategory',
                visible: false,
            },
            {
                dataField:'defectContents',
                // validationRules: [{ type: 'required' }],
            },
            {
                dataField:'defectStatus',
                // validationRules: [{ type: 'required' }],
            },
            {
                dataField:'createdBy',
                // validationRules: [{ type: 'required' }],
            },
            {
                dataField:'createAt',
                dataType: 'date',
                // validationRules: [{ type: 'required' }],
            },
            {
                dataField:'defectTeam',
                visible: false,
            },
            {
                dataField:'defectCharger',
                // validationRules: [{ type: 'required' }],
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