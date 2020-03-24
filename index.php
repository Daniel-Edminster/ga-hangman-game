<?php

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://wordsapiv1.p.rapidapi.com/words/?random=true&frequencymin=8",
    // CURLOPT_URL => "https://wordsapiv1.p.mashape.com/words?random=true",
	CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_SSL_VERIFYPEER, false,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    // CURLOPT_SSL_VERIFYPEER, false,
	CURLOPT_HTTPHEADER => array(
		"x-rapidapi-host: wordsapiv1.p.rapidapi.com",
		"x-rapidapi-key: d47465c901msh33245ead01486fap1ff449jsn107f8654a8d5"
	),
));
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	echo "cURL Error #:" . $err;
} else {
	echo $response;
}