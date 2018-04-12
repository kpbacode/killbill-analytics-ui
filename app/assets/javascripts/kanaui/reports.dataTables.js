function ReportsDataTables(reports) {
    this.reports = reports;
}

ReportsDataTables.prototype.build = function(data, id, wrapper) {
    log.debug('Building dataTable for id ' + id);
    log.trace(data);

    var dataTableWrapper = $('<div class="dataTableWrapper" id="dataTableWrapper-' + id + '"><h3>' + data['name'] + '</h3></div>');
    wrapper.append(dataTableWrapper);

    var dataTable = $('<table cellpadding="0" cellspacing="0" border="0" class="display" id="dataTable-' + id + '"></table>');
    dataTableWrapper.append(dataTable);

    var aaData = [];
    for (var i in data['values']) {
        aaData.push([data.values[i]['x'], data.values[i]['y']])
    }

    dataTable.dataTable({
        "aaData": aaData,
        "aoColumns": [
            { "sTitle": "Date" },
            { "sTitle": "Value" },
        ]
    });
}

ReportsDataTables.prototype.buildTable = function(data, wrapper) {
    var id = data['name'];
    var dataTableWrapper = $('<div class="dataTableWrapper" id="dataTableWrapper-' + id + '"></h3></div>');
    wrapper.append(dataTableWrapper);

    var dataTable = $('<table cellpadding="0" cellspacing="0" border="0" class="display" id="dataTable-' + id + '"></table>');
    dataTableWrapper.append(dataTable);

    var aaData = [];
    for (var i in data['values']) {
        aaData.push(data['values'][i])
    }

    var aoColumns = [];
    var columnsVisible = [];
    for (var i in data['header']) {
        var isVisible =  isColumnVisible(data['header'][i]);
        aoColumns.push({ "sTitle": data['header'][i], "name": data['header'][i], "visible": isVisible })
        if (isVisible) {
            columnsVisible.push(data['header'][i]);
        }
    }

    dataTable.dataTable({
        "aaData": aaData,
        "aoColumns": aoColumns,
        "sDom": 'C<"clear">lfrtip'
    });

    dataTable.on( 'column-visibility.dt', function ( e, settings, column, state ) {
        setColumnVisible(settings.aoColumns[column].name, state);
    });

    $("#visible-table-columns").val(columnsVisible.join());
}

ReportsDataTables.prototype.buildCSVURL = function(position) {
    return this.reports.buildDataURL(position, 'csv');
}
function setColumnVisible(column, isVisible) {
    var columnsVisible = $("#visible-table-columns").val();
    if (columnsVisible == undefined || columnsVisible == null || columnsVisible.length == 0) {
        columnsVisible = [];
    } else {
        columnsVisible = (columnsVisible).split(",");
    }

    var columnIndex = columnsVisible.indexOf(column);
    if (isVisible && columnIndex == -1) {
        columnsVisible.push(column);
    } else if (!isVisible && columnIndex != -1) {
        columnsVisible.splice(columnIndex, 1);
    }

    $("#visible-table-columns").val(columnsVisible.join());
}

function isColumnVisible(column) {
    var columnsVisible = $("#visible-table-columns").val();
    if ((columnsVisible == undefined || columnsVisible == null || columnsVisible.length == 0) && column != 'tenant_record_id') {
        return true;
    }
    columnsVisible = (columnsVisible).split(",");

    for (var i in columnsVisible) {
        if (columnsVisible[i] == column) {
            return true;
        }
    }

    return false;
}
