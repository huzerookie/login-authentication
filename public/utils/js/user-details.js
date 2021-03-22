$(async function () {
    let users = [];
    await fetch('/users').then(response => response.json().then(data => { users = data; console.log(data) }));
    console.log(users);
    $("#gridContainer").dxDataGrid({
        dataSource: users,
        paging: {
            pageSize: 10
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [10, 25, 50, 100]
        },
        remoteOperations: false,
        searchPanel: {
            visible: true,
            highlightCaseSensitive: true
        },
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        showBorders: true,
        columns: [
            {
                dataField: "firstName",
                caption: "First Name"
            },
            {
                dataField: "lastName",
                caption: "Last Name"
            },
            {
                dataField: "email",
                caption: "Email"
            },
            {
                dataField: "employeeId",
                caption: "Employee Id"
            },
            {
                dataField: "organization",
                caption: "Organization"
            },

        ],
        onContentReady: function (e) {

        }
    });
});


var collapsed = false;
