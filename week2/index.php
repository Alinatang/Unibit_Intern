<!DOCTYPE html>
<html>
<head>
	<script src="jquery-3.4.1.min.js"></script>

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css">
  
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"></script>

    <link rel="stylesheet" type="text/css" href="‪Editor-PHP-1.9.0/css/editor.dataTables.css">

    <script type="text/javascript" src="Editor-PHP-1.9.0/js/dataTables.editor.js"></script>

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.5.6/css/buttons.dataTables.min.css">
  
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/1.5.6/js/dataTables.buttons.min.js"></script>

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/select/1.3.0/css/select.dataTables.min.css">
  
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/select/1.3.0/js/dataTables.select.min.js"></script>


    <script>
    	var editor; // use a global for the submit and return data rendering in the examples
 
        $(document).ready(function() {
            editor = new $.fn.dataTable.Editor( {
                ajax: "mysqldata.php",
                table: "#example",
                fields: [ {
                label: "Id:",
                name: "id"
            }, {
                label: "Realtime Start:",
                name: "realtime_start"
            }, {
                label: "Realtime End",
                name: "realtime_end"
            }, {
                label: "Name:",
                name: "name"
            }, {
                label: "Press Release:",
                name: "press_release"
            }, {
                label: "Link:",
                name: "link"
            }, {
                label: "Notes:",
                name: "notes"
            }
        ]
    } );
 
    $('#example').DataTable( {
        dom: "Bfrtip",
        ajax: {
            url: "mysqldata.php",
            type: 'POST'
        },
        columns: [
            { data: "id" },
            { data: "realtime_start" },
            { data: "realtime_end" },
            { data: "name" },
            { data: "press_release" },
            { data: "link" },
            { data: "notes" }
        ],
        select: true,
        buttons: [
            { extend: "create", editor: editor },
            { extend: "edit",   editor: editor },
            { extend: "remove", editor: editor }
        ]
    } );
} );
    </script>
	<title></title>
</head>
<body>
    <table id="example" class="display" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Id</th>
                <th>Realtime Start</th>
                <th>Realtime end</th>
                <th>Name</th>
                <th>Press Release</th>
                <th>Link</th>
                <th>Notes</th>
            </tr>
        </thead>
    </table>
</body>
</html>