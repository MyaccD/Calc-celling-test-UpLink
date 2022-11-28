<?php

if(!empty($_POST["email"])){
    
    $email_admin = "admin@site.ru"; // E-mail администратора
    
    $email = trim(stripslashes(strip_tags($_POST["email"])));
    $calk_1 = trim(stripslashes(strip_tags($_POST["calk_1"])));
    $calk_1_text = trim(stripslashes(strip_tags($_POST["calk_1_text"])));
    $calk_2 = trim(stripslashes(strip_tags($_POST["calk_2"])));
    $calk_2_text = trim(stripslashes(strip_tags($_POST["calk_2_text"])));
    $calk_3 = trim(stripslashes(strip_tags($_POST["calk_3"])));
    $calk_3_text = trim(stripslashes(strip_tags($_POST["calk_3_text"])));

    $result_calculator = trim(stripslashes(strip_tags($_POST["result_calculator"])));
    
    $subject = "Заказ с сайта";
    
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $headers .= 'From: С сайта <'.$email_admin.'>' . "\r\n";
    
    $headers2  = 'MIME-Version: 1.0' . "\r\n";
    $headers2 .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $headers2 .= 'From: С сайта <'.$email.'>' . "\r\n";
    
    $message = '
    <html>
        <head>
            <title>Заказ с сайта</title>
        </head>
        <body style="font-family:Verdana,sans-serif;">
            <table border="1" style="border-collapse:collapse;" cellspacing="0" cellpadding="0" width="50%">
            <tr>
                <td style="padding: 2px;">фактура потолка</td>
                <td style="padding: 2px;">'.$calk_1.'</td>
                <td style="padding: 2px;">'.$calk_1_text.'</td>
            </tr>
            <tr>
                <td style="padding: 2px;">цвет потолка</td>
                <td style="padding: 2px;">'.$calk_2.'</td>
                <td style="padding: 2px;">'.$calk_2_text.'</td>
            </tr>
            <tr>
                <td style="padding: 2px;">площадь помещения</td>
                <td style="padding: 2px;">'.$calk_3.'</td>
                <td style="padding: 2px;">'.$calk_3_text.'</td>
            </tr>
            <tr>
                <td style="padding: 2px;">количество углов</td>
                <td style="padding: 2px;">'.$calk_4.'</td>
                <td style="padding: 2px;"></td>
            </tr>
            
            <tr>
                <td style="padding: 2px;">Стоимость потолка:</td>
                <td style="padding: 2px;"></td>
                <td style="padding: 2px;">Всего: <b>'.$result_calculator.'</b></td>
            </tr>
            </table>
        </body>
    </html>
    ';
    
    mail($email, $subject, $message, $headers);
    mail($email_admin, $subject, $message, $headers2);
    
    echo "Отправлено!";
    
} else{
    echo "Ошибка!";
}

?>