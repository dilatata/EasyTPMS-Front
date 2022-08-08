
$(() => {

    const url = 'http://192.168.219.140:8080';


    $("#btn").click(
        function (event) {
            event.preventDefault();
            var data = {
                'userId': $("#userId").val(),
                'userPassword': $("#userPassword").val(),
            };
            const id = $("#userId").val();
            const pw = $("#userPassword").val();
            console.log("check input login data: ", data);

            var json = JSON.stringify(data);

            $.ajax({
                url: `${url}/login`,
                dataType: 'json',
                type: 'POST',
                data: json,
                Credentials: 'true',
                contentType: "application/json; charset=UTF-8",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    console.log("response data check : ", data)
                    if (data == null) {
                        alert("로그인에 실패하셨습니다.");
                    } else {
                        console.log("data 확인하기: ", data.userId);
                        alert("환영합니다!");
                        location.href = 'TestExecutionList';
                    }
                },
                error: function(e){
                    console.log("err ; ", e);
                    alert("로그인에 실패했습니다. 다시 시도하세요.");
                    location.href = "login";
                }
            });

        });

}); 