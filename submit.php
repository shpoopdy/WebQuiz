<?php
  $username = "secret";
  $password = "Secret";

  $db_conn_str =
            "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)
                                       (HOST = Something)
                                       (PORT = something))
                            (CONNECT_DATA = (SID = STUDENT)))";

$conn = oci_connect($username, $password, $db_conn_str);

if (!$conn) {
    echo 'Error connecting...';
}

$info = json_decode($_POST['info']);

$props_query_str = '
        insert into Quiz
        values (
            :username,
            :q1,
            :q2,
            :q3,
            :q4,
            :q5,
            :q6,
            :score
            )
';


$props_query_stmt = oci_parse($conn, $props_query_str);


// bind vars passed from form to $_POST to query statement
oci_bind_by_name($props_query_stmt, ':username', $info->user);
oci_bind_by_name($props_query_stmt, ':q1', $info->answers[0]);
oci_bind_by_name($props_query_stmt, ':q2', $info->answers[1]);
oci_bind_by_name($props_query_stmt, ':q3', $info->answers[2]);
oci_bind_by_name($props_query_stmt, ':q4', $info->answers[3]);
oci_bind_by_name($props_query_stmt, ':q5', $info->answers[4]);
oci_bind_by_name($props_query_stmt, ':q6', $info->answers[5]);
oci_bind_by_name($props_query_stmt, ':score', $info->score);



// MUST USE 'OCI_COMMIT_ON_SUCCESS" OR YOUR INSERT WILL HAVE NO EFFECT!!!
oci_execute($props_query_stmt, OCI_COMMIT_ON_SUCCESS);

oci_free_statement($props_query_stmt);


oci_close($conn);

?>
