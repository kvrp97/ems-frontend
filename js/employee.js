getAllEmployees();

function saveEmployee(){
    let name = $('#empName').val();
    let address = $('#empAddress').val();
    let mNumber = $('#empNumber').val();

    // console.log(name);
    $.ajax({
        method:"POST",
        contentType:"application/json",
        url:"http://localhost:8083/api/v1/employee/saveEmployee",
        async:true,
        data:JSON.stringify({
            "empId": "",
            "empName": name,
            "empAddress": address,
            "empMNumber":mNumber
        }),
        success: function (data) {
            alert("saved");
            getAllEmployees();
        },
        error: function (err, exception) {
            alert("error");
        }
    })
}

function updateEmployee(){
    let empId = $('#empId').val();
    let name = $('#empName').val();
    let address = $('#empAddress').val();
    let mNumber = $('#empNumber').val();

    $.ajax({
        method:"PUT",
        contentType:"application/json",
        url:"http://localhost:8083/api/v1/employee/updateEmployee",
        async:true,
        data:JSON.stringify({
            "empId": empId,
            "empName": name,
            "empAddress": address,
            "empMNumber": mNumber
        }),
        success: function (data) {
            alert("Updated");
            getAllEmployees();
        },
        error: function (err, exception) {
            alert("error");
        }
    })
}

function deleteEmployee(){
    let empId = $('#empId').val();
    $.ajax({
        method:"DELETE",
        contentType:"application/json",
        url:"http://localhost:8083/api/v1/employee/deleteEmployee/"+empId,
        async:true,
        success: function (data) {
            alert("Deleted");
            getAllEmployees();
        },
        error: function (err, exception) {
            alert("error");
        }
    })
}

function getAllEmployees(){
    $.ajax({
        method:"GET",
        contentType:"application/json",
        url:"http://localhost:8083/api/v1/employee/getAllEmployees",
        async:true,
        success: function (data) {
            if (data.code === "00"){
                $('#empTable').empty();
                for (let emp of data.content){
                    let empId = emp.empId;
                    let name = emp.empName;
                    let address = emp.empAddress;
                    let mNumber = emp.empMNumber;

                    var row = `<tr>
                                    <td>${empId}</td>
                                    <td>${name}</td>
                                    <td>${address}</td>
                                    <td>${mNumber}</td>
                               </tr>`
                    $('#empTable').append(row);
                }
            }
        },
        error: function (err, exception) {
            alert("error");
        }
    })
}

$(document).ready(function () {
    $(document).on('click','#empTable tr', function () {
        let empId = $(this).find('td:eq(0)').text();
        let empName = $(this).find('td:eq(1)').text();
        let empAddress = $(this).find('td:eq(2)').text();
        let empMNumber = $(this).find('td:eq(3)').text();

        $('#empId').val(empId);
        $('#empName').val(empName);
        $('#empAddress').val(empAddress);
        $('#empNumber').val(empMNumber);
    })
})
