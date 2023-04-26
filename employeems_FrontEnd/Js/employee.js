getAllEmployee();

function saveEmployee() {
  let id = $("#Input1").val();
  let name = $("#Input2").val();
  let address = $("#Input3").val();
  let contact = $("#Input4").val();

  if (id == "") {
    $.ajax({
      method: "POST",
      contentType: "application/json",
      url: "http://localhost:8080/api/v1/employee/saveEmployee",
      async: true,
      data: JSON.stringify({
        empId: "",
        empName: name,
        empAddress: address,
        empContact: contact,
      }),
      success: function (data) {
        alert("Successfully Saved");
        getAllEmployee();
      },
      error: function (xhr, ex) {
        alert("Error");
      },
    });
  } else {
    alert("Please Save New Employee");
  }
}

function updateEmployee() {
  let id = $("#Input1").val();
  let name = $("#Input2").val();
  let address = $("#Input3").val();
  let contact = $("#Input4").val();

  $.ajax({
    method: "PUT",
    contentType: "application/json",
    url: "http://localhost:8080/api/v1/employee/updateEmployee",
    async: true,
    data: JSON.stringify({
      empId: id,
      empName: name,
      empAddress: address,
      empContact: contact,
    }),
    success: function (data) {
      alert("Successfully Updated");
      getAllEmployee();
    },
    error: function (xhr, ex) {
      alert("Error");
    },
  });
}

function deleteEmployee() {
  let id = $("#Input1").val();

  $.ajax({
    method: "DELETE",
    contentType: "application/json",
    url: "http://localhost:8080/api/v1/employee/deleteEmployee/" + id,
    async: true,
    success: function (data) {
      alert("Successfully Deleted");
      getAllEmployee();
    },
    error: function (xhr, ex) {
      alert("Error");
    },
  });
}

function getAllEmployee() {
  $.ajax({
    method: "GET",
    contentType: "application/json",
    url: "http://localhost:8080/api/v1/employee/getAllEmployees",
    async: true,
    success: function (data) {
      if (data.code === "00") {
        $("#empTable").empty();
        for (let emp of data.content) {
          let id = emp.empId;
          let name = emp.empName;
          let address = emp.empAddress;
          let contact = emp.empContact;

          var row = `<tr>
          <td>${id}</td>
          <td>${name}</td>
          <td>${address}</td>
          <td>${contact}</td>
        </tr>`;

          $("#empTable").append(row);
        }
      }
    },
    error: function (xhr, ex) {
      alert("Error");
    },
  });
}

const searchField = document.getElementById("Input5");

// EventListner

searchField.addEventListener("input", function () {
  let searchKey = $("#Input5").val().toString().toLowerCase();
  handleSearchArea(searchKey);
});

// Handle Search Area

function handleSearchArea(searchKey) {
  $.ajax({
    method: "GET",
    contentType: "application/json",
    url: "http://localhost:8080/api/v1/employee/getAllEmployees",
    async: true,
    success: function (data) {
      if (data.code === "00") {
        filterData(data, searchKey);
      }
    },
    error: function (xhr, ex) {
      alert("Error");
    },
  });
}

function filterData(data, searchKey) {
  $("#empTable").empty();
  for (let emp of data.content) {
    if (
      emp.empId.toString().toLowerCase().includes(searchKey) ||
      emp.empName.toString().toLowerCase().includes(searchKey) ||
      emp.empAddress.toString().toLowerCase().includes(searchKey) ||
      emp.empContact.toString().toLowerCase().includes(searchKey)
    ) {
      let id = emp.empId;
      let name = emp.empName;
      let address = emp.empAddress;
      let contact = emp.empContact;
      var row = `<tr>
          <td>${id}</td>
          <td>${name}</td>
          <td>${address}</td>
          <td>${contact}</td>
        </tr>`;

      $("#empTable").append(row);
    }
  }
}

function clearData() {
  $("#Input1").val("");
  $("#Input2").val("");
  $("#Input3").val("");
  $("#Input4").val("");
}

$(document).ready(function () {
  $(document).on("click", "#empTable tr", function () {
    var col0 = $(this).find("td:eq(0)").text();
    var col1 = $(this).find("td:eq(1)").text();
    var col2 = $(this).find("td:eq(2)").text();
    var col3 = $(this).find("td:eq(3)").text();

    $("#Input1").val(col0);
    $("#Input2").val(col1);
    $("#Input3").val(col2);
    $("#Input4").val(col3);
  });
});
