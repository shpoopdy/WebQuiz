<?php
  $username = "something";
  $password = "Something";

  $db_conn_str =
            "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)
                                       (HOST = stuff)
                                       (PORT = stuff))
                            (CONNECT_DATA = (SID = STUDENT)))";

  $conn = oci_connect($username, $password, $db_conn_str);

  if (!$conn) {
    echo 'Error connecting...';
  }

  $sql_str = 'select *
              from Quiz
              order by score desc
              ';
  $sql_stmt = oci_parse($conn, $sql_str);
  oci_execute($sql_stmt, OCI_DEFAULT);

  $results = array();
  while ($row = oci_fetch_array($sql_stmt, OCI_ASSOC)) {
    array_push($results, $row);
  }

  echo json_encode($results);

  oci_free_statement($sql_stmt);

  oci_close($conn);
?>
